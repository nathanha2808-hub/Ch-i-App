#!/bin/bash
echo '=== 1. Register Customer ==='
curl -s -X POST http://localhost:3000/api/auth/register -H 'Content-Type: application/json' -d '{"phone": "0911111111", "password": "pass", "full_name": "Test Khach", "role": "CUSTOMER"}'

echo -e '\n\n=== 2. Register Tasker ==='
curl -s -X POST http://localhost:3000/api/auth/register -H 'Content-Type: application/json' -d '{"phone": "0922222222", "password": "pass", "full_name": "Test Tasker", "role": "TASKER"}'

echo -e '\n\n=== 3. Login Customer ==='
RES=$(curl -s -X POST http://localhost:3000/api/auth/login -H 'Content-Type: application/json' -d '{"phone": "0911111111", "password": "pass"}')
echo $RES
TOKEN=$(echo $RES | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

echo -e '\n\n=== 4. Book Order ==='
curl -s -X POST http://localhost:3000/api/orders/book -H 'Content-Type: application/json' -H "Authorization: Bearer $TOKEN" -d '{"service_id": 1, "scheduled_time": "2026-05-15T10:00:00Z", "address": "123 Test", "total_price": 150000, "longitude": 106.6297, "latitude": 10.8231}'
