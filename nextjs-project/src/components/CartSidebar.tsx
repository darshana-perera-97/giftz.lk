import { Icons } from "./icons";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "./ui/badge";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  storeName: string;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export function CartSidebar({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartSidebarProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 15.0 : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-white shadow-2xl z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="p-6 border-b border-border-light">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center shadow-md">
                    <Icons.cart className="w-5 h-5 text-secondary-500" />
                  </div>
                  <div>
                    <h3 className="text-text-primary">Shopping Cart</h3>
                    <p className="text-text-secondary">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="rounded-full w-10 h-10 p-0"
                >
                  <Icons.x className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-24 h-24 rounded-full bg-surface-gray100 flex items-center justify-center mb-4">
                    <Icons.cart className="w-12 h-12 text-text-secondary/40" />
                  </div>
                  <h4 className="text-text-primary mb-2">Your cart is empty</h4>
                  <p className="text-text-secondary mb-6">
                    Add some products to get started
                  </p>
                  <Button
                    onClick={onClose}
                    className="bg-primary-700 hover:bg-primary-900 text-white"
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      className="bg-white border border-border-light rounded-xl p-4 hover:shadow-md transition-shadow"
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                    >
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-lg bg-surface-gray100 flex-shrink-0 overflow-hidden">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Icons.gift className="w-8 h-8 text-text-secondary/20" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div className="flex-1">
                              <h4 className="text-text-primary line-clamp-1">{item.name}</h4>
                              <p className="text-text-secondary">{item.storeName}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onRemoveItem(item.id)}
                              className="h-8 w-8 p-0 hover:bg-status-error/10 hover:text-status-error"
                            >
                              <Icons.trash className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2 bg-surface-gray100 rounded-lg p-1">
                              <button
                                onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="w-7 h-7 flex items-center justify-center hover:bg-white rounded transition-colors"
                              >
                                <Icons.minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center hover:bg-white rounded transition-colors"
                              >
                                <Icons.plus className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="flex items-baseline gap-1">
                              <span className="text-primary-700">$</span>
                              <span className="text-primary-700">{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer - Order Summary */}
            {items.length > 0 && (
              <div className="border-t border-border-light p-6 space-y-4 bg-surface-gray100">
                <div className="space-y-3">
                  <div className="flex justify-between text-text-secondary">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>Shipping</span>
                    <span className="flex items-center gap-2">
                      {shipping === 0 ? (
                        <Badge className="bg-status-success text-white border-0">Free</Badge>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span>Total</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-primary-700">$</span>
                      <span className="text-primary-700">{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full h-12 bg-primary-700 hover:bg-primary-900 text-white shadow-lg hover:shadow-xl transition-all"
                  onClick={onCheckout}
                >
                  <Icons.lock className="w-4 h-4 mr-2" />
                  Proceed to Checkout
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-11 border-border-light"
                  onClick={onClose}
                >
                  Continue Shopping
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
