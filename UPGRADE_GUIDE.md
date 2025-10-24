# Guia de Atualização Expo SDK 51 → SDK 54

## ⚠️ Antes de Começar

**Importante:** Faça backup do seu projeto ou commit as mudanças antes de atualizar!

```bash
git add .
git commit -m "backup antes de atualizar expo"
```

## 📦 Passos para Atualizar

### 1. Instalar a ferramenta de upgrade do Expo

```bash
npx expo install expo@latest
```

### 2. Atualizar as dependências

```bash
npx expo install --fix
```

Este comando irá:
- Atualizar todas as dependências do Expo para versões compatíveis com SDK 54
- Corrigir incompatibilidades automaticamente

### 3. Verificar e atualizar dependências manualmente

Algumas dependências podem precisar de atualização manual. Verifique:

```bash
npm outdated
```

### 4. Limpar cache e reinstalar

```bash
# Limpar cache do npm
rm -rf node_modules
rm package-lock.json

# Reinstalar
npm install

# Limpar cache do Expo
npx expo start -c
```

### 5. Testar o app

```bash
npm start
```

## 🔍 Possíveis Problemas e Soluções

### Erro de compatibilidade de pacotes

Se algum pacote não for compatível com SDK 54:

```bash
# Ver quais pacotes estão incompatíveis
npx expo-doctor

# Atualizar pacotes específicos
npx expo install [nome-do-pacote]@latest
```

### Erro com React Native

Se houver erro com a versão do React Native:

```bash
npx expo install react-native@latest react@latest
```

### Erro com TypeScript

```bash
npm install --save-dev typescript@latest
```

## 📝 Verificações Pós-Atualização

1. **Verifique o app.json** - Certifique-se de que não há configurações incompatíveis
2. **Teste todas as funcionalidades** - Especialmente:
   - Login/Autenticação
   - Navegação entre telas
   - Upload de arquivos
   - Notificações (se implementado)
3. **Verifique os logs** - Procure por warnings de depreciação

## 🆘 Se Algo Der Errado

### Reverter para SDK 51

Se a atualização causar problemas, você pode reverter:

```bash
# Restaurar do git
git reset --hard HEAD~1

# OU reinstalar SDK 51 manualmente
npx expo install expo@~51.0.20
npm install
```

## 📚 Documentação Oficial

- [Guia de Upgrade do Expo](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/)
- [Changelog SDK 54](https://blog.expo.dev/expo-sdk-54-is-now-available-4ed1d4a0c3dc)
- [Breaking Changes SDK 54](https://docs.expo.dev/versions/latest/)

## 💡 Dica

Para projetos em produção, é recomendado testar a atualização em uma branch separada primeiro:

```bash
git checkout -b upgrade-expo-sdk-54
# ... fazer a atualização ...
# ... testar tudo ...
# Se tudo ok, fazer merge
```

