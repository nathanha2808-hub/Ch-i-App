# Phân tích Database theo Luồng Nghiệp vụ (Chị Ơi!)

Dựa trên cấu trúc database hiện tại của dự án, dưới đây là danh sách các bảng tham gia vào từng luồng nghiệp vụ chính: Khách hàng, Giúp việc (Tasker), và Admin.

---

## 1. Luồng Khách hàng (Customer Flow)
Luồng này phục vụ người dùng đặt dịch vụ, thanh toán, theo dõi đơn hàng và quản lý tài khoản cá nhân.

Các bảng liên quan trực tiếp:
*   **Identity & Profile:**
    *   `users`: Đăng nhập, thông tin cơ bản (SĐT, họ tên, role = `CUSTOMER`).
    *   `customers`: Thông tin mở rộng (địa chỉ mặc định, điểm thưởng loyalty).
*   **Dịch vụ & Mua hàng:**
    *   `services`: Xem danh sách dịch vụ để đặt.
    *   `family_packages`, `customer_packages`: Xem và đăng ký các gói dịch vụ gia đình (Family Packages).
    *   `vouchers`: Tra cứu và áp dụng mã giảm giá.
*   **Đơn hàng (Orders):**
    *   `orders`: Đặt đơn hàng mới, xem lịch sử đơn.
    *   `order_status_history`: Theo dõi tiến độ đơn hàng thời gian thực.
*   **Tương tác & Đánh giá:**
    *   `messages`: Nhắn tin với Tasker trong quá trình thực hiện đơn.
    *   `reviews`: Đánh giá và để lại nhận xét cho Tasker sau khi hoàn thành.
*   **Tài chính:**
    *   `wallets`: Quản lý số dư ví cá nhân.
    *   `transactions`: Lịch sử nạp tiền, trừ tiền khi thanh toán đơn hàng (`PAYMENT`, `DEPOSIT`).
*   **Hệ thống:**
    *   `notifications`: Nhận thông báo về đơn hàng, khuyến mãi.
    *   `support_tickets`: Gửi yêu cầu hỗ trợ khi gặp sự cố.

---

## 2. Luồng Giúp việc (Tasker Flow)
Luồng này phục vụ người lao động đăng ký, nhận đơn, cập nhật trạng thái làm việc và nhận thu nhập.

Các bảng liên quan trực tiếp:
*   **Identity & Profile:**
    *   `users`: Đăng nhập, thông tin cơ bản (role = `TASKER`).
    *   `taskers`: Hồ sơ công việc (trạng thái KYC, điểm đánh giá trung bình, số lượng công việc, trạng thái online, vị trí GPS hiện tại).
    *   `tasker_services`: Đăng ký các dịch vụ cụ thể muốn nhận (ví dụ: chỉ nhận dọn dẹp, không nhận trông trẻ).
*   **Đơn hàng (Orders):**
    *   `orders`: Nhận đơn từ hệ thống, cập nhật trạng thái đơn (Đã đến, Đang làm, Hoàn thành).
    *   `order_status_history`: Ghi nhận vị trí (GPS) và thời điểm thay đổi trạng thái đơn.
*   **Tương tác & Đánh giá:**
    *   `messages`: Nhắn tin liên lạc với khách hàng.
    *   `reviews`: Xem điểm đánh giá từ khách hàng để cải thiện chất lượng.
*   **Tài chính:**
    *   `wallets`: Quản lý ví thu nhập.
    *   `transactions`: Nhận tiền công sau khi hoàn thành đơn (`EARNING`), lịch sử rút tiền (`WITHDRAW`).
*   **Hệ thống:**
    *   `notifications`: Nhận thông báo có đơn mới, đơn bị hủy.
    *   `support_tickets`: Liên hệ admin khi gặp sự cố với khách hàng hoặc đơn hàng.

---

## 3. Luồng Admin (Admin Flow)
Luồng này dùng để quản lý toàn bộ hệ thống, kiểm duyệt người dùng, xử lý tài chính và hỗ trợ.

Các bảng liên quan trực tiếp:
*   **Identity & Quản trị:**
    *   `users`: Tài khoản đăng nhập (role = `ADMIN`).
    *   `admins`: Phân quyền quản trị viên (`SUPPORT`, `MANAGER`, `SUPER_ADMIN`) và phòng ban.
    *   `admin_audit_logs`: Bảng cực kỳ quan trọng, lưu lại mọi hành động thao tác của admin (duyệt KYC, sửa giá, can thiệp đơn) để audit.
*   **Quản lý Hệ sinh thái:**
    *   `services`: Thêm, sửa, xóa các dịch vụ hệ thống.
    *   `family_packages`: Quản lý danh sách các gói gia đình.
    *   `vouchers`: Tạo và quản lý mã giảm giá.
*   **Quản lý Người dùng & Duyệt (Approval):**
    *   `taskers`: Duyệt hồ sơ KYC của Tasker.
    *   `tasker_services`: Phê duyệt cho phép Tasker thực hiện một dịch vụ cụ thể.
*   **Quản lý Đơn hàng (Intervention):**
    *   `orders`: Theo dõi mọi đơn hàng trên hệ thống.
    *   `order_interventions`: Ghi nhận các trường hợp Admin phải can thiệp trực tiếp vào đơn hàng (ví dụ: Hủy đơn thay cho khách, đổi Tasker do sự cố).
*   **Tài chính & Giao dịch:**
    *   `transactions`: Phê duyệt các yêu cầu rút tiền của Tasker hoặc xử lý nạp tiền lỗi.
*   **Hỗ trợ Khách hàng (CS):**
    *   `support_tickets`: Tiếp nhận, phân công xử lý và trả lời khiếu nại từ Customer/Tasker.
