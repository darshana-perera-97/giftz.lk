# Component Variants & Usage Guide

## Overview
This document details all components, their variants, props, and usage patterns in the Multi-Store Gift Ecommerce Platform.

---

## 1. Navigation Components

### TopNav
**Purpose**: Main application navigation bar with role identification and actions

**Variants**: Single variant adapts based on role

**Props**:
```typescript
interface TopNavProps {
  role: 'platform-admin' | 'store-admin' | 'customer';
  onRoleChange?: (role) => void;
  cartCount?: number; // Shows only for customer role
}
```

**Usage**:
```tsx
<TopNav 
  role="customer" 
  onRoleChange={handleRoleChange}
  cartCount={3}
/>
```

**Features**:
- Logo with gradient icon
- Role display text
- Demo mode role switcher
- Cart button with badge (customer only)
- User profile button
- Sticky positioning with shadow

---

### AdminSidebar
**Purpose**: Vertical navigation for admin interfaces

**Variants**: Adapts menu items based on role

**Props**:
```typescript
interface AdminSidebarProps {
  role: 'platform-admin' | 'store-admin';
  activeItem: string;
  onItemClick: (id: string) => void;
}
```

**Usage**:
```tsx
<AdminSidebar 
  role="platform-admin"
  activeItem="dashboard"
  onItemClick={handleNavigation}
/>
```

**Navigation Items**:

Platform Admin:
- Dashboard
- Stores
- All Items
- Settings

Store Admin:
- Dashboard
- Products
- Analytics
- Orders
- Comments
- Store Details

**Interaction**:
- Active item highlighted with primary color
- Hover: 4px horizontal slide
- Click: Scale down to 0.98
- Smooth transitions

---

## 2. Card Components

### StoreCard
**Purpose**: Display store information with actions

**Variants**:
- `admin`: Edit and visibility controls
- `customer`: View store button

**Props**:
```typescript
interface StoreCardProps {
  id: string;
  name: string;
  description: string;
  productCount: number;
  status: 'active' | 'hidden';
  revenue?: string; // Admin only
  image?: string;
  onEdit?: () => void; // Admin only
  onToggleVisibility?: (visible: boolean) => void; // Admin only
  variant?: 'admin' | 'customer';
}
```

**Usage**:
```tsx
// Admin variant
<StoreCard
  id="1"
  name="Luxury Gifts Co."
  description="Premium luxury gifts"
  productCount={45}
  status="active"
  revenue="$12,450"
  onEdit={handleEdit}
  onToggleVisibility={handleToggle}
  variant="admin"
/>

// Customer variant
<StoreCard
  id="1"
  name="Luxury Gifts Co."
  description="Premium luxury gifts"
  productCount={45}
  status="active"
  variant="customer"
/>
```

**Visual Features**:
- 16:9 aspect ratio header
- Gradient background when no image
- Status badge (active/hidden)
- Product count with icon
- Revenue display (admin)
- Hover: Shadow elevation + lift effect
- Visibility toggle switch (admin)
- Edit button (admin)
- View store button (customer)

---

### ProductCard
**Purpose**: Display product with purchase/edit actions

**Variants**:
- `admin`: Edit controls and status badge
- `customer`: Add to cart and favorite

**Props**:
```typescript
interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  status?: 'active' | 'hidden'; // Admin only
  rating?: number; // Customer only
  reviews?: number; // Customer only
  onEdit?: () => void; // Admin only
  onAddToCart?: () => void; // Customer only
  variant?: 'admin' | 'customer';
}
```

**Usage**:
```tsx
// Admin variant
<ProductCard
  id="1"
  name="Premium Watch"
  description="Luxury timepiece"
  price={299.99}
  status="active"
  onEdit={handleEdit}
  variant="admin"
/>

// Customer variant
<ProductCard
  id="1"
  name="Premium Watch"
  description="Luxury timepiece"
  price={299.99}
  rating={5}
  reviews={128}
  onAddToCart={handleAddToCart}
  variant="customer"
/>
```

