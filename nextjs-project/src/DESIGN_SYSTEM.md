# Multi-Store Gift Ecommerce Platform - Design System Documentation

## Project Overview
A comprehensive multi-role ecommerce platform featuring three distinct user experiences: Platform Admin, Store Admin, and Customer View. Built with React, Tailwind CSS, and Motion for smooth animations.

---

## 1. Color Tokens

### Primary Colors
- **primary-500**: `#6366f1` - Main brand color
- **primary-300**: `#a5b4fc` - Light variant
- **primary-700**: `#4338ca` - Dark variant

### Secondary Colors
- **secondary-500**: `#f59e0b` - Accent color (gold/amber)
- **secondary-300**: `#fcd34d` - Light variant

### Surface Colors
- **surface-white**: `#ffffff` - Primary background
- **surface-gray100**: `#f9fafb` - Light gray surface
- **surface-gray200**: `#f3f4f6` - Medium gray surface

### Text Colors
- **text-primary**: `#111827` - Primary text
- **text-secondary**: `#6b7280` - Secondary/muted text
- **text-inverted**: `#ffffff` - White text for dark backgrounds

### Border Colors
- **border-light**: `#e5e7eb` - Light borders
- **border-dark**: `#d1d5db` - Darker borders

### Status Colors
- **status-success**: `#10b981` - Success states (green)
- **status-warning**: `#f59e0b` - Warning states (amber)
- **status-error**: `#ef4444` - Error states (red)

---

## 2. Component System

### Navigation Components
- **TopNav**: Main navigation bar with role switcher, cart, and user menu
- **AdminSidebar**: Vertical navigation for admin interfaces
- **Customer Navigation**: Floating bottom navigation for customer view

### Card Components
- **StoreCard**: Display store information with variants (admin/customer)
- **ProductCard**: Product display with hover effects, ratings, and actions
- **AnalyticsCard**: Statistics display with icons and trend indicators

### UI Elements
- **Buttons**: Primary, Secondary, Outline, Ghost variants
- **Inputs**: Text, Search, Dropdown, Date, Password
- **Badges**: Status indicators with color variants
- **Tables**: Sortable data tables with pagination
- **Modals**: Dialog-based modals for creation/editing
- **Toast Notifications**: Success/error feedback messages

### Icons (Lucide React)
- Store, Gift, Analytics, Orders, Comments, Users, Settings
- Package, TrendingUp, Eye, Plus, Edit, Trash, Search
- Home, Grid, Heart, Cart, User, Menu, Star, Filter, Calendar, Dollar, Tag

---

## 3. Screen Hierarchy & Layer Structure

### Platform Admin View
```
Platform Admin
├── Login (not implemented in demo)
├── Dashboard
│   ├── Analytics Cards (Total Stores, Active Stores, Products, Revenue)
│   ├── Store Growth Chart (Bar Chart)
│   ├── Revenue Trend Chart (Line Chart)
│   └── Recent Activity Feed
├── Stores Management
│   ├── Store List Grid
│   ├── Search & Filter Bar
│   ├── Create Store Modal
│   │   ├── Store Name Input
│   │   ├── Description Textarea
│   │   └── Admin Email Input
│   ├── Edit Store Modal
│   └── Visibility Toggle with Confirmation
├── Items Management
│   ├── Product Grid (All Stores)
│   ├── Search Bar
│   ├── Store Filter Dropdown
│   └── Edit Product Modal
└── Settings (placeholder)
```

### Store Admin View
```
Store Admin
├── Login (not implemented in demo)
├── Dashboard
│   ├── Sales Analytics (4 cards)
│   ├── Weekly Sales Chart
│   ├── Recent Orders List
│   ├── Top Products Widget
│   ├── Store Stats Widget
│   └── Quick Actions Widget
├── Products Management
│   ├── Product Grid
│   ├── Search Bar
│   ├── Add Product Modal
│   │   ├── Product Name Input
│   │   ├── Description Textarea
│   │   ├── Price Input
│   │   ├── Status Dropdown
│   │   └── Image Upload
│   └── Edit Product Modal
├── Analytics Tab (chart placeholder)
├── Orders Management
│   ├── Summary Cards (4 status cards)
│   ├── Search & Filter
│   └── Orders Table
│       ├── Order ID
│       ├── Customer Info
│       ├── Products Count
│       ├── Total Amount
│       ├── Status Badge
│       └── View Action
├── Comments Management
│   ├── Summary Cards
│   ├── Tabs (All, Pending, Approved, Rejected)
│   └── Comment Cards
│       ├── Customer Name & Product
│       ├── Star Rating
│       ├── Comment Text
│       └── Approve/Reject Actions
└── Store Details (editable info)
```

