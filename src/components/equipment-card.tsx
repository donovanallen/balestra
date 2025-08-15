'use client';

import * as React from 'react';
import {
	Plus,
	Edit,
	Trash2,
	CheckCircle,
	AlertTriangle,
	Settings,
	Star,
	StarOff,
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type {
	Equipment,
	EquipmentCategory,
	EquipmentDisplayState,
} from '@/types';
import { EQUIPMENT_STATUS_COLORS, WEAPON_COLORS } from '@/lib/constants';

interface EquipmentCardProps {
	displayState: EquipmentDisplayState;
	onAddItem: () => void;
	onEditItem: (item: Equipment) => void;
	onRemoveItem: (item: Equipment) => void;
	onEquipItem: (item: Equipment) => void;
	className?: string;
}

function EquipmentIcon({
	iconName,
	isEquipped,
	className,
}: {
	iconName: string;
	isEquipped: boolean;
	className?: string;
}) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Package;

	return (
		<div
			className={cn(
				'relative p-4 rounded-lg transition-all duration-200',
				isEquipped
					? 'bg-primary/10 border-2 border-primary'
					: 'bg-muted/50 border-2 border-dashed border-muted-foreground/30',
				className
			)}
		>
			<IconComponent
				className={cn(
					'w-8 h-8 mx-auto transition-colors',
					isEquipped ? 'text-primary' : 'text-muted-foreground/50'
				)}
			/>
			{isEquipped && (
				<div className="absolute -top-1 -right-1">
					<CheckCircle className="w-4 h-4 text-green-500 bg-background rounded-full" />
				</div>
			)}
		</div>
	);
}

function EquipmentSubCard({
	item,
	isEquipped,
	onEdit,
	onRemove,
	onEquip,
}: {
	item: Equipment;
	isEquipped: boolean;
	onEdit: (item: Equipment) => void;
	onRemove: (item: Equipment) => void;
	onEquip: (item: Equipment) => void;
}) {
	const statusColors = EQUIPMENT_STATUS_COLORS[item.status];
	const weaponColors = item.weapon ? WEAPON_COLORS[item.weapon] : null;

	return (
		<Card
			className={cn(
				'group relative overflow-hidden transition-all duration-200 hover:shadow-md',
				statusColors.bg,
				statusColors.border,
				isEquipped && 'ring-2 ring-primary ring-offset-2'
			)}
		>
			<CardContent className="p-3 overflow-hidden">
				<div className="flex items-start justify-between gap-2">
					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2 mb-1">
							<h4
								className={cn(
									'font-medium text-sm truncate',
									statusColors.text
								)}
							>
								{item.brand} {item.model || item.subtype}
							</h4>
							{isEquipped && (
								<Star className="w-3 h-3 text-yellow-500 fill-current shrink-0" />
							)}
						</div>

						<div className="flex items-center gap-2 mb-2 flex-wrap">
							{item.weapon && (
								<Badge
									variant="outline"
									className={cn('text-xs shrink-0', weaponColors?.primary)}
								>
									{item.weapon}
								</Badge>
							)}
							<Badge variant="secondary" className="text-xs shrink-0">
								{item.status}
							</Badge>
							{item.cost && (
								<span className="text-xs text-muted-foreground shrink-0">
									${item.cost}
								</span>
							)}
						</div>
					</div>

					<div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
						{!isEquipped && (
							<Button
								size="sm"
								variant="ghost"
								onClick={() => onEquip(item)}
								className="h-6 w-6 p-0"
								title="Equip this item"
							>
								<StarOff className="w-3 h-3" />
							</Button>
						)}
						<Button
							size="sm"
							variant="ghost"
							onClick={() => onEdit(item)}
							className="h-6 w-6 p-0"
							title="Edit item"
						>
							<Edit className="w-3 h-3" />
						</Button>
						<Button
							size="sm"
							variant="ghost"
							onClick={() => onRemove(item)}
							className="h-6 w-6 p-0 text-destructive hover:text-destructive"
							title="Remove item"
						>
							<Trash2 className="w-3 h-3" />
						</Button>
					</div>
				</div>

				{item.notes && (
					<p className="text-xs text-muted-foreground mt-2 line-clamp-2 break-words">
						{item.notes}
					</p>
				)}

				{item.maintenanceReminders.length > 0 && (
					<div className="flex items-center gap-1 mt-2">
						<AlertTriangle className="w-3 h-3 text-amber-500 shrink-0" />
						<span className="text-xs text-amber-600 dark:text-amber-400 truncate">
							{item.maintenanceReminders.length} reminder(s)
						</span>
					</div>
				)}
			</CardContent>
		</Card>
	);
}

