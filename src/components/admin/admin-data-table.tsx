'use client';

import { useState, useMemo } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table } from '@/components/ui/table';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Plus,
	Search,
	Edit,
	Trash2,
	MoreHorizontal,
	Filter,
	Download,
	Eye,
} from 'lucide-react';
import { mockEquipment } from '@/lib/mock-data';
import type { Equipment, Bout, Event, Profile } from '@/types';

type AdminSection = 'profiles' | 'bouts' | 'equipment' | 'events';

interface AdminDataTableProps {
	section: AdminSection;
}

// Mock data for demonstration
const mockProfiles: Profile[] = [
	{
		id: '1',
		name: 'John Doe',
		weaponPrimary: 'epee',
		division: 'Veteran',
		club: 'Metro Fencing Club',
		coach: 'Sarah Wilson',
		createdAt: new Date('2023-01-15'),
		updatedAt: new Date('2024-01-10'),
	},
];

const mockBouts: Bout[] = [
	{
		id: '1',
		opponentName: 'Alex Smith',
		date: new Date('2024-01-15'),
		tournamentName: 'Metro Open',
		weapon: 'epee',
		userScore: 15,
		opponentScore: 12,
		won: true,
		notes: 'Great bout, good control',
		location: 'Metro Fencing Club',
		type: 'tournament',
		createdAt: new Date('2024-01-15'),
		updatedAt: new Date('2024-01-15'),
	},
	{
		id: '2',
		opponentName: 'Maria Garcia',
		date: new Date('2024-01-12'),
		weapon: 'epee',
		userScore: 10,
		opponentScore: 15,
		won: false,
		notes: 'Need to work on distance',
		type: 'practice',
		createdAt: new Date('2024-01-12'),
		updatedAt: new Date('2024-01-12'),
	},
];

const mockEvents: Event[] = [
	{
		id: '1',
		title: 'Regional Championship',
		date: new Date('2024-02-15'),
		type: 'tournament',
		location: 'Convention Center',
		notes: 'Three weapon event',
		exported: false,
		createdAt: new Date('2024-01-10'),
		updatedAt: new Date('2024-01-10'),
	},
	{
		id: '2',
		title: 'Practice Session',
		date: new Date('2024-01-20'),
		type: 'practice',
		location: 'Metro Fencing Club',
		notes: 'Focus on footwork',
		exported: false,
		createdAt: new Date('2024-01-15'),
		updatedAt: new Date('2024-01-15'),
	},
];

