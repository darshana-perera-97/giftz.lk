import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import { useState } from "react";
import { motion } from "motion/react";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  status?: 'active' | 'hidden';
  rating?: number;
  reviews?: number;
  onEdit?: () => void;
  onAddToCart?: () => void;
  variant?: 'admin' | 'customer';
}

export function ProductCard({
  name,
  description,
  price,
  image,
  status,
  rating = 0,
  reviews = 0,
  onEdit,
  onAddToCart,
  variant = 'customer'
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border border-border-light bg-white h-full flex flex-col group">
        <div className="aspect-square bg-surface-gray100 relative overflow-hidden">
          {image ? (
            <motion.img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.08 : 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface-gray100 to-surface-gray200">
              <Icons.gift className="w-20 h-20 text-text-secondary/20" />
            </div>
          )}
          
          {/* Overlay gradient on hover */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-primary-900/40 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {variant === 'customer' && (
            <motion.button 
              className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
              onClick={() => setIsFavorite(!isFavorite)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icons.heart className={`w-5 h-5 ${isFavorite ? 'fill-status-error text-status-error' : 'text-text-secondary'}`} />
            </motion.button>
          )}
          
          {variant === 'admin' && status && (
            <Badge 
              className={`absolute top-4 right-4 shadow-md ${
                status === 'active' 
                  ? 'bg-status-success text-white border-0' 
                  : 'bg-status-warning text-white border-0'
              }`}
            >
              {status.toUpperCase()}
            </Badge>
          )}
        </div>
        
        <div className="p-6 flex flex-col flex-grow bg-white">
          <div className="flex-grow space-y-3">
            <h4 className="text-text-primary line-clamp-1 group-hover:text-primary-700 transition-colors">{name}</h4>
            <p className="text-text-secondary line-clamp-2 leading-relaxed">{description}</p>
            
            {variant === 'customer' && rating > 0 && (
              <div className="flex items-center gap-2 pt-1">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Icons.star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(rating)
                          ? 'fill-secondary-500 text-secondary-500'
                          : 'text-border-dark fill-border-dark'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-text-secondary">({reviews})</span>
              </div>
            )}
          </div>
          
          <div className="mt-5 pt-5 border-t border-border-light space-y-4">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-1">
                <span className="text-primary-700">$</span>
                <span className="text-primary-700">{price.toFixed(2)}</span>
              </div>
              {variant === 'customer' && (
                <span className="text-text-secondary">Free Shipping</span>
              )}
            </div>
            
            {variant === 'admin' && (
              <Button 
                variant="outline" 
                className="w-full h-11 border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white transition-all" 
                onClick={onEdit}
              >
                <Icons.edit className="w-4 h-4 mr-2" />
                Edit Product
              </Button>
            )}
            
            {variant === 'customer' && (
              <Button 
                className="w-full h-11 bg-primary-700 hover:bg-primary-900 text-white shadow-lg hover:shadow-xl transition-all"
                onClick={onAddToCart}
              >
                <Icons.cart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}