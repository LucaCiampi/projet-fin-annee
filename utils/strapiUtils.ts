import Config from '@/constants/Config';

const token = process.env.EXPO_PUBLIC_STRAPI_TOKEN;
/**
 * When SQLite is unavailable, fetches data from the Strapi CMS server
 * @param endpoint the endpoint of the strapi REST API
 * @returns unkown data
 */
export const fetchDataFromStrapi = async (endpoint: string) => {
  try {
    const response = await fetch(Config.STRAPI_API_URL + endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    console.log('🛜 fetchDataFromStrapi', endpoint, data);
    return data;
  } catch (error) {
    console.error('Error fetching data from Strapi', error);
    throw error;
  }
};

export const normalizeCharacterFromStrapi = (data: any): Character[] => {
  return data.data.map((item: any) => ({
    id: item.id,
    name: item.attributes.name,
    surname: item.attributes.surname,
    birth: item.attributes.birth,
    detoured_character:
      item.attributes.detoured_character.data !== null
        ? Config.STRAPI_DOMAIN_URL +
          item.attributes.detoured_character.data.attributes.url
        : undefined,
    death: item.attributes.death,
    avatar_url:
      item.attributes.avatar.data !== null
        ? Config.STRAPI_DOMAIN_URL + item.attributes.avatar.data.attributes.url
        : undefined,
    city: item.attributes.city,
  }));
};

export const normalizeDialogueFromStrapi = (data: any): Dialogue[] => {
  return data.data.map((item: any) => ({
    id: item.id,
    answers: item.attributes.answers,
    character: item.attributes.character,
    follow_up: item.attributes.follow_up,
    question_short: item.attributes.question_short,
    questions: item.attributes.questions,
  }));
};

// TODO: deprecated
export const normalizeCurrentConversationStateFromStrapi = (
  data: any
): CurrentConversationState[] => {
  return data.data.map((item: any) => ({
    character_id: item.attributes.character.data.id,
    dialogues_id: item.attributes.dialogues.data.map(
      (dialogue: any) => dialogue.id
    ),
    following_dialogues_id: item.attributes.dialogues.data.map(
      (dialogue: any) => dialogue.id
    ),
  }));
};

export const normalizeDialogueAnchorFromStrapi = (
  data: any
): DialogueAnchor[] => {
  return data.data.map((item: any) => ({
    id: item.id,
    character_id: item.attributes.character.data.id,
    dialogues_id: item.attributes.dialogues.data.map(
      (dialogue: any) => dialogue.id
    ),
    trust_level: item.attributes.trust_level,
  }));
};

export const normalizeCharacterProfileFromStrapi = (data: any): Character => {
  const item = data.data;
  return {
    id: item.id,
    name: item.attributes.name,
    surname: item.attributes.surname,
    birth: item.attributes.birth,
    death: item.attributes.death,
    avatar_url:
      item.attributes.avatar?.data != null
        ? Config.STRAPI_DOMAIN_URL + item.attributes.avatar.data.attributes.url
        : undefined,
    profile: item.attributes.Profil,
    detoured_character: item.attributes.detoured_character,
  };
};

export const normalizeLandmarksFromStrapi = (data: any): Landmark[] => {
  return data.data.map((item: any) => ({
    id: item.id,
    name: item.attributes.name,
    coordinates: {
      latitude: item.attributes.latitude,
      longitude: item.attributes.longitude,
    },
    description: item.attributes.description,
    thumbnail:
      item.attributes.thumbnail?.data != null
        ? Config.STRAPI_DOMAIN_URL +
          item.attributes.thumbnail.data.attributes.url
        : undefined,
    category: item.attributes.category,
    characters: item.attributes.characters.data.map((character: any) => ({
      id: character.id,
      ...character.attributes,
    })),
    experience: item.attributes.experience.data,
  }));
};

export const normalizeExperienceFromStrapi = (data: any): Experience => {
  const item = data.data;
  return {
    id: item.id,
    steps: item.attributes.step.map((step: any) => step),
  };
};

export const normalizeAnecdotesFromStrapi = (data: any): Anecdote[] => {
  return data.data.map((item: any) => ({
    id: item.id,
    title: item.attributes.title,
    coordinates: {
      latitude: item.attributes.latitude,
      longitude: item.attributes.longitude,
    },
    description: item.attributes.description,
    thumbnail:
      item.attributes.thumbnail?.data != null
        ? Config.STRAPI_DOMAIN_URL +
          item.attributes.thumbnail.data.attributes.url
        : undefined,
  }));
};
