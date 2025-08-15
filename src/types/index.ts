// Core type definitions for the fencing tracker app

export type Weapon = 'foil' | 'epee' | 'sabre';
export type BoutType = 'practice' | 'lesson' | 'tournament' | 'open-bouting';
export type EquipmentStatus = 'active' | 'repair' | 'retired';

export interface Bout {
  id: string;
  opponentName: string;
  opponentNickname?: string;
  opponentWeapon?: Weapon;
  opponentRanking?: string;
  opponentDivision?: string;
  date: Date;
  location?: string;
  tournamentName?: string;
  weapon: Weapon;
  userScore: number;
  opponentScore: number;
  won: boolean;
  notes?: string;
  type: BoutType;
  equipmentUsed?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BoutFormData {
  opponentName: string;
  opponentNickname?: string;
  opponentWeapon?: Weapon;
  opponentRanking?: string;
  opponentDivision?: string;
  date: Date;
  location?: string;
  tournamentName?: string;
  weapon: Weapon;
  userScore: number;
  opponentScore: number;
  notes?: string;
  type: BoutType;
  equipmentUsed?: string;
}

export interface Profile {
  id: string;
  name: string;
  weaponPrimary: Weapon;
  division?: string;
  club?: string;
  coach?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Equipment {
  id: string;
  type: string;
  subtype?: string;
  brand?: string;
  model?: string;
  purchaseDate?: Date;
  cost?: number;
  status: EquipmentStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
