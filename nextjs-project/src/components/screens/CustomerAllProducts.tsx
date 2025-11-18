import { useState } from "react";
import { ProductCard } from "../ProductCard";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { motion } from "motion/react";

const allProducts = [
  { id: '1', name: 'Premium Watch', description: 'Luxury timepiece with premium materials', price: 299.99, rating: 5, reviews: 128, category: 'Luxury', image: 'https://images.unsplash.com/photo-1760804876422-7efb73b58048?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjI0ODQ5Njd8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: '2', name: 'Luxury Leather Bag', description: 'Handcrafted leather bag', price: 399.99, rating: 5, reviews: 94, category: 'Luxury' },
  { id: '3', name: 'Designer Sunglasses', description: 'Stylish UV protection eyewear', price: 189.99, rating: 4, reviews: 67, category: 'Tech' },
  { id: '4', name: 'Premium Gift Set', description: 'Curated collection of luxury items', price: 149.99, rating: 5, reviews: 203, category: 'Artisan' },
  { id: '5', name: 'Silk Scarf Collection', description: 'Premium silk scarves', price: 79.99, rating: 4, reviews: 56, category: 'Personalized' },
  { id: '6', name: 'Watch Bundle', description: 'Set of 3 elegant watches', price: 549.99, rating: 5, reviews: 189, category: 'Luxury' },
  { id: '7', name: 'Smart Home Hub', description: 'Control your entire smart home', price: 149.99, rating: 4, reviews: 342, category: 'Tech' },
  { id: '8', name: 'Handmade Pottery Set', description: 'Beautiful ceramic pottery collection', price: 89.99, rating: 5, reviews: 78, category: 'Artisan' },
];

export function CustomerAllProducts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-surface-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-700 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-white mb-4">All Products</h1>
            <p className="text-white/90 text-xl">Discover our complete collection of premium gifts</p>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-border-light sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Icons.search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-64 h-12">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Luxury">Luxury</SelectItem>
                <SelectItem value="Tech">Tech</SelectItem>
                <SelectItem value="Artisan">Artisan</SelectItem>
                <SelectItem value="Personalized">Personalized</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-64 h-12">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-text-secondary">
            Showing {filteredProducts.length} products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ProductCard {...product} variant="customer" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
