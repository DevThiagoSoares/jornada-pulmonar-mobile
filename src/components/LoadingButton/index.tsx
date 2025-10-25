import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface LoadingButtonProps extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
  loadingColor?: string;
  textStyle?: any;
  containerStyle?: any;
}

/**
 * Botão otimizado com estado de loading integrado
 */
const LoadingButton: React.FC<LoadingButtonProps> = React.memo(({
  title,
  isLoading = false,
  loadingColor = '#FFF',
  onPress,
  disabled,
  style,
  textStyle,
  containerStyle,
  ...props
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.button,
        containerStyle,
        style,
        isDisabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      {isLoading ? (
        <ActivityIndicator color={loadingColor} size="small" />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
});

LoadingButton.displayName = 'LoadingButton';

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#CD4C3E',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoadingButton;

