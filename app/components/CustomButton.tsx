import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  buttonStyle?: object;
  textStyle?: object;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  buttonStyle = {},
  textStyle = {},
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        buttonStyle,
        disabled ? styles.disabledButton : null,
      ]}
      onPress={onPress}
      disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;
