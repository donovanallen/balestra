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

export interface Bout {
  id: string;
  opponentName: string;
  date: Date;
  tournamentName?: string;
  weapon: Weapon;
  userScore: number;
  opponentScore: number;
  won: boolean;
  notes?: string;
  location?: string;
  type: BoutType;
  createdAt: Date;
  updatedAt: Date;
}

export interface Equipment {
  id: string;
  type: EquipmentType;
  subtype?: string;
  brand?: string;
  model?: string;
  purchaseDate?: Date;
  cost?: number;
  status: EquipmentStatus;
  notes?: string;
  maintenanceReminders: MaintenanceReminder[];
  isEquipped: boolean; // Whether this item is currently equipped/active
  weapon?: Weapon; // For weapon-specific equipment
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  id: string;
  title: string;
  date: Date;
  endDate?: Date;
  type: EventType;
  location?: string;
  notes?: string;
  exported: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MaintenanceReminder {
  id: string;
  equipmentId: string;
  type: string;
  description: string;
  dueDate: Date;
  completed: boolean;
}

// Enhanced equipment categories for comprehensive fencing gear
export interface EquipmentCategory {
  type: EquipmentType;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  subtypes?: string[];
  allowMultiple: boolean; // Whether multiple items can be equipped
  weaponSpecific?: boolean; // Whether this equipment type is weapon-specific
}

// Equipment display state for UI
export interface EquipmentDisplayState {
  category: EquipmentCategory;
  items: Equipment[];
  equippedItem?: Equipment;
  isEmpty: boolean;
  needsMaintenance: number; // Count of items needing maintenance
}

// Enums and types
export type Weapon = 'foil' | 'epee' | 'sabre';
export type BoutType = 'practice' | 'lesson' | 'tournament' | 'open-bouting';

export type EquipmentType = 
  | 'weapon'
  | 'mask' 
  | 'jacket'
  | 'knickers'
  | 'glove'
  | 'plastron'
  | 'body-cord'
  | 'shoes'
  | 'bag'
  | 'lame'
  | 'chest-protector'
  | 'socks'
  | 'other';

export type EquipmentStatus = 'active' | 'repair' | 'retired';
export type EventType = 'practice' | 'lesson' | 'tournament' | 'open-bouting' | 'other';

// Equipment subtypes for better categorization
export const EQUIPMENT_SUBTYPES: Record<EquipmentType, string[]> = {
  'weapon': ['blade', 'guard', 'grip', 'pommel', 'complete'],
  'mask': ['standard', 'overlay', 'bib'],
  'jacket': ['standard', '350N', '800N'],
  'knickers': ['standard', '350N', '800N'],
  'glove': ['weapon-hand', 'off-hand'],
  'plastron': ['under-arm', 'half', 'full'],
  'body-cord': ['weapon-cord', 'mask-cord'],
  'shoes': ['court', 'fencing-specific'],
  'bag': ['weapon-bag', 'gear-bag', 'rolling-bag'],
  'lame': ['jacket', 'vest'],
  'chest-protector': ['male', 'female'],
  'socks': ['crew', 'knee-high'],
  'other': ['tool', 'accessory', 'maintenance']
};