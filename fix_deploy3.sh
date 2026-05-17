#!/bin/bash
cat <<EOT > /opt/chioi/backend/.env
DATABASE_URL="postgresql://chioi_user:chioi123456@localhost:5432/chioi_db?schema=public"
JWT_SECRET="super-secret-key-123"
VAPID_PUBLIC_KEY="BBOD8FqSbFjxAx-lthqPGfvJXrX3ihmmSDQqZZqQPJNjs0g5DqrwPGPoUWfEiY2kNj4R4AwO6u56ZmEHhFKWCjY"
VAPID_PRIVATE_KEY="9O0KcJQ--g0k-BSZsy3Aq5QCugcoryuR9MfobZei3lM"
VAPID_SUBJECT="mailto:admin@chioi.vn"
EOT
cd /opt/chioi/backend
npx prisma generate --schema=prisma/schema.prisma
npx prisma db push --schema=prisma/schema.prisma --accept-data-loss
npm run build
pm2 restart chioi-backend --update-env
