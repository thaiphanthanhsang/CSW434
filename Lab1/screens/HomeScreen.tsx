import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../theme';
import type { HomeScreenProps } from '../types';

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [name, setName] = useState('');

  const handleStartChat = () => {
    const username = name.trim();
    if (!username) {
      Alert.alert('Thông báo', 'Vui lòng nhập tên của bạn để bắt đầu!');
      return;
    }
    // Việc kết nối và vào phòng do useChat đảm nhiệm khi GroupScreen mở
    navigation.navigate('GroupChat', { username });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Name</Text>
      <Text style={styles.subtitle}>
        Please enter your name to start a new chat
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Your name</Text>
        <TextInput
          style={styles.input}
          placeholder="Richard Nguyen"
          placeholderTextColor={colors.placeholder}
          value={name}
          onChangeText={setName}
          onSubmitEditing={handleStartChat}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleStartChat}>
        <Text style={styles.buttonText}>Start Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: { marginBottom: 30 },
  label: {
    fontSize: 12,
    color: colors.success,
    fontWeight: '600',
    marginBottom: 4,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.success,
    fontSize: 16,
    color: colors.textPrimary,
    paddingVertical: 6,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: colors.surface, fontSize: 18, fontWeight: 'bold' },
});

export default HomeScreen;
