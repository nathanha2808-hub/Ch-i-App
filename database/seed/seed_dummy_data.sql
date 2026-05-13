-- Seed Data for Chị Ơi! System

-- 1. USERS (Password hashed "123456" for all: assuming a simple bcrypt hash, we'll just put a dummy string for now)
INSERT INTO users (phone, password_hash, full_name, avatar_url, role, status) VALUES
('0901111111', '$2b$10$dummyhash', 'Nguyễn Khách Hàng 1', 'avatar_kh1.jpg', 'CUSTOMER', 'ACTIVE'),
('0902222222', '$2b$10$dummyhash', 'Trần Khách Hàng 2', 'avatar_kh2.jpg', 'CUSTOMER', 'ACTIVE'),
('0981111111', '$2b$10$dummyhash', 'Lê Tasker 1', 'avatar_tk1.jpg', 'TASKER', 'ACTIVE'),
('0982222222', '$2b$10$dummyhash', 'Phạm Tasker 2', 'avatar_tk2.jpg', 'TASKER', 'ACTIVE'),
('0983333333', '$2b$10$dummyhash', 'Vũ Tasker 3', 'avatar_tk3.jpg', 'TASKER', 'ACTIVE'),
('0999999999', '$2b$10$dummyhash', 'Hệ Thống Admin', 'avatar_admin.jpg', 'ADMIN', 'ACTIVE');

-- 2. CUSTOMERS
INSERT INTO customers (customer_id, default_address, loyalty_points) VALUES
(1, 'Chung cư Vinhomes Central Park, Bình Thạnh', 150),
(2, 'Masteri Thảo Điền, Quận 2', 50);

-- 3. TASKERS (Adding dummy location data using PostGIS. Coordinates around HCMC)
-- Note: ST_MakePoint takes (longitude, latitude)
INSERT INTO taskers (tasker_id, bio, kyc_status, average_rating, total_jobs, is_online, current_location) VALUES
(3, 'Kinh nghiệm dọn dẹp 5 năm', 'VERIFIED', 4.9, 120, TRUE, ST_SetSRID(ST_MakePoint(106.721832, 10.795861), 4326)), -- Landmark 81 area
(4, 'Chuyên nấu ăn gia đình', 'VERIFIED', 4.8, 85, TRUE, ST_SetSRID(ST_MakePoint(106.732296, 10.803762), 4326)), -- Thao Dien area
(5, 'Trông trẻ chuyên nghiệp', 'VERIFIED', 5.0, 40, FALSE, ST_SetSRID(ST_MakePoint(106.685361, 10.762622), 4326)); -- District 1 area

-- 4. ADMINS
INSERT INTO admins (admin_id, department, access_level) VALUES
(6, 'Hệ thống quản trị', 'SUPER_ADMIN');

-- 5. SERVICES
INSERT INTO services (name, description, base_price, icon_url) VALUES
('Dọn dẹp nhà cửa', 'Dọn dẹp tiêu chuẩn 2 giờ', 150000, 'icon_cleaning.png'),
('Trông trẻ', 'Giữ trẻ sơ sinh và trẻ nhỏ', 200000, 'icon_babysitting.png'),
('Nấu ăn', 'Nấu ăn gia đình 3-4 người', 180000, 'icon_cooking.png'),
('Đi chợ', 'Mua hộ thực phẩm theo yêu cầu', 100000, 'icon_shopping.png');

-- 6. TASKER_SERVICES
INSERT INTO tasker_services (tasker_id, service_id, status) VALUES
(3, 1, 'APPROVED'),
(3, 3, 'APPROVED'),
(4, 3, 'APPROVED'),
(4, 4, 'APPROVED'),
(5, 2, 'APPROVED');

-- 7. VOUCHERS
INSERT INTO vouchers (code, discount_amount, conditions, valid_from, valid_until) VALUES
('CHAMCHI', 30000, 'Giảm 30k cho đơn từ 150k', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '30 days'),
('FREESHIP', 15000, 'Miễn phí tìm kiếm', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '10 days');

-- 8. FAMILY_PACKAGES
INSERT INTO family_packages (name, description, price, duration_days) VALUES
('Gói Tiêu Chuẩn', 'Dọn nhà 4 buổi/tháng', 500000, 30),
('Gói Toàn Diện', 'Dọn nhà + Nấu ăn 8 buổi/tháng', 1200000, 30);