export function EquipmentCard({
	displayState,
	onAddItem,
	onEditItem,
	onRemoveItem,
	onEquipItem,
	className,
}: EquipmentCardProps) {
	const { category, items, equippedItem, isEmpty, needsMaintenance } =
		displayState;

	return (
		<Card
			className={cn(
				'group transition-all duration-200 hover:shadow-lg overflow-hidden',
				isEmpty && 'border-dashed',
				className
			)}
		>
			<CardHeader className="pb-4">
				<div className="flex items-start justify-between gap-3">
					<div className="flex items-start gap-3 min-w-0 flex-1">
						<EquipmentIcon
							iconName={category.icon}
							isEquipped={!!equippedItem}
							className="flex-shrink-0"
						/>

						<div className="flex-1 min-w-0">
							<h3 className="font-semibold text-lg truncate">
								{category.name}
							</h3>
							<p className="text-sm text-muted-foreground line-clamp-2 break-words">
								{category.description}
							</p>

							<div className="flex items-center gap-2 mt-2 flex-wrap">
								<Badge variant="outline" className="text-xs shrink-0">
									{items.length} item{items.length !== 1 ? 's' : ''}
								</Badge>

								{needsMaintenance > 0 && (
									<Badge variant="destructive" className="text-xs shrink-0">
										<AlertTriangle className="w-3 h-3 mr-1" />
										{needsMaintenance} maintenance
									</Badge>
								)}

								{category.weaponSpecific && (
									<Badge variant="secondary" className="text-xs shrink-0">
										Weapon-specific
									</Badge>
								)}
							</div>
						</div>
					</div>

					<div className="flex items-center gap-2 shrink-0">
						<Button
							size="sm"
							variant="outline"
							onClick={onAddItem}
							className="opacity-70 group-hover:opacity-100 transition-opacity"
						>
							<Plus className="w-4 h-4 mr-1" />
							Add
						</Button>

						{items.length > 0 && (
							<Button
								size="sm"
								variant="ghost"
								className="opacity-0 group-hover:opacity-100 transition-opacity"
								title="Equipment settings"
							>
								<Settings className="w-4 h-4" />
							</Button>
						)}
					</div>
				</div>

				{equippedItem && (
					<div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
						<div className="flex items-center gap-2">
							<CheckCircle className="w-4 h-4 text-green-500" />
							<span className="font-medium text-sm">Currently Equipped:</span>
						</div>
						<div className="mt-1 text-sm text-muted-foreground break-words">
							<span className="truncate">
								{equippedItem.brand}{' '}
								{equippedItem.model || equippedItem.subtype}
							</span>
							{equippedItem.weapon && (
								<Badge
									variant="outline"
									className={cn(
										'ml-2 text-xs',
										WEAPON_COLORS[equippedItem.weapon]?.primary
									)}
								>
									{equippedItem.weapon}
								</Badge>
							)}
						</div>
					</div>
				)}
			</CardHeader>

			<CardContent className="overflow-hidden">
				{isEmpty ? (
					<div className="flex flex-col items-center justify-center py-8 text-center">
						<div className="p-4 rounded-full bg-muted/50 mb-3">
							<Plus className="w-6 h-6 text-muted-foreground" />
						</div>
						<h4 className="font-medium text-sm mb-1">
							No {category.name.toLowerCase()} added
						</h4>
						<p className="text-xs text-muted-foreground mb-4 max-w-sm break-words">
							Add your first {category.name.toLowerCase()} to start tracking
							your equipment
						</p>
						<Button onClick={onAddItem} size="sm">
							<Plus className="w-4 h-4 mr-1" />
							Add {category.name}
						</Button>
					</div>
				) : (
					<div className="space-y-3 overflow-hidden">
						{items.map((item) => (
							<EquipmentSubCard
								key={item.id}
								item={item}
								isEquipped={item.id === equippedItem?.id}
								onEdit={onEditItem}
								onRemove={onRemoveItem}
								onEquip={onEquipItem}
							/>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
