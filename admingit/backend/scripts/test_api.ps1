Write-Host "=== 1. Register Customer ==="
$cust = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/register" -Method Post -ContentType "application/json" -Body '{"phone": "0911111111", "password": "pass", "full_name": "Test Khach", "role": "CUSTOMER"}' -ErrorAction SilentlyContinue
$cust | ConvertTo-Json -Depth 10

Write-Host "`n=== 2. Register Tasker ==="
$tasker = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/register" -Method Post -ContentType "application/json" -Body '{"phone": "0922222222", "password": "pass", "full_name": "Test Tasker", "role": "TASKER"}' -ErrorAction SilentlyContinue
$tasker | ConvertTo-Json -Depth 10

Write-Host "`n=== 3. Login Customer ==="
$login = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" -Method Post -ContentType "application/json" -Body '{"phone": "0911111111", "password": "pass"}' -ErrorAction SilentlyContinue
$login | ConvertTo-Json -Depth 10
$token = $login.access_token

Write-Host "`n=== 4. Book Order ==="
$order = Invoke-RestMethod -Uri "http://localhost:3000/api/orders/book" -Method Post -ContentType "application/json" -Headers @{ "Authorization" = "Bearer $token" } -Body '{"service_id": 1, "scheduled_time": "2026-05-15T10:00:00Z", "address": "123 Test", "total_price": 150000, "longitude": 106.6297, "latitude": 10.8231}' -ErrorAction SilentlyContinue
$order | ConvertTo-Json -Depth 10
