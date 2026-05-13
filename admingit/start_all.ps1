# Script khoi dong tat ca moi truong cho du an Chi Oi!
# Project root: d:\Download\Chi_Oi

$projectRoot = "d:\Download\Chi_Oi"
$backendDir  = "$projectRoot\backend"
$frontendDir = "$projectRoot\frontend"

# Lay IP WiFi tu dong
$localIP = (Get-NetIPAddress -AddressFamily IPv4 |
    Where-Object { $_.InterfaceAlias -match 'Wi-Fi' -or $_.InterfaceAlias -match 'WLAN' } |
    Select-Object -First 1).IPAddress

if (-not $localIP) {
    $localIP = (Get-NetIPAddress -AddressFamily IPv4 |
        Where-Object { $_.IPAddress -notmatch '^127\.' -and $_.IPAddress -notmatch '^169\.' } |
        Select-Object -First 1).IPAddress
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CHI OI! - KHOI DONG HE THONG (LAN)"  -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  IP may chu: $localIP" -ForegroundColor White

# -------------------------------------------------------
# 1. DATABASE (PostgreSQL - Windows Service)
# -------------------------------------------------------
Write-Host ""
Write-Host "[1/3] Kiem tra PostgreSQL (Windows Service)..." -ForegroundColor Yellow
$pgService = Get-Service -Name "postgresql*" -ErrorAction SilentlyContinue | Select-Object -First 1
if ($pgService) {
    if ($pgService.Status -ne 'Running') {
        Start-Service $pgService.Name
        Write-Host "     PostgreSQL da khoi dong!" -ForegroundColor Green
    } else {
        Write-Host "     PostgreSQL dang chay (port 5432) OK!" -ForegroundColor Green
    }
} else {
    Write-Host "     [CANH BAO] Khong tim thay PostgreSQL service." -ForegroundColor Red
}

# -------------------------------------------------------
# 2. BACKEND (NestJS - port 3000, bind 0.0.0.0)
# -------------------------------------------------------
Write-Host ""
Write-Host "[2/3] Khoi dong Backend NestJS (port 3000 - LAN)..." -ForegroundColor Yellow

# Set env HOST=0.0.0.0 de NestJS lang nghe tren tat ca interface
Start-Process "powershell.exe" `
    -ArgumentList "-NoExit", "-Command", `
    "cd '$backendDir'; `$env:HOST='0.0.0.0'; npm run start:dev" `
    -WindowStyle Normal

# -------------------------------------------------------
# 3. FRONTEND (http-server - port 8080, bind 0.0.0.0)
# -------------------------------------------------------
Write-Host ""
Write-Host "[3/3] Khoi dong Frontend Web Server (port 8080 - LAN)..." -ForegroundColor Yellow
Start-Process "powershell.exe" `
    -ArgumentList "-NoExit", "-Command", `
    "cd '$frontendDir'; npx http-server -p 8080 -a 0.0.0.0 -c-1 --cors" `
    -WindowStyle Normal

# Doi NestJS khoi dong xong (khoang 8 giay)
Write-Host ""
Write-Host "  Cho cac server khoi dong..." -ForegroundColor Gray
Start-Sleep -Seconds 8

# -------------------------------------------------------
# THONG TIN TRUY CAP
# -------------------------------------------------------
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  HOAN TAT! CAC THIET BI TRONG MANG     " -ForegroundColor Green
Write-Host "  CO THE TRUY CAP QUA IP: $localIP      " -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "--- TREN MAY NAY (localhost) ---" -ForegroundColor White
Write-Host "  Khach hang : http://localhost:8080/khachhang/dangnhap.html" -ForegroundColor Yellow
Write-Host "  Giup viec  : http://localhost:8080/giupviec/dangnhaptasker.html" -ForegroundColor Yellow
Write-Host "  Admin      : http://localhost:8080/admin/bangdieukhien.html" -ForegroundColor Yellow
Write-Host "  Backend API: http://localhost:3000/api" -ForegroundColor Magenta
Write-Host ""
Write-Host "--- TREN THIET BI KHAC (WiFi chung) ---" -ForegroundColor White
Write-Host "  Khach hang : http://${localIP}:8080/khachhang/dangnhap.html" -ForegroundColor Cyan
Write-Host "  Giup viec  : http://${localIP}:8080/giupviec/dangnhaptasker.html" -ForegroundColor Cyan
Write-Host "  Admin      : http://${localIP}:8080/admin/bangdieukhien.html" -ForegroundColor Cyan
Write-Host "  Backend API: http://${localIP}:3000/api" -ForegroundColor Cyan
Write-Host ""
Write-Host "--- TAI KHOAN DEMO (mat khau: 123456) ---" -ForegroundColor White
Write-Host "  [KHACH HANG] SDT: 0901234567  | Ho ten: Khach Hang VIP"   -ForegroundColor Green
Write-Host "  [TASKER    ] SDT: 0909876543  | Ho ten: Chi Lan Don Nha"  -ForegroundColor Green
Write-Host "  [TASKER 2  ] SDT: 0901112222  | Ho ten: Nguyen Lan"       -ForegroundColor Green
Write-Host "  [ADMIN     ] SDT: 0901111111  | Ho ten: Admin Quan Tri"   -ForegroundColor Red
Write-Host ""
Write-Host "  So du vi mau: Khach hang = 5,000,000 VND" -ForegroundColor Cyan
Write-Host "========================================"  -ForegroundColor Cyan
