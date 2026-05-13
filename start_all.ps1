# Script khoi dong tat ca moi truong cho du an Chi Oi!

$projectRoot = "d:\chioi"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "1. KIEM TRA VA KHOI DONG DATABASE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Dang duy tri WSL Ubuntu luon thuc (Keep-alive)..." -ForegroundColor Yellow
Start-Process "wsl.exe" -ArgumentList "-d Ubuntu", "-e", "tail", "-f", "/dev/null" -WindowStyle Hidden

Write-Host "Dang bat PostgreSQL trong WSL (Ubuntu)..." -ForegroundColor Yellow
wsl -d Ubuntu -e sudo service postgresql start
if ($LASTEXITCODE -eq 0) {
    Write-Host "Khoi dong PostgreSQL thanh cong!" -ForegroundColor Green
} else {
    Write-Host "Co loi xay ra khi bat PostgreSQL trong WSL." -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "2. KHOI DONG CAC MOI TRUONG WEB VA APP" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Write-Host "Dang khoi dong Backend (NestJS)..." -ForegroundColor Green
Start-Process "powershell.exe" -ArgumentList "-NoExit", "-Command", "cd $projectRoot\chioi-backend; npm run start:dev" -WindowStyle Normal

Write-Host "Dang khoi dong Web Server Goc (chua Admin, Khach Hang, Giup Viec)..." -ForegroundColor Green
Start-Process "powershell.exe" -ArgumentList "-NoExit", "-Command", "cd $projectRoot; npx http-server -p 8080 -c-1" -WindowStyle Normal

Write-Host "Dang khoi dong Mobile/Web Flutter (Customer)..." -ForegroundColor Green
Start-Process "powershell.exe" -ArgumentList "-NoExit", "-Command", "cd $projectRoot\chioi_customer; flutter run -d chrome" -WindowStyle Normal

Write-Host ""
Write-Host "Hoan tat! Cac cua so terminal moi da duoc mo cho tung moi truong." -ForegroundColor Cyan
Write-Host "--- Huong dan truy cap Web ---" -ForegroundColor White
Write-Host "Khach hang: http://127.0.0.1:8080/Khachhang/dangnhap.html" -ForegroundColor Yellow
Write-Host "Giup viec:  http://127.0.0.1:8080/Giupviec/dangnhaptasker.html" -ForegroundColor Yellow
Write-Host "Admin:      http://127.0.0.1:8080/Admin/bangdieukhien.html" -ForegroundColor Yellow
Write-Host "------------------------------" -ForegroundColor White
