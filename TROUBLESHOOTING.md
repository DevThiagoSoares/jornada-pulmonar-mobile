# Guia de Resolução de Problemas

## 🐛 Erro: "Invariant Violation"

### Causa
Este erro geralmente acontece por:
1. ✅ **Imports faltando** - Hook do React não importado (CORRIGIDO: useEffect adicionado)
2. ⚠️ **Incompatibilidade de versão** - Expo Go SDK 54 vs Projeto SDK 51
3. ⚠️ **Cache corrompido** - Metro Bundler com cache antigo
4. ⚠️ **Backend não acessível** - URL da API incorreta

### Solução Passo a Passo

#### 1. Verificar URL da API (IMPORTANTE!)

**Para Emulador Android/iOS:**
```env
EXPO_PUBLIC_API_URL=http://localhost:3000
```

**Para Celular Físico:**
```env
EXPO_PUBLIC_API_URL=http://SEU_IP_LOCAL:3000
```

Descobrir seu IP:
```bash
# Linux/Mac
ip addr show | grep "inet " | grep -v 127.0.0.1

# Windows
ipconfig
```

#### 2. Limpar Todo o Cache

```bash
cd jornada-pulmonar-mobile

# Limpar cache do Metro
rm -rf node_modules/.cache

# Limpar cache do Expo
rm -rf .expo

# Limpar cache do npm
rm -rf node_modules package-lock.json
npm install

# Iniciar com cache limpo
npx expo start -c
```

#### 3. Resolver Incompatibilidade de Versão

**Opção A - Usar Emulador (Recomendado para desenvolvimento):**
```bash
npm run android  # Android
npm run ios      # iOS (macOS only)
```

**Opção B - Instalar Expo Go SDK 51 no Celular:**

Android:
1. Desinstalar Expo Go atual
2. Acessar no celular: https://expo.dev/go?sdkVersion=51&platform=android&device=true
3. Instalar o APK
4. Executar `npm start` e escanear QR code

iOS:
- Não é possível instalar versões antigas do Expo Go no iOS
- Use emulador ou atualize o projeto para SDK 54

**Opção C - Atualizar Projeto para SDK 54:**
```bash
# Fazer backup primeiro!
git add . && git commit -m "backup"

# Atualizar
npx expo install expo@latest
npx expo install --fix
rm -rf node_modules package-lock.json
npm install
npx expo start -c
```

## 🐛 Erro: "Network Error" ou "Connection Refused"

### Causa
Backend não está rodando ou URL incorreta.

### Solução

1. **Verificar se o backend está rodando:**
```bash
cd ../jornada-pulmonar-backend
yarn start:dev
```

2. **Testar no navegador:**
```
http://localhost:3000/api
```

3. **Verificar .env do mobile:**
   - Emulador: `http://localhost:3000`
   - Celular: `http://192.168.X.X:3000` (seu IP local)

4. **Verificar firewall:**
   - Liberar porta 3000
   - Ou desativar temporariamente para teste

## 🐛 Erro: "Module not found"

### Solução
```bash
rm -rf node_modules package-lock.json
npm install
npx expo start -c
```

## 🐛 Erro: "Unable to resolve module"

### Solução
```bash
# Limpar cache completamente
watchman watch-del-all  # Se tiver watchman
rm -rf $TMPDIR/metro-*
rm -rf $TMPDIR/haste-*
npx expo start -c
```

## 🐛 App congela na splash screen

### Causa
Geralmente relacionado a:
- Variável de ambiente não carregada
- Erro em algum import
- Hook usado fora de componente React

### Solução
1. Verificar console do Metro Bundler
2. Verificar se todas as variáveis estão no .env
3. Limpar cache: `npx expo start -c`

## 🐛 Erro: "process is not defined"

### Causa
TypeScript não reconhece process.env

### Solução
Já corrigido! O arquivo `app-env.d.ts` foi atualizado com:
```typescript
declare namespace NodeJS {
  interface ProcessEnv {
    EXPO_PUBLIC_API_URL: string;
  }
}
```

## 🐛 Erro de CORS no Backend

### Causa
Backend não aceita requisições do mobile

### Solução
Adicionar no `main.ts` do backend:
```typescript
app.enableCors({
  origin: true,
  credentials: true,
});
```

## 📱 Problemas com Expo Go

### "Project SDK incompatible"

**Solução rápida:** Use emulador
```bash
npm run android
```

**Solução permanente:** 
- Android: Instalar Expo Go SDK 51
- iOS: Atualizar projeto para SDK 54

### QR Code não funciona

1. Verificar se dispositivo e PC estão na mesma rede WiFi
2. Tentar digitar a URL manualmente no Expo Go
3. Usar túnel: `npx expo start --tunnel` (mais lento)

## 🔧 Comandos Úteis

### Limpar Tudo
```bash
rm -rf node_modules package-lock.json .expo
npm install
npx expo start -c
```

### Ver Logs Detalhados
```bash
npx expo start --dev-client --no-dev --minify
```

### Verificar Dependências
```bash
npx expo-doctor
```

### Reinstalar Tudo
```bash
rm -rf node_modules package-lock.json
npm install
npx expo install --fix
```

## 📋 Checklist Antes de Reportar Erro

- [ ] Backend está rodando?
- [ ] `.env` está configurado corretamente?
- [ ] Cache foi limpo? (`npx expo start -c`)
- [ ] Versões são compatíveis? (SDK 51 vs 54)
- [ ] Node modules foram reinstalados?
- [ ] Firewall não está bloqueando?
- [ ] Dispositivo e PC estão na mesma rede?

## 🆘 Ainda com Problemas?

1. **Ver logs completos:**
```bash
npx expo start
# No outro terminal:
adb logcat *:S ReactNative:V ReactNativeJS:V  # Android
```

2. **Verificar arquivo específico:**
```bash
npx tsc --noEmit  # Verificar erros TypeScript
```

3. **Resetar completamente:**
```bash
rm -rf node_modules package-lock.json .expo .expo-shared
npm cache clean --force
npm install
npx expo start -c
```

## 💡 Dicas de Desenvolvimento

### Desenvolvimento Rápido
- Use emulador ao invés de dispositivo físico
- Use Hot Reload para ver mudanças instantaneamente
- Mantenha o Metro Bundler rodando

### Debugging
- Use React Native Debugger
- Console.log está no Metro Bundler
- Shake no dispositivo para menu de desenvolvedor

### Performance
- Feche outros apps do emulador
- Use `--dev` apenas em desenvolvimento
- Build de produção é muito mais rápido

