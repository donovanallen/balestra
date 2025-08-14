import type { Metadata } from 'next';
import { Geist, Geist_Mono, Montserrat } from 'next/font/google';
import './globals.css';
import SiteNav from '@/components/site-nav';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

const montserrat = Montserrat({
	variable: '--font-montserrat',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Balestra',
	description: 'The Balestra Fencing App',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
			>
				<script
					dangerouslySetInnerHTML={{
						__html: `
            (function() {
              try {
                var stored = localStorage.getItem('theme');
                var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                var useDark = stored ? stored === 'dark' : prefersDark;
                if (useDark) document.documentElement.classList.add('dark');
                else document.documentElement.classList.remove('dark');
              } catch (e) {}
            })();
          `,
					}}
				/>
				<SiteNav />
				<main className="animate-fade-in-up">{children}</main>
			</body>
		</html>
	);
}
