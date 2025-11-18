import { useState } from "react";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { motion } from "motion/react";
import { ProductCard } from "../ProductCard";

const productImages = [
  'https://images.unsplash.com/photo-1760804876422-7efb73b58048?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjI0ODQ5Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
];

const relatedProducts = [
  { id: '2', name: 'Luxury Leather Bag', description: 'Handcrafted leather bag', price: 399.99, rating: 5, reviews: 94 },
  { id: '5', name: 'Silk Scarf Collection', description: 'Premium silk scarves', price: 79.99, rating: 4, reviews: 56 },
  { id: '6', name: 'Watch Bundle', description: 'Set of 3 elegant watches', price: 549.99, rating: 5, reviews: 189 },
  { id: '4', name: 'Premium Gift Set', description: 'Curated collection of luxury items', price: 149.99, rating: 5, reviews: 203 },
];

export function CustomerSingleProduct() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    contactNumber: '',
  });

  const handleBuyNow = () => {
    setIsBuyModalOpen(true);
  };

  const handleConfirmPurchase = () => {
    setIsBuyModalOpen(false);
    setIsConfirmModalOpen(true);
  };

  const confirmOrder = () => {
    setIsConfirmModalOpen(false);
    // Process order
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Icons.star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'fill-secondary-500 text-secondary-500' : 'text-border-dark'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-surface-white">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-text-secondary mb-8">
          <span>Home</span>
          <Icons.chevronRight className="w-4 h-4" />
          <span>All Products</span>
          <Icons.chevronRight className="w-4 h-4" />
          <span className="text-text-primary">Premium Watch</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div className="space-y-4">
            <motion.div
              className="aspect-square rounded-2xl overflow-hidden bg-surface-gray100"
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={productImages[selectedImage]}
                alt="Product"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-3">
              {productImages.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? 'border-primary-500'
                      : 'border-border-light hover:border-primary-300'
                  }`}
                >
                  <img src={image} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-4 bg-primary-100 text-primary-700">Luxury</Badge>
              <h1 className="mb-4">Premium Watch</h1>
              <div className="flex items-center gap-4 mb-4">
                {renderStars(5)}
                <span className="text-text-secondary">(128 reviews)</span>
              </div>
              <h2 className="text-primary-700">$299.99</h2>
            </div>

            <div className="pt-6 border-t border-border-light">
              <p className="text-text-secondary leading-relaxed">
                Luxury timepiece with premium materials. This exquisite watch combines traditional craftsmanship with modern design. Features include sapphire crystal glass, water resistance, and automatic movement. Perfect for any occasion.
              </p>
            </div>

            <div className="pt-6 border-t border-border-light space-y-4">
              <div>
                <Label>Quantity</Label>
                <div className="flex items-center gap-3 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1 bg-primary-500 hover:bg-primary-700 text-white h-14"
                  onClick={handleBuyNow}
                >
                  <Icons.cart className="w-5 h-5 mr-2" />
                  Buy Now
                </Button>
                <Button variant="outline" size="lg" className="h-14">
                  <Icons.heart className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="pt-6 border-t border-border-light space-y-3">
              <div className="flex items-center gap-3">
                <Icons.store className="w-5 h-5 text-text-secondary" />
                <span className="text-text-secondary">Sold by: <span className="text-text-primary">Luxury Gifts Co.</span></span>
              </div>
              <div className="flex items-center gap-3">
                <Icons.package className="w-5 h-5 text-text-secondary" />
                <span className="text-text-secondary">Free shipping on orders over $100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} variant="customer" />
            ))}
          </div>
        </div>
      </div>

      {/* Buy Now Modal */}
      <Dialog open={isBuyModalOpen} onOpenChange={setIsBuyModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Purchase</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-surface-gray100 rounded-lg">
              <div className="flex justify-between mb-2">
                <span>Premium Watch × {quantity}</span>
                <span>${(299.99 * quantity).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span className="text-primary-700">${(299.99 * quantity).toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                placeholder="John Doe"
                value={customerData.name}
                onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input
                type="email"
                placeholder="john@example.com"
                value={customerData.email}
                onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Contact Number</Label>
              <Input
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={customerData.contactNumber}
                onChange={(e) => setCustomerData({ ...customerData, contactNumber: e.target.value })}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                className="flex-1 bg-primary-500 hover:bg-primary-700 text-white"
                onClick={handleConfirmPurchase}
              >
                Continue to Payment
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setIsBuyModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <AlertDialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Your Order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to purchase Premium Watch × {quantity} for ${(299.99 * quantity).toFixed(2)}?
              <div className="mt-4 p-3 bg-surface-gray100 rounded-lg">
                <p><strong>Name:</strong> {customerData.name}</p>
                <p><strong>Email:</strong> {customerData.email}</p>
                <p><strong>Phone:</strong> {customerData.contactNumber}</p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmOrder} className="bg-primary-500 hover:bg-primary-700">
              Confirm Order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
