import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { type BreadcrumbItem } from '@/types';
import { Pencil, Plus, Trash2 } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: string | number;
  image_path: string;
  category: string;
}

export default function AdminProductsIndex({ products }: { products: { data: Product[] } }) {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Produk', href: '/admin/products' },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Kelola Produk" />

      <div className="mx-auto w-full max-w-7xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Produk</h1>
          <Link href={route('admin.products.create')}>
            <Button className="bg-rose-500 hover:bg-rose-600">
              <Plus className="mr-2 size-4" /> Tambah Produk
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.data.map((p) => (
            <Card key={p.id} className="overflow-hidden">
              <div className="aspect-[4/3] bg-muted">
                <img src={`/storage/${p.image_path}`} alt={p.name} className="h-full w-full object-cover" />
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{p.name}</h3>
                    <p className="text-xs text-muted-foreground">{p.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={route('admin.products.edit', p.id)}>
                      <Button variant="outline" size="icon">
                        <Pencil className="size-4" />
                      </Button>
                    </Link>
                    <Link as="button" method="delete" href={route('admin.products.destroy', p.id)}>
                      <Button variant="destructive" size="icon">
                        <Trash2 className="size-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}