**Visual Features**:
- Square aspect ratio
- Image zoom on hover (scale 1.05)
- Favorite button (customer) - toggleable heart
- Status badge (admin)
- Star rating display (customer)
- Price display
- Line-clamp description (2 lines)
- Action buttons
- Hover: Card lift + shadow

---

### AnalyticsCard
**Purpose**: Display key metrics with visual indicators

**Variants**: Single variant with customizable gradient

**Props**:
```typescript
interface AnalyticsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: IconName;
  gradient?: string;
}
```

**Usage**:
```tsx
<AnalyticsCard
  title="Total Sales"
  value="$12,450"
  change="+15.3% from last week"
  changeType="positive"
  icon="dollar"
  gradient="from-status-success to-emerald-600"
/>
```

**Visual Features**:
- Large value display
- Icon with gradient background
- Change indicator with trend arrow
- Color-coded change text
- Hover: Lift effect
- Rounded corners

**Gradients Available**:
- Primary: `from-primary-500 to-primary-700`
- Success: `from-status-success to-emerald-600`
- Warning: `from-secondary-500 to-orange-600`
- Purple: `from-purple-500 to-purple-700`
- Pink: `from-pink-500 to-rose-600`

---

## 3. Form Components

### Button Variants
**Available in Shadcn/ui**

**Variants**:
- `default`: Primary button (dark background)
- `outline`: Border button
- `secondary`: Secondary background
- `ghost`: No background, minimal
- `destructive`: Red for dangerous actions

**Sizes**:
- `sm`: Small
- `default`: Medium
- `lg`: Large

**Usage**:
```tsx
<Button variant="default" size="lg">
  <Icons.plus className="w-5 h-5 mr-2" />
  Create Store
</Button>

<Button variant="outline">Cancel</Button>
```

**Custom Styling**:
```tsx
<Button className="bg-primary-500 hover:bg-primary-700 text-white">
  Primary Action
</Button>
```

---

### Input Variants
**Available in Shadcn/ui**

**Types**:
- Text input
- Search input (with icon)
- Number input
- Email input
- Password input
- File upload

**Usage**:
```tsx
// Standard input
<Input placeholder="Enter name" />

// Search input with icon
<div className="relative">
  <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2" />
  <Input placeholder="Search..." className="pl-10" />
</div>

// Number input
<Input type="number" step="0.01" placeholder="0.00" />
```

---

### Select Dropdown
**Available in Shadcn/ui**

**Usage**:
```tsx
<Select value={status} onValueChange={setStatus}>
  <SelectTrigger>
    <SelectValue placeholder="Select status" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="active">Active</SelectItem>
    <SelectItem value="hidden">Hidden</SelectItem>
  </SelectContent>
</Select>
```

---

### Textarea
**Available in Shadcn/ui**

**Usage**:
```tsx
<Textarea 
  placeholder="Enter description"
  rows={3}
/>
```

---

## 4. Modal Components

### Dialog (Create/Edit)
**Available in Shadcn/ui**

**Usage**:
```tsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    <Button>Open Modal</Button>
  </DialogTrigger>
  <DialogContent className="max-w-lg">
    <DialogHeader>
      <DialogTitle>Create Store</DialogTitle>
    </DialogHeader>
    <div className="space-y-4 py-4">
      {/* Form content */}
    </div>
  </DialogContent>
</Dialog>
```

**Features**:
- Backdrop blur
- Center-aligned
- Escape to close
- Click outside to close
- Smooth fade animation

---

### AlertDialog (Confirmations)
**Available in Shadcn/ui**

