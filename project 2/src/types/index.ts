export interface Game {
  id: number;
  title: string;
  location: string;
  distance: string;
  time: string;
  players: number;
  maxPlayers: number;
  level: string;
  type: string;
  organizer: string;
  price: string;
  tags: string[];
  rating: number;
}

export interface MatchGame extends Game {
  matchScore: number;
  matchReasons: string[];
  playerProfiles: Array<{
    name: string;
    level: string;
    avatar: string;
  }>;
}

export interface UserProfile {
  name: string;
  age: string;
  gender: string;
  level: string;
  gameType: string;
  playStyle: string[];
  socialStyle: string[];
  interests: string[];
}

export type Screen = 'login' | 'setup' | 'home' | 'match' | 'game' | 'profile'; 