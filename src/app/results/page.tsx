'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AddResultModal } from '@/components/add-result-modal';
import { type Bout } from '@/types';

// Mock initial data
const initialBouts: Bout[] = [
	{
		id: '1',
		opponentName: 'Sarah Johnson',
		date: new Date('2024-12-15T14:30:00'),
		weapon: 'epee',
		userScore: 15,
		opponentScore: 12,
		won: true,
		tournamentName: 'Winter Classic',
		type: 'tournament',
		notes: 'Great match! Improved my distance control significantly.',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: '2',
		opponentName: 'Marcus Chen',
		date: new Date('2024-12-12T16:15:00'),
		weapon: 'epee',
		userScore: 10,
		opponentScore: 15,
		won: false,
		tournamentName: 'Winter Classic',
		type: 'tournament',
		notes: 'Need to work on my counter-attacks. Lost focus in the middle.',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: '3',
		opponentName: 'Elena Rodriguez',
		date: new Date('2024-12-08T19:00:00'),
		weapon: 'foil',
		userScore: 15,
		opponentScore: 8,
		won: true,
		tournamentName: 'Practice Bout',
		type: 'practice',
		notes: 'Excellent practice session. New blade feels much better.',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: '4',
		opponentName: 'David Thompson',
		date: new Date('2024-12-05T15:45:00'),
		weapon: 'sabre',
		userScore: 15,
		opponentScore: 13,
		won: true,
		tournamentName: 'Regional Open',
		type: 'tournament',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: '5',
		opponentName: 'Anna Kowalski',
		date: new Date('2024-12-01T18:30:00'),
		weapon: 'epee',
		userScore: 12,
		opponentScore: 15,
		won: false,
		tournamentName: 'Practice Bout',
		type: 'practice',
		notes: 'Fast opponent. Need to practice my timing against quicker fencers.',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

const weaponColors = {
	foil: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
	epee: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
	sabre: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
};

const weaponLabels = {
	foil: 'Foil',
	epee: 'Épée',
	sabre: 'Sabre',
};

export default function ResultsPage() {
	const [bouts, setBouts] = useState<Bout[]>(initialBouts);

	const handleAddResult = (newBout: Bout) => {
		setBouts((prev) => [newBout, ...prev]);
	};

	return (
		<main className="container mx-auto max-w-6xl p-6 space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Results</h1>
					<p className="text-muted-foreground mt-1">
						Track and analyze your fencing bout results
					</p>
				</div>
				<AddResultModal onAddResult={handleAddResult} />
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Date</TableHead>
							<TableHead>Opponent</TableHead>
							<TableHead>Weapon</TableHead>
							<TableHead>Score</TableHead>
							<TableHead>Result</TableHead>
							<TableHead>Event</TableHead>
							<TableHead>Notes</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{bouts.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={7}
									className="text-center py-8 text-muted-foreground"
								>
									No results recorded yet. Add your first bout result to get
									started!
								</TableCell>
							</TableRow>
						) : (
							bouts.map((bout) => (
								<TableRow key={bout.id}>
									<TableCell>
										<div className="font-medium">
											{format(bout.date, 'MMM d, yyyy')}
										</div>
										<div className="text-sm text-muted-foreground">
											{format(bout.date, 'h:mm a')}
										</div>
									</TableCell>
									<TableCell>
										<div className="font-medium">{bout.opponentName}</div>
										{bout.opponentNickname && (
											<div className="text-sm text-muted-foreground">
												&ldquo;{bout.opponentNickname}&rdquo;
											</div>
										)}
									</TableCell>
									<TableCell>
										<Badge
											variant="secondary"
											className={weaponColors[bout.weapon]}
										>
											{weaponLabels[bout.weapon]}
										</Badge>
									</TableCell>
									<TableCell>
										<div className="font-medium">
											{bout.userScore}-{bout.opponentScore}
										</div>
									</TableCell>
									<TableCell>
										<Badge
											variant={bout.won ? 'default' : 'destructive'}
											className={
												bout.won
													? 'bg-green-100 text-green-800 hover:bg-green-200'
													: ''
											}
										>
											{bout.won ? 'Victory' : 'Defeat'}
										</Badge>
									</TableCell>
									<TableCell>
										<div className="text-muted-foreground">
											{bout.tournamentName || 'Practice Bout'}
										</div>
										<div className="text-xs text-muted-foreground capitalize">
											{bout.type}
										</div>
									</TableCell>
									<TableCell>
										<div className="text-sm text-muted-foreground max-w-xs">
											{bout.notes ? (
												<div className="truncate" title={bout.notes}>
													{bout.notes}
												</div>
											) : (
												<span className="italic text-muted-foreground/70">
													No notes
												</span>
											)}
										</div>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			{bouts.length > 0 && (
				<div className="flex justify-center">
					<p className="text-sm text-muted-foreground">
						Showing {bouts.length} result{bouts.length !== 1 ? 's' : ''}
					</p>
				</div>
			)}
		</main>
	);
}
