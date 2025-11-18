# Multi-Store Gift Ecommerce Platform - Sitemap & User Flows

## Complete Sitemap

```
Gift Ecommerce Platform
│
├── Platform Admin Portal
│   ├── Login (auth required)
│   ├── Dashboard
│   │   ├── Analytics Overview
│   │   ├── Store Metrics
│   │   ├── Revenue Charts
│   │   └── Activity Feed
│   ├── Stores Management
│   │   ├── Store List View
│   │   ├── Create Store Flow
│   │   ├── Edit Store Flow
│   │   └── Toggle Visibility
│   ├── Items Management
│   │   ├── All Products View
│   │   ├── Filter by Store
│   │   └── Edit Product Flow
│   └── Settings
│       ├── Platform Configuration
│       └── Admin Management
│
├── Store Admin Portal
│   ├── Login (auth required)
│   ├── Dashboard
│   │   ├── Sales Overview
│   │   ├── Order Summary
│   │   └── Quick Stats
│   ├── Products Management
│   │   ├── Product List
│   │   ├── Add Product Flow
│   │   └── Edit Product Flow
│   ├── Analytics
│   │   ├── Sales Charts
│   │   ├── Traffic Data
│   │   └── Conversion Metrics
│   ├── Orders Management
│   │   ├── Order List
│   │   ├── Order Details
│   │   └── Status Updates
│   ├── Comments Management
│   │   ├── All Comments
│   │   ├── Pending Review
│   │   ├── Approve/Reject Flow
│   │   └── Comment Moderation
│   └── Store Details
│       ├── Store Information
│       └── Edit Store Profile
│
└── Customer Portal
    ├── Landing Page
    │   ├── Hero Section
    │   ├── Featured Stores
    │   ├── Trending Products
    │   ├── Categories
    │   └── Newsletter Signup
    ├── Store Listing
    │   ├── Browse All Stores
    │   ├── Search & Filter
    │   └── Store Selection
    ├── Store Detail
    │   ├── Store Profile
    │   ├── Products Tab
    │   ├── About Tab
    │   └── Reviews Tab
    ├── Product Detail
    │   ├── Product Information
    │   ├── Image Gallery
    │   ├── Add to Cart
    │   └── Customer Reviews
    ├── Shopping Cart
    │   ├── Cart Items
    │   ├── Quantity Adjustment
    │   └── Proceed to Checkout
    ├── Checkout
    │   ├── Shipping Information
    │   ├── Payment Details
    │   └── Order Confirmation
    └── User Account
        ├── Order History
        ├── Favorite Stores
        ├── Saved Products
        └── Account Settings
```

---

## Detailed User Flows

### 1. Platform Admin User Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    PLATFORM ADMIN FLOW                       │
└─────────────────────────────────────────────────────────────┘

[START] → Login Screen
            ↓
         Enter Credentials
            ↓
    ┌──────────────┐
    │  Dashboard   │ ←─────────────────────┐
    └──────────────┘                       │
            ↓                               │
    View Platform Metrics                   │
    - Total Stores                          │
    - Active Stores                         │
    - Revenue                               │
    - Growth Charts                         │
            ↓                               │
    [Choose Action]                         │
            ↓                               │
    ┌───────┴───────┬──────────┬──────────┐│
    ↓               ↓          ↓          ↓│
Manage Stores  View Items  Settings   Back to Dashboard
    ↓               ↓                      ↑
    │               │                      │
    │      ┌────────┴─────────┐           │
    │      │                  │           │
    │   View All          Filter by       │
    │   Products            Store         │
    │      │                  │           │
    │      └───────┬──────────┘           │
    │              ↓                      │
    │         Edit Product                │
    │              ↓                      │
    │      Update Information             │
    │              ↓                      │
    │         Save Changes ───────────────┘
    │
    ↓
View Store List
    ↓
┌───┴────┐
│        │
↓        ↓
Create   Manage Existing
Store    Store
│        │
│        ├─→ Edit Store Info
│        │        ↓
│        │   Update Details
│        │        ↓
│        │   Save Changes ────────────────┐
│        │                                │
│        └─→ Toggle Visibility            │
│                   ↓                     │
│            Confirm Action               │
│                   ↓                     │
│            Update Status ───────────────┤
│                                         │
↓                                         │
Enter Store Details                       │
- Store Name                              │
- Description                             │
- Admin Email                             │
    ↓                                     │
Submit Form                               │
    ↓                                     │
Store Created ────────────────────────────┘
    ↓
Return to Store List
    ↓
