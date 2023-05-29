import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
};

const styles = StyleSheet.create({
  buttonTitle: {
    fontSize: 20,
  },
  button: {
    width: '50%',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#99cc00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});

export function Button({
  title,
  onPress,
  isLoading,
  disabled = false,
  buttonStyle = {},
  textStyle = {},
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled ? styles.disabled : {}, buttonStyle]}
      onPress={onPress}
      disabled={disabled}>
      {isLoading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <Text style={[styles.buttonTitle, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
