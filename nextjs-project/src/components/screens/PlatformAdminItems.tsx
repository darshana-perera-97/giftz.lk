import { useState } from "react";
import { ProductCard } from "../ProductCard";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const mockProducts = [
  { id: '1', name: 'Premium Watch', description: 'Luxury timepiece with premium materials', price: 299.99, status: 'active' as const, store: 'Luxury Gifts Co.' },
  { id: '2', name: 'Handmade Pottery Set', description: 'Beautiful ceramic pottery collection', price: 89.99, status: 'active' as const, store: 'Artisan Crafts' },
  { id: '3', name: 'Smart Home Hub', description: 'Control your entire smart home', price: 149.99, status: 'hidden' as const, store: 'Tech Gadgets Store' },
  { id: '4', name: 'Custom Photo Album', description: 'Personalized leather-bound album', price: 59.99, status: 'active' as const, store: 'Personalized Treasures' },
  { id: '5', name: 'Bamboo Utensil Set', description: 'Eco-friendly kitchen essentials', price: 34.99, status: 'active' as const, store: 'Eco-Friendly Gifts' },
  { id: '6', name: 'Educational Robot Kit', description: 'STEM learning robot for kids', price: 79.99, status: 'active' as const, store: 'Kids Wonderland' },
];

export function PlatformAdminItems() {
  const [products] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [storeFilter, setStoreFilter] = useState('all');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof mockProducts[0] | null>(null);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStore = storeFilter === 'all' || product.store === storeFilter;
    return matchesSearch && matchesStore;
  });

  const stores = Array.from(new Set(products.map(p => p.store)));

  const handleEdit = (product: typeof mockProducts[0]) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1>All Items Management</h1>
        <p className="text-text-secondary mt-2">View and manage products across all stores</p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={storeFilter} onValueChange={setStoreFilter}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Filter by store" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stores</SelectItem>
            {stores.map(store => (
              <SelectItem key={store} value={store}>{store}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onEdit={() => handleEdit(product)}
            variant="admin"
          />
        ))}
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Product Name</Label>
              <Input defaultValue={selectedProduct?.name} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea defaultValue={selectedProduct?.description} rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price</Label>
                <Input type="number" defaultValue={selectedProduct?.price} step="0.01" />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select defaultValue={selectedProduct?.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="hidden">Hidden</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Product Images</Label>
              <div className="border-2 border-dashed border-border-light rounded-xl p-6 text-center">
                <Icons.upload className="w-12 h-12 mx-auto text-text-secondary mb-3" />
                <p className="text-text-secondary mb-2">Click to upload or drag and drop</p>
                <p className="text-text-secondary">PNG, JPG up to 10MB</p>
                <Input type="file" accept="image/*" multiple className="mt-4" />
              </div>
              <p className="text-text-secondary">Current product images will be shown here</p>
            </div>
            <div className="flex gap-3 pt-4">
              <Button className="flex-1 bg-primary-500 hover:bg-primary-700 text-white">
                Save Changes
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
