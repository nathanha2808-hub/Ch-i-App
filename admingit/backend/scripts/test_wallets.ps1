$ErrorActionPreference = 'Stop'

Write-Host "=== 1. Register Tasker ==="
$tasker = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/register" -Method Post -Body (@{
    phone = "0877777777"
    password = "password123"
    full_name = "Tasker Wallet Test"
    role = "TASKER"
} | ConvertTo-Json) -ContentType "application/json"
$taskerToken = $tasker.access_token

Write-Host "=== 2. Check Tasker Wallet Initial Balance ==="
$balance1 = Invoke-RestMethod -Uri "http://localhost:3000/api/wallets/balance" -Method Get -Headers @{
    Authorization = "Bearer $taskerToken"
}
$balance1 | ConvertTo-Json

Write-Host "=== 3. Tasker Deposits Money ==="
$deposit = Invoke-RestMethod -Uri "http://localhost:3000/api/wallets/deposit" -Method Post -Headers @{
    Authorization = "Bearer $taskerToken"
} -Body (@{
    amount = 500000
} | ConvertTo-Json) -ContentType "application/json"
Write-Host "New Balance: $($deposit.wallet.balance)"

Write-Host "=== 4. Check Tasker Transactions ==="
$txns = Invoke-RestMethod -Uri "http://localhost:3000/api/wallets/transactions" -Method Get -Headers @{
    Authorization = "Bearer $taskerToken"
}
$txns[0] | ConvertTo-Json
