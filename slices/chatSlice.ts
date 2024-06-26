// features/chat/chatSlice.ts
import { RootState } from '@/app/store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum SpeakingState {
  Idle,
  Thinking,
  Speaking,
}

interface CharacterChatState {
  lastMessage: string | null;
  conversation: Message[];
  currentQuestions: Dialogue[] | null;
  previousQuestions: Dialogue[] | null;
  speakingState: SpeakingState;
}

interface ChatState {
  chatsByCharacter: Record<string, CharacterChatState>;
}

const initialState: ChatState = {
  chatsByCharacter: {},
};

/**
 * Sets questions according to first ones of new character trust level
 */
export const updateQuestionsToNewTrustLevel = createAsyncThunk<
  // Type de la valeur de retour
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  void,
  // Type de l'argument d'entrée
  { characterId: number; newTrustLevel: number },
  // Type des options de configuration supplémentaires
  { state: RootState; extra: { dbService: IDatabaseService } }
>(
  'characters/updateQuestionsToNewTrustLevel',
  async ({ characterId, newTrustLevel }, { dispatch, extra }) => {
    console.log('🪨 updateQuestionsToNewTrustLevel');

    const { dbService } = extra;
    const followingQuestions = await dbService.getFirstDialoguesOfTrustLevel(
      characterId,
      newTrustLevel
    );
    const characterIdString = String(characterId);
    dispatch(
      setCurrentQuestions({
        characterId: characterIdString,
        questions: followingQuestions,
      })
    );
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    initializeCharacterChatState: (
      state,
      action: PayloadAction<{
        characterId: string;
        initialChatState: CharacterChatState;
      }>
    ) => {
      console.log('🍕 initializeCharacterChatState');

      const { characterId, initialChatState } = action.payload;
      state.chatsByCharacter[characterId] = initialChatState;
    },
    addMessageToConversation: (
      state,
      action: PayloadAction<{ characterId: string; message: Message }>
    ) => {
      console.log('🍕 addMessageToConversation');

      const { characterId, message } = action.payload;
      state.chatsByCharacter[characterId].conversation.push(message);
    },
    clearMessagesFromConversation: (
      state,
      action: PayloadAction<{ characterId: string }>
    ) => {
      console.log('🍕 clearMessagesFromConversation');

      const { characterId } = action.payload;
      // Réinitialisez la conversation pour le characterId spécifié à un tableau vide
      if (state.chatsByCharacter[characterId].conversation.length > 0) {
        state.chatsByCharacter[characterId].conversation = [];
      }
    },
    setCurrentQuestions: (
      state,
      action: PayloadAction<{
        characterId: string;
        questions: Dialogue[] | null;
      }>
    ) => {
      console.log('🍕 setCurrentQuestions');

      const { characterId, questions } = action.payload;
      state.chatsByCharacter[characterId].currentQuestions = questions;
    },
    setSpeakingState: (
      state,
      action: PayloadAction<{
        characterId: string;
        speakingState: SpeakingState;
      }>
    ) => {
      console.log('🍕 setSpeakingState');

      const { characterId, speakingState } = action.payload;
      state.chatsByCharacter[characterId].speakingState = speakingState;
    },
    saveLastMessageSent: (
      state,
      action: PayloadAction<{
        characterId: string;
        lastMessage: string | null;
      }>
    ) => {
      console.log('🍕 saveLastMessageSent');

      const { characterId, lastMessage } = action.payload;
      state.chatsByCharacter[characterId].lastMessage = lastMessage;
    },
  },
});

export const {
  initializeCharacterChatState,
  addMessageToConversation,
  clearMessagesFromConversation,
  setCurrentQuestions,
  setSpeakingState,
  saveLastMessageSent,
} = chatSlice.actions;

export const selectCurrentQuestions = (state: RootState, characterId: string) =>
  state.chat.chatsByCharacter[characterId].currentQuestions;

export const selectConversations = (
  state: RootState,
  characterId: string
): Message[] => {
  const chatState = state.chat.chatsByCharacter[characterId];
  return chatState.conversation;
};

export const selectSpeakingState = (state: RootState, characterId: string) =>
  state.chat.chatsByCharacter[characterId].speakingState;

export const selectLastMessageSent = (
  state: RootState,
  characterId: string
) => {
  return state.chat.chatsByCharacter[characterId].lastMessage;
};

export default chatSlice.reducer;
