#!/bin/bash
sudo -u postgres psql -c "ALTER USER chioi_user CREATEDB;"
cd /opt/chioi/backend
npx prisma db push --schema=prisma/schema.prisma --accept-data-loss