### Customer View
```
Customer
├── Landing Page
│   ├── Hero Section
│   │   ├── Headline & CTA Buttons
│   │   └── Gradient Background with Decorative Elements
│   ├── Search Bar (prominent)
│   ├── Featured Stores Section
│   │   └── Store Cards (3 columns)
│   ├── Trending Gifts Section
│   │   └── Product Cards (4 columns)
│   ├── Shop by Category
│   │   └── Category Cards (4 items)
│   └── Newsletter Signup Section
├── Store Listing
│   ├── Page Header (gradient)
│   ├── Search & Filter Bar
│   ├── Category Pills
│   └── Store Grid (3 columns)
├── Store Detail
│   ├── Store Header (gradient banner)
│   ├── Store Info Card
│   │   ├── Store Name & Badge
│   │   ├── Description
│   │   ├── Rating & Review Count
│   │   └── Follow Button
│   └── Tabs
│       ├── Products Tab (product grid)
│       ├── About Tab (store info)
│       └── Reviews Tab (customer reviews)
├── Product Detail (not implemented - would follow similar pattern)
├── Checkout (not implemented)
└── Order History (not implemented)
```

---

## 4. User Flow Diagrams

### Platform Admin Flow
```
Login → Dashboard → View Analytics
                 ↓
                 Stores → View All Stores → Create New Store
                       ↓                  ↓
                       Edit Store      Toggle Visibility
                       ↓
                 Items → View All Products → Edit Product
                       ↓
                       Filter by Store
                       ↓
                 Settings
```

### Store Admin Flow
```
Login → Dashboard → View Sales Stats
                 ↓
                 Products → View Products → Add Product
                         ↓               ↓
                         Edit Product  Change Visibility
                         ↓
                 Orders → View Orders → Update Status → View Details
                       ↓
                 Comments → View Comments → Approve/Reject
                         ↓
                         Filter by Status
                         ↓
                 Analytics → View Charts & Reports
                         ↓
                 Store Details → Edit Store Info
```

### Customer Flow
```
Landing → Browse Featured Stores → View Store → View Products → Add to Cart
       ↓                         ↓                            ↓
       Browse All Stores    View Store Info            Product Detail → Checkout
       ↓                         ↓                            ↓
       Search Products      Read Reviews                Order Complete
       ↓                         ↓                            ↓
       Filter by Category   Follow Store               Order History
```

---

## 5. Interaction Notes & Behaviors

### Animations & Transitions
- **Page Transitions**: Smooth fade and slide (200ms) when switching between screens
- **Card Hover**: Lift effect with `translateY(-4px)` and enhanced shadow
- **Product Image**: Zoom effect (scale: 1.05) on hover
- **Modal Entrance**: Fade in with backdrop blur
- **Tab Switching**: Slide animation between content
- **Sidebar Navigation**: Horizontal slide (4px) on hover, scale down (0.98) on click

### Hover States
- **Cards**: Shadow elevation increases, subtle upward movement
- **Buttons**: Background color darkens, smooth transition
- **Product Cards**: Image zooms, favorite button becomes more prominent
- **Store Cards**: Enhanced shadow with border glow effect

### Modal Interactions
- **Create/Edit Modals**: Center-aligned, backdrop click to close
- **Confirmation Dialogs**: Alert dialog for destructive actions (visibility toggle)
- **Form Validation**: Real-time validation (not implemented, placeholder for expansion)

### Responsive Behavior
- **Desktop** (lg): 4-column product grids, 3-column store grids
- **Tablet** (md): 2-column layouts, collapsible sidebar
- **Mobile**: Single column, bottom navigation for customer view

### Specific Interactions

#### Platform Admin
- **Store Visibility Toggle**: 
  - Requires confirmation dialog
  - Updates badge color instantly
  - Shows success toast notification
  
- **Create Store**:
  - Modal opens on button click
  - Form fields with validation
  - Success state closes modal and refreshes list

