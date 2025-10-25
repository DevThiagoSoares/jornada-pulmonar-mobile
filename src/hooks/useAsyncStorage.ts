import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

/**
 * Hook para gerenciar AsyncStorage com cache em memória
 * 
 * @param key - Chave do AsyncStorage
 * @param initialValue - Valor inicial (opcional)
 * @returns [value, setValue, isLoading, error]
 */
export function useAsyncStorage<T>(key: string, initialValue?: T) {
  const [storedValue, setStoredValue] = useState<T | undefined>(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Carregar valor inicial
  useEffect(() => {
    const loadStoredValue = async () => {
      try {
        setIsLoading(true);
        const item = await AsyncStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
      } catch (err) {
        setError(err as Error);
        if (__DEV__) {
          console.error(`Erro ao carregar ${key} do AsyncStorage:`, err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredValue();
  }, [key]);

  // Salvar valor
  const setValue = useCallback(
    async (value: T | ((val: T | undefined) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (err) {
        setError(err as Error);
        if (__DEV__) {
          console.error(`Erro ao salvar ${key} no AsyncStorage:`, err);
        }
      }
    },
    [key, storedValue]
  );

  // Remover valor
  const removeValue = useCallback(async () => {
    try {
      setStoredValue(undefined);
      await AsyncStorage.removeItem(key);
    } catch (err) {
      setError(err as Error);
      if (__DEV__) {
        console.error(`Erro ao remover ${key} do AsyncStorage:`, err);
      }
    }
  }, [key]);

  return { value: storedValue, setValue, removeValue, isLoading, error };
}

