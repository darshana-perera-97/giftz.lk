import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Icons } from "../icons";
import { Badge } from "../ui/badge";

export function StoreAdminStoreDetails() {
  const [storeData, setStoreData] = useState({
    name: 'Luxury Gifts Co.',
    email: 'admin@luxurygifts.com',
    contactNumber: '+1 (555) 123-4567',
    package: 'Pro',
    description: 'Premium luxury gifts and exclusive collections for every special occasion.',
    keywords: 'luxury, gifts, premium, exclusive',
    themeColor: '#6366f1',
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1>Store Details</h1>
          <p className="text-text-secondary mt-2">Manage your store information and settings</p>
        </div>
        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-primary-500 hover:bg-primary-700 text-white"
          >
            <Icons.edit className="w-5 h-5 mr-2" />
            Edit Details
          </Button>
        ) : (
          <div className="flex gap-3">
            <Button
              onClick={() => setIsEditing(false)}
              className="bg-primary-500 hover:bg-primary-700 text-white"
            >
              Save Changes
            </Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Store Info - Read Only */}
        <Card className="p-6 space-y-6">
          <div>
            <h3 className="mb-4">Store Information</h3>
            <p className="text-text-secondary">View-only information set by Platform Admin</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-text-secondary">Store Name</Label>
              <p className="mt-1">{storeData.name}</p>
            </div>

            <div>
              <Label className="text-text-secondary">Email</Label>
              <p className="mt-1">{storeData.email}</p>
            </div>

            <div>
              <Label className="text-text-secondary">Contact Number</Label>
              <p className="mt-1">{storeData.contactNumber}</p>
            </div>

            <div>
              <Label className="text-text-secondary">Package</Label>
              <Badge className="mt-2 bg-primary-500 text-white">{storeData.package}</Badge>
            </div>
          </div>
        </Card>

        {/* Editable Store Details */}
        <Card className="p-6 lg:col-span-2 space-y-6">
          <div>
            <h3 className="mb-4">Store Content</h3>
            <p className="text-text-secondary">Customize your store appearance and content</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label>About Store</Label>
              {isEditing ? (
                <Textarea
                  value={storeData.description}
                  onChange={(e) => setStoreData({ ...storeData, description: e.target.value })}
                  rows={4}
                  placeholder="Describe your store..."
                />
              ) : (
                <p className="p-3 bg-surface-gray100 rounded-lg">{storeData.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Keywords</Label>
              {isEditing ? (
                <Input
                  value={storeData.keywords}
                  onChange={(e) => setStoreData({ ...storeData, keywords: e.target.value })}
                  placeholder="luxury, gifts, premium..."
                />
              ) : (
                <p className="p-3 bg-surface-gray100 rounded-lg">{storeData.keywords}</p>
              )}
              <p className="text-text-secondary">Comma-separated keywords for better discoverability</p>
            </div>

            <div className="space-y-2">
              <Label>Store Theme Color</Label>
              <div className="flex gap-4 items-center">
                {isEditing ? (
                  <>
                    <Input
                      type="color"
                      value={storeData.themeColor}
                      onChange={(e) => setStoreData({ ...storeData, themeColor: e.target.value })}
                      className="w-24 h-12"
                    />
                    <Input
                      value={storeData.themeColor}
                      onChange={(e) => setStoreData({ ...storeData, themeColor: e.target.value })}
                      placeholder="#6366f1"
                      className="flex-1"
                    />
                  </>
                ) : (
                  <>
                    <div
                      className="w-12 h-12 rounded-lg border border-border-light"
                      style={{ backgroundColor: storeData.themeColor }}
                    />
                    <p className="p-3 bg-surface-gray100 rounded-lg flex-1">{storeData.themeColor}</p>
                  </>
                )}
              </div>
              <p className="text-text-secondary">This color will be used throughout your store</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
              <Icons.package className="w-5 h-5 text-primary-500" />
            </div>
            <div>
              <p className="text-text-secondary">Total Products</p>
              <h3 className="mt-1">45</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary-100 flex items-center justify-center">
              <Icons.orders className="w-5 h-5 text-secondary-500" />
            </div>
            <div>
              <p className="text-text-secondary">Total Orders</p>
              <h3 className="mt-1">142</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <Icons.star className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-text-secondary">Average Rating</p>
              <h3 className="mt-1">4.8</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Icons.comments className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-text-secondary">Total Reviews</p>
              <h3 className="mt-1">87</h3>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
