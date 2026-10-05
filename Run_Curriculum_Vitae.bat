@echo off
chcp 65001 > nul
title Curriculum Vitae Studio - Dung Automation
cd /d "%~dp0"

:MENU
cls
echo ===============================================================================
echo        CURRICULUM VITAE STUDIO - TRÌNH TẠO CV ĐA NGÀNH NGHỀ CHUYÊN NGHIỆP
echo ===============================================================================
echo   Phiên bản : 1.0.0 (Release 2026)
echo   Tác giả   : Dung Automation
echo   Tính năng : 100 Mẫu CV chuẩn Tuyển Dụng, Mặc định Kỹ Sư Điện, Đánh giá sao/%%,
echo               Xuất PDF Vector A4 sắc nét, Lưu & Nạp hồ sơ định dạng .dungauto
echo ===============================================================================
echo.
echo   [1] Mở ứng dụng ngay trong Trình Duyệt mặc định (0 cài đặt, Nhanh nhất)
echo   [2] Khởi chạy Local Web Server (Cổng 8080 - Khuyên dùng)
echo   [3] Mở trang Trực Tuyến Live Demo (GitHub Pages)
echo   [4] Mở thư mục mã nguồn dự án trên máy tính
echo   [0] Thoát
echo.
echo ===============================================================================
set /p opt="Vui lòng chọn thao tác [1-4, mặc định 1]: "

if "%opt%"=="" set opt=1
if "%opt%"=="1" goto OPEN_BROWSER
if "%opt%"=="2" goto LAUNCH_SERVER
if "%opt%"=="3" goto OPEN_LIVE_DEMO
if "%opt%"=="4" goto OPEN_FOLDER
if "%opt%"=="0" goto EXIT_APP

echo.
echo [!] Lựa chọn không hợp lệ, vui lòng thử lại!
timeout /t 2 > nul
goto MENU

:OPEN_BROWSER
echo.
echo [*] Đang khởi chạy Curriculum Vitae Studio trong trình duyệt...
start "" "%~dp0index.html"
echo [OK] Đã mở thành công!
timeout /t 3 > nul
goto MENU

:LAUNCH_SERVER
echo.
echo [*] Đang kiểm tra môi trường chạy máy chủ cục bộ...

:: 1. Kiểm tra Python
where python >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [+] Phát hiện Python trên hệ thống. Khởi động Web Server tại http://localhost:8080 ...
    start "" http://localhost:8080
    python -m http.server 8080
    goto MENU
)

:: 2. Kiểm tra Astral UV
where uv >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [+] Phát hiện Astral UV. Khởi động Web Server tại http://localhost:8080 ...
    start "" http://localhost:8080
    uv run python -m http.server 8080
    goto MENU
)

:: 3. Kiểm tra Node.js
where npx >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [+] Phát hiện Node.js. Khởi động Web Server bằng npx serve...
    start "" http://localhost:8080
    npx -y serve -l 8080 .
    goto MENU
)

:: 4. Fallback sang mở trực tiếp index.html
echo [!] Không tìm thấy Python hoặc Node.js trên máy.
echo [*] Tự động chuyển hướng mở trực tiếp tệp index.html...
start "" "%~dp0index.html"
timeout /t 3 > nul
goto MENU

:OPEN_LIVE_DEMO
echo.
echo [*] Đang mở liên kết trực tuyến GitHub Pages...
start "" "https://dungautomation-dev.github.io/curriculum-vitae/"
timeout /t 2 > nul
goto MENU

:OPEN_FOLDER
echo.
echo [*] Đang mở thư mục dự án trong Windows Explorer...
explorer "%~dp0"
goto MENU

:EXIT_APP
echo.
echo Cảm ơn bạn đã sử dụng Curriculum Vitae Studio của Dung Automation!
timeout /t 2 > nul
exit /b 0
