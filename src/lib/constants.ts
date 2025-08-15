import type { EquipmentCategory, EquipmentType } from '@/types';

// Equipment categories with visual and behavioral configuration
export const EQUIPMENT_CATEGORIES: Record<EquipmentType, EquipmentCategory> = {
	weapon: {
		type: 'weapon',
		name: 'Weapon',
		description: 'Foil, épée, or sabre blades and components',
		icon: 'Sword',
		subtypes: ['blade', 'guard', 'grip', 'pommel', 'complete'],
		allowMultiple: true,
		weaponSpecific: true,
	},
	mask: {
		type: 'mask',
		name: 'Mask',
		description: 'Protective head gear with mesh and bib',
		icon: 'ShieldCheck',
		subtypes: ['standard', 'overlay', 'bib'],
		allowMultiple: true,
		weaponSpecific: false,
	},
	jacket: {
		type: 'jacket',
		name: 'Jacket',
		description: 'Protective upper body gear',
		icon: 'Shirt',
		subtypes: ['standard', '350N', '800N'],
		allowMultiple: true,
		weaponSpecific: false,
	},
	knickers: {
		type: 'knickers',
		name: 'Knickers',
		description: 'Protective leg wear',
		icon: 'Users', // Using as pants representation
		subtypes: ['standard', '350N', '800N'],
		allowMultiple: true,
		weaponSpecific: false,
	},
	glove: {
		type: 'glove',
		name: 'Glove',
		description: 'Hand protection for weapon control',
		icon: 'Hand',
		subtypes: ['weapon-hand', 'off-hand'],
		allowMultiple: true,
		weaponSpecific: false,
	},
	plastron: {
		type: 'plastron',
		name: 'Plastron',
		description: 'Under-arm protector worn beneath jacket',
		icon: 'Shield',
		subtypes: ['under-arm', 'half', 'full'],
		allowMultiple: true,
		weaponSpecific: false,
	},
	'body-cord': {
		type: 'body-cord',
		name: 'Body Cord',
		description: 'Electrical connection for scoring',
		icon: 'Cable',
		subtypes: ['weapon-cord', 'mask-cord'],
		allowMultiple: true,
		weaponSpecific: true,
	},
	shoes: {
		type: 'shoes',
		name: 'Shoes',
		description: 'Specialized footwear for fencing',
		icon: 'Footprints',
		subtypes: ['court', 'fencing-specific'],
		allowMultiple: true,
		weaponSpecific: false,
	},
	bag: {
		type: 'bag',
		name: 'Bag',
		description: 'Equipment storage and transport',
		icon: 'Backpack',
		subtypes: ['weapon-bag', 'gear-bag', 'rolling-bag'],
		allowMultiple: true,
		weaponSpecific: false,
	},
	lame: {
		type: 'lame',
		name: 'Lamé',
		description: 'Conductive vest for foil and sabre',
		icon: 'Zap',
		subtypes: ['jacket', 'vest'],
		allowMultiple: true,
		weaponSpecific: true,
	},
	'chest-protector': {
		type: 'chest-protector',
		name: 'Chest Protector',
		description: 'Hard plastic chest protection',
		icon: 'Heart',
		subtypes: ['male', 'female'],
		allowMultiple: true,
		weaponSpecific: false,
	},
	socks: {
		type: 'socks',
		name: 'Socks',
		description: 'Knee-high fencing socks',
		icon: 'Minus', // Simple line representation
		subtypes: ['crew', 'knee-high'],
		allowMultiple: true,
		weaponSpecific: false,
	},
	other: {
		type: 'other',
		name: 'Other',
		description: 'Miscellaneous equipment and tools',
		icon: 'Package',
		subtypes: ['tool', 'accessory', 'maintenance'],
		allowMultiple: true,
		weaponSpecific: false,
	},
};

// Primary equipment categories (larger/more prominent display)
export const PRIMARY_EQUIPMENT_TYPES: EquipmentType[] = [
	'weapon',
	'mask',
	'jacket',
	'knickers',
	'plastron',
	'body-cord',
];

// Auxiliary equipment categories (smaller display)
export const AUXILIARY_EQUIPMENT_TYPES: EquipmentType[] = [
	'lame',
	'glove',
	'chest-protector',
	'shoes',
	'socks',
	'bag',
	'other',
];

// Priority order for displaying equipment categories
export const EQUIPMENT_DISPLAY_ORDER: EquipmentType[] = [
	...PRIMARY_EQUIPMENT_TYPES,
	...AUXILIARY_EQUIPMENT_TYPES,
];

// Color schemes for equipment status
export const EQUIPMENT_STATUS_COLORS = {
	active: {
		bg: 'bg-green-50 dark:bg-green-950',
		border: 'border-green-200 dark:border-green-800',
		text: 'text-green-700 dark:text-green-300',
		icon: 'text-green-500',
	},
	repair: {
		bg: 'bg-amber-50 dark:bg-amber-950',
		border: 'border-amber-200 dark:border-amber-800',
		text: 'text-amber-700 dark:text-amber-300',
		icon: 'text-amber-500',
	},
	retired: {
		bg: 'bg-gray-50 dark:bg-gray-950',
		border: 'border-gray-200 dark:border-gray-800',
		text: 'text-gray-500 dark:text-gray-400',
		icon: 'text-gray-400',
	},
} as const;

// Weapon-specific colors
export const WEAPON_COLORS = {
	foil: {
		primary: 'text-blue-600 dark:text-blue-400',
		bg: 'bg-blue-50 dark:bg-blue-950',
		border: 'border-blue-200 dark:border-blue-800',
	},
	epee: {
		primary: 'text-emerald-600 dark:text-emerald-400',
		bg: 'bg-emerald-50 dark:bg-emerald-950',
		border: 'border-emerald-200 dark:border-emerald-800',
	},
	sabre: {
		primary: 'text-purple-600 dark:text-purple-400',
		bg: 'bg-purple-50 dark:bg-purple-950',
		border: 'border-purple-200 dark:border-purple-800',
	},
} as const;