[Continue Managing or Exit]
```

---

### 2. Store Admin User Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     STORE ADMIN FLOW                         │
└─────────────────────────────────────────────────────────────┘

[START] → Login Screen
            ↓
         Enter Credentials
            ↓
    ┌──────────────┐
    │  Dashboard   │ ←──────────────────────┐
    └──────────────┘                        │
            ↓                                │
    View Store Metrics                      │
    - Sales Today                           │
    - Orders                                │
    - Products                              │
    - Comments                              │
            ↓                                │
    [Choose Section]                        │
            ↓                                │
    ┌───────┴─────┬────────┬────────┬──────┤
    ↓             ↓        ↓        ↓      ↓
Products     Orders   Comments  Analytics  Store Details
    │             │        │                │
    │             │        │                │
    ↓             │        │                │
Manage Products   │        │                │
    │             │        │                │
┌───┴───┐         │        │                │
│       │         │        │                │
↓       ↓         │        │                │
Add    Edit       │        │                │
New   Existing    │        │                │
│       │         │        │                │
│       ↓         │        │                │
│   Select        │        │                │
│   Product       │        │                │
│       ↓         │        │                │
↓   Update Info   │        │                │
│       ↓         │        │                │
│   - Name        │        │                │
│   - Description │        │                │
│   - Price       │        │                │
│   - Status      │        │                │
│   - Image       │        │                │
│       ↓         │        │                │
└───→ Submit ─────┤        │                │
        ↓         │        │                │
    Save Changes  │        │                │
        ↓         │        │                │
    Product List ←┘        │                │
        ↓                  │                │
        │                  │                │
        └──────────────────┤                │
                           ↓                │
                    View Orders             │
                           ↓                │
                    Filter by Status        │
                    - All                   │
                    - Processing            │
                    - Shipped               │
                    - Completed             │
                           ↓                │
                    Select Order            │
                           ↓                │
                    View Details            │
                           ↓                │
                    Update Status           │
                           ↓                │
                    Back to Orders ─────────┤
                                            │
        ┌───────────────────────────────────┘
        ↓
    Manage Comments
        ↓
    Filter by Status
    - All
    - Pending
    - Approved
    - Rejected
        ↓
    Review Comment
        ↓
    ┌───┴───┐
    ↓       ↓
Approve  Reject
    │       │
    └───┬───┘
        ↓
    Update Status
        ↓
    Next Comment
        ↓
    [Continue or Return]
        ↓
    Back to Dashboard ─────────────────────┐
                                           │
Edit Store Details                         │
    ↓                                      │
Update Information                         │
- Description                              │
- Contact Info                             │
- Store Hours                              │
    ↓                                      │
Save Changes ──────────────────────────────┘
    ↓
Return to Dashboard
```

---

### 3. Customer User Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      CUSTOMER FLOW                           │
└─────────────────────────────────────────────────────────────┘

[START] → Landing Page
            ↓
    ┌───────────────┐
    │   Hero Banner │
    │ Featured Content │
    └───────────────┘
            ↓
    [Choose Path]
            ↓
    ┌───────┴────────┬─────────┬──────────┐
    ↓                ↓         ↓          ↓
