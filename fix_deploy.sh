#!/bin/bash
sudo -u postgres psql -c "ALTER USER chioi_user WITH PASSWORD 'chioi123456';"
cat <<EOT > /opt/chioi/backend/.env
DATABASE_URL="postgresql://chioi_user:chioi123456@localhost:5432/chioi?schema=public"
JWT_SECRET="super-secret-key-123"
EOT
cd /opt/chioi/backend
npx prisma db push --schema=prisma/schema.prisma --accept-data-loss
npm run build
pm2 restart chioi-backend --update-env
