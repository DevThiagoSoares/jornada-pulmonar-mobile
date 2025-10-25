# Jornada Pulmonar - Mobile

Aplicação mobile da plataforma educacional Jornada Pulmonar, desenvolvida com React Native e Expo.

## 🚀 Tecnologias

- **React Native** - Framework mobile
- **Expo** - Plataforma de desenvolvimento
- **TypeScript** - Linguagem de programação
- **React Navigation** - Navegação
- **NativeWind** - Tailwind CSS para React Native
- **React Hook Form** - Gerenciamento de formulários
- **Axios** - Cliente HTTP
- **AsyncStorage** - Armazenamento local

## 📋 Pré-requisitos

- Node.js (v16 ou superior)
- Expo CLI
- iOS Simulator (para macOS) ou Android Studio (para desenvolvimento Android)
- Dispositivo físico com Expo Go instalado (opcional)

## ⚙️ Configuração

### 1. Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd jornada-pulmonar-mobile

# Instale as dependências
npm install
# ou
yarn install
```

### 2. Variáveis de Ambiente

Configure a URL da API do backend:

```bash
# Copie o arquivo de exemplo
cp .env.example .env
```

Edite o arquivo `.env` e configure a URL da API:

```env
# Para desenvolvimento local (emulador)
EXPO_PUBLIC_API_URL=http://localhost:3000

# Para desenvolvimento em dispositivo físico
EXPO_PUBLIC_API_URL=http://192.168.1.100:3000

# Para produção
EXPO_PUBLIC_API_URL=https://api-pulmao.labtecs.com.br
```

**Importante:** Se você estiver testando em um dispositivo físico, substitua `localhost` pelo IP local do seu computador.

### 3. Backend

Certifique-se de que o backend está rodando antes de iniciar o app:

```bash
cd ../jornada-pulmonar-backend
yarn start:dev
```

## 🏃 Executando a Aplicação

### Modo Desenvolvimento

```bash
# Inicie o Expo
npm start
# ou
yarn start
```

Isso abrirá o Expo DevTools no navegador. A partir daí, você pode:
- Pressione `a` para abrir no Android Emulator
- Pressione `i` para abrir no iOS Simulator
- Escaneie o QR code com o Expo Go no seu dispositivo

### Android

```bash
npm run android
# ou
yarn android
```

### iOS (apenas macOS)

```bash
npm run ios
# ou
yarn ios
```

### Web (experimental)

```bash
npm run web
# ou
yarn web
```

## 📱 Estrutura do Projeto

```
src/
├── assets/           # Imagens, ícones e recursos estáticos
├── components/       # Componentes reutilizáveis
│   ├── modalContainer/
│   └── screens/
├── navigation/       # Configuração de navegação
│   └── Routes/
├── screens/          # Telas da aplicação
│   ├── Login/       # Telas de autenticação
│   ├── Question/    # Telas de questões
│   ├── Student/     # Área do estudante
│   └── Teacher/     # Área do professor
└── Shared/          # Recursos compartilhados
    ├── api/         # Configuração da API
    ├── Auth/        # Context de autenticação
    ├── Enums/       # Enumerações
    └── hooks/       # Hooks customizados
```

## 🎯 Funcionalidades

### Para Estudantes
- ✅ Login e criação de conta
- 📚 Visualização de módulos educacionais
- ❓ Responder questões com áudio
- 🏆 Sistema de pontuação e ranking
- 🎮 Gamificação com níveis e conquistas
- 👤 Perfil do usuário

### Para Professores
- 📊 Visualização de estatísticas
- 👥 Gerenciamento de alunos
- 📈 Acompanhamento de progresso
- ✏️ Criação de módulos e questões

## 🔐 Autenticação

A aplicação utiliza JWT para autenticação com o backend. O token é armazenado localmente usando AsyncStorage e é automaticamente incluído em todas as requisições através de um interceptor do Axios.

## 🎨 Temas e Estilos

O projeto utiliza NativeWind (Tailwind CSS) para estilização:

```tsx
// Exemplo de uso
<View className="flex-1 bg-white p-4">
  <Text className="text-2xl font-bold text-blue-600">
    Jornada Pulmonar
  </Text>