Browse         Browse All  Search    View
Featured       Stores      Products  Categories
Stores            ↓           ↓          ↓
    │             │           │          │
    │     ┌───────┴───┐       │          │
    │     ↓           ↓       │          │
    │  Filter by  Sort by     │          │
    │  Category   Rating      │          │
    │     │           │       │          │
    │     └─────┬─────┘       │          │
    │           ↓             │          │
    └─────→ Store List ←──────┴──────────┘
                ↓
          Select Store
                ↓
        ┌──────────────┐
        │ Store Detail │
        └──────────────┘
                ↓
        [Choose Tab]
                ↓
        ┌───────┴──────┬─────────┐
        ↓              ↓         ↓
    Products       About     Reviews
        │              │         │
        │              ↓         │
        │      Read Store Info   │
        │              │         │
        │              ├─→ Follow Store
        │              │         │
        │              │         ↓
        │              │    Read Reviews
        │              │         │
        │              │         ↓
        │              │    Write Review
        │              │         │
        └──────────────┴─────────┘
                ↓
        Browse Products
                ↓
        Select Product
                ↓
        ┌──────────────┐
        │Product Detail│
        └──────────────┘
                ↓
        View Information
        - Images
        - Description
        - Price
        - Reviews
        - Rating
                ↓
        [Choose Action]
                ↓
        ┌───────┴───────┐
        ↓               ↓
    Add to Cart    Add to Favorites
        │               │
        ↓               │
    Cart Updated        │
        │               │
        ├───────────────┘
        ↓
    [Continue Shopping or Checkout]
        │
        ├─→ Continue Shopping ─→ Back to Store
        │
        └─→ Proceed to Checkout
                ↓
        ┌──────────────┐
        │ Shopping Cart│
        └──────────────┘
                ↓
        Review Cart Items
        - Adjust Quantities
        - Remove Items
        - Apply Coupon
                ↓
        Proceed to Checkout
                ↓
        ┌──────────────┐
        │   Checkout   │
        └──────────────┘
                ↓
        Enter Information
                ↓
        ┌───────┴────────┐
        ↓                ↓
    Shipping Info   Payment Info
        │                │
        └────────┬───────┘
                 ↓
        Review Order Summary
                 ↓
        Confirm Purchase
                 ↓
        ┌──────────────────┐
        │Order Confirmation│
        └──────────────────┘
                 ↓
        Order Number: #ORD-XXX
                 ↓
        [What's Next?]
                 ↓
        ┌────────┴────────┬─────────────┐
        ↓                 ↓             ↓
    Track Order    View Receipt  Continue Shopping
        │                 │             │
        ↓                 │             │
    Order Status          │             │
        │                 │             │
        └─────────────────┴─────────────┘
                          ↓
                    User Account
                          ↓
                    ┌─────┴─────┬──────────┐
                    ↓           ↓          ↓
              Order History  Favorites  Settings
                    │           │          │
                    ↓           ↓          ↓
              View Past    Saved Stores Update Profile
              Orders       & Products   & Preferences
                    │           │          │
                    └───────────┴──────────┘
                          ↓
                    [Continue Browsing]
```

---

## Key Decision Points & Actions

### Platform Admin Decisions
1. **Create New Store** → Opens modal → Fill form → Submit
2. **Edit Store** → Select store → Update info → Save
3. **Toggle Visibility** → Confirm action → Update status
4. **Edit Product** → Select product → Update details → Save

### Store Admin Decisions
1. **Add Product** → Click add → Fill form → Upload image → Submit
2. **Edit Product** → Select product → Modify info → Save
3. **Update Order Status** → Select order → Change status → Confirm
4. **Moderate Comment** → Review content → Approve or Reject → Next

### Customer Decisions
1. **Browse or Search** → Explore stores or use search
2. **View Store** → Browse products or read info
3. **Add to Cart** → Continue shopping or checkout
4. **Checkout** → Complete purchase or save for later
5. **Post Review** → Rate and write review → Submit

---

## Navigation Patterns

### Admin Navigation (Platform & Store)
- **Sidebar**: Persistent left navigation
- **Current Page**: Highlighted in primary color
- **Hover Effects**: Slide animation on hover
- **Mobile**: Collapsible hamburger menu

### Customer Navigation
- **Top Bar**: Logo, search, cart, account
- **Floating Bottom Nav**: Home, Stores, Detail (demo mode)
- **Breadcrumbs**: (recommended for implementation)
- **Back Buttons**: Context-aware navigation

---

## State Management Flow

```
Application State
│
├── User Role
│   ├── platform-admin
│   ├── store-admin
│   └── customer
│
├── Active Page/View
│   ├── Platform Admin Pages
│   ├── Store Admin Pages
│   └── Customer Pages
│
├── Modal States
│   ├── Create/Edit Modals
│   └── Confirmation Dialogs
│
├── Data States
│   ├── Stores List
│   ├── Products List
│   ├── Orders List
│   └── Comments List
│
└── UI States
    ├── Search Queries
    ├── Filter Selections
    ├── Cart Items
    └── Loading States
```

---

## Interaction Sequences

### Create Store Sequence (Platform Admin)
```
1. Click "Create Store" button
2. Modal opens with fade-in animation
3. User fills form fields
4. Real-time validation (optional)
5. Click "Create Store" button
6. Loading state (spinner)
7. Success toast notification
8. Modal closes
9. Store list refreshes
10. New store appears in grid
```

### Approve Comment Sequence (Store Admin)
```
1. Navigate to Comments tab
2. Filter to "Pending" status
3. Review comment content
4. Click "Approve" button
5. Badge updates to green
6. Comment moves to "Approved" tab
7. Pending counter decrements
8. Success toast notification
9. Next comment auto-loads (optional)
```

### Add to Cart Sequence (Customer)
```
1. Browse product on store page
2. Hover over product card (zoom effect)
3. Click "Add to Cart" button
4. Cart icon in nav animates
5. Cart counter updates (+1)
6. Success toast "Added to cart"
7. Product card returns to normal state
8. User can continue browsing
```

---

## Error Flow Handling

```
[Action Triggered]
       ↓
   API Call
       ↓
   ┌───┴────┐
   ↓        ↓
Success   Error
   │        │
   │        ↓
   │   Show Error Toast
   │        │
   │        ↓
   │   Log Error (console)
   │        │
   │        ↓
   │   Revert UI State
   │        │
   │        └─→ Allow Retry
   ↓
Update UI
   ↓
Show Success Feedback
   ↓
[Continue Flow]
```

---

*Last Updated: November 7, 2025*
