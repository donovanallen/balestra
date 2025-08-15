'use client';

import { useState, useRef } from 'react';
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
import { Badge } from '@/components/ui/badge';
import {
	Download,
	Upload,
	FileText,
	Database,
	Archive,
	AlertCircle,
	CheckCircle,
	RefreshCw,
	Trash2,
	Copy,
	Eye,
} from 'lucide-react';
import { mockEquipment } from '@/lib/mock-data';

interface ExportOption {
	id: string;
	name: string;
	description: string;
	icon: React.ComponentType<any>;
	format: string;
	includesData: string[];
	estimatedSize: string;
}

const exportOptions: ExportOption[] = [
	{
		id: 'full-backup',
		name: 'Full Backup',
		description: 'Complete database backup with all data',
		icon: Database,
		format: 'JSON',
		includesData: ['Profiles', 'Bouts', 'Equipment', 'Events', 'Configuration'],
		estimatedSize: '2.4 MB',
	},
	{
		id: 'bouts-csv',
		name: 'Bout Records (CSV)',
		description: 'Export bout history as spreadsheet',
		icon: FileText,
		format: 'CSV',
		includesData: ['Bout results', 'Opponent data', 'Tournament info'],
		estimatedSize: '45 KB',
	},
	{
		id: 'equipment-csv',
		name: 'Equipment Inventory (CSV)',
		description: 'Export equipment list as spreadsheet',
		icon: FileText,
		format: 'CSV',
		includesData: ['Equipment details', 'Purchase info', 'Maintenance records'],
		estimatedSize: '12 KB',
	},
	{
		id: 'calendar-ics',
		name: 'Calendar Events',
		description: 'Export events for calendar import',
		icon: FileText,
		format: 'ICS',
		includesData: ['Event dates', 'Locations', 'Tournament info'],
		estimatedSize: '8 KB',
	},
	{
		id: 'compressed-backup',
		name: 'Compressed Archive',
		description: 'Compressed backup for storage',
		icon: Archive,
		format: 'ZIP',
		includesData: ['All data', 'Compressed files', 'Metadata'],
		estimatedSize: '650 KB',
	},
];

const importTemplates = [
	{
		id: 'bouts-template',
		name: 'Bout Records Template',
		description: 'CSV template for importing bout data',
		headers: [
			'Date',
			'Opponent Name',
			'Your Score',
			'Opponent Score',
			'Weapon',
			'Tournament',
			'Location',
			'Type',
			'Notes',
		],
	},
	{
		id: 'equipment-template',
		name: 'Equipment Template',
		description: 'CSV template for importing equipment',
		headers: [
			'Type',
			'Brand',
			'Model',
			'Purchase Date',
			'Cost',
			'Status',
			'Notes',
		],
	},
	{
		id: 'events-template',
		name: 'Events Template',
		description: 'CSV template for importing events',
		headers: ['Title', 'Date', 'End Date', 'Type', 'Location', 'Notes'],
	},
];

