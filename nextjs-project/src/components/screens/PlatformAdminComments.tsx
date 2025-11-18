import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const mockComments = [
  { id: '1', customer: 'John Doe', store: 'Luxury Gifts Co.', rating: 5, comment: 'Amazing products! High quality and fast shipping.', date: '2025-11-05', status: 'approved' },
  { id: '2', customer: 'Jane Smith', store: 'Artisan Crafts', rating: 4, comment: 'Beautiful handmade items. Will order again.', date: '2025-11-06', status: 'approved' },
  { id: '3', customer: 'Mike Johnson', store: 'Tech Gadgets Store', rating: 5, comment: 'Great tech selection with competitive prices.', date: '2025-11-06', status: 'pending' },
  { id: '4', customer: 'Sarah Wilson', store: 'Personalized Treasures', rating: 5, comment: 'Perfect personalization! Exceeded expectations.', date: '2025-11-07', status: 'approved' },
  { id: '5', customer: 'Tom Brown', store: 'Eco-Friendly Gifts', rating: 4, comment: 'Love the sustainable options available here.', date: '2025-11-07', status: 'pending' },
];

type CommentStatus = 'all' | 'approved' | 'pending';

export function PlatformAdminComments() {
  const [comments] = useState(mockComments);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<CommentStatus>('all');
  const [storeFilter, setStoreFilter] = useState('all');

  const filteredComments = comments.filter(comment => {
    const matchesSearch = comment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         comment.store.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         comment.comment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || comment.status === statusFilter;
    const matchesStore = storeFilter === 'all' || comment.store === storeFilter;
    return matchesSearch && matchesStatus && matchesStore;
  });

  const stores = Array.from(new Set(comments.map(c => c.store)));

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Icons.star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-secondary-500 text-secondary-500' : 'text-border-dark'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1>All Comments</h1>
        <p className="text-text-secondary mt-2">Manage customer reviews across all stores</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-text-secondary">Total Reviews</p>
          <h3 className="mt-2">1,248</h3>
        </Card>
        <Card className="p-4">
          <p className="text-text-secondary">Pending</p>
          <h3 className="mt-2">34</h3>
        </Card>
        <Card className="p-4">
          <p className="text-text-secondary">Approved</p>
          <h3 className="mt-2">1,214</h3>
        </Card>
        <Card className="p-4">
          <p className="text-text-secondary">Average Rating</p>
          <h3 className="mt-2">4.7</h3>
        </Card>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <Input
            placeholder="Search comments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as CommentStatus)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
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
              <TableHead>Customer</TableHead>
              <TableHead>Store</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComments.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell>{comment.customer}</TableCell>
                <TableCell>{comment.store}</TableCell>
                <TableCell>{renderStars(comment.rating)}</TableCell>
                <TableCell className="max-w-md truncate">{comment.comment}</TableCell>
                <TableCell>{comment.date}</TableCell>
                <TableCell>
                  <Badge className={comment.status === 'approved' ? 'bg-status-success text-white' : 'bg-secondary-500 text-white'}>
                    {comment.status}
                  </Badge>
                </TableCell>
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
