import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";

const mockOrders = [
  { id: '#ORD-001', customer: 'John Doe', email: 'john@example.com', products: 2, total: 599.98, status: 'completed', date: '2025-11-05' },
  { id: '#ORD-002', customer: 'Jane Smith', email: 'jane@example.com', products: 1, total: 149.99, status: 'processing', date: '2025-11-06' },
  { id: '#ORD-003', customer: 'Mike Johnson', email: 'mike@example.com', products: 3, total: 849.97, status: 'shipped', date: '2025-11-06' },
  { id: '#ORD-004', customer: 'Sarah Wilson', email: 'sarah@example.com', products: 1, total: 549.99, status: 'completed', date: '2025-11-07' },
  { id: '#ORD-005', customer: 'Tom Brown', email: 'tom@example.com', products: 2, total: 399.98, status: 'processing', date: '2025-11-07' },
];

type OrderStatus = 'all' | 'processing' | 'shipped' | 'completed';

export function StoreAdminOrders() {
  const [orders, setOrders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus>('all');
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null);
  const [newStatus, setNewStatus] = useState<string>('');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  const handleChangeStatus = (order: typeof mockOrders[0]) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setIsStatusModalOpen(true);
  };

  const saveStatusChange = () => {
    if (selectedOrder) {
      setOrders(orders.map(order =>
        order.id === selectedOrder.id
          ? { ...order, status: newStatus as any }
          : order
      ));
      setIsStatusModalOpen(false);
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1>Orders Management</h1>
        <p className="text-text-secondary mt-2">Track and manage customer orders</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-text-secondary">Total Orders</p>
          <h3 className="mt-2">142</h3>
        </Card>
        <Card className="p-4">
          <p className="text-text-secondary">Processing</p>
          <h3 className="mt-2">23</h3>
        </Card>
        <Card className="p-4">
          <p className="text-text-secondary">Shipped</p>
          <h3 className="mt-2">45</h3>
        </Card>
        <Card className="p-4">
          <p className="text-text-secondary">Completed</p>
          <h3 className="mt-2">74</h3>
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
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
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
                <TableCell>
                  <div>
                    <p>{order.customer}</p>
                    <p className="text-text-secondary">{order.email}</p>
                  </div>
                </TableCell>
                <TableCell>{order.products} items</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeColor(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" size="sm">
                      <Icons.eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleChangeStatus(order)}>
                      <Icons.edit className="w-4 h-4 mr-2" />
                      Status
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Change Status Modal */}
      <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Change Order Status</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Order ID</Label>
              <p className="p-3 bg-surface-gray100 rounded-lg">{selectedOrder?.id}</p>
            </div>
            <div className="space-y-2">
              <Label>Customer</Label>
              <p className="p-3 bg-surface-gray100 rounded-lg">{selectedOrder?.customer}</p>
            </div>
            <div className="space-y-2">
              <Label>New Status</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3 pt-4">
              <Button className="flex-1 bg-primary-500 hover:bg-primary-700 text-white" onClick={saveStatusChange}>
                Save Changes
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setIsStatusModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
