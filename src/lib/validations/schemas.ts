import { z } from 'zod';

export const weaponSchema = z.enum(['foil', 'epee', 'sabre']);
export const boutTypeSchema = z.enum([
	'practice',
	'lesson',
	'tournament',
	'open-bouting',
]);

export const boutFormSchema = z
	.object({
		opponentName: z.string().min(1, 'Opponent name is required').max(100),
		opponentNickname: z.string().max(50).optional(),
		opponentWeapon: weaponSchema.optional(),
		opponentRanking: z.string().max(20).optional(),
		opponentDivision: z.string().max(20).optional(),
		date: z.date(),
		location: z.string().max(200).optional(),
		tournamentName: z.string().max(100).optional(),
		weapon: weaponSchema,
		userScore: z.number().min(0).max(50),
		opponentScore: z.number().min(0).max(50),
		notes: z.string().max(500).optional(),
		type: boutTypeSchema,
		equipmentUsed: z.string().max(100).optional(),
	})
	.refine((data) => data.userScore !== data.opponentScore, {
		message: 'Scores cannot be tied',
		path: ['userScore'],
	});

export type BoutFormData = z.infer<typeof boutFormSchema>;
