import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Profile',
};

export default function ProfilePage() {
	return (
		<main className="container mx-auto max-w-6xl p-6 space-y-4">
			<h1 className="text-3xl font-bold tracking-tight">Profile</h1>
			<Card>
				<CardHeader>
					<CardTitle>Full Name</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 gap-4">
						<div className="flex flex-col gap-2">
							<Label>Name</Label>
							<Input type="text" value="John Doe" />
						</div>
						<div className="flex flex-col gap-2">
							<Label>Email</Label>
							<Input type="email" value="john.doe@example.com" />
						</div>
					</div>
				</CardContent>
			</Card>
		</main>
	);
}
