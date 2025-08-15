'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

function setDocumentTheme(theme: 'light' | 'dark') {
	const root = document.documentElement;
	if (theme === 'dark') {
		root.classList.add('dark');
	} else {
		root.classList.remove('dark');
	}
}

export function ThemeToggle() {
	const [isDark, setIsDark] = React.useState<boolean>(false);

	React.useEffect(() => {
		// Initialize from localStorage or system preference
		const stored = window.localStorage.getItem('theme');
		const prefersDark =
			window.matchMedia &&
			window.matchMedia('(prefers-color-scheme: dark)').matches;
		const shouldUseDark = stored ? stored === 'dark' : prefersDark;
		setIsDark(shouldUseDark);
	}, []);

	React.useEffect(() => {
		setDocumentTheme(isDark ? 'dark' : 'light');
		try {
			window.localStorage.setItem('theme', isDark ? 'dark' : 'light');
		} catch {}
	}, [isDark]);

	return (
		<div className="flex items-center gap-2">
			<Button
				aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
				title={isDark ? 'Light' : 'Dark'}
				variant={'outline'}
				size="icon"
				onClick={() => setIsDark(!isDark)}
			>
				{isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
			</Button>
		</div>
	);
}

export default ThemeToggle;
