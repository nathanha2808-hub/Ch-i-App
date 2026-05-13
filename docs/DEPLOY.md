# DEPLOY.md — Hướng dẫn Deploy Chị Ơi!

> Phiên bản: 1.0 · Cập nhật: 2026-05-12

---

## 1. Yêu cầu hệ thống

| Component | Yêu cầu |
|-----------|---------|
| **OS** | Windows 10+ / Ubuntu 22.04+ |
| **Node.js** | v18+ (khuyến nghị v20 LTS) |
| **PostgreSQL** | 16+ với PostGIS extension |
| **NPM** | v9+ |
| **RAM** | ≥ 2GB (dev), ≥ 4GB (production) |
| **Disk** | ≥ 5GB |

---

## 2. Cài đặt Local (Development)

### 2.1 Clone & Cài đặt Dependencies

```powershell
# Clone repo
git clone <repo-url> d:\chioi
cd d:\chioi

# Cài đặt backend dependencies
cd chioi-backend
npm install
```

### 2.2 Cấu hình Database

```powershell
# Đảm bảo PostgreSQL đang chạy + PostGIS extension
# Tạo database 'chioi' nếu chưa có

psql -U postgres -c "CREATE DATABASE chioi;"
psql -U postgres -d chioi -c "CREATE EXTENSION IF NOT EXISTS postgis;"
```

### 2.3 Cấu hình Environment

```powershell
# File: chioi-backend/.env
DATABASE_URL="postgresql://postgres:<password>@[::1]:5432/chioi?schema=public"
JWT_SECRET="your-secret-key-here"
PORT=3000
```

### 2.4 Khởi tạo Database Schema

```powershell
cd chioi-backend

# Pull schema từ Prisma
npx prisma db push

# Hoặc chạy migration
npx prisma migrate dev --name init

# Seed dữ liệu mẫu
npx prisma db seed

# Verify với Prisma Studio
npx prisma studio
```

### 2.5 Khởi động toàn bộ hệ thống

```powershell
# Cách 1: Dùng script tự động (khuyến nghị)
cd d:\chioi
.\start_all.ps1

# Cách 2: Khởi động thủ công từng component
# Terminal 1 — Backend
cd chioi-backend && npm run start:dev

# Terminal 2 — Frontend Khách hàng (port 8080)
npx -y http-server d:\chioi\Khachhang -p 8080 --cors -c-1

# Terminal 3 — Frontend Admin (port 8081)
npx -y http-server d:\chioi\Admin -p 8081 --cors -c-1

# Terminal 4 — Frontend Tasker (port 8082)
npx -y http-server d:\chioi\Giupviec -p 8082 --cors -c-1
```

### 2.6 Truy cập

| Component | URL |
|-----------|-----|
| Backend API | http://127.0.0.1:3000 |
| Swagger Docs | http://127.0.0.1:3000/api/docs |
| Khách hàng | http://127.0.0.1:8080 |
| Admin CMS | http://127.0.0.1:8081 |
| Tasker | http://127.0.0.1:8082 |
| Prisma Studio | http://localhost:5555 |

### 2.7 Tài khoản Test

| Role | Phone | Password |
|------|-------|----------|
| Customer | `0901234567` | `password123` |
| Tasker | `0912345678` | `password123` |
| Admin | `0900000001` | `admin123` |

---

## 3. Build Production

### 3.1 Build Backend

```bash
cd chioi-backend

# Build TypeScript → JavaScript
npm run build

# Start production
npm run start:prod
# Hoặc dùng PM2:
pm2 start dist/main.js --name chioi-backend
```

### 3.2 Cấu hình Nginx (Reverse Proxy)

```nginx
# /etc/nginx/sites-available/chioi.conf

# Backend API
server {
    listen 80;
    server_name api.chioi.vn;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}

# Customer Frontend
server {
    listen 80;
    server_name chioi.vn www.chioi.vn;

    root /var/www/chioi/Khachhang;
    index trangchu.html;

    location / {
        try_files $uri $uri/ /trangchu.html;
    }
}

# Admin CMS
server {
    listen 80;
    server_name admin.chioi.vn;

    root /var/www/chioi/Admin;
    index bangdieukhien.html;

    location / {
        try_files $uri $uri/ /bangdieukhien.html;
    }
}
```

### 3.3 SSL Certificate

```bash
# Certbot cho HTTPS
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d chioi.vn -d www.chioi.vn -d api.chioi.vn -d admin.chioi.vn
```

---

## 4. Cấu hình VPS Production

### 4.1 Yêu cầu VPS

| Spec | Tối thiểu | Khuyến nghị |
|------|-----------|-------------|
| CPU | 2 vCPU | 4 vCPU |
| RAM | 4 GB | 8 GB |
| SSD | 40 GB | 80 GB |
| OS | Ubuntu 22.04 | Ubuntu 24.04 |
| Provider | DigitalOcean / Vultr / AWS Lightsail | |

### 4.2 Cài đặt VPS

```bash
# Cài Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Cài PostgreSQL 16
sudo apt install -y postgresql postgresql-contrib postgis

# Cài PM2
sudo npm install -g pm2

# Cài Nginx
sudo apt install -y nginx

# Firewall
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable
```

### 4.3 Deploy Script

```bash
#!/bin/bash
# deploy.sh — Chạy trên VPS

set -e

echo "📦 Pulling latest code..."
cd /var/www/chioi
git pull origin main

echo "📦 Installing backend dependencies..."
cd chioi-backend
npm ci --production

echo "🔨 Building backend..."
npm run build

echo "🔄 Restarting services..."
pm2 restart chioi-backend

echo "✅ Deploy completed!"
pm2 status
```

---

## 5. Monitoring & Logging

### 5.1 PM2 Monitoring

```bash
# Xem logs
pm2 logs chioi-backend

# Xem metrics
pm2 monit

# Auto-restart on crash
pm2 startup
pm2 save
```

### 5.2 Database Backup

```bash
# Backup hàng ngày (cron job)
# Thêm vào crontab: crontab -e
0 2 * * * pg_dump -U postgres chioi | gzip > /backup/chioi_$(date +\%Y\%m\%d).sql.gz

# Restore
gunzip < /backup/chioi_20260512.sql.gz | psql -U postgres chioi
```

---

## 6. Troubleshooting

| Vấn đề | Giải pháp |
|--------|-----------|
| Port 3000 đã dùng | `netstat -ano \| findstr :3000` → kill process |
| Prisma lỗi kết nối DB | Kiểm tra `DATABASE_URL` trong `.env`, PostgreSQL đang chạy |
| Frontend không gọi được API | Kiểm tra `API_BASE` trong `shared/api.js` = đúng host:port |
| WebSocket không kết nối | Kiểm tra CORS, Nginx proxy WebSocket headers |
| Token hết hạn liên tục | Kiểm tra `JWT_SECRET` giống nhau giữa các restart |
