import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { MessageItem } from '../components/MessageItem';
import { useChat } from '../hooks/useChat';
import { colors } from '../theme';
import type { GroupScreenProps, Message } from '../types';

const GroupScreen = ({ route }: GroupScreenProps) => {
  const { username } = route.params;
  const { messages, sendMessage } = useChat(username);
  const [inputText, setInputText] = useState('');
  const listRef = useRef<FlatList<Message>>(null);

  useEffect(() => {
    listRef.current?.scrollToEnd();
  }, [messages]);

  const handleSend = () => {
    sendMessage(inputText);
    setInputText('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <MessageItem item={item} currentUsername={username} />
        )}
        contentContainerStyle={styles.list}
      />

      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          placeholder="Nhập tin nhắn..."
          placeholderTextColor={colors.placeholder}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>➔</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: 16 },
  inputBar: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: colors.surface,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: colors.inputBackground,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: colors.textPrimary,
    marginRight: 8,
    fontSize: 15,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: { color: colors.surface, fontSize: 18 },
});

export default GroupScreen;
