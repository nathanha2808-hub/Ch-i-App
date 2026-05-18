# BÁO CÁO TỔNG HỢP TEST CASE FAIL

**Tổng số Test Case FAIL: 39**

## UC-REG — Đăng ký
| ID | Tên Test Case | Kết quả thực tế (Lý do Fail) |
| :--- | :--- | :--- |
| UC-REG-02 | Đăng ký với họ tên tiếng Việt có dấu | Lỗi phông chữ |

## UC-KH-01 — Đăng nhập hệ thống
| ID | Tên Test Case | Kết quả thực tế (Lý do Fail) |
| :--- | :--- | :--- |
| TC-KH01-024 | Kiểm tra giao diện Điều khoản/Bảo mật | Button Quay lại không đẹp |

## UC-KH-02 — Quên mật khẩu / Đặt lại qua OTP
| ID | Tên Test Case | Kết quả thực tế (Lý do Fail) |
| :--- | :--- | :--- |
| TC-KH02-017 | Kiểm tra giới hạn số lần nhập sai OTP | Nhập sai bao nhiêu lần cũng được |

## UC-KH-04 — Tìm kiếm dịch vụ
| ID | Tên Test Case | Kết quả thực tế (Lý do Fail) |
| :--- | :--- | :--- |
| TC-KH04-001 | Tìm kiếm dịch vụ với từ khóa hợp lệ | Hiển thị lỗi ảnh và hiển thị các dịch vụ không có |

## UC-KH-07 — Đặt dịch vụ dọn nhà
| ID | Tên Test Case | Kết quả thực tế (Lý do Fail) |
| :--- | :--- | :--- |
| TC-KH07-016 | Kiểm tra đặt đơn khi ví không đủ số dư và chọn thanh toán bằng ví | Hiển thị thông báo sai về số dư hiện tại |

## UC-KH-08 — Đặt dịch vụ trông trẻ
| ID | Tên Test Case | Kết quả thực tế (Lý do Fail) |
| :--- | :--- | :--- |
| TC-KH08-002 | Đặt dịch vụ trông trẻ khi thanh toán bằng ví khi không đủ số dư | Hiển thị sai thông báo sai về số dư tiền hiện tại |
| TC-KH08-015 | Kiểm tra giao diện màn hình trông trẻ | Bố cục icon không đúng vị trí tại: độ tuổi trẻ, Ngày và giờ bắt đầu |

## UC-KH-09 — Đặt dịch vụ mua hộ WinMart
| ID | Tên Test Case | Kết quả thực tế (Lý do Fail) |
| :--- | :--- | :--- |
| TC-KH09-008 | Kiểm tra đặt đơn khi ví không đủ số dư | Hiển thị sai thông báo về số dư hiện tại |

## UC-KH-10 — Theo dõi tiến trình đơn
| ID | Tên Test Case | Kết quả thực tế (Lý do Fail) |
| :--- | :--- | :--- |
| TC-KH10-001 | Kiểm tra tổng quan trang Chi tiết đơn hàng | Hiển thị sai trường Thời gian lên lịch (Sai giờ) |
| TC-KH10-004 | Hiển thị thời gian tại từng bước | Không hiển thị thời gian từng bước |
| TC-KH10-007 | Kiểm tra nút Gọi Tasker | Không gọi được |
| TC-KH10-008 | Kiểm tra Hủy đơn trước khi Tasker bắt đầu | Không hủy đơn được |

## UC-KH-11+12 — Chat và gọi Tasker
| ID | Tên Test Case | Kết quả thực tế (Lý do Fail) |
| :--- | :--- | :--- |
| TC-KH11-006 | Kiểm tra gửi nhiều tin nhắn liên tiếp | Không kéo tin nhắn xuống dưới |
| TC-KH11-011 | Kiểm tra tự động scroll xuống tin nhắn khi mới vào màn hình chat | Hiển thị từ đầu. Khách muốn xem phải tự kéo xuống |
| TC-KH11-012 | Kiểm tra hiển thị icon kéo xuống dưới khi có tin nhắn mới | Chưa có icon |
| TC-KH11-017 | Gọi điện từ màn hình tracking thành công | Gọi thất bại |
| TC-KH11-021 | Kiểm tra hiển thị thông báo trong tin nhắn sau khi tasker từ chối nghe máy | Không có thông báo |

