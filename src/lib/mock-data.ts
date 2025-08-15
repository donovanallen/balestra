import type { Equipment, EquipmentDisplayState } from '@/types';
import { EQUIPMENT_CATEGORIES, EQUIPMENT_DISPLAY_ORDER } from '@/lib/constants';

// Mock equipment data for demonstration
export const mockEquipment: Equipment[] = [
  // Weapons
  {
    id: '1',
    type: 'weapon',
    subtype: 'complete',
    brand: 'Leon Paul',
    model: 'Standard Épée',
    purchaseDate: new Date('2023-01-15'),
    cost: 285,
    status: 'active',
    notes: 'My primary competition épée, recently tuned',
    maintenanceReminders: [],
    isEquipped: true,
    weapon: 'epee',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: '2',
    type: 'weapon',
    subtype: 'complete',
    brand: 'STM',
    model: 'Foil FIE',
    purchaseDate: new Date('2023-06-20'),
    cost: 195,
    status: 'active',
    notes: 'Backup foil for practice',
    maintenanceReminders: [],
    isEquipped: false,
    weapon: 'foil',
    createdAt: new Date('2023-06-20'),
    updatedAt: new Date('2023-12-05'),
  },
  {
    id: '3',
    type: 'weapon',
    subtype: 'blade',
    brand: 'Vniti',
    model: 'Sabre Blade',
    purchaseDate: new Date('2023-08-10'),
    cost: 45,
    status: 'repair',
    notes: 'Blade tip needs replacement',
    maintenanceReminders: [
      {
        id: 'maintenance-1',
        equipmentId: '3',
        type: 'repair',
        description: 'Replace blade tip',
        dueDate: new Date('2024-01-20'),
        completed: false,
      }
    ],
    isEquipped: false,
    weapon: 'sabre',
    createdAt: new Date('2023-08-10'),
    updatedAt: new Date('2024-01-05'),
  },

  // Masks
  {
    id: '4',
    type: 'mask',
    subtype: 'standard',
    brand: 'Allstar',
    model: 'FIE 1600N',
    purchaseDate: new Date('2022-09-15'),
    cost: 165,
    status: 'active',
    notes: 'Very comfortable fit, good ventilation',
    maintenanceReminders: [],
    isEquipped: true,
    createdAt: new Date('2022-09-15'),
    updatedAt: new Date('2023-11-20'),
  },
  {
    id: '5',
    type: 'mask',
    subtype: 'overlay',
    brand: 'Leon Paul',
    model: 'Mask Overlay',
    purchaseDate: new Date('2023-03-05'),
    cost: 25,
    status: 'active',
    notes: 'Conductive overlay for épée competitions',
    maintenanceReminders: [],
    isEquipped: false,
    createdAt: new Date('2023-03-05'),
    updatedAt: new Date('2023-10-15'),
  },

  // Jackets
  {
    id: '6',
    type: 'jacket',
    subtype: '800N',
    brand: 'Uhlmann',
    model: 'Tournament 800N',
    purchaseDate: new Date('2023-02-10'),
    cost: 245,
    status: 'active',
    notes: 'Competition jacket, excellent fit',
    maintenanceReminders: [],
    isEquipped: true,
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2024-01-08'),
  },

  // Lamé
  {
    id: '7',
    type: 'lame',
    subtype: 'jacket',
    brand: 'Leon Paul',
    model: 'Conductive Jacket',
    purchaseDate: new Date('2023-04-15'),
    cost: 185,
    status: 'active',
    notes: 'For foil and sabre competitions',
    maintenanceReminders: [],
    isEquipped: true,
    weapon: 'foil',
    createdAt: new Date('2023-04-15'),
    updatedAt: new Date('2023-12-20'),
  },

  // Gloves
  {
    id: '8',
    type: 'glove',
    subtype: 'weapon-hand',
    brand: 'STM',
    model: 'Competition Glove',
    purchaseDate: new Date('2023-01-20'),
    cost: 35,
    status: 'active',
    notes: 'Size M, good grip',
    maintenanceReminders: [],
    isEquipped: true,
    createdAt: new Date('2023-01-20'),
    updatedAt: new Date('2023-09-10'),
  },

  // Body Cords
  {
    id: '9',
    type: 'body-cord',
    subtype: 'weapon-cord',
    brand: 'Leon Paul',
    model: 'Épée Body Cord',
    purchaseDate: new Date('2023-05-10'),
    cost: 45,
    status: 'active',
    notes: 'Primary épée cord, very reliable',
    maintenanceReminders: [],
    isEquipped: true,
    weapon: 'epee',
    createdAt: new Date('2023-05-10'),
    updatedAt: new Date('2023-12-01'),
  },
  {
    id: '10',
    type: 'body-cord',
    subtype: 'weapon-cord',
    brand: 'STM',
    model: 'Foil Body Cord',
    purchaseDate: new Date('2023-07-20'),
    cost: 35,
    status: 'repair',
    notes: 'Intermittent connection issue',
    maintenanceReminders: [
      {
        id: 'maintenance-2',
        equipmentId: '10',
        type: 'repair',
        description: 'Fix connection issue',
        dueDate: new Date('2024-01-15'),
        completed: false,
      }
    ],
    isEquipped: false,
    weapon: 'foil',
    createdAt: new Date('2023-07-20'),
    updatedAt: new Date('2024-01-03'),
  },

  // Shoes
  {
    id: '11',
    type: 'shoes',
    subtype: 'fencing-specific',
    brand: 'Adidas',
    model: 'Fencing Pro',
    purchaseDate: new Date('2022-12-05'),
    cost: 120,
    status: 'active',
    notes: 'Size 10.5, excellent traction',
    maintenanceReminders: [],
    isEquipped: true,
    createdAt: new Date('2022-12-05'),
    updatedAt: new Date('2023-08-15'),
  },

  // Plastron
  {
    id: '12',
    type: 'plastron',
    subtype: 'under-arm',
    brand: 'Allstar',
    model: 'Plastron 350N',
    purchaseDate: new Date('2023-01-30'),
    cost: 55,
    status: 'active',
    notes: 'Comfortable under-arm protection',
    maintenanceReminders: [],
    isEquipped: true,
    createdAt: new Date('2023-01-30'),
    updatedAt: new Date('2023-10-25'),
  },
];

// Transform equipment data into display states for UI
export function getEquipmentDisplayStates(equipment: Equipment[] = mockEquipment): EquipmentDisplayState[] {
  return EQUIPMENT_DISPLAY_ORDER.map(equipmentType => {
    const category = EQUIPMENT_CATEGORIES[equipmentType];
    const categoryItems = equipment.filter(item => item.type === equipmentType);
    const equippedItem = categoryItems.find(item => item.isEquipped);
    const needsMaintenance = categoryItems.filter(item => 
      item.maintenanceReminders.some(reminder => !reminder.completed)
    ).length;

    return {
      category,
      items: categoryItems,
      equippedItem,
      isEmpty: categoryItems.length === 0,
      needsMaintenance,
    };
  });
}
