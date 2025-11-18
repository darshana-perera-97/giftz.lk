import { Button } from "./ui/button";
import { Icons } from "./icons";
import { Badge } from "./ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";

interface TopNavProps {
  role: 'platform-admin' | 'store-admin' | 'customer';
  onRoleChange?: (role: 'platform-admin' | 'store-admin' | 'customer') => void;
  cartCount?: number;
  onCartClick?: () => void;
}

export function TopNav({ role, onRoleChange, cartCount = 0, onCartClick }: TopNavProps) {
  const getRoleDisplay = () => {
    switch (role) {
      case 'platform-admin':
        return 'Platform Admin';
      case 'store-admin':
        return 'Store Admin';
      case 'customer':
        return 'Customer View';
    }
  };

  const getUserData = () => {
    switch (role) {
      case 'platform-admin':
        return { name: 'Admin User', email: 'admin@platform.com', initials: 'AU' };
      case 'store-admin':
        return { name: 'Store Manager', email: 'admin@luxurygifts.com', initials: 'SM' };
      case 'customer':
        return { name: 'John Doe', email: 'john.doe@example.com', initials: 'JD' };
    }
  };

  const userData = getUserData();

  return (
    <div className="h-16 bg-white border-b border-border-light sticky top-0 z-50 shadow-sm">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center shadow-md">
              <Icons.gift className="w-6 h-6 text-secondary-500" />
            </div>
            <div>
              <h4 className="text-text-primary">Gift Platform</h4>
              <p className="text-text-secondary">{getRoleDisplay()}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Role Switcher for Demo */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-gray100 rounded-lg border border-border-light">
            <span className="text-text-secondary">Demo Mode:</span>
            <select
              value={role}
              onChange={(e) => onRoleChange?.(e.target.value as any)}
              className="bg-transparent border-none outline-none cursor-pointer text-text-primary"
            >
              <option value="platform-admin">Platform Admin</option>
              <option value="store-admin">Store Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div>

          {role === 'customer' && (
            <Button variant="outline" className="relative border-border-light hover:border-primary-700" onClick={onCartClick}>
              <Icons.cart className="w-5 h-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 bg-secondary-500 text-primary-900 border-0">
                  {cartCount}
                </Badge>
              )}
            </Button>
          )}

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2 border-border-light hover:border-primary-700">
                <Avatar className="w-7 h-7">
                  <AvatarFallback className="bg-primary-700 text-white">
                    {userData.initials}
                  </AvatarFallback>
                </Avatar>
                <Icons.chevronDown className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-72">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary-700 text-white">
                      {userData.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{userData.name}</p>
                    <p className="text-text-secondary">{userData.email}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start hover:bg-surface-gray100">
                    <Icons.user className="w-4 h-4 mr-2" />
                    Profile Settings
                  </Button>
                  {role !== 'customer' && (
                    <Button variant="ghost" className="w-full justify-start hover:bg-surface-gray100">
                      <Icons.settings className="w-4 h-4 mr-2" />
                      Account Settings
                    </Button>
                  )}
                  <Button variant="ghost" className="w-full justify-start hover:bg-surface-gray100">
                    <Icons.help className="w-4 h-4 mr-2" />
                    Help & Support
                  </Button>
                </div>
                
                <Separator />
                
                <Button variant="outline" className="w-full text-status-error border-status-error hover:bg-status-error hover:text-white">
                  <Icons.logout className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}