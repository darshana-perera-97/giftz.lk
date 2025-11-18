import { useState } from "react";
import { ProductCard } from "../ProductCard";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { Input } from "../ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const mockProducts = [
  { id: '1', name: 'Premium Watch', description: 'Luxury timepiece with premium materials', price: 299.99, status: 'active' as const, category: 'Luxury' },
  { id: '2', name: 'Luxury Leather Bag', description: 'Handcrafted leather bag', price: 399.99, status: 'active' as const, category: 'Luxury' },
  { id: '3', name: 'Designer Sunglasses', description: 'Stylish UV protection eyewear', price: 189.99, status: 'hidden' as const, category: 'Tech' },
  { id: '4', name: 'Premium Gift Set', description: 'Curated collection of luxury items', price: 149.99, status: 'active' as const, category: 'Artisan' },
  { id: '5', name: 'Silk Scarf Collection', description: 'Premium silk scarves', price: 79.99, status: 'active' as const, category: 'Personalized' },
  { id: '6', name: 'Watch Bundle', description: 'Set of 3 elegant watches', price: 549.99, status: 'active' as const, category: 'Luxury' },
];

export function StoreAdminProducts() {
  const [products] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof mockProducts[0] | null>(null);
  const [productImages, setProductImages] = useState<string[]>([]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (product: typeof mockProducts[0]) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1>Products Management</h1>
          <p className="text-text-secondary mt-2">Manage your store products</p>
        </div>
        
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary-500 hover:bg-primary-700 text-white">
              <Icons.plus className="w-5 h-5 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Product Name</Label>
                <Input placeholder="Enter product name" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Product description" rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select defaultValue="luxury">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="luxury">Luxury</SelectItem>
                      <SelectItem value="tech">Tech</SelectItem>
                      <SelectItem value="artisan">Artisan</SelectItem>
                      <SelectItem value="personalized">Personalized</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Price</Label>
                  <Input type="number" placeholder="0.00" step="0.01" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select defaultValue="active">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="hidden">Hidden</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Product Images (Max 5)</Label>
                <div className="border-2 border-dashed border-border-light rounded-xl p-6 text-center">
                  <Icons.upload className="w-12 h-12 mx-auto text-text-secondary mb-3" />
                  <p className="text-text-secondary mb-2">Click to upload or drag and drop</p>
                  <p className="text-text-secondary">PNG, JPG up to 10MB (Maximum 5 images)</p>
                  <Input type="file" accept="image/*" multiple className="mt-4" />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-primary-500 hover:bg-primary-700 text-white">
                  Add Product
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
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
                <Label>Category</Label>
                <Select defaultValue={selectedProduct?.category.toLowerCase()}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="luxury">Luxury</SelectItem>
                    <SelectItem value="tech">Tech</SelectItem>
                    <SelectItem value="artisan">Artisan</SelectItem>
                    <SelectItem value="personalized">Personalized</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Price</Label>
                <Input type="number" defaultValue={selectedProduct?.price} step="0.01" />
              </div>
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
            <div className="space-y-2">
              <Label>Product Images (Max 5)</Label>
              <div className="grid grid-cols-3 gap-3 mb-3">
                {[1, 2, 3].map((_, idx) => (
                  <div key={idx} className="aspect-square bg-surface-gray100 rounded-lg relative group">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icons.image className="w-8 h-8 text-text-secondary" />
                    </div>
                    <button className="absolute top-2 right-2 w-6 h-6 bg-status-error text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Icons.close className="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="border-2 border-dashed border-border-light rounded-xl p-6 text-center">
                <Icons.upload className="w-12 h-12 mx-auto text-text-secondary mb-3" />
                <p className="text-text-secondary mb-2">Add more images (Max 5 total)</p>
                <Input type="file" accept="image/*" multiple className="mt-4" />
              </div>
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
