#!/bin/sh

echo "Aguardando o banco de dados..."
./scripts/wait-for-it.sh db:5432 --timeout=30 --strict -- echo "Banco de dados pronto!"

echo "Iniciando Prisma..."
npx prisma generate
npx prisma migrate deploy

echo "Iniciando a aplicação..."
npm run start
