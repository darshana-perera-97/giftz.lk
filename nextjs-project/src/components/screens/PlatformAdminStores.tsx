import { useState } from "react";
import { StoreCard } from "../StoreCard";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { Input } from "../ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const mockStores = [
  { id: '1', name: 'Luxury Gifts Co.', description: 'Premium luxury gifts and exclusive collections', productCount: 45, status: 'active' as const, revenue: '$12,450', icon: '🎁', email: 'admin@luxurygifts.com', contactNumber: '+1 (555) 123-4567', package: 'Pro', themeColor: '#6366f1' },
  { id: '2', name: 'Artisan Crafts', description: 'Handmade artisan products from local creators', productCount: 32, status: 'active' as const, revenue: '$8,920', icon: '🎨', email: 'admin@artisancrafts.com', contactNumber: '+1 (555) 234-5678', package: 'Basic', themeColor: '#8b5cf6' },
  { id: '3', name: 'Tech Gadgets Store', description: 'Latest tech gifts and innovative gadgets', productCount: 67, status: 'hidden' as const, revenue: '$15,670', icon: '💻', email: 'admin@techgadgets.com', contactNumber: '+1 (555) 345-6789', package: 'Enterprise', themeColor: '#3b82f6' },
  { id: '4', name: 'Personalized Treasures', description: 'Custom personalized gifts for every occasion', productCount: 28, status: 'active' as const, revenue: '$6,340', icon: '✨', email: 'admin@personalizedtreasures.com', contactNumber: '+1 (555) 456-7890', package: 'Pro', themeColor: '#ec4899' },
  { id: '5', name: 'Eco-Friendly Gifts', description: 'Sustainable and environmentally conscious products', productCount: 41, status: 'active' as const, revenue: '$9,820', icon: '🌿', email: 'admin@ecofriendly.com', contactNumber: '+1 (555) 567-8901', package: 'Basic', themeColor: '#10b981' },
  { id: '6', name: 'Kids Wonderland', description: 'Amazing gifts and toys for children', productCount: 89, status: 'active' as const, revenue: '$18,450', icon: '🧸', email: 'admin@kidswonderland.com', contactNumber: '+1 (555) 678-9012', package: 'Enterprise', themeColor: '#f59e0b' },
];

export function PlatformAdminStores() {
  const [stores, setStores] = useState(mockStores);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [confirmToggle, setConfirmToggle] = useState<{ show: boolean; storeId: string; newStatus: boolean } | null>(null);
  const [selectedStore, setSelectedStore] = useState<typeof mockStores[0] | null>(null);
  
  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleVisibility = (storeId: string, visible: boolean) => {
    setConfirmToggle({ show: true, storeId, newStatus: visible });
  };

  const confirmToggleVisibility = () => {
    if (confirmToggle) {
      setStores(stores.map(store =>
        store.id === confirmToggle.storeId
          ? { ...store, status: confirmToggle.newStatus ? 'active' as const : 'hidden' as const }
          : store
      ));
      setConfirmToggle(null);
    }
  };

  const handleEdit = (store: typeof mockStores[0]) => {
    setSelectedStore(store);
    setIsEditModalOpen(true);
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1>Store Management</h1>
          <p className="text-text-secondary mt-2">Manage all stores on the platform</p>
        </div>
        
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary-500 hover:bg-primary-700 text-white">
              <Icons.plus className="w-5 h-5 mr-2" />
              Create Store
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Store</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Store Name</Label>
                  <Input placeholder="Enter store name" />
                </div>
                <div className="space-y-2">
                  <Label>Contact Number</Label>
                  <Input type="tel" placeholder="+1 (555) 123-4567" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Store Admin Email</Label>
                <Input type="email" placeholder="admin@store.com" />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" placeholder="Set store admin password" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Store description" rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Package</Label>
                  <Select defaultValue="basic">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Theme Color</Label>
                  <Input type="color" defaultValue="#6366f1" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Store Icon</Label>
                <Input placeholder="Enter emoji or icon (e.g., 🎁)" />
              </div>
              <div className="space-y-2">
                <Label>Store Featured Image</Label>
                <Input type="file" accept="image/*" />
              </div>
              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-primary-500 hover:bg-primary-700 text-white">
                  Create Store
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <Input
            placeholder="Search stores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Icons.filter className="w-5 h-5 mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStores.map((store) => (
          <StoreCard
            key={store.id}
            {...store}
            onEdit={() => handleEdit(store)}
            onToggleVisibility={(visible) => handleToggleVisibility(store.id, visible)}
            variant="admin"
          />
        ))}
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Store</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Store Name</Label>
                <Input defaultValue={selectedStore?.name} />
              </div>
              <div className="space-y-2">
                <Label>Contact Number</Label>
                <Input type="tel" defaultValue={selectedStore?.contactNumber} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Store Admin Email</Label>
              <Input type="email" defaultValue={selectedStore?.email} />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <div className="flex gap-2">
                <Input type="password" placeholder="••••••••" />
                <Button variant="outline">
                  <Icons.edit className="w-4 h-4 mr-2" />
                  Change
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea defaultValue={selectedStore?.description} rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Package</Label>
                <Select defaultValue={selectedStore?.package.toLowerCase()}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="pro">Pro</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Theme Color</Label>
                <Input type="color" defaultValue={selectedStore?.themeColor} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Store Icon</Label>
              <Input placeholder="Enter emoji or icon" defaultValue={selectedStore?.icon} />
            </div>
            <div className="space-y-2">
              <Label>Store Featured Image</Label>
              <Input type="file" accept="image/*" />
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

      {/* Confirmation Dialog */}
      <AlertDialog open={confirmToggle?.show} onOpenChange={(open) => !open && setConfirmToggle(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Visibility Change</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {confirmToggle?.newStatus ? 'show' : 'hide'} this store? 
              {!confirmToggle?.newStatus && ' Customers will not be able to see this store.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmToggleVisibility}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