</View>
```

## 📦 Build de Produção

### Android (APK/AAB)

```bash
# Build de desenvolvimento
eas build --profile development --platform android

# Build de produção
eas build --profile production --platform android
```

### iOS (IPA)

```bash
# Build de desenvolvimento
eas build --profile development --platform ios

# Build de produção
eas build --profile production --platform ios
```

**Nota:** Para builds de produção, você precisará configurar o [EAS (Expo Application Services)](https://docs.expo.dev/build/introduction/)

## 🧹 Limpando Cache

Se encontrar problemas, tente limpar o cache:

```bash
# Limpar cache do Metro
npm start -- --clear
# ou
expo start -c

# Limpar cache do npm/yarn
npm cache clean --force
# ou
yarn cache clean

# Limpar pasta node_modules
rm -rf node_modules
npm install
```

## 🐛 Debugging

### React Native Debugger

1. Instale o [React Native Debugger](https://github.com/jhen0409/react-native-debugger)
2. Inicie o app e abra o menu de desenvolvedor (shake no dispositivo ou Cmd+D/Ctrl+D)
3. Selecione "Debug"

### Expo DevTools

```bash
expo start
```

Acesse `http://localhost:19002` no navegador para acessar as ferramentas de desenvolvedor.

## 📱 Testando em Dispositivo Físico

1. Instale o **Expo Go** no seu dispositivo:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Execute o app:
   ```bash
   npm start
   ```

3. Escaneie o QR code:
   - **iOS**: Use a câmera nativa
   - **Android**: Use o Expo Go app

**Importante:** 
- O dispositivo e o computador devem estar na mesma rede WiFi
- Configure `EXPO_PUBLIC_API_URL` com o IP local do seu computador, não use `localhost`

## 🔧 Configuração da API

A configuração da API está em `src/Shared/api/api-config.ts`:

```typescript
const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://api-pulmao.labtecs.com.br',
  withCredentials: true,
});
```

O interceptor automaticamente adiciona o token JWT em todas as requisições:

```typescript
api.interceptors.request.use(async (config) => {
  const getToken = await AsyncStorage.getItem('access_token');
  if (getToken && config.headers) {
    config.headers.Authorization = `Bearer ${getToken}`;
  }
  return config;
});
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Scripts Disponíveis

```bash
npm start           # Inicia o Expo DevTools
npm run android     # Executa no Android
npm run ios         # Executa no iOS
npm run web         # Executa na web
npm run format      # Formata o código
```

## 🔧 Configurações Importantes

### app.json

Configurações do app como nome, ícone, splash screen, etc.

### babel.config.js

Configurações do Babel para React Native e NativeWind.

### tailwind.config.js

Configurações do Tailwind CSS (NativeWind).

## 🐛 Problemas Comuns

### Erro: "Unable to resolve module"

```bash
npm start -- --clear
```

### Erro de tipagem TypeScript

```bash
rm -rf node_modules
npm install
```

### App não conecta com o backend

1. Verifique se o backend está rodando
2. Verifique a `EXPO_PUBLIC_API_URL` no `.env`
3. Se estiver usando dispositivo físico, use o IP local ao invés de `localhost`
4. Teste a URL no navegador do dispositivo para verificar se está acessível

### Erro: "Network Error"

- Certifique-se de que o backend está rodando: `cd ../jornada-pulmonar-backend && yarn start:dev`
- Verifique se o firewall não está bloqueando a conexão
- Em dispositivo físico, use o IP local do computador
- Verifique se ambos estão na mesma rede WiFi

## 📄 Licença

MIT

## 👥 Autores

Desenvolvido pela equipe UEA - Universidade do Estado do Amazonas

## 📞 Suporte

Para suporte, entre em contato através do repositório ou abra uma issue.

## 🔗 Links Úteis

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [NativeWind](https://www.nativewind.dev/)
- [Axios Documentation](https://axios-http.com/)
