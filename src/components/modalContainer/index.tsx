// Modal.tsx
import React, { ReactNode } from 'react';
import { View, Modal as RNModal, ActivityIndicator, StyleSheet } from 'react-native';

interface ModalProps {
  children: ReactNode;
  visible: boolean;
  onClose: () => void;
  loading?: boolean;
}

const ModalContainer: React.FC<ModalProps> = ({ children, visible, onClose, loading = false }) => {
  return (
    <RNModal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {loading ? <ActivityIndicator size="large" color="#0000ff" /> : children}
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FACECA',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
});

export default ModalContainer;
