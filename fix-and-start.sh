#!/bin/bash

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                                                               ║"
echo "║         🔧 FIX & START - Jornada Pulmonar Mobile              ║"
echo "║                                                               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Verificar se existe .env
if [ ! -f ".env" ]; then
    echo -e "${RED}❌ Arquivo .env não encontrado!${NC}"
    echo -e "${YELLOW}Criando .env a partir do .env.example...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✅ Arquivo .env criado!${NC}"
    echo ""
    echo -e "${YELLOW}⚠️  Configure a URL da API no .env antes de continuar:${NC}"
    echo -e "   - Para emulador: EXPO_PUBLIC_API_URL=http://localhost:3000"
    echo -e "   - Para celular: EXPO_PUBLIC_API_URL=http://SEU_IP_LOCAL:3000"
    echo ""
    read -p "Pressione ENTER para editar o .env agora ou Ctrl+C para sair..."
    ${EDITOR:-nano} .env
fi

echo -e "${BLUE}📋 Verificando configuração...${NC}"
echo ""

# Ler a URL do .env
API_URL=$(grep EXPO_PUBLIC_API_URL .env | cut -d '=' -f2)
echo -e "URL da API configurada: ${GREEN}${API_URL}${NC}"

# Verificar se está usando localhost
if [[ $API_URL == *"localhost"* ]]; then
    echo -e "${YELLOW}⚠️  Você está usando 'localhost' - isso só funciona em emulador!${NC}"
    echo -e "   Para celular físico, você precisa usar o IP local do seu PC."
    echo ""
fi

# Menu de opções
echo ""
echo "Escolha uma opção:"
echo ""
echo "  1) Limpar cache e iniciar (RECOMENDADO para resolver erros)"
echo "  2) Iniciar normalmente"
echo "  3) Iniciar no Android Emulator"
echo "  4) Atualizar .env com meu IP local"
echo "  5) Reinstalar tudo (node_modules)"
echo "  6) Sair"
echo ""
read -p "Opção (1-6): " option

case $option in
    1)
        echo ""
        echo -e "${BLUE}🧹 Limpando cache...${NC}"
        rm -rf node_modules/.cache .expo
        echo -e "${GREEN}✅ Cache limpo!${NC}"
        echo ""
        echo -e "${BLUE}🚀 Iniciando Expo com cache limpo...${NC}"
        npx expo start -c
        ;;
    2)
        echo ""
        echo -e "${BLUE}🚀 Iniciando Expo...${NC}"
        npm start
        ;;
    3)
        echo ""
        echo -e "${BLUE}📱 Iniciando no Android Emulator...${NC}"
        echo -e "${YELLOW}⚠️  Certifique-se que o Android Studio está aberto!${NC}"
        npm run android
        ;;
    4)
        echo ""
        echo -e "${BLUE}🔍 Detectando IP local...${NC}"
        
        # Tentar detectar IP
        if command -v ip &> /dev/null; then
            LOCAL_IP=$(ip addr show | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | cut -d/ -f1 | head -n1)
        elif command -v ifconfig &> /dev/null; then
            LOCAL_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -n1)
        else
            LOCAL_IP=""
        fi
        
        if [ -z "$LOCAL_IP" ]; then
            echo -e "${YELLOW}⚠️  Não foi possível detectar o IP automaticamente.${NC}"
            echo ""
            read -p "Digite seu IP local: " LOCAL_IP
        else
            echo -e "${GREEN}IP detectado: ${LOCAL_IP}${NC}"
            echo ""
            read -p "Está correto? (s/n): " confirm
            if [ "$confirm" != "s" ] && [ "$confirm" != "S" ]; then
                read -p "Digite seu IP local: " LOCAL_IP
            fi
        fi
        
        # Perguntar a porta
        echo ""
        read -p "Porta do backend (padrão: 3000): " PORT
        PORT=${PORT:-3000}
        
        # Atualizar .env
        NEW_URL="http://${LOCAL_IP}:${PORT}"
        sed -i.bak "s|EXPO_PUBLIC_API_URL=.*|EXPO_PUBLIC_API_URL=${NEW_URL}|" .env
        echo ""
        echo -e "${GREEN}✅ .env atualizado!${NC}"
        echo -e "   Nova URL: ${GREEN}${NEW_URL}${NC}"
        echo ""
        read -p "Iniciar o app agora? (s/n): " start_now
        if [ "$start_now" = "s" ] || [ "$start_now" = "S" ]; then
            npx expo start -c
        fi
        ;;
    5)
        echo ""
        echo -e "${YELLOW}⚠️  Isso vai deletar node_modules e reinstalar tudo.${NC}"
        read -p "Tem certeza? (s/n): " confirm
        if [ "$confirm" = "s" ] || [ "$confirm" = "S" ]; then
            echo ""
            echo -e "${BLUE}🗑️  Removendo node_modules...${NC}"
            rm -rf node_modules package-lock.json .expo
            echo -e "${BLUE}📦 Instalando dependências...${NC}"
            npm install
            echo -e "${GREEN}✅ Pronto!${NC}"
            echo ""
            read -p "Iniciar o app? (s/n): " start_now
            if [ "$start_now" = "s" ] || [ "$start_now" = "S" ]; then
                npx expo start -c
            fi
        fi
        ;;
    6)
        echo ""
        echo -e "${BLUE}👋 Até logo!${NC}"
        exit 0
        ;;
    *)
        echo ""
        echo -e "${RED}❌ Opção inválida!${NC}"
        exit 1
        ;;
esac

