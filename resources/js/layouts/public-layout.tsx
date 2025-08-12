import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import { Link } from '@inertiajs/react';
import AppLogo from '@/components/app-logo';

interface PublicLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function PublicLayout({ children, breadcrumbs = [] }: PublicLayoutProps) {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 max-w-screen-2xl items-center">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <AppLogo />
                    </Link>
                    
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link 
                            href="/products" 
                            className="transition-colors hover:text-foreground/80 text-foreground"
                        >
                            Produk
                        </Link>
                    </nav>
                    
                    <div className="ml-auto flex items-center space-x-4">
                        <Link 
                            href="/login" 
                            className="text-sm font-medium transition-colors hover:text-foreground/80"
                        >
                            Masuk
                        </Link>
                    </div>
                </div>
            </header>
            
            {/* Breadcrumbs */}
            {breadcrumbs.length > 0 && (
                <div className="border-b border-border/40">
                    <div className="container flex h-12 max-w-screen-2xl items-center text-sm text-muted-foreground">
                        <nav className="flex items-center space-x-1">
                            <Link href="/" className="hover:text-foreground">
                                Beranda
                            </Link>
                            {breadcrumbs.map((breadcrumb, index) => (
                                <div key={index} className="flex items-center space-x-1">
                                    <span>/</span>
                                    <Link 
                                        href={breadcrumb.href} 
                                        className="hover:text-foreground"
                                    >
                                        {breadcrumb.title}
                                    </Link>
                                </div>
                            ))}
                        </nav>
                    </div>
                </div>
            )}
            
            {/* Main Content */}
            <main className="container max-w-screen-2xl py-6">
                {children}
            </main>
        </div>
    );
}