export function AdminDataTable({ section }: AdminDataTableProps) {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedItem, setSelectedItem] = useState<any>(null);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

	const { data, columns, title, description } = useMemo(() => {
		switch (section) {
			case 'profiles':
				return {
					data: mockProfiles,
					title: 'User Profiles',
					description: 'Manage user profile information',
					columns: [
						{ key: 'name', label: 'Name' },
						{ key: 'weaponPrimary', label: 'Primary Weapon' },
						{ key: 'division', label: 'Division' },
						{ key: 'club', label: 'Club' },
						{ key: 'coach', label: 'Coach' },
						{ key: 'createdAt', label: 'Created' },
					],
				};

			case 'bouts':
				return {
					data: mockBouts,
					title: 'Bout Records',
					description: 'Manage bout history and results',
					columns: [
						{ key: 'opponentName', label: 'Opponent' },
						{ key: 'date', label: 'Date' },
						{ key: 'weapon', label: 'Weapon' },
						{ key: 'userScore', label: 'Your Score' },
						{ key: 'opponentScore', label: 'Opp Score' },
						{ key: 'won', label: 'Result' },
						{ key: 'type', label: 'Type' },
						{ key: 'tournamentName', label: 'Tournament' },
					],
				};

			case 'equipment':
				return {
					data: mockEquipment,
					title: 'Equipment Inventory',
					description: 'Manage equipment items and maintenance',
					columns: [
						{ key: 'type', label: 'Type' },
						{ key: 'brand', label: 'Brand' },
						{ key: 'model', label: 'Model' },
						{ key: 'status', label: 'Status' },
						{ key: 'cost', label: 'Cost' },
						{ key: 'purchaseDate', label: 'Purchase Date' },
						{ key: 'isEquipped', label: 'Equipped' },
					],
				};

			case 'events':
				return {
					data: mockEvents,
					title: 'Calendar Events',
					description: 'Manage scheduled events and tournaments',
					columns: [
						{ key: 'title', label: 'Title' },
						{ key: 'date', label: 'Date' },
						{ key: 'type', label: 'Type' },
						{ key: 'location', label: 'Location' },
						{ key: 'exported', label: 'Exported' },
					],
				};

			default:
				return { data: [], columns: [], title: '', description: '' };
		}
	}, [section]);

	const filteredData = useMemo(() => {
		if (!searchTerm) return data;

		return data.filter((item: any) =>
			Object.values(item).some((value) =>
				String(value).toLowerCase().includes(searchTerm.toLowerCase())
			)
		);
	}, [data, searchTerm]);

	const formatCellValue = (value: any, key: string) => {
		if (value === null || value === undefined) return '-';

		switch (key) {
			case 'date':
			case 'purchaseDate':
			case 'createdAt':
			case 'updatedAt':
				return value instanceof Date ? value.toLocaleDateString() : value;

			case 'won':
				return value ? (
					<Badge variant="default">Win</Badge>
				) : (
					<Badge variant="destructive">Loss</Badge>
				);

			case 'isEquipped':
				return value ? (
					<Badge variant="default">Yes</Badge>
				) : (
					<Badge variant="secondary">No</Badge>
				);

			case 'exported':
				return value ? (
					<Badge variant="default">Yes</Badge>
				) : (
					<Badge variant="secondary">No</Badge>
				);

			case 'status':
				const statusVariant =
					value === 'active'
						? 'default'
						: value === 'repair'
						? 'destructive'
						: 'secondary';
				return <Badge variant={statusVariant}>{value}</Badge>;

			case 'type':
				return <Badge variant="outline">{value}</Badge>;

			case 'weaponPrimary':
			case 'weapon':
				return <Badge variant="outline">{value}</Badge>;

			case 'cost':
				return value ? `$${value}` : '-';

			default:
				return String(value);
		}
	};

	const handleEdit = (item: any) => {
		setSelectedItem(item);
		setIsEditModalOpen(true);
	};

	const handleDelete = (item: any) => {
		// Implement delete logic
		console.log('Delete item:', item);
	};

	const handleCreate = () => {
		setSelectedItem(null);
		setIsCreateModalOpen(true);
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-bold">{title}</h2>
					<p className="text-muted-foreground">{description}</p>
				</div>
				<div className="flex items-center gap-2">
					<Button onClick={handleCreate} className="gap-2">
						<Plus className="h-4 w-4" />
						Add New
					</Button>
					<Button variant="outline" className="gap-2">
						<Download className="h-4 w-4" />
						Export
					</Button>
				</div>
			</div>

			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
								<Input
									placeholder="Search..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="pl-9 w-64"
								/>
							</div>
							<Button variant="outline" size="sm" className="gap-2">
								<Filter className="h-4 w-4" />
								Filter
							</Button>
						</div>
						<div className="text-sm text-muted-foreground">
							{filteredData.length} of {data.length} items
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-b">
									{columns.map((column) => (
										<th
											key={column.key}
											className="text-left py-3 px-4 font-medium"
										>
											{column.label}
										</th>
									))}
									<th className="text-right py-3 px-4 font-medium">Actions</th>
								</tr>
							</thead>
							<tbody>
								{filteredData.map((item: any) => (
									<tr key={item.id} className="border-b hover:bg-muted/50">
										{columns.map((column) => (
											<td key={column.key} className="py-3 px-4">
												{formatCellValue(item[column.key], column.key)}
											</td>
										))}
										<td className="py-3 px-4">
											<div className="flex items-center justify-end gap-2">
												<Button
													variant="ghost"
													size="sm"
													onClick={() => handleEdit(item)}
													className="h-8 w-8 p-0"
												>
													<Edit className="h-4 w-4" />
												</Button>
												<Button
													variant="ghost"
													size="sm"
													onClick={() => handleDelete(item)}
													className="h-8 w-8 p-0 text-destructive hover:text-destructive"
												>
													<Trash2 className="h-4 w-4" />
												</Button>
												<Button
													variant="ghost"
													size="sm"
													className="h-8 w-8 p-0"
												>
													<MoreHorizontal className="h-4 w-4" />
												</Button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{filteredData.length === 0 && (
						<div className="text-center py-8">
							<p className="text-muted-foreground">No items found</p>
							{searchTerm && (
								<Button
									variant="outline"
									size="sm"
									onClick={() => setSearchTerm('')}
									className="mt-2"
								>
									Clear search
								</Button>
							)}
						</div>
					)}
				</CardContent>
			</Card>

			{/* Edit Modal */}
			<Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>Edit {section.slice(0, -1)}</DialogTitle>
						<DialogDescription>
							Make changes to this {section.slice(0, -1)} item.
						</DialogDescription>
					</DialogHeader>
					<div className="py-4">
						<p className="text-sm text-muted-foreground">
							Edit form for{' '}
							{selectedItem?.name ||
								selectedItem?.title ||
								selectedItem?.opponentName ||
								'item'}{' '}
							would go here.
						</p>
						{/* TODO: Implement dynamic form based on section and item */}
					</div>
				</DialogContent>
			</Dialog>

			{/* Create Modal */}
			<Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>Create New {section.slice(0, -1)}</DialogTitle>
						<DialogDescription>
							Add a new {section.slice(0, -1)} to your collection.
						</DialogDescription>
					</DialogHeader>
					<div className="py-4">
						<p className="text-sm text-muted-foreground">
							Create form for new {section.slice(0, -1)} would go here.
						</p>
						{/* TODO: Implement dynamic form based on section */}
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
