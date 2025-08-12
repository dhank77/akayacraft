import { type ReactNode, useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import AppLogo from '@/components/app-logo';
import { Menu, Phone, MapPin, Sun, Moon, Sparkles } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface PublicLayoutProps {
    children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    const [isDark, setIsDark] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        setIsAnimating(true);

        setTimeout(() => {
            const newTheme = !isDark;
            setIsDark(newTheme);

            if (newTheme) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }

            setTimeout(() => setIsAnimating(false), 300);
        }, 150);
    };

    return (
        <div className="min-h-screen bg-background transition-colors duration-500">
            {/* Animated Background Particles */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-purple-50/30 transition-all duration-1000 dark:from-blue-950/20 dark:via-indigo-950/10 dark:to-purple-950/20"></div>
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="animate-float absolute opacity-20 dark:opacity-10"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${i * 2}s`,
                            animationDuration: `${8 + i * 2}s`,
                        }}
                    >
                        <Sparkles className="h-4 w-4 text-blue-400" />
                    </div>
                ))}
            </div>

            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur transition-all duration-300 supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 max-w-screen-2xl items-center px-4 lg:px-6">
                    <Link href="/" className="group mr-6 flex items-center space-x-2">
                        <div className="transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                            <AppLogo />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center space-x-8 text-sm font-medium md:flex">
                        <Link href="/products" className="group relative text-foreground transition-all duration-300 hover:text-blue-600">
                            Katalog Produk
                            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href="/about" className="group relative text-foreground transition-all duration-300 hover:text-blue-600">
                            Tentang Kami
                            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href="/gallery" className="group relative text-foreground transition-all duration-300 hover:text-blue-600">
                            Galeri
                            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href="/contact" className="group relative text-foreground transition-all duration-300 hover:text-blue-600">
                            Kontak
                            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </nav>

                    {/* Theme Toggle & Contact Info - Desktop */}
                    <div className="ml-auto hidden items-center space-x-6 lg:flex">
                        {/* Theme Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="group relative h-9 w-9 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 transition-all duration-300 hover:scale-110 hover:from-blue-200 hover:to-indigo-200 dark:from-blue-900/50 dark:to-indigo-900/50 dark:hover:from-blue-800/50 dark:hover:to-indigo-800/50"
                        >
                            <div className={`absolute inset-0 rounded-full transition-all duration-500 ${isAnimating ? 'animate-spin' : ''}`}>
                                <Sun
                                    className={`absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform transition-all duration-500 ${isDark ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'} text-amber-500`}
                                />
                                <Moon
                                    className={`absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform transition-all duration-500 ${isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'} text-blue-400`}
                                />
                            </div>
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-indigo-400/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                        </Button>

                        <div className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-blue-600">
                            <Phone className="h-4 w-4 group-hover:animate-bounce" />
                            <a href="tel:+6281234567890" className="transition-colors duration-300">
                                +62 812-3456-7890
                            </a>
                        </div>
                        <div className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-blue-600">
                            <MapPin className="h-4 w-4 group-hover:animate-pulse" />
                            <span>Yogyakarta</span>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div className="ml-auto flex items-center gap-2 md:hidden">
                        {/* Mobile Theme Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="relative h-9 w-9 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 transition-all duration-300 hover:scale-110 dark:from-blue-900/50 dark:to-indigo-900/50"
                        >
                            <Sun
                                className={`absolute h-4 w-4 transition-all duration-500 ${isDark ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'} text-amber-500`}
                            />
                            <Moon
                                className={`absolute h-4 w-4 transition-all duration-500 ${isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'} text-blue-400`}
                            />
                        </Button>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="transition-all duration-300 hover:scale-110 hover:bg-blue-100 dark:hover:bg-blue-900/50"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-80 bg-background/95 backdrop-blur">
                                <div className="flex flex-col gap-6 pt-6">
                                    <div className="flex flex-col space-y-4">
                                        <Link
                                            href="/products"
                                            className="flex items-center gap-3 rounded-lg p-2 text-lg font-medium transition-all duration-300 hover:translate-x-2 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30"
                                        >
                                            🛍️ Katalog Produk
                                        </Link>
                                        <Link
                                            href="/about"
                                            className="flex items-center gap-3 rounded-lg p-2 text-lg font-medium transition-all duration-300 hover:translate-x-2 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30"
                                        >
                                            ℹ️ Tentang Kami
                                        </Link>
                                        <Link
                                            href="/gallery"
                                            className="flex items-center gap-3 rounded-lg p-2 text-lg font-medium transition-all duration-300 hover:translate-x-2 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30"
                                        >
                                            📸 Galeri
                                        </Link>
                                        <Link
                                            href="/contact"
                                            className="flex items-center gap-3 rounded-lg p-2 text-lg font-medium transition-all duration-300 hover:translate-x-2 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30"
                                        >
                                            📞 Kontak
                                        </Link>
                                    </div>

                                    <div className="border-t pt-6">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-3 transition-all duration-300 hover:scale-105 dark:from-blue-900/30 dark:to-indigo-900/30">
                                                <Phone className="h-5 w-5 animate-pulse text-blue-600" />
                                                <a
                                                    href="tel:+6281234567890"
                                                    className="text-sm font-medium transition-colors duration-300 hover:text-blue-600"
                                                >
                                                    +62 812-3456-7890
                                                </a>
                                            </div>
                                            <div className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-3 transition-all duration-300 hover:scale-105 dark:from-blue-900/30 dark:to-indigo-900/30">
                                                <MapPin className="h-5 w-5 animate-bounce text-blue-600" />
                                                <span className="text-sm text-muted-foreground">Yogyakarta, Indonesia</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative">{children}</main>

            {/* Custom Animations */}
            <style>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    25% {
                        transform: translateY(-10px) rotate(5deg);
                    }
                    50% {
                        transform: translateY(-20px) rotate(0deg);
                    }
                    75% {
                        transform: translateY(-10px) rotate(-5deg);
                    }
                }
                
                .animate-float {
                    animation: float 8s ease-in-out infinite;
                }
                
                @keyframes shimmer {
                    0% {
                        background-position: -200% 0;
                    }
                    100% {
                        background-position: 200% 0;
                    }
                }
            `}</style>
        </div>
    );
}
