import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import handReference from '@/assets/images/hand.png';
// import edouardHerriotReference from '@/assets/images/edouard-herriot.png';
import { SpeakingState, selectSpeakingState } from '@/slices/chatSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import MessageBubble from '@/components/chat/MessageBubble';
import Sizes from '@/constants/Sizes';

interface Props {
  characterId: string;
  character: Character;
}

const AnimatedCharacter = ({ characterId, character }: Props) => {
  // const [isTalking] = useState(true);
  const currentCharacterSpeakingState = useSelector((state) =>
    selectSpeakingState(state as RootState, characterId)
  );

  return (
    <View
      style={[
        styles.view,
        currentCharacterSpeakingState === SpeakingState.Idle &&
          character.detoured_character !== undefined &&
          character.detoured_character !== '0' &&
          styles.viewSmaller,
      ]}
    >
      {currentCharacterSpeakingState === SpeakingState.Thinking && (
        <MessageBubble text={'    ...    '} userSent={false} avatarHidden />
      )}
      {character.detoured_character !== undefined &&
        character.detoured_character !== '0' && (
          <>
            <Image
              style={[
                styles.hand,
                currentCharacterSpeakingState === SpeakingState.Speaking &&
                  styles.isSpeaking,
              ]}
              source={handReference}
              alt="Hand"
            />
            <Image
              style={styles.character}
              source={{ uri: character.detoured_character }}
              alt="Character photo"
            />
          </>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    position: 'relative',
    // backgroundColor: 'red',
  },
  viewSmaller: {
    marginBottom: -60,
  },
  hand: {
    height: 190,
    width: 132,
    position: 'absolute',
    left: '65%',
    bottom: -108,
    transform: [{ rotate: '0deg' }],
    transformOrigin: '25% 25%',
    // backgroundColor: 'green',
    // zIndex: 22,
  },
  isSpeaking: {
    transform: [{ rotate: '-110deg' }],
  },
  character: {
    left: 0,
    bottom: 0,
    width: 150,
    height: 250,
    // opacity: 0,
  },
  avatar: {
    margin: Sizes.padding,
  },
});

export default AnimatedCharacter;
