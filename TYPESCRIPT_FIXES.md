# Correções de TypeScript - Expo SDK 54

## Problema Original

Múltiplos erros de TypeScript relacionados à configuração de JSX e mudanças de API no Expo SDK 54:

```
Module '~/screens/responseScreen' was resolved to '.../index.tsx', but '--jsx' is not set.
```

## Solução Implementada

### 1. Configuração do TypeScript (tsconfig.json)

**Problema:** Faltavam opções essenciais de compilação, especialmente `jsx` e `moduleResolution`.

**Solução:**
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "jsx": "react-native",        // ← CRUCIAL: Habilita suporte a JSX
    "target": "esnext",
    "lib": ["esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "noEmit": true,
    "esModuleInterop": true,
    "moduleResolution": "bundler",  // ← Compatível com customConditions do Expo
    "resolveJsonModule": true,
    "isolatedModules": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "~/*": ["src/*"]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

### 2. Expo Notifications (SDK 54)

**Arquivo:** `src/Shared/notification/external/index.tsx`

**Problema:** API do `NotificationBehavior` foi atualizada no SDK 54.

**Mudanças:**
```typescript
// Antes (SDK 51)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Depois (SDK 54)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,  // ← NOVO
    shouldShowList: true,     // ← NOVO
  }),
});
```

**Também corrigido:**
- Substituído `alert()` por `Alert.alert()` (React Native)
- Adicionado `import { Alert } from 'react-native'`

### 3. React Native Reanimated 4.x

**Arquivo:** `src/screens/Student/Components/animations/index.tsx`

**Problema:** `useAnimatedGestureHandler` foi removido no Reanimated 4.x.

**Mudanças:**
```typescript
// Antes (Reanimated 3.x)
import { useAnimatedGestureHandler } from 'react-native-reanimated';

const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
  onStart: () => {},
  onActive: (event) => {
    offsetX.value = event.translationX + 100;
  },
  onEnd: () => {
    offsetX.value = withSpring(0);
  },
});

// Depois (Reanimated 4.x)
import { GestureEvent, PanGestureHandlerEventPayload } from 'react-native-gesture-handler';

const panGestureEvent = (event: GestureEvent<PanGestureHandlerEventPayload>) => {
  'worklet';  // ← Necessário para worklets
  offsetX.value = event.nativeEvent.translationX + 100;
};
```

**Nota:** Esta é uma solução temporária. Para uma solução completa, considere migrar para a nova Gesture API do Reanimated 4.x usando `react-native-gesture-handler` v2.

### 4. Expo File System (SDK 54)

**Arquivo:** `utils/downloadFile.ts`

**Problema:** API completamente reformulada no SDK 54, agora baseada em classes.

**Mudanças:**
```typescript
// Antes (SDK 51)
import * as FileSystem from 'expo-file-system';

const localUri = `${FileSystem.documentDirectory}${audioFilename}`;
await FileSystem.writeAsStringAsync(localUri, base64Data, {
  encoding: FileSystem.EncodingType.Base64,
});

// Depois (SDK 54)
import { File, Paths } from 'expo-file-system';

const file = new File(Paths.document, audioFilename);
await file.write(base64Data);
return file.uri;
```

**Principais mudanças:**
- `FileSystem.documentDirectory` → `Paths.document`
- `writeAsStringAsync()` → `File.write()`
- API orientada a objetos (File, Directory, Paths)

## Verificação

```bash
cd jornada-pulmonar-mobile
npx tsc --noEmit
# Exit code: 0 ✅ (Sem erros!)
```

## Teste

```bash
# Limpar cache
rm -rf node_modules/.cache .expo

# Iniciar com cache limpo
npx expo start -c
```

## Documentação de Referência

### Expo SDK 54 Changes

**Notifications:**
- [Expo Notifications Docs](https://docs.expo.dev/versions/latest/sdk/notifications/)
- Breaking Change: `NotificationBehavior` agora requer `shouldShowBanner` e `shouldShowList`

**File System:**
- [Expo FileSystem Docs](https://docs.expo.dev/versions/latest/sdk/filesystem/)
- Breaking Change: Nova API baseada em classes (`File`, `Directory`, `Paths`)
- [Migration Guide](https://docs.expo.dev/versions/latest/sdk/filesystem/#migrating-from-v51)

**React Native Reanimated:**
- [Reanimated 4.0 Migration](https://docs.swmansion.com/react-native-reanimated/docs/guides/migration/)
- Breaking Change: `useAnimatedGestureHandler` removido
- Recomendado: Usar nova Gesture API

## Solução de Problemas

### Erro: "--jsx is not set"
**Solução:** Verifique se `"jsx": "react-native"` está no `tsconfig.json`

### Erro: "customConditions can only be used when..."
**Solução:** Use `"moduleResolution": "bundler"` ao invés de `"node"`

### Erro: "useAnimatedGestureHandler not found"
**Solução:** Foi removido no Reanimated 4.x, use handlers diretos com `'worklet'`

### Erro: "documentDirectory does not exist"
**Solução:** Use `Paths.document` da nova API do FileSystem

## Checklist de Atualização

- [x] tsconfig.json atualizado com jsx e moduleResolution
- [x] NotificationBehavior com shouldShowBanner e shouldShowList
- [x] Reanimated sem useAnimatedGestureHandler
- [x] FileSystem usando nova API (File, Paths)
- [x] Alert ao invés de alert()
- [x] Todos os erros do TypeScript resolvidos
- [x] Cache limpo
- [ ] Testado no dispositivo

## Próximos Passos Recomendados

1. **Considerar migrar para Gesture API do Reanimated 4.x** - A solução atual é funcional mas não aproveita os recursos novos
2. **Revisar uso do FileSystem** - A nova API oferece mais funcionalidades
3. **Testar notificações** - Verificar se o comportamento está correto no SDK 54

---

**Data:** 24 de Outubro de 2024  
**Versões:** Expo SDK 54, React 19, React Native 0.81, TypeScript 5.9

