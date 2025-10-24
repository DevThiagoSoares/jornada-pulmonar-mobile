# Configuração de Variáveis de Ambiente - Mobile

## Passo a Passo

1. **Copie o arquivo de exemplo:**
   ```bash
   cp .env.example .env
   ```

2. **Configure as variáveis no arquivo `.env`:**

### API Configuration

```env
EXPO_PUBLIC_API_URL=http://localhost:3000
```

Esta é a **única** variável de ambiente necessária para o aplicativo mobile funcionar.

#### Configurações por Ambiente:

**Desenvolvimento Local (Emulador):**
```env
EXPO_PUBLIC_API_URL=http://localhost:3000
```

**Desenvolvimento com Dispositivo Físico:**
```env
EXPO_PUBLIC_API_URL=http://SEU_IP_LOCAL:3000
```
- Exemplo: `http://192.168.1.100:3000`
- O dispositivo e o computador devem estar na mesma rede WiFi

**Produção:**
```env
EXPO_PUBLIC_API_URL=https://api-pulmao.labtecs.com.br
```
- Use a URL do seu servidor de produção

### Como Descobrir seu IP Local

**Linux/Mac:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
# ou
ip addr show | grep "inet " | grep -v 127.0.0.1
```

**Windows:**
```bash
ipconfig
```

Procure pelo endereço IPv4 na seção da sua conexão ativa (WiFi ou Ethernet).

### Exemplo de Configuração Completa

```env
# Para desenvolvimento local em emulador
EXPO_PUBLIC_API_URL=http://localhost:3000

# OU para dispositivo físico na mesma rede
# EXPO_PUBLIC_API_URL=http://192.168.1.100:3000

# OU para produção
# EXPO_PUBLIC_API_URL=https://api-pulmao.labtecs.com.br
```

## Iniciando o App

```bash
# Instalar dependências
npm install
# ou
yarn install

# Iniciar o Expo
npm start
# ou
yarn start

# Para Android
npm run android
# ou
yarn android

# Para iOS
npm run ios
# ou
yarn ios
```

## Importante sobre EXPO_PUBLIC_

No Expo, todas as variáveis de ambiente que você quer acessar no app devem ter o prefixo `EXPO_PUBLIC_`.

**Correto:**
```env
EXPO_PUBLIC_API_URL=http://localhost:3000
```

**Errado:**
```env
API_URL=http://localhost:3000  # Não vai funcionar!
```

## Testando a Conexão com a API

Depois de configurar o `.env` e iniciar o app:

1. Certifique-se de que o backend está rodando:
   ```bash
   cd ../jornada-pulmonar-backend
   yarn start:dev
   ```

2. Verifique se a API está acessível:
   - Abra no navegador: `http://localhost:3000/api` (Swagger)

3. Teste o login no app mobile

### Problemas Comuns de Conexão

**❌ Erro: "Network Error" ou "Connection refused"**

Possíveis soluções:

1. **Backend não está rodando**
   - Certifique-se que o backend está executando
   - Verifique os logs do backend

2. **URL incorreta no dispositivo físico**
   - Não use `localhost` em dispositivo físico
   - Use o IP local do seu computador
   - Exemplo: `EXPO_PUBLIC_API_URL=http://192.168.1.100:3000`

3. **Firewall bloqueando a conexão**
   - Libere a porta 3000 no firewall
   - Em alguns casos, desative temporariamente o firewall para testar

4. **Dispositivo em rede diferente**
   - Certifique-se que o dispositivo e o computador estão na mesma rede WiFi

## Limpando Cache

Se as variáveis não estiverem sendo reconhecidas após mudanças:

```bash
# Limpar cache do Metro
npm start -- --clear

# ou
expo start -c

# Se ainda não funcionar, limpe tudo:
rm -rf node_modules
npm install
expo start -c
```

## Verificando a Configuração

Para verificar se a variável está sendo lida corretamente, você pode adicionar um console.log temporário no arquivo `src/Shared/api/api-config.ts`:

```typescript
console.log('API URL:', process.env.EXPO_PUBLIC_API_URL);
```

## Ambientes Diferentes

### Desenvolvimento
```env
EXPO_PUBLIC_API_URL=http://localhost:3000
```

### Homologação
```env
EXPO_PUBLIC_API_URL=https://homolog-api-pulmao.labtecs.com.br
```

### Produção
```env
EXPO_PUBLIC_API_URL=https://api-pulmao.labtecs.com.br
```

**Dica:** Você pode criar múltiplos arquivos de ambiente:
- `.env.development`
- `.env.staging`
- `.env.production`

E usar diferentes configurações para cada ambiente.

## Segurança

⚠️ **NUNCA** commite o arquivo `.env` no Git!

O arquivo `.gitignore` já está configurado para ignorar arquivos `.env`.

⚠️ **ATENÇÃO**: Variáveis com prefixo `EXPO_PUBLIC_` são expostas no bundle do app e podem ser vistas por usuários. 

- ✅ **OK para incluir**: URLs públicas de APIs
- ❌ **NUNCA incluir**: Chaves secretas, senhas, tokens privados

## Troubleshooting

### O app não conecta com o backend

1. Verifique a URL no `.env`
2. Teste a URL no navegador do dispositivo
3. Verifique se o backend está acessível na rede
4. Limpe o cache do Expo e reinstale: `expo start -c`

### Mudei o .env mas não funciona

1. Pare o Metro Bundler (Ctrl+C)
2. Execute: `expo start -c` (limpa o cache)
3. Recarregue o app no dispositivo/emulador

### Erro de CORS

Se você receber erros de CORS, configure o backend para aceitar requisições do mobile. No NestJS, adicione a configuração de CORS no `main.ts`:

```typescript
app.enableCors({
  origin: true,
  credentials: true,
});
```

## Suporte

Para mais informações:
- Consulte o [README.md](./README.md) do projeto mobile
- Consulte a [documentação do Expo](https://docs.expo.dev/)
- Verifique a documentação da API no Swagger: `http://localhost:3000/api`
