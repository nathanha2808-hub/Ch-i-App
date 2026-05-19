# Danh sách Test Case FAIL - Hệ thống Admin

Dưới đây là danh sách các test case không vượt qua quá trình kiểm thử (trạng thái FAIL), được gom nhóm theo từng Use Case.

## UC_03 Can thiệp đơn hàng cần xử lý
| ID Test Case | Tên Test Case | Kết quả thực tế (Lỗi ghi nhận) |
| :--- | :--- | :--- |
| **TC_AD03_007** | Không có Tasker phù hợp | Không có chức năng gắn Tasker |
| **TC_AD03_008** | Hoàn tiền cho khách hàng | Không có chức năng này |
| **TC_AD03_011** | Gán Tasker không hoạt động | Hệ thống vẫn cho phép gán tasker bị khóa |

## UC_05 Xem & quản lý danh sách Cư dân
| ID Test Case | Tên Test Case | Kết quả thực tế (Lỗi ghi nhận) |
| :--- | :--- | :--- |
| **(Bổ sung)** | Thêm mới cư dân | Thêm mới không thành công -> Hệ thống hiển thị thông báo lỗi "Email không tồn tại" |

## UC_06 Quản lý ví & giao dịch tài chính
| ID Test Case | Tên Test Case | Kết quả thực tế (Lỗi ghi nhận) |
| :--- | :--- | :--- |
| **TC-AD06-02** | Hiển thị danh sách giao dịch | Khi khách hàng nạp tiền thì chỉ hiển thị số tiền cộng vào (Hiển thị sai/thiếu thông tin lịch sử đầy đủ) |
| **TC-AD06-10** | Xem chi tiết giao dịch | Không xem được chi tiết khi ấn vào giao dịch |
| **TC-AD06-12** | Lọc giao dịch theo loại | Lọc theo nạp tiền không hoạt động, hoàn tiền chưa có chức năng |
| **TC-AD06-25** | Click liên tục nút duyệt | Click duyệt được 2 lần (Chưa chặn double click/spam request) |

## UC_08 Xử lý khiếu nại
| ID Test Case | Tên Test Case | Kết quả thực tế (Lỗi ghi nhận) |
| :--- | :--- | :--- |
| **TC-AD08-08** | Hoàn tiền cho khách hàng | Chưa hoàn được tiền |

## UC_09 Theo dõi doanh thu & phí hoa hồng
| ID Test Case | Tên Test Case | Kết quả thực tế (Lỗi ghi nhận) |
| :--- | :--- | :--- |
| **TC-AD09-02** | Hiển thị đúng phí hoa hồng admin tự setup | Tính sai phí nền tảng |