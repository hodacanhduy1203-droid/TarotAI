export interface TarotCardData {
  id: string;
  name_vi: string; // Vietnamese name
  name_en: string; // English name (for image seeding)
  type: 'major' | 'minor';
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
  number?: number;
  meaningKeywords: string[];
  meaning_upright: string; // Ý nghĩa xuôi (tĩnh)
  meaning_reversed: string; // Ý nghĩa ngược (tĩnh)
}

export enum SpreadType {
  ONE_CARD = 'ONE_CARD',
  THREE_CARD = 'THREE_CARD',
  FIVE_CARD = 'FIVE_CARD',
}

export interface ReadingRequest {
  spread: SpreadType;
  question: string;
}

export interface DrawnCard {
  card: TarotCardData;
  position: number;
  positionName: string; // e.g., "Present", "Future"
  isReversed: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}