$ErrorActionPreference = 'Stop'

Write-Host "=== 1. Register Customer ==="
$cust = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/register" -Method Post -Body (@{
    phone = "0910101010"
    password = "password123"
    full_name = "Khach Hang 2"
    role = "CUSTOMER"
} | ConvertTo-Json) -ContentType "application/json"
$custToken = $cust.access_token

Write-Host "=== 2. Register Tasker ==="
$tasker = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/register" -Method Post -Body (@{
    phone = "0980808080"
    password = "password123"
    full_name = "Tasker 2"
    role = "TASKER"
} | ConvertTo-Json) -ContentType "application/json"
$taskerToken = $tasker.access_token

Write-Host "=== 3. Customer Books Order ==="
$orderReq = Invoke-RestMethod -Uri "http://localhost:3000/api/orders/book" -Method Post -Headers @{
    Authorization = "Bearer $custToken"
} -Body (@{
    service_id = 1
    scheduled_time = "2026-05-15T10:00:00Z"
    address = "234 Advanced Test"
    total_price = 200000
    longitude = 106.6
    latitude = 10.8
} | ConvertTo-Json) -ContentType "application/json"
$orderId = $orderReq.order.order_id
Write-Host "Order Created: $orderId"

Write-Host "=== 4. Tasker Accepts Order ==="
$accept = Invoke-RestMethod -Uri "http://localhost:3000/api/orders/$orderId/accept" -Method Patch -Headers @{
    Authorization = "Bearer $taskerToken"
}
Write-Host "Order status: $($accept.status)"

Write-Host "=== 5. Tasker Arrives ==="
$arrive = Invoke-RestMethod -Uri "http://localhost:3000/api/orders/$orderId/status" -Method Patch -Headers @{
    Authorization = "Bearer $taskerToken"
} -Body (@{
    status = "TASKER_ARRIVED"
} | ConvertTo-Json) -ContentType "application/json"
Write-Host "Order status: $($arrive.status)"

Write-Host "=== 6. Tasker Starts Working ==="
$progress = Invoke-RestMethod -Uri "http://localhost:3000/api/orders/$orderId/status" -Method Patch -Headers @{
    Authorization = "Bearer $taskerToken"
} -Body (@{
    status = "IN_PROGRESS"
} | ConvertTo-Json) -ContentType "application/json"
Write-Host "Order status: $($progress.status)"

Write-Host "=== 7. Tasker Completes Order ==="
$complete = Invoke-RestMethod -Uri "http://localhost:3000/api/orders/$orderId/status" -Method Patch -Headers @{
    Authorization = "Bearer $taskerToken"
} -Body (@{
    status = "COMPLETED"
} | ConvertTo-Json) -ContentType "application/json"
Write-Host "Order status: $($complete.status)"

Write-Host "=== 8. Customer Reviews Tasker ==="
$review = Invoke-RestMethod -Uri "http://localhost:3000/api/orders/$orderId/review" -Method Post -Headers @{
    Authorization = "Bearer $custToken"
} -Body (@{
    rating = 5
    comment = "Tasker arrived on time and did a great job!"
} | ConvertTo-Json) -ContentType "application/json"
$review | ConvertTo-Json -Depth 3

Write-Host "=== 9. Customer Gets History ==="
$history = Invoke-RestMethod -Uri "http://localhost:3000/api/orders/customer/history" -Method Get -Headers @{
    Authorization = "Bearer $custToken"
}
$history[0] | ConvertTo-Json -Depth 2

Write-Host "=== 10. Check Tasker Wallet After Order ==="
$balance = Invoke-RestMethod -Uri "http://localhost:3000/api/wallets/balance" -Method Get -Headers @{
    Authorization = "Bearer $taskerToken"
}
$balance | ConvertTo-Json

Write-Host "=== 11. Check Tasker Wallet Transactions ==="
$txns = Invoke-RestMethod -Uri "http://localhost:3000/api/wallets/transactions" -Method Get -Headers @{
    Authorization = "Bearer $taskerToken"
}
$txns | ConvertTo-Json
