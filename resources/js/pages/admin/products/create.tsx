import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/input';

const CATEGORIES = ['Undangan', 'Flash Card', 'Mahkota', 'Stiker', 'Kipas', 'Souvenir', 'Dekorasi', 'Lainnya'];

export default function CreateProduct() {
  const { data, setData, post, processing, errors } = useForm({
    name: '', description: '', price: '', category: CATEGORIES[0], image: null as File | null, whatsapp_number: '', whatsapp_message: '', is_active: true,
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    post(route('admin.products.store'));
  }

  return (
    <AppLayout>
      <Head title="Tambah Produk" />
      <div className="mx-auto w-full max-w-3xl px-4 py-8">
        <Card>
          <CardContent className="p-6">
            <form onSubmit={submit} className="space-y-4">
              <div>
                <Label>Nama Produk</Label>
                <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>
              <div>
                <Label>Deskripsi</Label>
                <textarea className="mt-1 w-full rounded-md border bg-background p-2" rows={4} value={data.description} onChange={(e) => setData('description', e.target.value)} />
                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label>Harga (IDR)</Label>
                  <Input type="number" step="100" value={data.price} onChange={(e) => setData('price', e.target.value)} />
                  {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
                </div>
                <div>
                  <Label>Kategori</Label>
                  <select className="mt-1 w-full rounded-md border bg-background p-2" value={data.category} onChange={(e) => setData('category', e.target.value)}>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label>Nomor WhatsApp</Label>
                  <Input placeholder="62xxxxxxxxxx" value={data.whatsapp_number} onChange={(e) => setData('whatsapp_number', e.target.value)} />
                  {errors.whatsapp_number && <p className="text-sm text-red-500">{errors.whatsapp_number}</p>}
                </div>
                <div>
                  <Label>Pesan WhatsApp (opsional)</Label>
                  <Input value={data.whatsapp_message} onChange={(e) => setData('whatsapp_message', e.target.value)} />
                </div>
              </div>
              <div>
                <Label>Foto Produk</Label>
                <Input type="file" onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)} />
                {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
              </div>

              <div className="flex items-center justify-end gap-3">
                <Link href={route('admin.products.index')} className="text-sm underline">Batal</Link>
                <Button type="submit" disabled={processing} className="bg-rose-500 hover:bg-rose-600">Simpan</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}