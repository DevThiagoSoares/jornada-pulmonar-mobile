#!/bin/bash

echo "🚀 Jornada Pulmonar - Quick Start"
echo ""
echo "Escolha uma opção:"
echo ""
echo "  1) Iniciar com cache limpo (recomendado se mudou .env)"
echo "  2) Iniciar normalmente"
echo "  3) Iniciar no Android Emulator"
echo "  4) Ver logs de erro"
echo ""
read -p "Opção (1-4): " option

case $option in
    1)
        echo "🧹 Limpando cache e iniciando..."
        npx expo start -c
        ;;
    2)
        echo "🚀 Iniciando..."
        npm start
        ;;
    3)
        echo "📱 Iniciando no Android..."
        npm run android
        ;;
    4)
        echo "📋 Logs recentes:"
        tail -n 50 ~/.expo/logs/*.log 2>/dev/null || echo "Nenhum log encontrado"
        ;;
    *)
        echo "❌ Opção inválida"
        ;;
esac
