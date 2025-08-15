'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetHeader,
	SheetTitle,
	SheetFooter,
} from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

function DesktopNavLinks() {
	return (
		<NavigationMenu className="hidden md:flex" viewport={false}>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuLink asChild>
						<Link
							href="/"
							className={
								'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-sm px-3 py-2 text-sm transition-colors'
							}
						>
							Dashboard
						</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink asChild>
						<Link
							href="/results"
							className={
								'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-sm px-3 py-2 text-sm transition-colors'
							}
						>
							Results
						</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink asChild>
						<Link
							href="/armory"
							className={
								'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-sm px-3 py-2 text-sm transition-colors'
							}
						>
							Armory
						</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink asChild>
						<Link
							href="/calendar"
							className={
								'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-sm px-3 py-2 text-sm transition-colors'
							}
						>
							Calendar
						</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink asChild>
						<Link
							href="/stats"
							className={
								'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-sm px-3 py-2 text-sm transition-colors'
							}
						>
							Statistics
						</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink asChild>
						<Link
							href="/profile"
							className={
								'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-sm px-3 py-2 text-sm transition-colors'
							}
						>
							Profile
						</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

function MobileNav() {
	return (
		<div className="md:hidden">
			<Sheet>
				<SheetTrigger asChild>
					<Button
						aria-label="Open menu"
						variant="ghost"
						size="icon"
						className="animate-fade-in-down"
					>
						<Menu className="size-5" />
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="p-0">
					<SheetHeader className="border-b">
						<SheetTitle className="px-4 py-3">Menu</SheetTitle>
					</SheetHeader>
					<nav className="flex flex-col gap-1 p-2">
						<Link
							href="/"
							className="hover:bg-accent text-sm rounded-md px-3 py-2 transition-colors"
						>
							Dashboard
						</Link>
						<Link
							href="/results"
							className="hover:bg-accent text-sm rounded-md px-3 py-2 transition-colors"
						>
							Results
						</Link>
						<Link
							href="/armory"
							className="hover:bg-accent text-sm rounded-md px-3 py-2 transition-colors"
						>
							Armory
						</Link>
						<Link
							href="/calendar"
							className="hover:bg-accent text-sm rounded-md px-3 py-2 transition-colors"
						>
							Calendar
						</Link>
						<Link
							href="/stats"
							className="hover:bg-accent text-sm rounded-md px-3 py-2 transition-colors"
						>
							Statistics
						</Link>
						<Link
							href="/profile"
							className="hover:bg-accent text-sm rounded-md px-3 py-2 transition-colors"
						>
							Profile
						</Link>
						<Link
							href="/settings"
							className="hover:bg-accent text-sm rounded-md px-3 py-2 transition-colors"
						>
							Settings
						</Link>
					</nav>
					<SheetFooter className="border-t">
						<div className="flex w-full items-center justify-between">
							<span className="text-muted-foreground text-xs">Theme</span>
							<ThemeToggle />
						</div>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</div>
	);
}

export function SiteNav({ className }: { className?: string }) {
	return (
		<header
			className={cn(
				'sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/80 animate-fade-in-down',
				className
			)}
		>
			<div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16">
				<div className="flex items-center gap-3">
					<Link
						href="/"
						className="text-foreground font-semibold tracking-tight transition-opacity hover:opacity-90"
					>
						balestra
					</Link>
				</div>

				<DesktopNavLinks />

				<div className="flex items-center gap-2">
					<div className="hidden md:block">
						<ThemeToggle />
					</div>
					<MobileNav />
				</div>
			</div>
		</header>
	);
}

export default SiteNav;
