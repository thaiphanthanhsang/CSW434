import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export const SYSTEM_USER = 'SYSTEM';

export interface Message {
  id: string;
  text: string;
  user: string;
  time: string; // ISO 8601, do server tạo
}

export type RootStackParamList = {
  Home: undefined;
  GroupChat: { username: string };
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;
export type GroupScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'GroupChat'
>;