**Usage**:
```tsx
<AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Confirm Action</AlertDialogTitle>
      <AlertDialogDescription>
        Are you sure? This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleConfirm}>
        Confirm
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

**Use Cases**:
- Store visibility toggle
- Delete confirmations
- Irreversible actions

---

## 5. Data Display Components

### Table
**Available in Shadcn/ui**

**Usage**:
```tsx
<Card>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Order ID</TableHead>
        <TableHead>Customer</TableHead>
        <TableHead>Total</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {orders.map((order) => (
        <TableRow key={order.id}>
          <TableCell>{order.id}</TableCell>
          <TableCell>{order.customer}</TableCell>
          <TableCell>${order.total}</TableCell>
          <TableCell>
            <Badge>{order.status}</Badge>
          </TableCell>
          <TableCell className="text-right">
            <Button variant="outline" size="sm">View</Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</Card>
```

---

### Badge
**Available in Shadcn/ui**

**Variants**: Custom colors via className

**Usage**:
```tsx
// Status badges
<Badge className="bg-status-success text-white">Active</Badge>
<Badge className="bg-status-warning text-white">Pending</Badge>
<Badge className="bg-status-error text-white">Error</Badge>

// Custom badges
<Badge className="bg-primary-500 text-white">Featured</Badge>
<Badge variant="outline">Draft</Badge>
```

**Common Patterns**:
```typescript
const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-status-success text-white';
    case 'pending':
      return 'bg-secondary-500 text-white';
    case 'error':
      return 'bg-status-error text-white';
    default:
      return 'bg-border-dark text-text-primary';
  }
};
```

---

### Tabs
**Available in Shadcn/ui**

**Usage**:
```tsx
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="products">Products</TabsTrigger>
    <TabsTrigger value="about">About</TabsTrigger>
    <TabsTrigger value="reviews">Reviews</TabsTrigger>
  </TabsList>
  
  <TabsContent value="products">
    {/* Products content */}
  </TabsContent>
  
  <TabsContent value="about">
    {/* About content */}
  </TabsContent>
  
  <TabsContent value="reviews">
    {/* Reviews content */}
  </TabsContent>
</Tabs>
```

**Styling**:
```tsx
<TabsList className="bg-white rounded-xl p-1 shadow-sm">
  <TabsTrigger value="all" className="px-8">All</TabsTrigger>
</TabsList>
```

---

## 6. Feedback Components

### Toast Notifications
**Available via Sonner**

**Usage**:
```tsx
import { toast } from "sonner@2.0.3";

// Success
toast.success("Store created successfully!");

// Error
toast.error("Failed to update product");

// Info
toast.info("Changes saved");

// Warning
toast.warning("This action cannot be undone");
```

**Features**:
- Auto-dismiss (configurable)
- Stacked notifications
- Action buttons
- Rich content support

---

### Switch
**Available in Shadcn/ui**

**Usage**:
```tsx
<Switch 
  checked={isVisible}
  onCheckedChange={setIsVisible}
/>

// With label
<div className="flex items-center gap-2">
  <span>Visibility</span>
  <Switch checked={status === 'active'} />
</div>
```

---

## 7. Icon System

### Icons Component
**Source**: Lucide React

**Available Icons**:
```typescript
export const Icons = {
  store: Store,
  gift: Gift,
  analytics: BarChart3,
  orders: ShoppingBag,
  comments: MessageSquare,
  users: Users,
  settings: Settings,
  package: Package,
  trendingUp: TrendingUp,
  eye: Eye,
  eyeOff: EyeOff,
  plus: Plus,
  edit: Edit,
  trash: Trash2,
  search: Search,
  home: Home,
  grid: Grid3x3,
  heart: Heart,
  cart: ShoppingCart,
  user: User,
  logout: LogOut,
  menu: Menu,
  close: X,
  chevronRight: ChevronRight,
  chevronDown: ChevronDown,
  star: Star,
  filter: Filter,
  calendar: Calendar,
  dollar: DollarSign,
  tag: Tag,
};
```

**Usage**:
```tsx
import { Icons } from "./components/icons";

<Icons.store className="w-6 h-6 text-primary-500" />
<Icons.search className="w-5 h-5 text-text-secondary" />

// With button
<Button>
  <Icons.plus className="w-5 h-5 mr-2" />
  Add Product
</Button>
```

**Sizing Convention**:
- Small icons: `w-4 h-4`
- Medium icons: `w-5 h-5`
- Large icons: `w-6 h-6`
- Hero icons: `w-12 h-12` or larger

---

## 8. Animation Patterns

### Motion Components
**Source**: Motion (Framer Motion)

**Page Transitions**:
```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={pageKey}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
  >
    {/* Page content */}
  </motion.div>
</AnimatePresence>
```

**Card Hover Effects**:
```tsx
<motion.div
  whileHover={{ y: -4 }}
  transition={{ duration: 0.2 }}
>
  <Card>{/* content */}</Card>
</motion.div>
```

**Button Interactions**:
```tsx
<motion.button
  whileHover={{ x: 4 }}
  whileTap={{ scale: 0.98 }}
>
  {/* button content */}
</motion.button>
```

**Staggered List Animation**:
```tsx
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
  >
    {/* item content */}
  </motion.div>
))}
```

**Entrance Animations**:
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.3 }}
>
  {/* content */}
</motion.div>
```

