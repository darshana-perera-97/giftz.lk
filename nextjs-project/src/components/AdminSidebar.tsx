import { Icons, IconName } from "./icons";
import { motion } from "motion/react";

interface SidebarItem {
  id: string;
  label: string;
  icon: IconName;
}

interface AdminSidebarProps {
  role: 'platform-admin' | 'store-admin';
  activeItem: string;
  onItemClick: (id: string) => void;
}

const platformAdminItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'home' },
  { id: 'stores', label: 'Stores', icon: 'store' },
  { id: 'items', label: 'All Items', icon: 'package' },
  { id: 'orders', label: 'Orders', icon: 'orders' },
  { id: 'comments', label: 'Comments', icon: 'comments' },
];

const storeAdminItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'home' },
  { id: 'products', label: 'Products', icon: 'package' },
  { id: 'orders', label: 'Orders', icon: 'orders' },
  { id: 'comments', label: 'Comments', icon: 'comments' },
  { id: 'store-details', label: 'Store Details', icon: 'store' },
];

export function AdminSidebar({ role, activeItem, onItemClick }: AdminSidebarProps) {
  const items = role === 'platform-admin' ? platformAdminItems : storeAdminItems;

  return (
    <div className="w-64 h-[calc(100vh-4rem)] bg-white border-r border-border-light sticky top-16">
      <nav className="p-4 space-y-1">
        {items.map((item) => {
          const Icon = Icons[item.icon];
          const isActive = activeItem === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-primary-700 text-white shadow-lg'
                  : 'hover:bg-surface-gray100 text-text-primary'
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
}