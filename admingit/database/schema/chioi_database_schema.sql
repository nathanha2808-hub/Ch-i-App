-- ==============================================================================
-- DATABASE SCHEMA FOR "CHỊ ƠI!" SYSTEM (MySQL)
-- Supports 3 Flows: Customer (Cư dân), Tasker (Người giúp việc), Admin
-- ==============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- -----------------------------------------------------
-- 1. USERS (Bảng người dùng chung cho cả 3 role)
-- -----------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` INT AUTO_INCREMENT PRIMARY KEY,
  `phone` VARCHAR(20) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(100) NOT NULL,
  `avatar_url` VARCHAR(255),
  `role` ENUM('CUSTOMER', 'TASKER', 'ADMIN') NOT NULL,
  `status` ENUM('ACTIVE', 'INACTIVE', 'BANNED', 'PENDING_KYC') DEFAULT 'ACTIVE',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- 2. CUSTOMERS (Thông tin riêng của Cư dân/Khách hàng)
-- -----------------------------------------------------
DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
  `customer_id` INT PRIMARY KEY,
  `default_address` TEXT,
  `loyalty_points` INT DEFAULT 0,
  FOREIGN KEY (`customer_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- 3. TASKERS (Thông tin riêng của Người giúp việc)
-- -----------------------------------------------------
DROP TABLE IF EXISTS `taskers`;
CREATE TABLE `taskers` (
  `tasker_id` INT PRIMARY KEY,
  `bio` TEXT,
  `kyc_status` ENUM('UNVERIFIED', 'PENDING', 'VERIFIED', 'REJECTED') DEFAULT 'UNVERIFIED',
  `average_rating` DECIMAL(3,2) DEFAULT 0.00,
  `total_jobs` INT DEFAULT 0,
  `is_online` BOOLEAN DEFAULT FALSE,
  `last_heartbeat` TIMESTAMP,
  `current_lat` DECIMAL(10,8),
  `current_long` DECIMAL(11,8),
  FOREIGN KEY (`tasker_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- 4. ADMINS (Thông tin riêng của Quản trị viên)
-- -----------------------------------------------------
DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins` (
  `admin_id` INT PRIMARY KEY,
  `department` VARCHAR(100),
  `access_level` ENUM('SUPER_ADMIN', 'MANAGER', 'SUPPORT') DEFAULT 'SUPPORT',
  FOREIGN KEY (`admin_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- 5. SERVICES (Danh mục Dịch vụ)
-- -----------------------------------------------------
DROP TABLE IF EXISTS `services`;
CREATE TABLE `services` (
  `service_id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT,
  `base_price` DECIMAL(12,2) NOT NULL,
  `icon_url` VARCHAR(255),
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- 6. TASKER_SERVICES (Dịch vụ Tasker đăng ký nhận)
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tasker_services`;
CREATE TABLE `tasker_services` (
  `tasker_id` INT,
  `service_id` INT,
  `status` ENUM('PENDING_APPROVAL', 'APPROVED', 'SUSPENDED') DEFAULT 'PENDING_APPROVAL',
  PRIMARY KEY (`tasker_id`, `service_id`),
  FOREIGN KEY (`tasker_id`) REFERENCES `taskers`(`tasker_id`) ON DELETE CASCADE,
  FOREIGN KEY (`service_id`) REFERENCES `services`(`service_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- 7. ORDERS (Đơn hàng)
-- -----------------------------------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `order_id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_code` VARCHAR(50) UNIQUE NOT NULL,
  `customer_id` INT NOT NULL,
  `tasker_id` INT,
  `service_id` INT NOT NULL,
  `status` ENUM('PENDING', 'SEARCHING', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED') DEFAULT 'PENDING',
  `scheduled_time` DATETIME NOT NULL,
  `address` TEXT NOT NULL,
  `total_price` DECIMAL(12,2) NOT NULL,
  `tasker_earnings` DECIMAL(12,2) NOT NULL,
  `platform_fee` DECIMAL(12,2) NOT NULL,
  `notes` TEXT,
  `cancel_reason` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`customer_id`) REFERENCES `customers`(`customer_id`),
  FOREIGN KEY (`tasker_id`) REFERENCES `taskers`(`tasker_id`),
  FOREIGN KEY (`service_id`) REFERENCES `services`(`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- 8. ORDER_INTERVENTIONS (Lịch sử Admin can thiệp đơn)
-- -----------------------------------------------------
DROP TABLE IF EXISTS `order_interventions`;
CREATE TABLE `order_interventions` (
  `intervention_id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT NOT NULL,
  `admin_id` INT NOT NULL,
  `action_type` ENUM('MANUAL_ASSIGN', 'PRICE_ADJUST', 'CANCEL', 'OTHER') NOT NULL,
  `reason` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE CASCADE,
  FOREIGN KEY (`admin_id`) REFERENCES `admins`(`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- 9. WALLETS (Ví điện tử)
-- -----------------------------------------------------
DROP TABLE IF EXISTS `wallets`;
CREATE TABLE `wallets` (
  `wallet_id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL UNIQUE,
  `balance` DECIMAL(15,2) DEFAULT 0.00,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- 10. TRANSACTIONS (Lịch sử giao dịch ví)
-- -----------------------------------------------------
DROP TABLE IF EXISTS `transactions`;
CREATE TABLE `transactions` (
  `transaction_id` INT AUTO_INCREMENT PRIMARY KEY,
  `transaction_code` VARCHAR(50) UNIQUE NOT NULL,
  `wallet_id` INT NOT NULL,
  `amount` DECIMAL(12,2) NOT NULL,
  `type` ENUM('TOP_UP', 'WITHDRAW', 'PAYMENT', 'EARNING', 'REFUND', 'BONUS') NOT NULL,
  `status` ENUM('PENDING', 'COMPLETED', 'FAILED') DEFAULT 'PENDING',
  `order_id` INT,
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`wallet_id`) REFERENCES `wallets`(`wallet_id`),
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- 11. REVIEWS (Đánh giá Tasker)
-- -----------------------------------------------------
DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews` (
  `review_id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT NOT NULL UNIQUE,
  `customer_id` INT NOT NULL,
  `tasker_id` INT NOT NULL,
  `rating` INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  `comment` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE CASCADE,
  FOREIGN KEY (`customer_id`) REFERENCES `customers`(`customer_id`),
  FOREIGN KEY (`tasker_id`) REFERENCES `taskers`(`tasker_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- 12. MESSAGES (Tin nhắn Chat)
-- -----------------------------------------------------
DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `message_id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT NOT NULL,
  `sender_id` INT NOT NULL,
  `receiver_id` INT NOT NULL,
  `content` TEXT NOT NULL,
  `is_read` BOOLEAN DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE CASCADE,
  FOREIGN KEY (`sender_id`) REFERENCES `users`(`user_id`),
  FOREIGN KEY (`receiver_id`) REFERENCES `users`(`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- 13. SUPPORT_TICKETS (Khiếu nại / Hỗ trợ)
-- -----------------------------------------------------
DROP TABLE IF EXISTS `support_tickets`;
CREATE TABLE `support_tickets` (
  `ticket_id` INT AUTO_INCREMENT PRIMARY KEY,
  `ticket_code` VARCHAR(50) UNIQUE NOT NULL,
  `user_id` INT NOT NULL,
  `admin_id` INT,
  `order_id` INT,
  `subject` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `status` ENUM('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED') DEFAULT 'OPEN',
  `priority` ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT') DEFAULT 'MEDIUM',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`),
  FOREIGN KEY (`admin_id`) REFERENCES `admins`(`admin_id`),
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- 14. NOTIFICATIONS (Thông báo)
-- -----------------------------------------------------
DROP TABLE IF EXISTS `notifications`;
CREATE TABLE `notifications` (
  `notification_id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  `is_read` BOOLEAN DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- 15. FAMILY_PACKAGES (Danh mục Gói gia đình)
-- -----------------------------------------------------
DROP TABLE IF EXISTS `family_packages`;
CREATE TABLE `family_packages` (
  `package_id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT,
  `price` DECIMAL(12,2) NOT NULL,
  `duration_days` INT DEFAULT 30,
  `is_active` BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- 16. CUSTOMER_PACKAGES (Gói KH đã mua)
-- -----------------------------------------------------
DROP TABLE IF EXISTS `customer_packages`;
CREATE TABLE `customer_packages` (
  `customer_package_id` INT AUTO_INCREMENT PRIMARY KEY,
  `customer_id` INT NOT NULL,
  `package_id` INT NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `status` ENUM('ACTIVE', 'EXPIRED', 'CANCELLED') DEFAULT 'ACTIVE',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`customer_id`) REFERENCES `customers`(`customer_id`),
  FOREIGN KEY (`package_id`) REFERENCES `family_packages`(`package_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
