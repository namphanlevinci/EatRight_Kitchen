import React from 'react';
import {View, TextInput, Text, StyleSheet, ViewStyle} from 'react-native';
import {Controller} from 'react-hook-form';

interface CustomInputProps {
  name: string;
  control: any; // Control của react-hook-form
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  rules?: object; // Điều kiện validate từ react-hook-form
  style?: ViewStyle;
}

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  control,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  rules = {},
  style,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
        <View>
          <View style={[styles.container, style]}>
            <TextInput
              style={[styles.input, error ? styles.errorInput : null]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
            />
          </View>
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

export default CustomInput;
