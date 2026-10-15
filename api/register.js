'use strict';
const LIMIT = 4096;
const clean = (v, n=120) => String(v ?? '').trim().replace(/[\u0000-\u001f\u007f]/g, ' ').slice(0,n);
const fail = (res, code, message) => res.status(code).json({error:message});
module.exports = async (req,res) => {
  res.setHeader('Cache-Control','no-store');
  res.setHeader('X-Content-Type-Options','nosniff');
  if(req.method !== 'POST') return fail(res,405,'Chỉ hỗ trợ POST');
  if(!String(req.headers['content-type']||'').toLowerCase().startsWith('application/json')) return fail(res,415,'Yêu cầu JSON');
  if(Number(req.headers['content-length']||0)>LIMIT) return fail(res,413,'Dữ liệu quá lớn');
  const allowed = process.env.PUBLIC_SITE_URL;
  if(allowed){
    let expected; try {expected=new URL(allowed).origin;} catch {return fail(res,503,'Cấu hình website chưa hợp lệ');}
    const origin=req.headers.origin;
    if(origin && origin!==expected) return fail(res,403,'Nguồn yêu cầu không hợp lệ');
  }
  const data=req.body || {};
  if(typeof data!=='object'||Array.isArray(data)) return fail(res,400,'Dữ liệu không hợp lệ');
  if(data.website) return res.status(200).json({ok:true}); // Honeypot; does not replace server-side rate limiting
  const {name,phone,model,storage,amount,term,note,consent}=data;
  const n=clean(name,101), p=clean(phone,25), m=clean(model,81);
  const money=Number(amount);
  if(consent!==true||n.length<2||n.length>100||m.length<2||m.length>80||!/^0\d{9}$/.test(p)||!Number.isSafeInteger(money)||money<100000||money>1000000000||clean(note,501).length>500) return fail(res,400,'Vui lòng kiểm tra thông tin đăng ký');
  const token=process.env.TELEGRAM_BOT_TOKEN, chatId=process.env.TELEGRAM_CHAT_ID;
  if(!token||!chatId) return fail(res,503,'Chưa cấu hình Telegram');
  const message=[
    '📩 ĐĂNG KÝ TƯ VẤN VAY IPHONE',
    `Họ tên: ${n}`, `Điện thoại: ${p}`, `Dòng máy: ${m}`,
    `Dung lượng: ${clean(storage,40)||'Chưa chọn'}`,
    `Số tiền: ${money.toLocaleString('vi-VN')} VNĐ`,
    `Thời hạn: ${clean(term,40)||'Chưa chọn'}`,
    `Ghi chú: ${clean(note,500)||'Không có'}`,
    `Thời điểm (UTC): ${new Date().toISOString()}`,
    'Khách đã đồng ý được liên hệ tư vấn.'
  ].join('\n');
  try {
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),8000);
    let response;
    try {response=await fetch(`https://api.telegram.org/bot${token}/sendMessage`,{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({chat_id:chatId,text:message,disable_web_page_preview:true}),signal:controller.signal
    });} finally {clearTimeout(timer);}
    if(!response.ok) return fail(res,502,'Không gửi được thông báo, vui lòng thử lại');
    const result=await response.json();
    if(!result.ok) return fail(res,502,'Không gửi được thông báo, vui lòng thử lại');
    return res.status(200).json({ok:true});
  } catch {return fail(res,502,'Không gửi được thông báo, vui lòng thử lại');}
};
