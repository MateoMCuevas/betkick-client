export interface Team {
  "name": string;
  "shortName": string;
  "tla": string;
  "crest": string;
}

export interface Competition {
  id: number;
  name: string;
  emblem: string;
}

export interface Score {
  home: number;
  away: number;
}

 export enum Winner {
  HOME_TEAM = 'HOME_TEAM',
  AWAY_TEAM = 'AWAY_TEAM',
  DRAW = 'DRAW'
}

export interface Match {
  "id": number;
  "score": Score;
  "utcDate": string;
  "competition": Competition;
  "homeTeam": Team;
  "awayTeam": Team;
}

export class User {
  sub!: string;
  email!: number;
  name!: string;
}