## UC-KH-13 — Hủy đơn
| ID | Tên Test Case | Kết quả thực tế (Lý do Fail) |
| :--- | :--- | :--- |
| TC-KH13-001 | Hủy đơn thành công từ màn hình tracking | Hiển thị popup nhưng Click hủy đơn không hoạt động |
| TC-KH13-004 | Kiểm tra từ chối xác nhận hủy đơn | Hiển thị thông báo lỗi trong màn Theo dõi đơn |

## UC-KH-14 — Hoạt động
| ID | Tên Test Case | Kết quả thực tế (Lý do Fail) |
| :--- | :--- | :--- |
| TC-KH14-001 | Mở màn hình hoạt động thành công | Bố cục trạng thái xô lệch |
| TC-KH14-006 | Hiển thị thông tin đơn hàng đầy đủ | Hiển thị sai thời gian lên lịch; Chưa phân loại dịch vụ dọn nhà; Các button bị xô lệch khi đơn đang ở trạng thái Đã nhận đơn |

## UC-KH-15 — Xem thông báo
| ID | Tên Test Case | Kết quả thực tế (Lý do Fail) |
| :--- | :--- | :--- |
| TC-KH15-005 | Đánh dấu tất cả đã đọc | Chấm đỏ biến mất ngay sau khi click, nhưng khi load lại thì hiển thị lại |
| TC-KH15-006 | Kiểm tra xóa dấu chấm đỏ sau khi đọc | Chấm đỏ vẫn hiển thị |
| TC-KH15-009 | Kiểm tra trạng thái rỗng khi chưa có thông báo | Thông báo sai nội dung (Vẫn để khuyến mãi 20% và cập nhật ứng dụng) |
| TC-KH15-012 | Kiểm tra hiển thị số thông báo trên icon chuông tại màn hình trang chủ | Số lượng thông báo đang để auto 3 |

## UC-KH-16 — Đánh giá Tasker
| ID | Tên Test Case | Kết quả thực tế (Lý do Fail) |
| :--- | :--- | :--- |
| TC-KH16-001 | Mở màn hình đánh giá từ thông báo | Không nhận thông báo đánh giá tasker |
| TC-KH16-003 | Đánh giá Tasker với 5 sao | Hệ thống không lưu |
| TC-KH16-004 | Đánh giá Tasker với 1 sao | Hệ thống không lưu |
| TC-KH16-006 | Nhập nhận xét văn bản | Hệ thống không lưu |
| TC-KH16-009 | Kiểm tra cập nhật điểm sao Tasker | Chưa cập nhật đánh giá tasker |
| TC-KH16-011 | Bỏ qua đánh giá đơn | Không nhận thông báo đánh giá tasker |

## UC-KH-22 — Đăng ký gói gia đình
| ID | Tên Test Case | Kết quả thực tế (Lý do Fail) |
| :--- | :--- | :--- |
| TC-KH22-005 | Kiểm tra cập nhật trạng thái sau khi đăng ký gói | Không hiển thị trạng thái đã kích hoạt |

## UC-KH-23 — Liên hệ CSKH hỗ trợ 24/7
| ID | Tên Test Case | Kết quả thực tế (Lý do Fail) |
| :--- | :--- | :--- |
| TC-KH23-006 | Kiểm tra khi nhập spam một chữ dài | Hiển thị thiếu chữ |
| TC-KH23-011 | Kiểm tra tự động scroll xuống tin nhắn khi mới vào màn hình chat | Hiển thị từ đầu. Khách muốn xem phải kéo xuống |
| TC-KH23-012 | Kiểm tra hiển thị icon kéo xuống dưới khi có tin nhắn mới | Chưa có icon |

## UC-KH-26 — Khiếu nại
| ID | Tên Test Case | Kết quả thực tế (Lý do Fail) |
| :--- | :--- | :--- |
| TC-KN26-008 | Kiểm tra hiển thị thông tin trong lịch sử khiểu nại | Không hiển thị hết thông tin |

## UC-KH-27 — Đặt lại mật khẩu
| ID | Tên Test Case | Kết quả thực tế (Lý do Fail) |
| :--- | :--- | :--- |
| TC-KN27-007 | Mật khẩu mới trùng mật khẩu cũ | Vẫn cho thay đổi bình thường (không chặn) |
| TC-KN27-010 | Chỉ nhập khoảng trắng | Vẫn nhập bình thường (không chặn) |
| TC-KN27-018 | Kiểm tra UI đổi mật khẩu | Không có icon con mắt (hiển thị/ẩn mật khẩu) |