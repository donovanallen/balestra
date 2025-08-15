'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlusIcon } from 'lucide-react';
import { boutFormSchema, type BoutFormData } from '@/lib/validations/schemas';
import { type Bout } from '@/types';

interface AddResultModalProps {
	onAddResult: (bout: Bout) => void;
}

export function AddResultModal({ onAddResult }: AddResultModalProps) {
	const [open, setOpen] = useState(false);

	const form = useForm<BoutFormData>({
		resolver: zodResolver(boutFormSchema),
		defaultValues: {
			opponentName: '',
			opponentNickname: '',
			opponentWeapon: undefined,
			opponentRanking: '',
			opponentDivision: '',
			date: new Date(),
			location: '',
			tournamentName: '',
			weapon: 'epee',
			userScore: 0,
			opponentScore: 0,
			notes: '',
			type: 'practice',
			equipmentUsed: '',
		},
	});

	const onSubmit = (data: BoutFormData) => {
		const now = new Date();
		const bout: Bout = {
			id: crypto.randomUUID(),
			...data,
			won: data.userScore > data.opponentScore,
			createdAt: now,
			updatedAt: now,
		};

		onAddResult(bout);
		form.reset();
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">
					<PlusIcon className="w-4 h-4" />
					Add Result
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Add Bout Result</DialogTitle>
					<DialogDescription>
						Record the details of your bout for tracking and analysis.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						{/* Opponent Information */}
						<div className="space-y-4">
							<h3 className="text-lg font-semibold">Opponent Information</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="opponentName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Opponent Name *</FormLabel>
											<FormControl>
												<Input placeholder="Enter opponent's name" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="opponentNickname"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nickname</FormLabel>
											<FormControl>
												<Input placeholder="Optional nickname" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="opponentWeapon"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Opponent's Primary Weapon</FormLabel>
											<Select
												onValueChange={field.onChange}
												value={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select weapon" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="foil">Foil</SelectItem>
													<SelectItem value="epee">Épée</SelectItem>
													<SelectItem value="sabre">Sabre</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="opponentRanking"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Ranking</FormLabel>
											<FormControl>
												<Input placeholder="A, B, C, U, etc." {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="opponentDivision"
									render={({ field }) => (
										<FormItem className="md:col-span-2">
											<FormLabel>Division</FormLabel>
											<FormControl>
												<Input
													placeholder="Youth, Cadet, Junior, Senior, Veteran"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>

						{/* Bout Details */}
						<div className="space-y-4">
							<h3 className="text-lg font-semibold">Bout Details</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="date"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Date *</FormLabel>
											<FormControl>
												<Input
													type="datetime-local"
													value={
														field.value
															? field.value.toISOString().slice(0, 16)
															: ''
													}
													onChange={(e) =>
														field.onChange(new Date(e.target.value))
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="location"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Location</FormLabel>
											<FormControl>
												<Input placeholder="Venue or club name" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="type"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Session Type *</FormLabel>
											<Select
												onValueChange={field.onChange}
												value={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select session type" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="practice">Practice</SelectItem>
													<SelectItem value="lesson">Lesson</SelectItem>
													<SelectItem value="tournament">Tournament</SelectItem>
													<SelectItem value="open-bouting">
														Open Bouting
													</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="tournamentName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Tournament/Event Name</FormLabel>
											<FormControl>
												<Input
													placeholder="Tournament or event name"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>

						{/* Equipment and Weapon */}
						<div className="space-y-4">
							<h3 className="text-lg font-semibold">Equipment Information</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="weapon"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Weapon Used *</FormLabel>
											<Select
												onValueChange={field.onChange}
												value={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select weapon" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="foil">Foil</SelectItem>
													<SelectItem value="epee">Épée</SelectItem>
													<SelectItem value="sabre">Sabre</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="equipmentUsed"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Equipment Details</FormLabel>
											<FormControl>
												<Input
													placeholder="Specific weapon or gear used"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>

						{/* Score */}
						<div className="space-y-4">
							<h3 className="text-lg font-semibold">Score</h3>
							<div className="grid grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="userScore"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Your Score *</FormLabel>
											<FormControl>
												<Input
													type="number"
													min="0"
													max="50"
													placeholder="0"
													{...field}
													onChange={(e) =>
														field.onChange(parseInt(e.target.value) || 0)
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="opponentScore"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Opponent Score *</FormLabel>
											<FormControl>
												<Input
													type="number"
													min="0"
													max="50"
													placeholder="0"
													{...field}
													onChange={(e) =>
														field.onChange(parseInt(e.target.value) || 0)
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>

						{/* Notes/Feedback */}
						<div className="space-y-4">
							<h3 className="text-lg font-semibold">Notes & Feedback</h3>
							<FormField
								control={form.control}
								name="notes"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Bout Notes & Self-Reflection</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Record your thoughts, what worked well, areas for improvement, tactics used, opponent observations, etc..."
												className="resize-none"
												rows={4}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="flex justify-end space-x-2">
							<Button
								type="button"
								variant="outline"
								onClick={() => setOpen(false)}
							>
								Cancel
							</Button>
							<Button type="submit">Save Result</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
