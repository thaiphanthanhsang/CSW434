import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';
import { SYSTEM_USER, type Message } from '../types';

interface Props {
  item: Message;
  currentUsername: string;
}

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export const MessageItem = memo(({ item, currentUsername }: Props) => {
  if (item.user === SYSTEM_USER) {
    return <Text style={styles.systemText}>{item.text}</Text>;
  }

  const isMine = item.user === currentUsername;

  return (
    <View style={[styles.row, isMine ? styles.rowRight : styles.rowLeft]}>
      {!isMine && (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.user.charAt(0).toUpperCase()}
          </Text>
        </View>
      )}

      <View
        style={[styles.bubble, isMine ? styles.bubbleMine : styles.bubbleOther]}
      >
        {!isMine && <Text style={styles.senderName}>{item.user}</Text>}
        <Text style={isMine ? styles.textMine : styles.textOther}>
          {item.text}
        </Text>
        <Text style={styles.time}>{formatTime(item.time)}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  systemText: {
    textAlign: 'center',
    color: colors.textMuted,
    marginVertical: 8,
    fontSize: 12,
    fontStyle: 'italic',
  },
  row: { flexDirection: 'row', marginBottom: 12, alignItems: 'flex-end' },
  rowRight: { justifyContent: 'flex-end' },
  rowLeft: { justifyContent: 'flex-start' },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: colors.avatar,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  avatarText: { color: colors.surface, fontWeight: 'bold' },
  bubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    maxWidth: '75%',
  },
  bubbleMine: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 2,
  },
  bubbleOther: {
    backgroundColor: colors.bubbleOther,
    borderBottomLeftRadius: 2,
  },
  senderName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.accent,
    marginBottom: 2,
  },
  textMine: { color: colors.surface, fontSize: 15 },
  textOther: { color: colors.textPrimary, fontSize: 15 },
  time: {
    fontSize: 9,
    color: colors.textLight,
    textAlign: 'right',
    marginTop: 4,
  },
});
