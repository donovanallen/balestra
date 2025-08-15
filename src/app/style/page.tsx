import { Metadata } from 'next';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

export const metadata: Metadata = {
	title: 'Style Guide',
};

export default function StyleGuidePage() {
	const palette = [
		{ name: 'background', classes: 'bg-background text-foreground border' },
		{ name: 'foreground', classes: 'bg-foreground text-background' },
		{ name: 'primary', classes: 'bg-primary text-primary-foreground' },
		{ name: 'secondary', classes: 'bg-secondary text-secondary-foreground' },
		{ name: 'accent', classes: 'bg-accent text-accent-foreground' },
		{ name: 'muted', classes: 'bg-muted text-muted-foreground' },
		{ name: 'destructive', classes: 'bg-destructive text-white' },
		{ name: 'border', classes: 'bg-border' },
		{ name: 'input', classes: 'bg-input' },
		{ name: 'ring', classes: 'bg-ring' },
	];

	const charts = ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5'];

	return (
		<main className="container mx-auto max-w-6xl p-6 space-y-8">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Style Guide</h1>
					<p className="text-muted-foreground mt-1">
						Tailwind theme tokens, typography, spacing, and UI components.
					</p>
				</div>
			</div>

			<section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				<Card>
					<CardHeader>
						<CardTitle>Colors</CardTitle>
						<CardDescription>
							Semantic tokens from Tailwind config
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
							{palette.map((p) => (
								<div key={p.name} className="space-y-2">
									<div
										className={`h-16 w-full rounded-md border ${p.classes}`}
									/>
									<div className="text-xs font-mono">{p.name}</div>
								</div>
							))}
						</div>
						<div className="mt-6">
							<div className="text-sm font-medium mb-2">Charts</div>
							<div className="grid grid-cols-5 gap-3">
								{charts.map((c) => (
									<div key={c} className="space-y-2">
										<div
											className={`h-10 w-full rounded-md`}
											style={{ background: `oklch(var(--${c}))` }}
										/>
										<div className="text-xs font-mono">{c}</div>
									</div>
								))}
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Typography</CardTitle>
						<CardDescription>
							Headings, paragraphs, and inline elements
						</CardDescription>
					</CardHeader>
					<CardContent className="prose prose-sm dark:prose-invert max-w-none space-y-3">
						<h1>Heading 1</h1>
						<h2>Heading 2</h2>
						<h3>Heading 3</h3>
						<p>
							Lorem ipsum dolor sit amet, <strong>consectetur</strong>{' '}
							adipiscing elit. <em>Etiam</em> vehicula
							<a className="text-primary underline underline-offset-4" href="#">
								{' '}
								link
							</a>
							.
						</p>
						<ul className="list-disc pl-6">
							<li>Item one</li>
							<li>Item two</li>
						</ul>
						<code className="rounded bg-muted px-1 py-0.5">const x = 42</code>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Spacing & Radius</CardTitle>
						<CardDescription>
							Examples using spacing scale and radii
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<div className="text-sm font-medium">Spacing</div>
								<div className="flex items-end gap-2">
									{['1', '2', '3', '4', '6', '8', '12'].map((s) => (
										<div
											key={s}
											className={`bg-primary/20 rounded-sm`}
											style={{ width: '16px', height: `calc(${s} * 0.25rem)` }}
										/>
									))}
								</div>
							</div>
							<div className="space-y-2">
								<div className="text-sm font-medium">Radius</div>
								<div className="flex items-center gap-3">
									{['sm', 'md', 'lg', 'xl'].map((r) => (
										<div
											key={r}
											className={`size-10 bg-primary/20 border`}
											style={{ borderRadius: `var(--radius-${r})` }}
										/>
									))}
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="md:col-span-2 lg:col-span-3">
					<CardHeader>
						<CardTitle>Form Controls</CardTitle>
						<CardDescription>Interactive inputs and selects</CardDescription>
					</CardHeader>
					<CardContent>
						<form className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-2">
								<Label htmlFor="name">Name</Label>
								<Input id="name" placeholder="Jane Doe" />
							</div>
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input id="email" type="email" placeholder="jane@example.com" />
							</div>
							<div className="space-y-2">
								<Label htmlFor="role">Role</Label>
								<Select>
									<SelectTrigger id="role">
										<SelectValue placeholder="Select a role" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="admin">Admin</SelectItem>
										<SelectItem value="editor">Editor</SelectItem>
										<SelectItem value="viewer">Viewer</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2 md:col-span-2">
								<Label htmlFor="about">About</Label>
								<Textarea
									id="about"
									placeholder="Write a short bio..."
									rows={4}
								/>
							</div>
							<div className="md:col-span-2">
								<Button type="button">Primary Button</Button>
							</div>
						</form>
					</CardContent>
				</Card>

				<Card className="md:col-span-2 lg:col-span-3">
					<CardHeader>
						<CardTitle>Current Tailwind Config</CardTitle>
						<CardDescription>Key parts of `tailwind.config.ts`</CardDescription>
					</CardHeader>
					<CardContent>
						<pre className="overflow-x-auto rounded-md border bg-muted/30 p-4 text-xs">
							{`darkMode: 'class'
theme.extend.colors: border, input, ring, background, foreground, primary, secondary, destructive, muted, accent, popover, card
fontFamily: sans, mono (using CSS variables)
custom animations and utilities defined in globals.css`}
						</pre>
					</CardContent>
				</Card>
			</section>
		</main>
	);
}
