import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import { Switch } from "./ui/switch";

interface StoreCardProps {
  id: string;
  name: string;
  description: string;
  productCount: number;
  status: 'active' | 'hidden';
  revenue?: string;
  image?: string;
  icon?: string;
  onEdit?: () => void;
  onToggleVisibility?: (visible: boolean) => void;
  variant?: 'admin' | 'customer';
}

export function StoreCard({
  name,
  description,
  productCount,
  status,
  revenue,
  image,
  icon,
  onEdit,
  onToggleVisibility,
  variant = 'admin'
}: StoreCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border border-border-light bg-white">
      <div className="aspect-[16/9] bg-gradient-to-br from-primary-300 to-primary-700 relative overflow-hidden">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Icons.store className="w-16 h-16 text-white/40" />
          </div>
        )}
        {variant === 'admin' && (
          <Badge 
            className={`absolute top-4 right-4 shadow-md border-0 ${
              status === 'active' 
                ? 'bg-status-success text-white' 
                : 'bg-status-warning text-white'
            }`}
          >
            {status === 'active' ? 'ACTIVE' : 'HIDDEN'}
          </Badge>
        )}
      </div>
      
      <div className="p-6 space-y-4 bg-white">
        <div className="flex items-start gap-3">
          {icon && (
            <div className="w-12 h-12 rounded-xl bg-secondary-500 flex items-center justify-center flex-shrink-0 shadow-md">
              <span className="text-2xl">{icon}</span>
            </div>
          )}
          <div className="flex-1">
            <h3 className="mb-2 text-text-primary">{name}</h3>
            <p className="text-text-secondary leading-relaxed">{description}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6 text-text-secondary pt-2">
          <div className="flex items-center gap-2">
            <Icons.package className="w-4 h-4" />
            <span>{productCount} Products</span>
          </div>
          {revenue && (
            <div className="flex items-center gap-2">
              <Icons.dollar className="w-4 h-4" />
              <span>{revenue}</span>
            </div>
          )}
        </div>
        
        {variant === 'admin' && (
          <div className="flex items-center justify-between pt-4 border-t border-border-light">
            <div className="flex items-center gap-2">
              <span className="text-text-secondary">Visibility</span>
              <Switch 
                checked={status === 'active'} 
                onCheckedChange={onToggleVisibility}
              />
            </div>
            <Button 
              variant="outline" 
              className="border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white" 
              onClick={onEdit}
            >
              <Icons.edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
        )}
        
        {variant === 'customer' && (
          <Button className="w-full h-11 bg-primary-700 hover:bg-primary-900 text-white shadow-lg hover:shadow-xl transition-all">
            View Store
          </Button>
        )}
      </div>
    </Card>
  );
}