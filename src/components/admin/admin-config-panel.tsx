'use client';

import { useState } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
	Settings,
	Save,
	RotateCcw,
	AlertTriangle,
	CheckCircle,
	Database,
	Palette,
	Bell,
	Shield,
} from 'lucide-react';

interface ConfigSection {
	id: string;
	title: string;
	description: string;
	icon: React.ComponentType<any>;
	settings: ConfigSetting[];
}

interface ConfigSetting {
	key: string;
	label: string;
	description: string;
	type: 'text' | 'number' | 'boolean' | 'select' | 'textarea';
	value: any;
	options?: string[];
	validation?: {
		required?: boolean;
		min?: number;
		max?: number;
		pattern?: string;
	};
}

const configSections: ConfigSection[] = [
	{
		id: 'app',
		title: 'Application Settings',
		description: 'General application preferences and behavior',
		icon: Settings,
		settings: [
			{
				key: 'appName',
				label: 'Application Name',
				description: 'Display name for the application',
				type: 'text',
				value: 'Balestra Fencing Tracker',
				validation: { required: true },
			},
			{
				key: 'defaultWeapon',
				label: 'Default Weapon',
				description: 'Default weapon selection for new bouts',
				type: 'select',
				value: 'epee',
				options: ['foil', 'epee', 'sabre'],
			},
			{
				key: 'autoSave',
				label: 'Auto-save Interval (minutes)',
				description: 'How often to automatically save data',
				type: 'number',
				value: 5,
				validation: { min: 1, max: 60 },
			},
			{
				key: 'timezone',
				label: 'Timezone',
				description: 'Default timezone for events and dates',
				type: 'select',
				value: 'America/New_York',
				options: [
					'America/New_York',
					'America/Chicago',
					'America/Denver',
					'America/Los_Angeles',
					'Europe/London',
					'Europe/Paris',
					'Asia/Tokyo',
				],
			},
		],
	},
	{
		id: 'data',
		title: 'Data Management',
		description: 'Data storage and backup preferences',
		icon: Database,
		settings: [
			{
				key: 'maxBouts',
				label: 'Maximum Bout Records',
				description: 'Maximum number of bouts to keep in storage',
				type: 'number',
				value: 1000,
				validation: { min: 100, max: 10000 },
			},
			{
				key: 'dataRetention',
				label: 'Data Retention (months)',
				description: 'How long to keep old data',
				type: 'number',
				value: 24,
				validation: { min: 6, max: 120 },
			},
			{
				key: 'autoBackup',
				label: 'Auto Backup Frequency',
				description: 'How often to create automatic backups',
				type: 'select',
				value: 'weekly',
				options: ['daily', 'weekly', 'monthly', 'never'],
			},
			{
				key: 'compressionLevel',
				label: 'Data Compression Level',
				description: 'Compression level for exported data',
				type: 'select',
				value: 'medium',
				options: ['none', 'low', 'medium', 'high'],
			},
		],
	},
	{
		id: 'ui',
		title: 'User Interface',
		description: 'Customize the look and feel of the application',
		icon: Palette,
		settings: [
			{
				key: 'theme',
				label: 'Default Theme',
				description: 'Default color theme for the application',
				type: 'select',
				value: 'system',
				options: ['light', 'dark', 'system'],
			},
			{
				key: 'compactMode',
				label: 'Compact Mode',
				description: 'Use compact layouts for mobile devices',
				type: 'boolean',
				value: true,
			},
			{
				key: 'animationsEnabled',
				label: 'Enable Animations',
				description: 'Show UI animations and transitions',
				type: 'boolean',
				value: true,
			},
			{
				key: 'dateFormat',
				label: 'Date Format',
				description: 'How dates should be displayed',
				type: 'select',
				value: 'MM/DD/YYYY',
				options: ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'MMM DD, YYYY'],
			},
		],
	},
	{
		id: 'notifications',
		title: 'Notifications',
		description: 'Configure alerts and reminders',
		icon: Bell,
		settings: [
			{
				key: 'maintenanceReminders',
				label: 'Equipment Maintenance Reminders',
				description: 'Send reminders for equipment maintenance',
				type: 'boolean',
				value: true,
			},
			{
				key: 'eventReminders',
				label: 'Event Reminders',
				description: 'Send reminders for upcoming events',
				type: 'boolean',
				value: true,
			},
			{
				key: 'reminderAdvance',
				label: 'Reminder Advance Time (hours)',
				description: 'How far in advance to send reminders',
				type: 'number',
				value: 24,
				validation: { min: 1, max: 168 },
			},
			{
				key: 'notificationSound',
				label: 'Notification Sound',
				description: 'Play sound with notifications',
				type: 'boolean',
				value: false,
			},
		],
	},
	{
		id: 'security',
		title: 'Security & Privacy',
		description: 'Security and privacy settings',
		icon: Shield,
		settings: [
			{
				key: 'dataEncryption',
				label: 'Local Data Encryption',
				description: 'Encrypt data stored locally',
				type: 'boolean',
				value: true,
			},
			{
				key: 'sessionTimeout',
				label: 'Session Timeout (minutes)',
				description: 'Automatically lock after inactivity',
				type: 'number',
				value: 30,
				validation: { min: 5, max: 480 },
			},
			{
				key: 'analyticsEnabled',
				label: 'Anonymous Analytics',
				description: 'Help improve the app by sharing anonymous usage data',
				type: 'boolean',
				value: false,
			},
			{
				key: 'errorReporting',
				label: 'Error Reporting',
				description: 'Automatically report errors for debugging',
				type: 'boolean',
				value: true,
			},
		],
	},
];

