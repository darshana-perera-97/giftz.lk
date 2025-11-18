import { useState } from "react";
import { ProductCard } from "../ProductCard";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { motion } from "motion/react";

const storeProducts = [
  { id: '1', name: 'Premium Watch', description: 'Luxury timepiece with premium materials', price: 299.99, rating: 5, reviews: 128 },
  { id: '2', name: 'Luxury Leather Bag', description: 'Handcrafted leather bag', price: 399.99, rating: 5, reviews: 94 },
  { id: '3', name: 'Designer Sunglasses', description: 'Stylish UV protection eyewear', price: 189.99, rating: 4, reviews: 67 },
  { id: '4', name: 'Premium Gift Set', description: 'Curated collection of luxury items', price: 149.99, rating: 5, reviews: 203 },
  { id: '5', name: 'Silk Scarf Collection', description: 'Premium silk scarves', price: 79.99, rating: 4, reviews: 156 },
  { id: '6', name: 'Watch Bundle', description: 'Set of 3 elegant watches', price: 549.99, rating: 5, reviews: 89 },
];

const reviews = [
  { id: '1', customer: 'John Doe', rating: 5, comment: 'Amazing quality! Exceeded my expectations.', date: '2025-11-05' },
  { id: '2', customer: 'Jane Smith', rating: 5, comment: 'Great products and excellent customer service.', date: '2025-11-04' },
  { id: '3', customer: 'Mike Johnson', rating: 4, comment: 'Beautiful items, fast shipping.', date: '2025-11-03' },
];

export function CustomerStoreDetail() {
  const [activeTab, setActiveTab] = useState('products');
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleWriteReview = () => {
    if (!isLoggedIn) {
      setIsRegisterModalOpen(true);
    } else {
      setIsCommentModalOpen(true);
    }
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
    setIsRegisterModalOpen(false);
    setIsCommentModalOpen(true);
  };

  const handleSubmitReview = () => {
    // Submit review logic
    setIsCommentModalOpen(false);
    setRating(0);
    setComment('');
  };

  return (
    <div className="min-h-screen bg-surface-gray100">
      {/* Store Header */}
      <div className="relative h-80 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-9xl">🎁</div>
        </div>
      </div>

      {/* Store Info */}
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          className="relative -mt-20 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <h1>Luxury Gifts Co.</h1>
                  <Badge className="bg-status-success text-white">Verified</Badge>
                </div>
                <p className="text-text-secondary mb-6">
                  Premium luxury gifts and exclusive collections. We curate the finest products 
                  from around the world to bring you exceptional quality and style.
                </p>
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Icons.star key={i} className="w-5 h-5 fill-secondary-500 text-secondary-500" />
                      ))}
                    </div>
                    <span>4.8 (342 reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Icons.package className="w-5 h-5" />
                    <span>45 Products</span>
                  </div>
                </div>
              </div>
              <Button className="bg-primary-500 hover:bg-primary-700 text-white">
                <Icons.heart className="w-5 h-5 mr-2" />
                Follow Store
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mt-8 pb-16">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-white rounded-xl p-1 shadow-sm">
              <TabsTrigger value="products" className="px-8">Products</TabsTrigger>
              <TabsTrigger value="about" className="px-8">About</TabsTrigger>
              <TabsTrigger value="reviews" className="px-8">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {storeProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <ProductCard {...product} variant="customer" />
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="about" className="mt-8">
              <div className="bg-white rounded-2xl p-8 space-y-6">
                <div>
                  <h3 className="mb-3">About Our Store</h3>
                  <p className="text-text-secondary leading-relaxed">
                    Luxury Gifts Co. has been providing premium gifts and exclusive collections since 2015. 
                    We believe that every gift should be special and memorable. Our team carefully curates 
                    products from the finest artisans and luxury brands worldwide.
                  </p>
                </div>
                <div>
                  <h4 className="mb-3">Our Values</h4>
                  <ul className="space-y-2 text-text-secondary">
                    <li className="flex items-start gap-2">
                      <Icons.chevronRight className="w-5 h-5 text-primary-500 mt-0.5" />
                      <span>Premium quality guaranteed on every product</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icons.chevronRight className="w-5 h-5 text-primary-500 mt-0.5" />
                      <span>Fast and secure worldwide shipping</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icons.chevronRight className="w-5 h-5 text-primary-500 mt-0.5" />
                      <span>Exceptional customer service</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icons.chevronRight className="w-5 h-5 text-primary-500 mt-0.5" />
                      <span>30-day return policy</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3>Customer Reviews</h3>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Icons.star key={i} className="w-6 h-6 fill-secondary-500 text-secondary-500" />
                          ))}
                        </div>
                        <span className="text-text-secondary">4.8 out of 5 based on 342 reviews</span>
                      </div>
                    </div>
                    <Button variant="outline" onClick={handleWriteReview}>
                      <Icons.plus className="w-4 h-4 mr-2" />
                      Write a Review
                    </Button>
                  </div>
                </div>

                {reviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-2xl p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p>{review.customer}</p>
                        <span className="text-text-secondary">{review.date}</span>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Icons.star
                            key={i}
                            className={`w-5 h-5 ${
                              i < review.rating
                                ? 'fill-secondary-500 text-secondary-500'
                                : 'text-border-dark'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-text-secondary">{review.comment}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Register Modal */}
      <Dialog open={isRegisterModalOpen} onOpenChange={setIsRegisterModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Register to Write a Review</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-text-secondary">Please register or log in to write a review for this store.</p>
            <div className="space-y-2">
              <Label>Name</Label>
              <Input placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input type="email" placeholder="your@email.com" />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" placeholder="Create a password" />
            </div>
            <div className="flex gap-3 pt-4">
              <Button className="flex-1 bg-primary-500 hover:bg-primary-700 text-white" onClick={handleRegister}>
                Register
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setIsRegisterModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Write Review Modal */}
      <Dialog open={isCommentModalOpen} onOpenChange={setIsCommentModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Your Rating</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <Icons.star
                      className={`w-8 h-8 transition-colors ${
                        star <= (hoverRating || rating)
                          ? 'fill-secondary-500 text-secondary-500'
                          : 'text-border-dark'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Your Review</Label>
              <Textarea
                placeholder="Share your experience with this store..."
                rows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                className="flex-1 bg-primary-500 hover:bg-primary-700 text-white"
                onClick={handleSubmitReview}
                disabled={rating === 0 || !comment}
              >
                Submit Review
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setIsCommentModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
