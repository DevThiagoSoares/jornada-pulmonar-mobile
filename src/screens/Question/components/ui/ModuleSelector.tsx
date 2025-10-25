import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, Chip, IconButton, Modal, Portal, TextInput } from 'react-native-paper';

import { getModules } from '~/Shared/api/services/modules/modules';

interface Module {
  id: string;
  title: string;
  questionsCount: number;
}

interface ModuleSelectorProps {
  value: string;
  label: string;
  onChange: (value: string) => void;
  onSelectModule?: (module: Module | null) => void;
  errors?: boolean;
}

export const ModuleSelector: React.FC<ModuleSelectorProps> = ({ 
  value, 
  label, 
  onChange, 
  onSelectModule,
  errors 
}) => {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredModules, setFilteredModules] = useState<Module[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  useEffect(() => {
    loadModules();
  }, []);

  useEffect(() => {
    if (value.trim()) {
      const filtered = modules.filter(m => 
        m.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredModules(filtered);
      setShowSuggestions(filtered.length > 0 && value !== filtered[0]?.title);
      
      // Verificar se é um módulo novo ou existente
      const exactMatch = modules.find(m => 
        m.title.toLowerCase() === value.toLowerCase()
      );
      setIsCreatingNew(!exactMatch);
      
      // Se digitou algo diferente, limpa seleção
      if (exactMatch && onSelectModule) {
        onSelectModule(exactMatch);
      } else if (!exactMatch && onSelectModule) {
        onSelectModule(null);
      }
    } else {
      setFilteredModules([]);
      setShowSuggestions(false);
      setIsCreatingNew(false);
      if (onSelectModule) {
        onSelectModule(null);
      }
    }
  }, [value, modules]);

  const loadModules = async () => {
    try {
      setLoading(true);
      const response = await getModules();
      if (response?.data) {
        setModules(response.data);
      }
    } catch (error) {
      if (__DEV__) {
        console.error('Erro ao carregar módulos:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectModule = (moduleTitle: string, module?: Module) => {
    onChange(moduleTitle);
    setShowSuggestions(false);
    
    // Notifica o componente pai sobre o módulo selecionado
    if (onSelectModule) {
      onSelectModule(module || null);
    }
  };

  const renderModuleItem = ({ item }: { item: Module }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => handleSelectModule(item.title, item)}
    >
      <View style={styles.suggestionContent}>
        <Text style={styles.suggestionTitle}>{item.title}</Text>
        <Text style={styles.suggestionQuestions}>
          {item.questionsCount} {item.questionsCount === 1 ? 'questão' : 'questões'}
        </Text>
      </View>
      <IconButton icon="chevron-right" size={20} />
    </TouchableOpacity>
  );

  const renderAllModules = ({ item }: { item: Module }) => (
    <Card style={styles.moduleCard} onPress={() => {
      handleSelectModule(item.title, item);
      setShowModal(false);
    }}>
      <Card.Content>
        <View style={styles.moduleCardContent}>
          <View style={styles.moduleCardLeft}>
            <Text style={styles.moduleCardTitle}>{item.title}</Text>
            <Text style={styles.moduleCardQuestions}>
              {item.questionsCount} {item.questionsCount === 1 ? 'questão' : 'questões'}
            </Text>
          </View>
          <IconButton icon="arrow-right" size={24} iconColor="#CD4C3E" />
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          error={errors}
          mode="outlined"
          outlineStyle={{ borderRadius: 12 }}
          outlineColor="rgba(229, 204, 200, 0.5)"
          textColor="#CD4C3E"
          cursorColor="#CD4C3E"
          activeOutlineColor="#CD4C3E"
          selectionColor="#CD4C3E"
          underlineColor="#CD4C3E"
          value={value}
          label={label}
          onChangeText={onChange}
          right={
            loading ? (
              <TextInput.Icon icon={() => <ActivityIndicator size={20} color="#CD4C3E" />} />
            ) : value ? (
              <TextInput.Icon 
                icon="close" 
                onPress={() => onChange('')}
                color="#CD4C3E"
              />
            ) : null
          }
        />
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => {
            console.log('Abrindo modal, total de módulos:', modules.length);
            setShowModal(true);
          }}
        >
          <Text style={styles.viewAllText}>Ver todas unidades</Text>
          <IconButton icon="format-list-bulleted" size={20} iconColor="#CD4C3E" />
        </TouchableOpacity>
      </View>

      {/* Status indicator */}
      {value && (
        <View style={styles.statusContainer}>
          {isCreatingNew ? (
            <Chip
              icon="plus-circle"
              textStyle={styles.chipNewText}
              style={styles.chipNew}
            >
              Nova unidade: "{value}"
            </Chip>
          ) : (
            <Chip
              icon="check-circle"
              textStyle={styles.chipExistingText}
              style={styles.chipExisting}
            >
              Unidade existente
            </Chip>
          )}
        </View>
      )}

      {/* Suggestions dropdown */}
      {showSuggestions && filteredModules.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsTitle}>Unidades sugeridas:</Text>
          <FlatList
            data={filteredModules.slice(0, 5)}
            renderItem={renderModuleItem}
            keyExtractor={(item) => item.id}
            style={styles.suggestionsList}
          />
        </View>
      )}

      {/* Modal com todas as unidades */}
      <Portal>
        <Modal
          visible={showModal}
          onDismiss={() => {
            console.log('Fechando modal');
            setShowModal(false);
          }}
          contentContainerStyle={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Selecione uma Unidade</Text>
              <IconButton
                icon="close"
                size={24}
                iconColor="#CD4C3E"
                onPress={() => setShowModal(false)}
              />
            </View>
            
            {loading ? (
              <View style={styles.emptyState}>
                <ActivityIndicator size="large" color="#CD4C3E" />
                <Text style={styles.emptyStateText}>Carregando unidades...</Text>
              </View>
            ) : modules.length > 0 ? (
              <FlatList
                data={modules}
                renderItem={renderAllModules}
                keyExtractor={(item) => item.id}
                style={styles.modalList}
                contentContainerStyle={styles.modalListContent}
              />
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  Nenhuma unidade cadastrada ainda
                </Text>
                <Text style={styles.emptyStateSubtext}>
                  Crie sua primeira unidade digitando o título acima
                </Text>
              </View>
            )}
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  inputContainer: {
    position: 'relative',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(229, 204, 200, 0.3)',
    borderRadius: 8,
  },
  viewAllText: {
    color: '#CD4C3E',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  statusContainer: {
    marginTop: 8,
  },
  chipNew: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
    borderWidth: 1,
  },
  chipNewText: {
    color: '#2E7D32',
    fontWeight: '600',
  },
  chipExisting: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
    borderWidth: 1,
  },
  chipExistingText: {
    color: '#1565C0',
    fontWeight: '600',
  },
  suggestionsContainer: {
    marginTop: 8,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  suggestionsTitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    fontWeight: '600',
  },
  suggestionsList: {
    maxHeight: 200,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    marginBottom: 6,
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  suggestionQuestions: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  modalContainer: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 12,
    maxHeight: '80%',
    minHeight: 400,
  },
  modalContent: {
    minHeight: 400,
    maxHeight: 600,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#CD4C3E',
  },
  modalList: {
    maxHeight: 450,
  },
  modalListContent: {
    padding: 16,
  },
  moduleCard: {
    marginBottom: 12,
    elevation: 2,
  },
  moduleCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moduleCardLeft: {
    flex: 1,
  },
  moduleCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  moduleCardQuestions: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  emptyState: {
    minHeight: 300,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