export function AdminImportExport() {
	const [isExporting, setIsExporting] = useState(false);
	const [isImporting, setIsImporting] = useState(false);
	const [importProgress, setImportProgress] = useState(0);
	const [exportProgress, setExportProgress] = useState(0);
	const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
	const [importResults, setImportResults] = useState<any>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleExport = async (option: ExportOption) => {
		setIsExporting(true);
		setExportProgress(0);

		// Simulate export progress
		const interval = setInterval(() => {
			setExportProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					setIsExporting(false);
					downloadFile(option);
					return 100;
				}
				return prev + 10;
			});
		}, 200);
	};

	const downloadFile = (option: ExportOption) => {
		// Generate sample data based on export type
		let data: any;
		let filename: string;

		switch (option.id) {
			case 'full-backup':
				data = {
					version: '1.0.0',
					exportDate: new Date().toISOString(),
					data: {
						profiles: [{ id: '1', name: 'John Doe', weaponPrimary: 'epee' }],
						bouts: [
							{
								id: '1',
								opponentName: 'Alex Smith',
								userScore: 15,
								opponentScore: 12,
							},
						],
						equipment: mockEquipment.slice(0, 3),
						events: [
							{ id: '1', title: 'Regional Championship', date: new Date() },
						],
					},
				};
				filename = `fencing-backup-${
					new Date().toISOString().split('T')[0]
				}.json`;
				break;

			case 'bouts-csv':
				data =
					'Date,Opponent Name,Your Score,Opponent Score,Weapon,Tournament,Location,Type,Notes\n' +
					'2024-01-15,Alex Smith,15,12,epee,Metro Open,Metro Fencing Club,tournament,Great bout\n' +
					'2024-01-12,Maria Garcia,10,15,epee,,Metro Fencing Club,practice,Need to work on distance';
				filename = `bouts-${new Date().toISOString().split('T')[0]}.csv`;
				break;

			case 'equipment-csv':
				data =
					'Type,Brand,Model,Purchase Date,Cost,Status,Notes\n' +
					'weapon,Leon Paul,Standard Épée,2023-01-15,285,active,Primary competition épée\n' +
					'mask,Allstar,FIE 1600N,2022-09-15,165,active,Very comfortable fit';
				filename = `equipment-${new Date().toISOString().split('T')[0]}.csv`;
				break;

			default:
				data = JSON.stringify({ message: 'Sample export data' });
				filename = `export-${new Date().toISOString().split('T')[0]}.json`;
		}

		// Create and download file
		const blob = new Blob(
			[typeof data === 'string' ? data : JSON.stringify(data, null, 2)],
			{
				type: option.format === 'CSV' ? 'text/csv' : 'application/json',
			}
		);
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const handleImport = async () => {
		if (!selectedFiles || selectedFiles.length === 0) return;

		setIsImporting(true);
		setImportProgress(0);

		// Simulate import progress
		const interval = setInterval(() => {
			setImportProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					setIsImporting(false);
					setImportResults({
						success: true,
						imported: 15,
						errors: 2,
						warnings: 1,
					});
					return 100;
				}
				return prev + 15;
			});
		}, 300);
	};

	const downloadTemplate = (template: any) => {
		const csvContent = template.headers.join(',') + '\n';
		const blob = new Blob([csvContent], { type: 'text/csv' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${template.id}.csv`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold">Data Management</h2>
				<p className="text-muted-foreground">
					Import, export, and backup your fencing tracker data
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Export Section */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Download className="h-5 w-5" />
							Export Data
						</CardTitle>
						<CardDescription>
							Download your data in various formats for backup or analysis
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{exportOptions.map((option) => {
							const Icon = option.icon;
							return (
								<div key={option.id} className="border rounded-lg p-4">
									<div className="flex items-start justify-between">
										<div className="flex items-start gap-3">
											<Icon className="h-5 w-5 mt-0.5 text-blue-500" />
											<div className="flex-1">
												<h4 className="font-medium">{option.name}</h4>
												<p className="text-sm text-muted-foreground mt-1">
													{option.description}
												</p>
												<div className="flex items-center gap-2 mt-2">
													<Badge variant="outline" className="text-xs">
														{option.format}
													</Badge>
													<Badge variant="secondary" className="text-xs">
														{option.estimatedSize}
													</Badge>
												</div>
												<div className="mt-2">
													<p className="text-xs text-muted-foreground">
														Includes:
													</p>
													<p className="text-xs text-muted-foreground">
														{option.includesData.join(', ')}
													</p>
												</div>
											</div>
										</div>
										<Button
											onClick={() => handleExport(option)}
											disabled={isExporting}
											size="sm"
											className="ml-2"
										>
											{isExporting ? (
												<RefreshCw className="h-4 w-4 animate-spin" />
											) : (
												<Download className="h-4 w-4" />
											)}
										</Button>
									</div>

									{isExporting && exportProgress > 0 && (
										<div className="mt-3">
											<div className="flex items-center justify-between text-sm">
												<span>Exporting...</span>
												<span>{exportProgress}%</span>
											</div>
											<div className="w-full bg-gray-200 rounded-full h-2 mt-1">
												<div
													className="bg-blue-600 h-2 rounded-full transition-all duration-300"
													style={{ width: `${exportProgress}%` }}
												/>
											</div>
										</div>
									)}
								</div>
							);
						})}
					</CardContent>
				</Card>

				{/* Import Section */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Upload className="h-5 w-5" />
							Import Data
						</CardTitle>
						<CardDescription>
							Upload data from CSV files or backup files
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{/* File Upload */}
						<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
							<Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
							<p className="text-sm text-muted-foreground mb-2">
								Drop files here or click to browse
							</p>
							<input
								ref={fileInputRef}
								type="file"
								multiple
								accept=".csv,.json,.zip"
								onChange={(e) => setSelectedFiles(e.target.files)}
								className="hidden"
							/>
							<Button
								variant="outline"
								onClick={() => fileInputRef.current?.click()}
								className="mb-2"
							>
								Choose Files
							</Button>
							<p className="text-xs text-muted-foreground">
								Supports CSV, JSON, and ZIP files
							</p>
						</div>

						{selectedFiles && selectedFiles.length > 0 && (
							<div className="space-y-2">
								<h4 className="font-medium">Selected Files:</h4>
								{Array.from(selectedFiles).map((file, index) => (
									<div
										key={index}
										className="flex items-center justify-between p-2 border rounded"
									>
										<div className="flex items-center gap-2">
											<FileText className="h-4 w-4" />
											<span className="text-sm">{file.name}</span>
											<Badge variant="outline" className="text-xs">
												{(file.size / 1024).toFixed(1)} KB
											</Badge>
										</div>
									</div>
								))}
								<Button
									onClick={handleImport}
									disabled={isImporting}
									className="w-full mt-3"
								>
									{isImporting ? (
										<>
											<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
											Importing...
										</>
									) : (
										<>
											<Upload className="h-4 w-4 mr-2" />
											Import Files
										</>
									)}
								</Button>
							</div>
						)}

						{isImporting && importProgress > 0 && (
							<div className="mt-3">
								<div className="flex items-center justify-between text-sm">
									<span>Processing...</span>
									<span>{importProgress}%</span>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-2 mt-1">
									<div
										className="bg-green-600 h-2 rounded-full transition-all duration-300"
										style={{ width: `${importProgress}%` }}
									/>
								</div>
							</div>
						)}

						{importResults && (
							<div className="border rounded-lg p-4">
								<div className="flex items-center gap-2 mb-2">
									<CheckCircle className="h-5 w-5 text-green-500" />
									<h4 className="font-medium">Import Complete</h4>
								</div>
								<div className="grid grid-cols-3 gap-4 text-sm">
									<div>
										<span className="text-muted-foreground">Imported:</span>
										<p className="font-medium text-green-600">
											{importResults.imported}
										</p>
									</div>
									<div>
										<span className="text-muted-foreground">Errors:</span>
										<p className="font-medium text-red-600">
											{importResults.errors}
										</p>
									</div>
									<div>
										<span className="text-muted-foreground">Warnings:</span>
										<p className="font-medium text-yellow-600">
											{importResults.warnings}
										</p>
									</div>
								</div>
							</div>
						)}

						{/* Templates */}
						<div className="border-t pt-4 mt-4">
							<h4 className="font-medium mb-3">Import Templates</h4>
							<div className="space-y-2">
								{importTemplates.map((template) => (
									<div
										key={template.id}
										className="flex items-center justify-between p-3 border rounded"
									>
										<div>
											<h5 className="text-sm font-medium">{template.name}</h5>
											<p className="text-xs text-muted-foreground">
												{template.description}
											</p>
										</div>
										<Button
											variant="outline"
											size="sm"
											onClick={() => downloadTemplate(template)}
										>
											<Download className="h-4 w-4" />
										</Button>
									</div>
								))}
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Database Actions */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-red-600">
						<AlertCircle className="h-5 w-5" />
						Dangerous Actions
					</CardTitle>
					<CardDescription>
						These actions cannot be undone. Use with extreme caution.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<Button variant="outline" className="h-auto p-4 text-left">
							<div>
								<div className="flex items-center gap-2 mb-2">
									<RefreshCw className="h-4 w-4" />
									<span className="font-medium">Reset Database</span>
								</div>
								<p className="text-xs text-muted-foreground">
									Clear all data and reset to defaults
								</p>
							</div>
						</Button>

						<Button variant="outline" className="h-auto p-4 text-left">
							<div>
								<div className="flex items-center gap-2 mb-2">
									<Trash2 className="h-4 w-4" />
									<span className="font-medium">Delete All Data</span>
								</div>
								<p className="text-xs text-muted-foreground">
									Permanently delete all stored data
								</p>
							</div>
						</Button>

						<Button variant="outline" className="h-auto p-4 text-left">
							<div>
								<div className="flex items-center gap-2 mb-2">
									<Copy className="h-4 w-4" />
									<span className="font-medium">Duplicate Database</span>
								</div>
								<p className="text-xs text-muted-foreground">
									Create a copy of current database
								</p>
							</div>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