#### Store Admin
- **Comment Moderation**:
  - Approve/Reject buttons appear only for pending comments
  - Status updates immediately with color-coded badges
  - Counter updates in real-time

- **Order Management**:
  - Status badges color-coded by state
  - Sortable table columns
  - Quick view action opens detailed modal

#### Customer View
- **Product Interaction**:
  - Heart icon for favorites (toggles fill state)
  - Add to cart updates counter in navigation
  - Star rating displays visually
  
- **Store Following**:
  - Follow button toggles state
  - Shows success notification
  - Updates follower count

- **Search & Filter**:
  - Real-time search results
  - Category pills highlight on selection
  - Filter preserves search query

### Loading States
- Skeleton loaders for cards and lists (not implemented, recommended)
- Spinner for async operations (not implemented, recommended)
- Progressive image loading

### Error Handling
- Toast notifications for errors
- Inline validation messages in forms
- Fallback UI for missing images (gift icon placeholder)

---

## 6. Spacing System

- **Container Max Width**: 1280px (max-w-7xl)
- **Section Padding**: 80px vertical (py-20), 32px horizontal (px-8)
- **Card Padding**: 24px (p-6)
- **Grid Gaps**: 24px (gap-6)
- **Element Spacing**: 16px, 24px, 32px increments

---

## 7. Typography Hierarchy

Uses system default typography defined in globals.css:
- **h1**: Extra large headings for page titles
- **h2**: Section headings
- **h3**: Subsection headings  
- **h4**: Card titles
- **p**: Body text
- **Font Weight**: Normal (400) for body, Medium (500) for headings

Geometric, minimal aesthetic achieved through clean letter spacing and line heights.

---

## 8. Shadow System

- **Card Shadow**: `shadow-xl` for elevated cards
- **Hover Shadow**: Enhanced with `hover:shadow-2xl`
- **Floating Elements**: `shadow-2xl` for navigation and modals
- **Subtle Shadow**: `shadow-sm` for input fields and minor elevation

---

## 9. Border Radius System

- **Small**: 8px (rounded-lg) for buttons and inputs
- **Medium**: 12px (rounded-xl) for cards and modals
- **Large**: 16px (rounded-2xl) for major containers
- **Full**: 9999px (rounded-full) for pills and circular elements

---

## 10. Implementation Notes

### Technology Stack
- **React 18+** with TypeScript
- **Tailwind CSS v4.0** with custom tokens
- **Motion (Framer Motion)** for animations
- **Recharts** for data visualization
- **Lucide React** for icons
- **Shadcn/ui** component library

### Key Features Implemented
✅ Three complete role-based views  
✅ Smooth page transitions  
✅ Interactive components with hover states  
✅ Modal-based CRUD operations  
✅ Status management with confirmations  
✅ Responsive grid layouts  
✅ Search and filter functionality  
✅ Data visualization charts  
✅ Tab-based navigation  
✅ Badge system for status indicators  

### Features for Future Enhancement
🔲 Authentication & login screens  
🔲 Real backend integration  
🔲 Shopping cart functionality  
🔲 Checkout process  
🔲 Order history  
🔲 Product detail page  
🔲 Image upload functionality  
🔲 Real-time notifications  
🔲 Advanced filtering & sorting  
🔲 Pagination for large datasets  

---

## 11. Design Principles

### Visual Language
- **Fancy & Modern**: Gradients, subtle shadows, smooth rounded corners
- **Premium Feel**: Indigo primary color, gold accents, spacious layouts
- **Minimal**: Clean typography, ample whitespace, focused content
- **Consistent**: Repeating patterns, systematic spacing, unified color palette

### Interaction Design
- **Smooth**: All transitions use easing functions, no abrupt changes
- **Responsive**: Hover states provide clear feedback
- **Intuitive**: Common patterns, clear CTAs, obvious navigation
- **Delightful**: Micro-interactions add polish without distraction

### Accessibility Considerations
- Color contrast ratios meet WCAG standards
- Interactive elements have adequate touch targets
- Focus states visible for keyboard navigation
- Semantic HTML structure

---

## Demo Mode Notes

The current implementation includes a **role switcher** in the top navigation for easy demonstration. This allows switching between Platform Admin, Store Admin, and Customer views without authentication. In production, this would be replaced with proper authentication and role-based routing.

---

*Last Updated: November 7, 2025*
