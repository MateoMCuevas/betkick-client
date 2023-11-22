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

export interface Match {
  "score": Score;
  "utcDate": string;
  "competition": Competition;
  "homeTeam": Team;
  "awayTeam": Team;
}

export class User {
  email!: number;
  name!: string;
}
