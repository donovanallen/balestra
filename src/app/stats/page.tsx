import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Stats',
};

export default function StatsPage() {
	return (
		<main className="container mx-auto max-w-6xl p-6 space-y-4">
			<h1 className="text-3xl font-bold tracking-tight">My Statistics</h1>

			{/* STATS TABLE */}
			<div className="rounded-md border">
				<table className="w-full">
					<thead>
						<tr className="border-b bg-muted/50">
							<th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
								Date
							</th>
							<th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
								Opponent
							</th>
							<th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
								Weapon
							</th>
							<th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
								Score
							</th>
							<th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
								Result
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="h-12 px-4 text-left align-middle"></td>
							<td className="h-12 px-4 text-left align-middle"></td>
							<td className="h-12 px-4 text-left align-middle"></td>
							<td className="h-12 px-4 text-left align-middle"></td>
							<td className="h-12 px-4 text-left align-middle"></td>
						</tr>
					</tbody>
				</table>
			</div>
		</main>
	);
}
