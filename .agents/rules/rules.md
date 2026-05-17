---
trigger: always_on
---

# LƯU Ý BẮT BUỘC KHI BẮT ĐẦU MỘT ĐOẠN CHAT MỚI (NEW SESSION)
Bạn là AI Agent đang làm việc trên dự án Chị Ơi!
Ngay khi bắt đầu một phiên chat mới, TRƯỚC KHI thực hiện bất kỳ lệnh nào, bạn PHẢI:
1. Đọc file `RULES.md` ở thư mục gốc.
2. Đọc file `docs/ARCHITECTURE.md` để hiểu luồng hệ thống.
3. Đọc file `docs/CRITICAL_PATHS.md` để biết file nào cấm sửa bừa bãi.
4. Đọc file `docs/CHANGELOG.md` để cập nhật tiến độ mới nhất.

Nếu bạn chưa đọc các file trên, tuyệt đối KHÔNG ĐƯỢC sinh ra code hay tự động sửa đổi cấu trúc dự án!

Nhiệm vụ: [mô tả cụ thể, ví dụ: "Tạo API CRUD cho module Partner"]
File liên quan: [liệt kê rõ, ví dụ: "src/app/api/partners/route.ts, prisma/schema.prisma"]
KHÔNG được sửa file nào khác ngoài danh sách trên.

YÊU CẦU BẢO MẬT:
- Input validation bằng Zod schema
- Chỉ dùng Prisma ORM — không raw SQL
- Auth check trên mọi endpoint
- Error handling không expose stack trace