---

## 9. Chart Components

### Recharts Integration
**Available Charts**: Bar, Line, Area, Pie

**Bar Chart Example**:
```tsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

<Card className="p-6">
  <h3 className="mb-6">Sales Data</h3>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={chartData}>
      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
      <XAxis dataKey="name" stroke="#6b7280" />
      <YAxis stroke="#6b7280" />
      <Tooltip 
        contentStyle={{ 
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '8px'
        }}
      />
      <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
</Card>
```

**Line Chart Example**:
```tsx
<LineChart data={chartData}>
  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
  <XAxis dataKey="name" stroke="#6b7280" />
  <YAxis stroke="#6b7280" />
  <Tooltip />
  <Line 
    type="monotone"
    dataKey="revenue"
    stroke="#10b981"
    strokeWidth={3}
    dot={{ fill: '#10b981', r: 4 }}
  />
</LineChart>
```

---

## 10. Layout Patterns

### Grid Layouts

**Responsive Product Grid**:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {products.map(product => (
    <ProductCard key={product.id} {...product} />
  ))}
</div>
```

**Analytics Grid**:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {metrics.map(metric => (
    <AnalyticsCard key={metric.id} {...metric} />
  ))}
</div>
```

**Store Grid**:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {stores.map(store => (
    <StoreCard key={store.id} {...store} />
  ))}
</div>
```

---

### Container Patterns

**Standard Page Container**:
```tsx
<div className="p-8 space-y-8">
  <div>
    <h1>Page Title</h1>
    <p className="text-text-secondary mt-2">Description</p>
  </div>
  
  {/* Page content */}
</div>
```

**Max Width Container**:
```tsx
<div className="max-w-7xl mx-auto px-8 py-20">
  {/* Centered content */}
</div>
```

**Split Layout**:
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <Card>{/* Left content */}</Card>
  <Card>{/* Right content */}</Card>
</div>
```

---

## 11. Best Practices

### Component Usage
✅ **Do**:
- Use variants for different contexts
- Keep components focused and reusable
- Use TypeScript interfaces for props
- Implement proper key props for lists
- Handle loading and error states

❌ **Don't**:
- Create duplicate components
- Hardcode data in components
- Ignore accessibility
- Skip prop validation

### Styling
✅ **Do**:
- Use Tailwind utility classes
- Follow spacing system (4, 6, 8, 12, 16, 24)
- Use color tokens from globals.css
- Apply hover states for interactive elements
- Use smooth transitions

❌ **Don't**:
- Use inline styles unless necessary
- Override default typography classes
- Mix measurement units inconsistently
- Create custom colors outside token system

### Animation
✅ **Do**:
- Use Motion for complex animations
- Keep transitions under 300ms
- Apply easing functions
- Test performance on lower-end devices

❌ **Don't**:
- Over-animate
- Use distracting effects
- Block user interactions during animation
- Skip reduced-motion preferences

---

*Last Updated: November 7, 2025*
