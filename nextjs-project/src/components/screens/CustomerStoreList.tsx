import { useState } from "react";
import { StoreCard } from "../StoreCard";
import { Input } from "../ui/input";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { motion } from "motion/react";

const allStores = [
  { id: '1', name: 'Luxury Gifts Co.', description: 'Premium luxury gifts and exclusive collections', productCount: 45, status: 'active' as const },
  { id: '2', name: 'Artisan Crafts', description: 'Handmade artisan products from local creators', productCount: 32, status: 'active' as const },
  { id: '3', name: 'Tech Gadgets Store', description: 'Latest tech gifts and innovative gadgets', productCount: 67, status: 'active' as const },
  { id: '4', name: 'Personalized Treasures', description: 'Custom personalized gifts for every occasion', productCount: 28, status: 'active' as const },
  { id: '5', name: 'Eco-Friendly Gifts', description: 'Sustainable and environmentally conscious products', productCount: 41, status: 'active' as const },
  { id: '6', name: 'Kids Wonderland', description: 'Amazing gifts and toys for children', productCount: 89, status: 'active' as const },
  { id: '7', name: 'Gourmet Delights', description: 'Premium food and beverage gifts', productCount: 52, status: 'active' as const },
  { id: '8', name: 'Home & Living', description: 'Elegant home decor and lifestyle products', productCount: 73, status: 'active' as const },
];

export function CustomerStoreList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredStores = allStores.filter(store =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = ['All', 'Luxury', 'Tech', 'Artisan', 'Kids', 'Home'];

  return (
    <div className="min-h-screen bg-surface-gray100">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-700 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-white mb-4">Explore All Stores</h1>
            <p className="text-white/90">
              Browse through our collection of {allStores.length} premium gift stores
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Icons.search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <Input
                placeholder="Search stores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 border-border-light"
              />
            </div>
            <Button variant="outline" className="h-12">
              <Icons.filter className="w-5 h-5 mr-2" />
              Filters
            </Button>
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category.toLowerCase())}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCategory === category.toLowerCase()
                    ? 'bg-primary-500 text-white'
                    : 'bg-surface-gray100 text-text-secondary hover:bg-surface-gray200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Store Grid */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStores.map((store, index) => (
            <motion.div
              key={store.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <StoreCard {...store} variant="customer" />
            </motion.div>
          ))}
        </div>

        {filteredStores.length === 0 && (
          <div className="text-center py-20">
            <Icons.store className="w-16 h-16 text-text-secondary/40 mx-auto mb-4" />
            <h3 className="text-text-secondary">No stores found</h3>
            <p className="text-text-secondary mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
