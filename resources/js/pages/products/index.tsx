import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PublicLayout from '@/layouts/public-layout';
import { Head } from '@inertiajs/react';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { LoaderCircle, Sparkles, Palette, Heart } from 'lucide-react';

type Product = {
    id: number;
    name: string;
    description: string;
    price: string | number;
    image_path: string;
    category: string;
    whatsapp_number: string;
    whatsapp_message?: string | null;
};

const CATEGORIES = ['Semua', 'Undangan', 'Flash Card', 'Mahkota', 'Stiker', 'Kipas', 'Souvenir', 'Dekorasi', 'Lainnya'];

export default function ProductsIndex({ products: initialProducts }: { products: Product[] }) {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('Semua');
    const [displayedCount, setDisplayedCount] = useState(20);
    const [isLoading, setIsLoading] = useState(false);

    const products = initialProducts || [];

    const filtered = useMemo(() => {
        return products.filter((p) => {
            const okCat = category === 'Semua' ? true : p.category === category;
            const okQuery = query ? (p.name + ' ' + p.description).toLowerCase().includes(query.toLowerCase()) : true;
            return okCat && okQuery;
        });
    }, [products, query, category]);

    const displayedProducts = filtered.slice(0, displayedCount);
    const hasMore = displayedCount < filtered.length;

    const loadMore = useCallback(() => {
        if (isLoading || !hasMore) return;
        
        setIsLoading(true);
        setTimeout(() => {
            setDisplayedCount(prev => Math.min(prev + 20, filtered.length));
            setIsLoading(false);
        }, 800);
    }, [isLoading, hasMore, filtered.length]);

    useEffect(() => {
        setDisplayedCount(20);
    }, [query, category]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
                loadMore();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMore]);

    const formatPrice = (n: string | number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(n));

    const waUrl = (p: Product) => {
        const base = 'https://wa.me/' + p.whatsapp_number.replace(/[^0-9]/g, '');
        const text = encodeURIComponent(p.whatsapp_message || `Halo Akayacraft, saya tertarik dengan produk ${p.name} (ID ${p.id}).`);
        return `${base}?text=${text}`;
    };

    return (
        <PublicLayout>
            <Head title="Akayacraft | Produk Kreatif">
                <meta
                    name="description"
                    content="Koleksi produk handmade & kreatif Akayacraft: undangan, flash card, mahkota, stiker, kipas, dan lain-lain."
                />
            </Head>

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/50 dark:via-indigo-950/50 dark:to-purple-950/50">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="text-center">
                        <div className="mb-6 flex items-center justify-center gap-2">
                            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Akayacraft
                            </h1>
                            <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-pink-500" />
                        </div>
                        <p className="mx-auto max-w-2xl text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300">
                            🎨 Wujudkan kreativitas Anda dengan koleksi produk handmade yang penuh inspirasi
                        </p>
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-blue-600 dark:text-blue-400">
                            <div className="flex items-center gap-2">
                                <Palette className="h-4 w-4" />
                                <span>100% Handmade</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Sparkles className="h-4 w-4" />
                                <span>Desain Unik</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Heart className="h-4 w-4" />
                                <span>Dibuat dengan Cinta</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto w-full max-w-8xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
                {/* Search & Filter */}
                <div className="mb-8 rounded-3xl bg-white p-4 sm:p-6 shadow-lg ring-1 ring-blue-100 dark:bg-gray-900 dark:ring-blue-900/30">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4">
                        <div className="lg:col-span-2 xl:col-span-3">
                            <Input 
                                placeholder="🔍 Cari produk kreatif..." 
                                value={query} 
                                onChange={(e) => setQuery(e.target.value)} 
                                className="h-12 rounded-2xl border-blue-200 bg-blue-50/50 text-base focus:border-blue-400 focus:ring-blue-400 dark:border-blue-800 dark:bg-blue-950/30"
                            />
                        </div>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="h-12 rounded-2xl border-blue-200 bg-blue-50/50 focus:border-blue-400 focus:ring-blue-400 dark:border-blue-800 dark:bg-blue-950/30">
                                <SelectValue placeholder="🏷️ Pilih kategori" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl">
                                {CATEGORIES.map((c) => (
                                    <SelectItem key={c} value={c} className="rounded-xl">
                                        {c}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
                    {displayedProducts.map((p, index) => (
                        <Card
                            key={p.id}
                            className="group overflow-hidden rounded-3xl border-0 bg-white shadow-lg ring-1 ring-blue-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-blue-300 dark:bg-gray-900 dark:ring-blue-900/30 dark:hover:ring-blue-700/50"
                            style={{
                                animationDelay: `${(index % 20) * 100}ms`,
                                animation: 'fadeInUp 0.6s ease-out forwards'
                            }}
                        >
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-blue-900/40 dark:via-indigo-900/40 dark:to-purple-900/40"></div>
                                <img
                                    src={p.image_path.startsWith('http') ? p.image_path : `/storage/${p.image_path}`}
                                    alt={p.name}
                                    className="relative z-10 h-full w-full object-cover transition duration-500 ease-out group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                <div className="absolute right-3 top-3 z-30 rounded-full bg-white/90 p-2 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:bg-gray-800/90">
                                    <Heart className="h-4 w-4 text-pink-500" />
                                </div>
                            </div>
                            <CardContent className="p-4 sm:p-6">
                                <div className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                                    {p.category}
                                </div>
                                <h3 className="line-clamp-1 text-lg font-bold text-gray-800 dark:text-gray-100">{p.name}</h3>
                                <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">{p.description}</p>
                                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <span className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">{formatPrice(p.price)}</span>
                                    <a href={waUrl(p)} target="_blank" rel="noreferrer">
                                        <Button className="w-full sm:w-auto rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 px-4 sm:px-6 py-2 text-sm sm:text-base text-white shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl">
                                            💬 Pesan Sekarang
                                        </Button>
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="mt-12 flex justify-center">
                        <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-lg ring-1 ring-blue-100 dark:bg-gray-900 dark:ring-blue-900/30">
                            <div className="flex items-center gap-3">
                                <LoaderCircle className="h-6 w-6 animate-spin text-blue-500" />
                                <span className="text-base sm:text-lg text-gray-600 dark:text-gray-300">Memuat produk kreatif lainnya...</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Load More Button */}
                {!isLoading && hasMore && (
                    <div className="mt-12 flex justify-center">
                        <Button 
                            onClick={loadMore}
                            className="rounded-3xl bg-gradient-to-r from-blue-500 to-indigo-600 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl"
                        >
                            ✨ Lihat Lebih Banyak Kreasi
                        </Button>
                    </div>
                )}

                {/* No more products */}
                {!hasMore && filtered.length > 0 && (
                    <div className="mt-12 text-center">
                        <div className="inline-block rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6 dark:from-blue-950/50 dark:to-indigo-950/50">
                            <Sparkles className="mx-auto mb-2 h-8 w-8 text-blue-500" />
                            <p className="text-base sm:text-lg font-medium text-gray-600 dark:text-gray-300">
                                🎉 Anda telah melihat semua produk kreatif kami!
                            </p>
                        </div>
                    </div>
                )}

                {/* No products found */}
                {filtered.length === 0 && (
                    <div className="mt-12 text-center">
                        <div className="inline-block rounded-3xl bg-gradient-to-r from-gray-50 to-blue-50 p-8 dark:from-gray-950/50 dark:to-blue-950/50">
                            <div className="text-6xl mb-4">🎨</div>
                            <p className="text-xl font-medium text-gray-600 dark:text-gray-300">
                                Produk tidak ditemukan
                            </p>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">
                                Coba kata kunci atau kategori yang berbeda
                            </p>
                        </div>
                    </div>
                )}
            </section>

            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </PublicLayout>
    );
}
