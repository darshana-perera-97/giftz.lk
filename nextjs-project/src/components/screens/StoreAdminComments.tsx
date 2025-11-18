import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface Comment {
  id: string;
  customer: string;
  product: string;
  rating: number;
  comment: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

const mockComments: Comment[] = [
  { id: '1', customer: 'John Doe', product: 'Premium Watch', rating: 5, comment: 'Amazing quality! Exceeded my expectations.', date: '2025-11-07', status: 'approved' },
  { id: '2', customer: 'Jane Smith', product: 'Luxury Bag', rating: 4, comment: 'Great product, fast shipping.', date: '2025-11-06', status: 'approved' },
  { id: '3', customer: 'Mike Johnson', product: 'Gift Set', rating: 5, comment: 'Perfect gift for my wife!', date: '2025-11-07', status: 'pending' },
  { id: '4', customer: 'Sarah Wilson', product: 'Premium Watch', rating: 3, comment: 'Good but a bit expensive.', date: '2025-11-05', status: 'pending' },
  { id: '5', customer: 'Tom Brown', product: 'Designer Sunglasses', rating: 2, comment: 'Not what I expected from the photos.', date: '2025-11-04', status: 'rejected' },
];

export function StoreAdminComments() {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [activeTab, setActiveTab] = useState('all');

  const filteredComments = comments.filter(comment => {
    if (activeTab === 'all') return true;
    return comment.status === activeTab;
  });

  const handleApprove = (id: string) => {
    setComments(comments.map(c => c.id === id ? { ...c, status: 'approved' as const } : c));
  };

  const handleReject = (id: string) => {
    setComments(comments.map(c => c.id === id ? { ...c, status: 'rejected' as const } : c));
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-status-success text-white';
      case 'pending':
        return 'bg-secondary-500 text-white';
      case 'rejected':
        return 'bg-status-error text-white';
      default:
        return 'bg-border-dark text-text-primary';
    }
  };

  const pendingCount = comments.filter(c => c.status === 'pending').length;

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1>Comments Management</h1>
          <p className="text-text-secondary mt-2">Review and moderate customer feedback</p>
        </div>
        {pendingCount > 0 && (
          <Badge className="bg-secondary-500 text-white">
            {pendingCount} pending review
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-text-secondary">Total Comments</p>
          <h3 className="mt-2">{comments.length}</h3>
        </Card>
        <Card className="p-4">
          <p className="text-text-secondary">Pending Review</p>
          <h3 className="mt-2">{pendingCount}</h3>
        </Card>
        <Card className="p-4">
          <p className="text-text-secondary">Average Rating</p>
          <div className="flex items-center gap-2 mt-2">
            <h3>4.2</h3>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Icons.star
                  key={i}
                  className={`w-5 h-5 ${
                    i < 4 ? 'fill-secondary-500 text-secondary-500' : 'text-border-dark'
                  }`}
                />
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4 mt-6">
          {filteredComments.map((comment) => (
            <Card key={comment.id} className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p>{comment.customer}</p>
                      <Badge className={getStatusBadgeColor(comment.status)}>
                        {comment.status}
                      </Badge>
                    </div>
                    <p className="text-text-secondary">{comment.product}</p>
                  </div>
                  <span className="text-text-secondary">{comment.date}</span>
                </div>

                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Icons.star
                      key={i}
                      className={`w-5 h-5 ${
                        i < comment.rating
                          ? 'fill-secondary-500 text-secondary-500'
                          : 'text-border-dark'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-text-primary">{comment.comment}</p>

                {comment.status === 'pending' && (
                  <div className="flex gap-3 pt-4 border-t border-border-light">
                    <Button
                      className="bg-status-success hover:bg-emerald-600 text-white"
                      onClick={() => handleApprove(comment.id)}
                    >
                      <Icons.eye className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      className="border-status-error text-status-error hover:bg-status-error hover:text-white"
                      onClick={() => handleReject(comment.id)}
                    >
                      <Icons.eyeOff className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
