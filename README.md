# ATN Finance iPhone Cloud — Website đăng ký tư vấn iPhone

Giao diện responsive với logo chữ ATN Finance iPhone Cloud, bảng chọn số tiền, bộ tính trả góp minh họa theo dư nợ giảm dần và form gửi Telegram Bot. Giữ nguyên API `api/register.js` từ phiên bản trước.

## Triển khai Vercel

1. Đưa toàn bộ thư mục này lên GitHub và import project vào Vercel (Framework Preset: Other).
2. Vào Settings → Environment Variables, tạo:
   - `TELEGRAM_BOT_TOKEN`: token bot mới từ @BotFather
   - `TELEGRAM_CHAT_ID`: ID chat nhận đơn
   - `PUBLIC_SITE_URL`: origin website thật, ví dụ `https://ten-du-an.vercel.app`
3. Redeploy để các biến môi trường có hiệu lực.
4. Mở Telegram, nhấn Start với bot. Để lấy chat ID, gửi tin nhắn cho bot rồi gọi `https://api.telegram.org/bot<TOKEN>/getUpdates` trong môi trường riêng; không chia sẻ token.
5. Gửi thử form trên website và kiểm tra tin nhắn Telegram.

## Lưu ý

- Lãi suất 5,49%/tháng; quy đổi danh nghĩa 65,88%/năm, hiệu dụng 89,90%/năm khi ghép lãi tháng. Ước tính trả đều theo dư nợ giảm dần, chưa tính phí.
- API không nhận Apple ID, mật khẩu, OTP, mã xác minh hoặc quyền truy cập iCloud.
- Trước khi sử dụng công khai, bổ sung Turnstile, rate limit máy chủ, chính sách bảo vệ dữ liệu cá nhân, thông tin đơn vị tiếp nhận và quy trình xóa dữ liệu.
- Nếu token bot đã bị công khai, dùng @BotFather để thu hồi và cấp token mới.


Tên thương hiệu hiển thị: ATN Finance iPhone Cloud. Cấu hình Telegram giữ nguyên qua các biến môi trường, không nhúng token vào giao diện.


## Bản sửa font
- Dùng Arial/Segoe UI hỗ trợ dấu tiếng Việt, không cần tải font từ Internet.
- Áp dụng font đồng nhất cho nút, input, select, textarea.
- Giữ nguyên API Telegram; chạy file HTML cục bộ chỉ xem giao diện, gửi form cần deploy Vercel và thiết lập biến môi trường.


## Cập nhật biểu mẫu
- Thêm thời hạn vay 3, 6, 9, 12, 18, 24 tháng ngay trong phần Đăng ký tư vấn miễn phí; đồng bộ với bảng ước tính.
- Lãi suất tham khảo cố định 5,49%/tháng (65,88%/năm danh nghĩa) (không phải cam kết chào vay), tính trả đều theo dư nợ giảm dần; chưa tính phí.
- Thông báo Telegram kèm thời hạn và lãi suất tham khảo. Giữ nguyên các biến môi trường Telegram hiện có.

## Cập nhật 5,49%/tháng
- Quy đổi danh nghĩa: 5,49% × 12 = 65,88%/năm.
- Quy đổi hiệu dụng (lãi kép tháng): (1 + 0,0549)^12 − 1 ≈ 89,90%/năm.
- Công cụ ước tính dùng lãi suất tháng 0,0549, công thức niên kim trả đều theo dư nợ giảm dần.
- Không tự động ghép lãi trong lịch trả góp; quy đổi hiệu dụng chỉ để minh bạch so sánh.
