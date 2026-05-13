## Script duyệt dịch vụ Tasker (chạy trong PowerShell)
## Admin: 0901111111 / 123456

# Bước 1: Login Admin lấy token
$login = Invoke-RestMethod -Uri "http://127.0.0.1:3000/api/auth/login" -Method POST -ContentType "application/json" -Body '{"phone":"0901111111","password":"123456"}'
$token = $login.access_token
Write-Host "Admin Token: $token"

# Bước 2: Lấy danh sách dịch vụ cần duyệt
$headers = @{ "Authorization" = "Bearer $token" }
$pending = Invoke-RestMethod -Uri "http://127.0.0.1:3000/api/admin/tasker-services" -Method GET -Headers $headers
Write-Host "=== Dịch vụ chờ duyệt ==="
$pending | ForEach-Object {
    Write-Host "Tasker $($_.tasker_id) - Service $($_.service_id) ($($_.services.name)) - Status: $($_.status)"
}

# Bước 3: Duyệt tất cả
$pending | ForEach-Object {
    $taskerId = $_.tasker_id
    $serviceId = $_.service_id
    $url = "http://127.0.0.1:3000/api/admin/tasker-services/$taskerId/$serviceId/approve"
    try {
        $result = Invoke-RestMethod -Uri $url -Method PATCH -ContentType "application/json" -Headers $headers -Body '{"status":"APPROVED"}'
        Write-Host "✅ Duyệt: Tasker $taskerId - Service $serviceId ($($_.services.name))"
    } catch {
        Write-Host "❌ Lỗi: Tasker $taskerId - Service $serviceId : $_"
    }
}

Write-Host "`n=== HOÀN THÀNH ==="
