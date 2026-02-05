#!/bin/bash
# .env.local faylini o'qib, DATABASE_URL ni olish
# naccc_PRISMA_DATABASE_URL ni qidiramiz
URL=$(grep "naccc_PRISMA_DATABASE_URL" .env.local | sed 's/naccc_PRISMA_DATABASE_URL=//' | tr -d '"')

if [ -z "$URL" ]; then
    echo "Xatolik: Baza manzili topilmadi. .env.local fayli mavjudligini tekshiring."
    exit 1
fi

echo "Baza manzili topildi. Admin yaratilmoqda..."

# URL ni o'rnatib, seed ni ishga tushiramiz
export DATABASE_URL="$URL"
npx prisma db seed
