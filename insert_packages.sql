INSERT INTO family_packages (package_id, name, description, price, duration_days, is_active) 
VALUES 
  (1, 'Gói Cơ bản', 'Dọn dẹp 4 lần/tháng', 500000, 30, true), 
  (2, 'Gói Tiêu chuẩn', 'Dọn dẹp 8 lần + 1 lần trông trẻ', 1000000, 30, true), 
  (3, 'Gói Cao cấp', 'Dọn dẹp 12 lần + 2 lần trông trẻ + 2 lần mua hộ', 1500000, 30, true) 
ON CONFLICT (package_id) DO UPDATE SET 
  name = EXCLUDED.name, 
  description = EXCLUDED.description, 
  price = EXCLUDED.price;
