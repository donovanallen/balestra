import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Armory',
};

export default function ArmoryPage() {
	return (
		<main className="container mx-auto max-w-6xl p-6 space-y-4">
			<h1 className="text-3xl font-bold tracking-tight">Armory</h1>
			<p className="text-muted-foreground">Coming soon.</p>
		</main>
	);
}
