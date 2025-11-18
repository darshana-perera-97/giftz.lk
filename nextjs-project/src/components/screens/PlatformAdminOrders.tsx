import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const mockOrders = [
  { id: '#ORD-001', customer: 'John Doe', store: 'Luxury Gifts Co.', products: 2, total: 599.98, status: 'completed', date: '2025-11-05' },
  { id: '#ORD-002', customer: 'Jane Smith', store: 'Artisan Crafts', products: 1, total: 149.99, status: 'processing', date: '2025-11-06' },
  { id: '#ORD-003', customer: 'Mike Johnson', store: 'Tech Gadgets Store', products: 3, total: 849.97, status: 'shipped', date: '2025-11-06' },
  { id: '#ORD-004', customer: 'Sarah Wilson', store: 'Personalized Treasures', products: 1, total: 549.99, status: 'completed', date: '2025-11-07' },
  { id: '#ORD-005', customer: 'Tom Brown', store: 'Eco-Friendly Gifts', products: 2, total: 399.98, status: 'processing', date: '2025-11-07' },
  { id: '#ORD-006', customer: 'Emma Davis', store: 'Kids Wonderland', products: 4, total: 679.96, status: 'shipped', date: '2025-11-07' },
];

type OrderStatus = 'all' | 'processing' | 'shipped' | 'completed';

export function PlatformAdminOrders() {
  const [orders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus>('all');
  const [storeFilter, setStoreFilter] = useState('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.store.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesStore = storeFilter === 'all' || order.store === storeFilter;
    return matchesSearch && matchesStatus && matchesStore;
  });

  const stores = Array.from(new Set(orders.map(o => o.store)));

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-status-success text-white';
      case 'processing':
        return 'bg-secondary-500 text-white';
      case 'shipped':
        return 'bg-primary-500 text-white';
      default:
        return 'bg-border-dark text-text-primary';
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1>All Orders</h1>
        <p className="text-text-secondary mt-2">Monitor all orders across the platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-text-secondary">Total Orders</p>
          <h3 className="mt-2">456</h3>
        </Card>
        <Card className="p-4">
          <p className="text-text-secondary">Processing</p>
          <h3 className="mt-2">87</h3>
        </Card>
        <Card className="p-4">
          <p className="text-text-secondary">Shipped</p>
          <h3 className="mt-2">142</h3>
        </Card>
        <Card className="p-4">
          <p className="text-text-secondary">Completed</p>
          <h3 className="mt-2">227</h3>
        </Card>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <Input
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as OrderStatus)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={storeFilter} onValueChange={setStoreFilter}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Filter by store" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stores</SelectItem>
            {stores.map(store => (
              <SelectItem key={store} value={store}>{store}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Store</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.store}</TableCell>
                <TableCell>{order.products} items</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeColor(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    <Icons.eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
