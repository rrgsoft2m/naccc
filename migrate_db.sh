#!/bin/bash
# .env.local faylidan baza manzilini olish
DB_URL=$(grep "naccc_PRISMA_DATABASE_URL" .env.local | cut -d '=' -f 2- | tr -d '"' | tr -d "'")

if [ -z "$DB_URL" ]; then
  # Agar PRISMA_URL bo'lmasa, oddiy URL ni olamiz
  DB_URL=$(grep "naccc_DATABASE_URL" .env.local | cut -d '=' -f 2- | tr -d '"' | tr -d "'")
fi

if [ -z "$DB_URL" ]; then
  echo "Xatolik: Baza manzili .env.local faylidan topilmadi."
  exit 1
fi

echo "Baza manzili topildi. Migratsiya boshlanmoqda..."
export DATABASE_URL="$DB_URL"
npx prisma db push
