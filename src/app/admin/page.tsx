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
import { Badge } from '@/components/ui/badge';
import {
	Database,
	Users,
	Swords,
	Shield,
	Calendar,
	Settings,
	Download,
	Upload,
	FileText,
	BarChart3,
	AlertCircle,
	CheckCircle,
} from 'lucide-react';
import { AdminDataTable } from '@/components/admin/admin-data-table';
import { AdminConfigPanel } from '@/components/admin/admin-config-panel';
import { AdminImportExport } from '@/components/admin/admin-import-export';
import { mockEquipment } from '@/lib/mock-data';

type AdminSection =
	| 'overview'
	| 'profiles'
	| 'bouts'
	| 'equipment'
	| 'events'
	| 'config'
	| 'data';

export default function AdminPage() {
	const [activeSection, setActiveSection] = useState<AdminSection>('overview');

	const adminSections = [
		{
			id: 'overview' as AdminSection,
			title: 'Overview',
			description: 'System status and quick stats',
			icon: BarChart3,
			count: null,
		},
		{
			id: 'profiles' as AdminSection,
			title: 'Profiles',
			description: 'Manage user profiles',
			icon: Users,
			count: 1, // Mock count
		},
		{
			id: 'bouts' as AdminSection,
			title: 'Bouts',
			description: 'Manage bout records',
			icon: Swords,
			count: 15, // Mock count
		},
		{
			id: 'equipment' as AdminSection,
			title: 'Equipment',
			description: 'Manage equipment inventory',
			icon: Shield,
			count: mockEquipment.length,
		},
		{
			id: 'events' as AdminSection,
			title: 'Events',
			description: 'Manage calendar events',
			icon: Calendar,
			count: 8, // Mock count
		},
		{
			id: 'config' as AdminSection,
			title: 'Configuration',
			description: 'System settings and preferences',
			icon: Settings,
			count: null,
		},
		{
			id: 'data' as AdminSection,
			title: 'Data Management',
			description: 'Import, export, and backup data',
			icon: Database,
			count: null,
		},
	];

	const systemStats = [
		{ label: 'Total Profiles', value: 1, status: 'healthy' },
		{ label: 'Total Bouts', value: 15, status: 'healthy' },
		{
			label: 'Active Equipment',
			value: mockEquipment.filter((e) => e.status === 'active').length,
			status: 'healthy',
		},
		{
			label: 'Maintenance Needed',
			value: mockEquipment.filter((e) => e.maintenanceReminders.length > 0)
				.length,
			status: 'warning',
		},
		{ label: 'Upcoming Events', value: 3, status: 'healthy' },
		{ label: 'Storage Used', value: '2.4 MB', status: 'healthy' },
	];

	const renderContent = () => {
		switch (activeSection) {
			case 'overview':
				return (
					<div className="space-y-6">
						<div>
							<h2 className="text-2xl font-bold mb-2">System Overview</h2>
							<p className="text-muted-foreground">
								Monitor your fencing tracker data and system health
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{systemStats.map((stat) => (
								<Card key={stat.label}>
									<CardContent className="pt-6">
										<div className="flex items-center justify-between">
											<div>
												<p className="text-sm font-medium text-muted-foreground">
													{stat.label}
												</p>
												<p className="text-2xl font-bold">{stat.value}</p>
											</div>
											<div className="flex items-center">
												{stat.status === 'healthy' ? (
													<CheckCircle className="h-5 w-5 text-green-500" />
												) : (
													<AlertCircle className="h-5 w-5 text-yellow-500" />
												)}
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>

						<Card>
							<CardHeader>
								<CardTitle>Recent Activity</CardTitle>
								<CardDescription>
									Latest data changes and system events
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									<div className="flex items-center justify-between p-3 border rounded-lg">
										<div className="flex items-center gap-3">
											<Swords className="h-4 w-4 text-blue-500" />
											<span className="text-sm">
												New bout recorded against John Doe
											</span>
										</div>
										<span className="text-xs text-muted-foreground">
											2 hours ago
										</span>
									</div>
									<div className="flex items-center justify-between p-3 border rounded-lg">
										<div className="flex items-center gap-3">
											<Shield className="h-4 w-4 text-orange-500" />
											<span className="text-sm">
												Equipment maintenance reminder set
											</span>
										</div>
										<span className="text-xs text-muted-foreground">
											1 day ago
										</span>
									</div>
									<div className="flex items-center justify-between p-3 border rounded-lg">
										<div className="flex items-center gap-3">
											<Calendar className="h-4 w-4 text-green-500" />
											<span className="text-sm">
												Tournament event added to calendar
											</span>
										</div>
										<span className="text-xs text-muted-foreground">
											3 days ago
										</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				);

			case 'config':
				return <AdminConfigPanel />;

			case 'data':
				return <AdminImportExport />;

			default:
				return <AdminDataTable section={activeSection} />;
		}
	};

	return (
		<div className="container mx-auto py-6 space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold">Admin Panel</h1>
					<p className="text-muted-foreground">
						Manage your fencing tracker data, settings, and configurations
					</p>
				</div>
				<Badge variant="secondary" className="text-xs">
					v1.0.0
				</Badge>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
				{/* Sidebar Navigation */}
				<div className="lg:col-span-1">
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">Admin Sections</CardTitle>
						</CardHeader>
						<CardContent className="p-0">
							<nav className="space-y-1">
								{adminSections.map((section) => {
									const Icon = section.icon;
									const isActive = activeSection === section.id;

									return (
										<Button
											key={section.id}
											variant={isActive ? 'secondary' : 'ghost'}
											className="w-full justify-start h-auto p-3"
											onClick={() => setActiveSection(section.id)}
										>
											<div className="flex items-center gap-3 w-full">
												<Icon className="h-4 w-4 flex-shrink-0" />
												<div className="flex-1 text-left">
													<div className="flex items-center justify-between">
														<span className="text-sm font-medium">
															{section.title}
														</span>
														{section.count !== null && (
															<Badge variant="outline" className="text-xs">
																{section.count}
															</Badge>
														)}
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

				{/* Main Content */}
				<div className="lg:col-span-3">{renderContent()}</div>
			</div>
		</div>
	);
}
