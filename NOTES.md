# Notas sobre o Projeto

## Arquivos Não Utilizados

### Firebase

O arquivo `utils/firebase.ts` existe no projeto mas **não está sendo utilizado** no código atual.

Este arquivo contém configuração do Firebase que foi incluída no template inicial do projeto, mas a aplicação não utiliza Firebase para:
- ❌ Autenticação (usa JWT com o backend)
- ❌ Notificações push (não implementado)
- ❌ Analytics (não implementado)
- ❌ Storage (usa o backend)

**Você pode:**
- Manter o arquivo caso planeje usar Firebase no futuro
- Remover o arquivo se quiser limpar o projeto:
  ```bash
  rm utils/firebase.ts
  ```

Se você remover o arquivo, também pode remover a dependência do Firebase:
```bash
npm uninstall firebase
# ou
yarn remove firebase
```

## Dependências do Projeto

### Dependências em Uso
- ✅ **axios** - Cliente HTTP para comunicação com a API
- ✅ **@react-native-async-storage/async-storage** - Armazenamento local
- ✅ **react-navigation** - Navegação entre telas
- ✅ **react-hook-form** - Gerenciamento de formulários
- ✅ **nativewind** - Estilização (Tailwind CSS)

### Dependências Não Utilizadas
- ⚠️ **firebase** - Não está sendo usado no código
- ⚠️ **@supabase/supabase-js** - Se existir, não está sendo usado

## Variáveis de Ambiente

O projeto usa **apenas uma** variável de ambiente:

```env
EXPO_PUBLIC_API_URL=http://localhost:3000
```

Todas as outras variáveis relacionadas ao Firebase/Supabase foram removidas da configuração, pois não são necessárias.

## Autenticação

A autenticação é feita via:
1. Login enviado para o backend (`POST /api/v1/auth/login`)
2. Backend retorna um token JWT
3. Token é armazenado no AsyncStorage
4. Todas as requisições incluem o token no header `Authorization: Bearer <token>`

O interceptor no `src/Shared/api/api-config.ts` adiciona automaticamente o token em todas as requisições.

## Limpeza Sugerida (Opcional)

Se quiser remover completamente as referências ao Firebase:

```bash
# Remover arquivo de configuração do Firebase
rm utils/firebase.ts

# Remover dependência do Firebase do package.json
npm uninstall firebase
# ou
yarn remove firebase

# Limpar cache
npm start -- --clear
```

**Nota:** Isso é opcional. O arquivo não interfere no funcionamento da aplicação.

