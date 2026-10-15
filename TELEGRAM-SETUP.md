# ATN Finance iPhone Cloud — Telegram

## Đã thiết lập trong mã nguồn
- `api/register.js` nhận đăng ký và gửi qua Telegram Bot API từ phía máy chủ.
- Chat ID nhận tin: `8755057733` (trong `.env.example`, không phải token).
- `index.html` gọi `/api/register` khi nhấn gửi.
- Token Telegram không được đặt trong HTML, JavaScript công khai hoặc GitHub.

## Kết nối trên Vercel
1. Đăng nhập Vercel, mở dự án ATN Finance.
2. Settings → Environment Variables → thêm:
   - `TELEGRAM_BOT_TOKEN`: token MỚI nhận từ BotFather.
   - `TELEGRAM_CHAT_ID`: `8755057733`.
   - `PUBLIC_SITE_URL`: URL HTTPS thật của website, không có dấu `/` cuối.
3. Chọn Production (và Preview nếu muốn thử), Save.
4. Deployments → Redeploy để biến môi trường có hiệu lực.
5. Trên Telegram, mở bot và nhấn Start, rồi gửi đơn thử trên website HTTPS.
6. Không thử gửi form bằng cách mở `index.html` từ `file:///`; API chỉ chạy khi deploy lên Vercel hoặc máy chủ tương thích.

## Lưu ý an toàn
- Token cũ từng chia sẻ công khai nên nên thu hồi trong BotFather bằng `/revoke`, rồi dùng token mới.
- Không đưa `.env` chứa token lên GitHub. `.gitignore` đã chặn các file `.env`.
- Khi deploy công khai, bổ sung rate limiting, chống bot, thông báo quyền riêng tư và thời hạn lưu dữ liệu.
- Nếu gặp lỗi 403 khi git push, cần đăng nhập GitHub có quyền ghi repo; lỗi này không liên quan Telegram.
