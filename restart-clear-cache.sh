#!/bin/bash

# Script para reiniciar o Expo com cache limpo
# Útil após mudanças em estilos ou tipos TypeScript

echo "🧹 Limpando cache do Expo..."

cd "$(dirname "$0")"

# Parar qualquer processo Expo rodando
pkill -f "expo start" 2>/dev/null

echo "✅ Processos Expo parados"

# Limpar cache do Metro Bundler
echo "🗑️  Limpando cache do Metro..."
npx expo start -c --clear &

echo "✨ Servidor reiniciado com cache limpo!"
echo "📱 Escaneie o QR code no seu dispositivo"
echo ""
echo "💡 Dica: Pressione 'r' para reload no app"

