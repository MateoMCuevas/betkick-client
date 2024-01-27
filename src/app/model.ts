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
  code: string;
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

export interface MatchOdds {
  "awayWinsOdds": number;
  "homeWinsOdds": number;
  "drawOdds": number;

}

export interface Match {
  "id": number;
  "score": Score;
  "utcDate": string;
  "competition": Competition;
  "homeTeam": Team;
  "awayTeam": Team;
  "odds": MatchOdds;
}

export class User {
  sub!: string;
  email!: number;
  name!: string;
}

export interface Standing{
  "position": number;
  "team": Team;
  "won": number;
  "lost": number;
  "points": number;
  "goalsFor": number;
  "goalsAgainst": number;
  "goalDifference": number;
}
export interface CompetitionStandings{
  "group": string;
  "standings": Standing[];
}

export interface UserBetSummary{
  "name":string;
  "earnings": number;
  "betsWon": number;
  "betsLost":number;
}
