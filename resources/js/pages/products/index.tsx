import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Produk', href: '/products' },
];

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

type PageProps = SharedData & {
  products?: Product[];
};

const CATEGORIES = ['Semua', 'Undangan', 'Flash Card', 'Mahkota', 'Stiker', 'Kipas', 'Souvenir', 'Dekorasi', 'Lainnya'];

export default function ProductsIndex() {
  const { auth } = usePage<PageProps>().props;
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Semua');

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // fetch from API endpoint
    fetch('/api/products')
      .then((r) => r.json())
      .then((data) => setProducts(data));
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const okCat = category === 'Semua' ? true : p.category === category;
      const okQuery = query ? (p.name + ' ' + p.description).toLowerCase().includes(query.toLowerCase()) : true;
      return okCat && okQuery;
    });
  }, [products, query, category]);

  const formatPrice = (n: string | number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(n));

  const waUrl = (p: Product) => {
    const base = 'https://wa.me/' + p.whatsapp_number.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(p.whatsapp_message || `Halo Akayacraft, saya tertarik dengan produk ${p.name} (ID ${p.id}).`);
    return `${base}?text=${text}`;
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Akayacraft | Produk Kreatif">
        <meta name="description" content="Koleksi produk handmade & kreatif Akayacraft: undangan, flash card, mahkota, stiker, kipas, dan lain-lain." />
      </Head>

      <section className="mx-auto w-full max-w-7xl px-4 py-10">
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-pink-100 via-rose-50 to-violet-100 p-6 shadow-sm dark:from-pink-900/30 dark:via-rose-900/30 dark:to-violet-900/30">
          <h1 className="text-3xl font-semibold text-rose-600 md:text-4xl dark:text-rose-400">Akayacraft</h1>
          <p className="mt-2 text-sm text-zinc-600 md:text-base dark:text-zinc-300">Produk handmade & kreatif: undangan nikah, flash card, mahkota, stiker, kipas, dan lainnya.</p>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-3">
          <Input placeholder="Cari produk..." value={query} onChange={(e) => setQuery(e.target.value)} className="md:col-span-2" />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih kategori" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <Card key={p.id} className="group overflow-hidden rounded-2xl border-0 bg-white shadow-sm ring-1 ring-rose-100 transition hover:-translate-y-1 hover:shadow-md dark:bg-zinc-900 dark:ring-rose-900/30">
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-emerald-50 dark:from-pink-900/20 dark:via-rose-900/20 dark:to-emerald-900/20">
                <img
                  src={p.image_path.startsWith('http') ? p.image_path : `/storage/${p.image_path}`}
                  alt={p.name}
                  className="h-full w-full object-cover transition duration-300 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition group-hover:opacity-100" />
              </div>
              <CardContent className="p-4">
                <h3 className="line-clamp-1 text-base font-semibold text-zinc-800 dark:text-zinc-100">{p.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-300">{p.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-rose-600 dark:text-rose-400">{formatPrice(p.price)}</span>
                  <a href={waUrl(p)} target="_blank" rel="noreferrer">
                    <Button className="bg-emerald-500 text-white hover:bg-emerald-600">Pesan via WhatsApp</Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}