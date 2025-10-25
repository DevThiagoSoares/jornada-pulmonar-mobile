#!/bin/bash

# ============================================
# Script para Configurar Repositório de Áudios
# ============================================

echo "🎵 Configuração de Repositório de Áudios - Jornada Pulmonar"
echo ""

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função para ler input
read_input() {
    echo -n "$1: "
    read value
    echo "$value"
}

echo "${YELLOW}Este script vai ajudá-lo a configurar o repositório de áudios.${NC}"
echo ""

# Perguntar qual opção
echo "Escolha uma opção:"
echo "1) Usar repositório GitHub (novo ou existente)"
echo "2) Usar backend local"
echo "3) Usar backend de produção"
echo ""

option=$(read_input "Opção [1/2/3]")

case $option in
    1)
        echo ""
        echo "${GREEN}Configurando para usar GitHub...${NC}"
        echo ""
        github_user=$(read_input "Seu usuário do GitHub")
        repo_name=$(read_input "Nome do repositório [jornada-pulmonar-audios]")
        
        # Se não informou o repo, usa o padrão
        if [ -z "$repo_name" ]; then
            repo_name="jornada-pulmonar-audios"
        fi
        
        audio_url="https://raw.githubusercontent.com/${github_user}/${repo_name}/main"
        
        echo ""
        echo "${YELLOW}URL dos áudios:${NC} ${audio_url}"
        echo ""
        echo "${YELLOW}Próximos passos:${NC}"
        echo "1. Crie o repositório em: https://github.com/new"
        echo "2. Nome: ${repo_name}"
        echo "3. Visibilidade: Public"
        echo "4. Faça upload dos arquivos MP3 (caso_1.mp3 até caso_20.mp3)"
        echo "5. Teste a URL no navegador: ${audio_url}/caso_1.mp3"
        ;;
        
    2)
        echo ""
        echo "${GREEN}Configurando para usar backend local...${NC}"
        echo ""
        local_ip=$(read_input "IP local do backend [192.168.1.32]")
        local_port=$(read_input "Porta do backend [5001]")
        
        if [ -z "$local_ip" ]; then
            local_ip="192.168.1.32"
        fi
        
        if [ -z "$local_port" ]; then
            local_port="5001"
        fi
        
        audio_url="http://${local_ip}:${local_port}/uploads/audios"
        
        echo ""
        echo "${YELLOW}URL dos áudios:${NC} ${audio_url}"
        echo ""
        echo "${YELLOW}Próximos passos:${NC}"
        echo "1. Crie a pasta: mkdir -p jornada-pulmonar-backend/uploads/audios"
        echo "2. Copie os arquivos MP3 para essa pasta"
        echo "3. Certifique-se que o backend está rodando"
        echo "4. Teste a URL no navegador: ${audio_url}/caso_1.mp3"
        ;;
        
    3)
        echo ""
        echo "${GREEN}Configurando para usar backend de produção...${NC}"
        echo ""
        prod_url=$(read_input "URL do backend de produção")
        
        audio_url="${prod_url}/uploads/audios"
        
        echo ""
        echo "${YELLOW}URL dos áudios:${NC} ${audio_url}"
        ;;
        
    *)
        echo "${RED}Opção inválida!${NC}"
        exit 1
        ;;
esac

# Atualizar .env
echo ""
echo "${YELLOW}Atualizando arquivo .env...${NC}"

if [ -f ".env" ]; then
    # Backup do .env atual
    cp .env .env.backup
    echo "${GREEN}✓${NC} Backup criado: .env.backup"
fi

# Verificar se já existe a variável
if grep -q "EXPO_PUBLIC_AUDIO_BASE_URL" .env 2>/dev/null; then
    # Substituir
    sed -i.bak "s|EXPO_PUBLIC_AUDIO_BASE_URL=.*|EXPO_PUBLIC_AUDIO_BASE_URL=${audio_url}|" .env
    echo "${GREEN}✓${NC} Variável EXPO_PUBLIC_AUDIO_BASE_URL atualizada"
else
    # Adicionar
    echo "" >> .env
    echo "# URL Base para Arquivos de Áudio" >> .env
    echo "EXPO_PUBLIC_AUDIO_BASE_URL=${audio_url}" >> .env
    echo "${GREEN}✓${NC} Variável EXPO_PUBLIC_AUDIO_BASE_URL adicionada"
fi

echo ""
echo "${GREEN}✓ Configuração concluída!${NC}"
echo ""
echo "${YELLOW}Para aplicar as mudanças:${NC}"
echo "1. Pare o Metro bundler (Ctrl+C)"
echo "2. Execute: npm start"
echo "3. Teste o app"
echo ""
echo "${YELLOW}Para verificar se está funcionando:${NC}"
echo "Abra no navegador: ${audio_url}/caso_1.mp3"
echo ""

