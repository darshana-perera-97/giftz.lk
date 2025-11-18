import { useState, useEffect } from "react";
import { StoreCard } from "../StoreCard";
import { ProductCard } from "../ProductCard";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { Input } from "../ui/input";
import { motion, AnimatePresence } from "motion/react";

const heroSlides = [
  {
    title: 'Discover Premium Gifts',
    description: 'Explore curated collections from the finest stores. Find the perfect gift for every occasion.',
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1600',
  },
  {
    title: 'Luxury Collections',
    description: 'Handpicked luxury items from around the world. Exceptional quality meets timeless design.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1600',
  },
  {
    title: 'Perfect for Every Occasion',
    description: 'From birthdays to anniversaries, find gifts that create unforgettable moments.',
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1600',
  },
];

const featuredStores = [
  { id: '1', name: 'Luxury Gifts Co.', description: 'Premium luxury gifts and exclusive collections', productCount: 45, status: 'active' as const, icon: '🎁', image: 'https://images.unsplash.com/photo-1700142678566-601b048b39db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBnaWZ0c3xlbnwxfHx8fDE3NjI0ODQ5NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  { id: '2', name: 'Artisan Crafts', description: 'Handmade artisan products from local creators', productCount: 32, status: 'active' as const, icon: '🎨', image: 'https://images.unsplash.com/photo-1669207261271-a0041d4b0948?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwc3RvcmV8ZW58MXx8fHwxNzYyNDg0OTY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  { id: '3', name: 'Personalized Treasures', description: 'Custom personalized gifts for every occasion', productCount: 28, status: 'active' as const, icon: '✨', image: 'https://images.unsplash.com/photo-1625552185153-7a8d8f3794a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaWZ0JTIwYm94JTIwcHJlc2VudHxlbnwxfHx8fDE3NjI0MzI4MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
];

const featuredProducts = [
  { id: '1', name: 'Premium Watch', description: 'Luxury timepiece with premium materials', price: 299.99, rating: 5, reviews: 128, image: 'https://images.unsplash.com/photo-1760804876422-7efb73b58048?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjI0ODQ5Njd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  { id: '2', name: 'Luxury Leather Bag', description: 'Handcrafted leather bag', price: 399.99, rating: 5, reviews: 94 },
  { id: '3', name: 'Designer Sunglasses', description: 'Stylish UV protection eyewear', price: 189.99, rating: 4, reviews: 67 },
  { id: '4', name: 'Premium Gift Set', description: 'Curated collection of luxury items', price: 149.99, rating: 5, reviews: 203 },
];

export function CustomerLanding() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Hero Slider */}
      <section className="relative h-[600px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-700/90 via-primary-900/90 to-primary-900/90 z-10"></div>
            <img
              src={heroSlides[currentSlide].image}
              alt="Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="max-w-7xl mx-auto px-8 w-full">
                <motion.div 
                  className="max-w-2xl text-white space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h1 className="text-5xl text-white">{heroSlides[currentSlide].title}</h1>
                  <p className="text-xl text-white/90">
                    {heroSlides[currentSlide].description}
                  </p>
                  <div className="flex gap-4 pt-4">
                    <Button size="lg" className="bg-white text-primary-700 hover:bg-white/90">
                      <Icons.store className="w-5 h-5 mr-2" />
                      Browse Stores
                    </Button>
                    <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                      <Icons.gift className="w-5 h-5 mr-2" />
                      View Gifts
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <Icons.chevronRight className="w-6 h-6 text-white rotate-180" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <Icons.chevronRight className="w-6 h-6 text-white" />
        </button>
      </section>

      {/* Search Section */}
      <section className="max-w-7xl mx-auto px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Icons.search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <Input
                placeholder="Search for stores or products..."
                className="pl-12 h-14 border-border-light"
              />
            </div>
            <Button size="lg" className="bg-primary-700 hover:bg-primary-900 text-white px-8 shadow-lg">
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Stores */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="mb-12">
          <h2>Featured Stores</h2>
          <p className="text-text-secondary mt-2">Discover our handpicked selection of premium stores</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredStores.map((store, index) => (
            <motion.div
              key={store.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <StoreCard {...store} variant="customer" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-surface-gray100 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-12">
            <h2>Trending Gifts</h2>
            <p className="text-text-secondary mt-2">Most popular gifts this season</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ProductCard {...product} variant="customer" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="mb-12">
          <h2>Shop by Category</h2>
          <p className="text-text-secondary mt-2">Find exactly what you're looking for</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Luxury', icon: 'gift', gradient: 'from-primary-700 to-primary-900' },
            { name: 'Tech', icon: 'package', gradient: 'from-secondary-500 to-secondary-700' },
            { name: 'Artisan', icon: 'heart', gradient: 'from-purple-500 to-purple-700' },
            { name: 'Personalized', icon: 'tag', gradient: 'from-pink-500 to-rose-600' },
          ].map((category, index) => {
            const Icon = Icons[category.icon as keyof typeof Icons];
            return (
              <motion.button
                key={category.name}
                className={`p-8 rounded-2xl bg-gradient-to-br ${category.gradient} text-white hover:shadow-xl transition-all`}
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Icon className="w-12 h-12 mb-4 mx-auto" />
                <h4 className="text-white">{category.name}</h4>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 py-20">
        <div className="max-w-4xl mx-auto px-8 text-center text-white">
          <h2 className="text-white mb-4">Stay Updated</h2>
          <p className="text-white/90 mb-8">
            Subscribe to our newsletter for exclusive offers and new store launches
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <Input
              placeholder="Enter your email"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 h-12"
            />
            <Button size="lg" className="bg-secondary-500 text-primary-900 hover:bg-secondary-600 shadow-lg">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}