export function AdminConfigPanel() {
	const [activeSection, setActiveSection] = useState('app');
	const [hasChanges, setHasChanges] = useState(false);
	const [isSaving, setIsSaving] = useState(false);

	const handleSettingChange = (
		sectionId: string,
		settingKey: string,
		value: any
	) => {
		// Update setting value logic would go here
		setHasChanges(true);
		console.log('Setting changed:', { sectionId, settingKey, value });
	};

	const handleSave = async () => {
		setIsSaving(true);
		// Save settings logic would go here
		await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate save
		setIsSaving(false);
		setHasChanges(false);
	};

	const handleReset = () => {
		// Reset to defaults logic would go here
		setHasChanges(false);
	};

	const renderSettingInput = (
		section: ConfigSection,
		setting: ConfigSetting
	) => {
		const settingId = `${section.id}-${setting.key}`;

		switch (setting.type) {
			case 'text':
				return (
					<Input
						id={settingId}
						value={setting.value}
						onChange={(e) =>
							handleSettingChange(section.id, setting.key, e.target.value)
						}
						placeholder={setting.label}
					/>
				);

			case 'number':
				return (
					<Input
						id={settingId}
						type="number"
						value={setting.value}
						onChange={(e) =>
							handleSettingChange(
								section.id,
								setting.key,
								Number(e.target.value)
							)
						}
						min={setting.validation?.min}
						max={setting.validation?.max}
					/>
				);

			case 'boolean':
				return (
					<div className="flex items-center space-x-2">
						<input
							id={settingId}
							type="checkbox"
							checked={setting.value}
							onChange={(e) =>
								handleSettingChange(section.id, setting.key, e.target.checked)
							}
							className="rounded border-gray-300"
						/>
						<Label htmlFor={settingId} className="text-sm">
							{setting.value ? 'Enabled' : 'Disabled'}
						</Label>
					</div>
				);

			case 'select':
				return (
					<select
						id={settingId}
						value={setting.value}
						onChange={(e) =>
							handleSettingChange(section.id, setting.key, e.target.value)
						}
						className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
					>
						{setting.options?.map((option) => (
							<option key={option} value={option}>
								{option.charAt(0).toUpperCase() + option.slice(1)}
							</option>
						))}
					</select>
				);

			case 'textarea':
				return (
					<Textarea
						id={settingId}
						value={setting.value}
						onChange={(e) =>
							handleSettingChange(section.id, setting.key, e.target.value)
						}
						placeholder={setting.label}
						rows={3}
					/>
				);

			default:
				return null;
		}
	};

	const activeConfig = configSections.find(
		(section) => section.id === activeSection
	);

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-bold">Configuration</h2>
					<p className="text-muted-foreground">
						Manage application settings and preferences
					</p>
				</div>

				<div className="flex items-center gap-2">
					{hasChanges && (
						<Badge
							variant="outline"
							className="text-orange-600 border-orange-300"
						>
							<AlertTriangle className="h-3 w-3 mr-1" />
							Unsaved changes
						</Badge>
					)}
					<Button
						variant="outline"
						onClick={handleReset}
						disabled={!hasChanges}
						className="gap-2"
					>
						<RotateCcw className="h-4 w-4" />
						Reset
					</Button>
					<Button
						onClick={handleSave}
						disabled={!hasChanges || isSaving}
						className="gap-2"
					>
						{isSaving ? (
							<div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
						) : (
							<Save className="h-4 w-4" />
						)}
						Save Changes
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
				{/* Sidebar Navigation */}
				<div className="lg:col-span-1">
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">Settings Categories</CardTitle>
						</CardHeader>
						<CardContent className="p-0">
							<nav className="space-y-1">
								{configSections.map((section) => {
									const Icon = section.icon;
									const isActive = activeSection === section.id;

									return (
										<Button
											key={section.id}
											variant={isActive ? 'secondary' : 'ghost'}
											className="w-full justify-start h-auto p-3"
											onClick={() => setActiveSection(section.id)}
										>
											<div className="flex items-center gap-3">
												<Icon className="h-4 w-4 flex-shrink-0" />
												<div className="text-left">
													<div className="text-sm font-medium">
														{section.title}
													</div>
													<p className="text-xs text-muted-foreground mt-1">
														{section.description}
													</p>
												</div>
											</div>
										</Button>
									);
								})}
							</nav>
						</CardContent>
					</Card>
				</div>

				{/* Settings Content */}
				<div className="lg:col-span-3">
					{activeConfig && (
						<Card>
							<CardHeader>
								<div className="flex items-center gap-3">
									<activeConfig.icon className="h-5 w-5" />
									<div>
										<CardTitle>{activeConfig.title}</CardTitle>
										<CardDescription>
											{activeConfig.description}
										</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent className="space-y-6">
								{activeConfig.settings.map((setting) => (
									<div key={setting.key} className="space-y-2">
										<div className="flex items-center justify-between">
											<Label
												htmlFor={`${activeConfig.id}-${setting.key}`}
												className="text-sm font-medium"
											>
												{setting.label}
												{setting.validation?.required && (
													<span className="text-destructive ml-1">*</span>
												)}
											</Label>
											{setting.type === 'boolean' && setting.value && (
												<CheckCircle className="h-4 w-4 text-green-500" />
											)}
										</div>
										<p className="text-xs text-muted-foreground">
											{setting.description}
										</p>
										{renderSettingInput(activeConfig, setting)}
										{setting.validation && setting.type === 'number' && (
											<p className="text-xs text-muted-foreground">
												Range: {setting.validation.min} -{' '}
												{setting.validation.max}
											</p>
										)}
									</div>
								))}
							</CardContent>
						</Card>
					)}
				</div>
			</div>
		</div>
	);
}
