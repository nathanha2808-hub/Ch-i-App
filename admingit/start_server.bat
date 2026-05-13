@echo off
chcp 65001 >nul
title CHI OI! - Server LAN
color 0A

echo.
echo ╔══════════════════════════════════════════╗
echo ║     CHI OI! - KHOI DONG SERVER LAN      ║
echo ╚══════════════════════════════════════════╝
echo.

:: ─────────────────────────────────────────────
:: LAY IP LOCAL TU DONG
:: ─────────────────────────────────────────────
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4" ^| findstr /v "127.0.0.1"') do (
    for /f "tokens=1" %%b in ("%%a") do set LOCAL_IP=%%b
)

if "%LOCAL_IP%"=="" set LOCAL_IP=localhost

echo   [*] IP may chu:   %LOCAL_IP%
echo   [*] Backend port: 3000
echo   [*] Frontend port: 8080
echo.

:: ─────────────────────────────────────────────
:: 1. KIEM TRA POSTGRESQL
:: ─────────────────────────────────────────────
echo [1/3] Kiem tra PostgreSQL...
sc query postgresql* >nul 2>&1
if errorlevel 1 (
    echo   [!] Khong tim thay PostgreSQL service - kiem tra thu cong!
) else (
    net start postgresql-x64-17 >nul 2>&1
    net start postgresql-x64-16 >nul 2>&1
    net start postgresql-x64-15 >nul 2>&1
    echo   [OK] PostgreSQL dang chay!
)

:: ─────────────────────────────────────────────
:: 2. BACKEND NESTJS (port 3000, bind 0.0.0.0)
:: ─────────────────────────────────────────────
echo.
echo [2/3] Khoi dong Backend NestJS (port 3000)...
start "CHI OI - Backend:3000" cmd /k "cd /d d:\Download\Chi_Oi\backend && set HOST=0.0.0.0 && npm run start:dev"

:: Cho NestJS build (8 giay)
echo   [*] Cho NestJS khoi dong...
timeout /t 8 /nobreak >nul

:: ─────────────────────────────────────────────
:: 3. FRONTEND HTTP-SERVER (port 8080, bind 0.0.0.0)
:: ─────────────────────────────────────────────
echo.
echo [3/3] Khoi dong Frontend (port 8080)...
start "CHI OI - Frontend:8080" cmd /k "cd /d d:\Download\Chi_Oi\frontend && npx http-server -p 8080 -a 0.0.0.0 -c-1 --cors"

timeout /t 3 /nobreak >nul

:: ─────────────────────────────────────────────
:: THONG TIN TRUY CAP
:: ─────────────────────────────────────────────
echo.
echo ╔══════════════════════════════════════════════════════════════════╗
echo ║                    TRUY CAP TREN MAY NAY                        ║
echo ╠══════════════════════════════════════════════════════════════════╣
echo ║  Khach hang  :  http://localhost:8080/Khachhang/dangnhap.html   ║
echo ║  Giup viec   :  http://localhost:8080/giupviec/dangnhaptasker.html ║
echo ║  Admin       :  http://localhost:8080/admin/bangdieukhien.html   ║
echo ║  API Docs    :  http://localhost:3000/api/docs                   ║
echo ╠══════════════════════════════════════════════════════════════════╣
echo ║           TRUY CAP TU THIET BI KHAC (CHUNG MANG WIFI)           ║
echo ╠══════════════════════════════════════════════════════════════════╣
echo ║  Khach hang  :  http://%LOCAL_IP%:8080/Khachhang/dangnhap.html
echo ║  Giup viec   :  http://%LOCAL_IP%:8080/giupviec/dangnhaptasker.html
echo ║  Admin       :  http://%LOCAL_IP%:8080/admin/bangdieukhien.html
echo ║  API          :  http://%LOCAL_IP%:3000/api
echo ╠══════════════════════════════════════════════════════════════════╣
echo ║              TAI KHOAN DEMO (mat khau: 123456)                   ║
echo ╠══════════════════════════════════════════════════════════════════╣
echo ║  [KHACH HANG] SDT: 0901234567                                    ║
echo ║  [TASKER    ] SDT: 0909876543                                    ║
echo ║  [ADMIN     ] SDT: 0901111111                                    ║
echo ╚══════════════════════════════════════════════════════════════════╝
echo.

:: Mo cua so Firewall cho port 3000 va 8080 (can quyen Admin)
echo [*] Them quy tac Firewall (can quyen Admin)...
netsh advfirewall firewall add rule name="ChiOi-Backend-3000" dir=in action=allow protocol=TCP localport=3000 >nul 2>&1
netsh advfirewall firewall add rule name="ChiOi-Frontend-8080" dir=in action=allow protocol=TCP localport=8080 >nul 2>&1
echo   [OK] Firewall da mo port 3000 va 8080!

echo.
echo   Nhan phim bat ky de dong cua so nay (server van chay)...
pause >nul
