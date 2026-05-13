DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
CREATE EXTENSION IF NOT EXISTS postgis;

-- 1. USERS
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  phone VARCHAR(20) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  avatar_url VARCHAR(255),
  role VARCHAR(20) CHECK (role IN ('CUSTOMER', 'TASKER', 'ADMIN')) NOT NULL,
  status VARCHAR(20) CHECK (status IN ('ACTIVE', 'INACTIVE', 'BANNED', 'PENDING_KYC')) DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. CUSTOMERS
CREATE TABLE customers (
  customer_id INT PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
  default_address TEXT,
  loyalty_points INT DEFAULT 0
);

-- 3. TASKERS
CREATE TABLE taskers (
  tasker_id INT PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
  bio TEXT,
  kyc_status VARCHAR(20) CHECK (kyc_status IN ('UNVERIFIED', 'PENDING', 'VERIFIED', 'REJECTED')) DEFAULT 'UNVERIFIED',
  average_rating DECIMAL(3,2) DEFAULT 0.00,
  total_jobs INT DEFAULT 0,
  is_online BOOLEAN DEFAULT FALSE,
  last_heartbeat TIMESTAMP,
  current_location GEOMETRY(Point, 4326) -- PostGIS (lat, long)
);

-- 4. ADMINS
CREATE TABLE admins (
  admin_id INT PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
  department VARCHAR(100),
  access_level VARCHAR(20) CHECK (access_level IN ('SUPER_ADMIN', 'MANAGER', 'SUPPORT')) DEFAULT 'SUPPORT'
);

-- 5. SERVICES
CREATE TABLE services (
  service_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  base_price DECIMAL(12,2) NOT NULL,
  icon_url VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. TASKER_SERVICES
CREATE TABLE tasker_services (
  tasker_id INT REFERENCES taskers(tasker_id) ON DELETE CASCADE,
  service_id INT REFERENCES services(service_id) ON DELETE CASCADE,
  status VARCHAR(20) CHECK (status IN ('PENDING_APPROVAL', 'APPROVED', 'SUSPENDED')) DEFAULT 'PENDING_APPROVAL',
  PRIMARY KEY (tasker_id, service_id)
);

-- NEW: VOUCHERS
CREATE TABLE vouchers (
  voucher_id SERIAL PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  discount_amount DECIMAL(12,2) NOT NULL,
  conditions TEXT,
  valid_from TIMESTAMP,
  valid_until TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. ORDERS
CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY,
  order_code VARCHAR(50) UNIQUE NOT NULL,
  customer_id INT NOT NULL REFERENCES customers(customer_id),
  tasker_id INT REFERENCES taskers(tasker_id),
  service_id INT NOT NULL REFERENCES services(service_id),
  voucher_id INT REFERENCES vouchers(voucher_id),
  status VARCHAR(20) CHECK (status IN ('PENDING', 'SEARCHING', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')) DEFAULT 'PENDING',
  scheduled_time TIMESTAMP NOT NULL,
  address TEXT NOT NULL,
  location GEOMETRY(Point, 4326), -- PostGIS coords
  total_price DECIMAL(12,2) NOT NULL,
  discount_amount DECIMAL(12,2) DEFAULT 0,
  tasker_earnings DECIMAL(12,2) NOT NULL,
  platform_fee DECIMAL(12,2) NOT NULL,
  payment_method VARCHAR(20) CHECK (payment_method IN ('CASH', 'WALLET', 'VNPAY')) DEFAULT 'CASH',
  payment_status VARCHAR(20) CHECK (payment_status IN ('UNPAID', 'PAID', 'REFUNDED')) DEFAULT 'UNPAID',
  notes TEXT,
  cancel_reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- NEW: ORDER_STATUS_HISTORY
CREATE TABLE order_status_history (
  history_id SERIAL PRIMARY KEY,
  order_id INT NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL,
  location_at_time GEOMETRY(Point, 4326),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. ORDER_INTERVENTIONS
CREATE TABLE order_interventions (
  intervention_id SERIAL PRIMARY KEY,
  order_id INT NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
  admin_id INT NOT NULL REFERENCES admins(admin_id),
  action_type VARCHAR(20) CHECK (action_type IN ('MANUAL_ASSIGN', 'PRICE_ADJUST', 'CANCEL', 'OTHER')) NOT NULL,
  reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. WALLETS
CREATE TABLE wallets (
  wallet_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
  balance DECIMAL(15,2) DEFAULT 0.00,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. TRANSACTIONS
CREATE TABLE transactions (
  transaction_id SERIAL PRIMARY KEY,
  transaction_code VARCHAR(50) UNIQUE NOT NULL,
  wallet_id INT NOT NULL REFERENCES wallets(wallet_id),
  amount DECIMAL(12,2) NOT NULL,
  type VARCHAR(20) CHECK (type IN ('TOP_UP', 'WITHDRAW', 'PAYMENT', 'EARNING', 'REFUND', 'BONUS')) NOT NULL,
  status VARCHAR(20) CHECK (status IN ('PENDING', 'COMPLETED', 'FAILED')) DEFAULT 'PENDING',
  order_id INT REFERENCES orders(order_id),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 11. REVIEWS
CREATE TABLE reviews (
  review_id SERIAL PRIMARY KEY,
  order_id INT NOT NULL UNIQUE REFERENCES orders(order_id) ON DELETE CASCADE,
  customer_id INT NOT NULL REFERENCES customers(customer_id),
  tasker_id INT NOT NULL REFERENCES taskers(tasker_id),
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 12. MESSAGES
CREATE TABLE messages (
  message_id SERIAL PRIMARY KEY,
  order_id INT NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
  sender_id INT NOT NULL REFERENCES users(user_id),
  receiver_id INT NOT NULL REFERENCES users(user_id),
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 13. SUPPORT_TICKETS
CREATE TABLE support_tickets (
  ticket_id SERIAL PRIMARY KEY,
  ticket_code VARCHAR(50) UNIQUE NOT NULL,
  user_id INT NOT NULL REFERENCES users(user_id),
  admin_id INT REFERENCES admins(admin_id),
  order_id INT REFERENCES orders(order_id),
  subject VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(20) CHECK (status IN ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED')) DEFAULT 'OPEN',
  priority VARCHAR(20) CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH', 'URGENT')) DEFAULT 'MEDIUM',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 14. NOTIFICATIONS
CREATE TABLE notifications (
  notification_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 15. FAMILY_PACKAGES
CREATE TABLE family_packages (
  package_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(12,2) NOT NULL,
  duration_days INT DEFAULT 30,
  is_active BOOLEAN DEFAULT TRUE
);

-- 16. CUSTOMER_PACKAGES
CREATE TABLE customer_packages (
  customer_package_id SERIAL PRIMARY KEY,
  customer_id INT NOT NULL REFERENCES customers(customer_id),
  package_id INT NOT NULL REFERENCES family_packages(package_id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(20) CHECK (status IN ('ACTIVE', 'EXPIRED', 'CANCELLED')) DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- NEW: ADMIN_AUDIT_LOGS
CREATE TABLE admin_audit_logs (
  log_id SERIAL PRIMARY KEY,
  admin_id INT NOT NULL REFERENCES admins(admin_id),
  action VARCHAR(255) NOT NULL,
  target_table VARCHAR(50),
  target_id INT,
  old_data JSONB,
  new_data JSONB,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger to update 'updated_at' columns
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_modtime BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_orders_modtime BEFORE UPDATE ON orders FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_support_tickets_modtime BEFORE UPDATE ON support_tickets FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
