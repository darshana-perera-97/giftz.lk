import { useState } from 'react';
import { toast } from './ToastContainer';
import './CartSidebar.css';

// Icon components
const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const MinusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

function CartSidebar({ isOpen, onClose, items = [], onUpdateQuantity, onRemoveItem, onCheckout }) {
  const subtotal = items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  const shipping = subtotal > 0 ? 15.0 : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleRemove = (item) => {
    onRemoveItem(item.id);
    toast.success(`${item.name} removed from cart`);
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) {
      handleRemove(item);
      return;
    }
    onUpdateQuantity(item.id, newQuantity);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="cart-sidebar-backdrop" onClick={onClose}></div>

      {/* Cart Sidebar */}
      <div className="cart-sidebar">
        {/* Header */}
        <div className="cart-sidebar-header">
          <h2 className="cart-sidebar-title">Shopping Cart</h2>
          <button className="cart-sidebar-close" onClick={onClose}>
            <XIcon />
          </button>
        </div>

        {/* Cart Items */}
        <div className="cart-sidebar-items">
          {items.length === 0 ? (
            <div className="cart-sidebar-empty">
              <p className="cart-sidebar-empty-text">Your cart is empty</p>
              <p className="cart-sidebar-empty-hint">Add items to get started</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="cart-sidebar-item">
                <div className="cart-sidebar-item-image">
                  {item.image ? (
                    <img src={item.image} alt={item.name} />
                  ) : (
                    <div className="cart-sidebar-item-placeholder">
                      <span>🎁</span>
                    </div>
                  )}
                </div>
                <div className="cart-sidebar-item-info">
                  <h4 className="cart-sidebar-item-name">{item.name}</h4>
                  <p className="cart-sidebar-item-store">{item.storeName || 'Store'}</p>
                  <div className="cart-sidebar-item-price">${(item.price || 0).toFixed(2)}</div>
                </div>
                <div className="cart-sidebar-item-actions">
                  <div className="cart-sidebar-quantity">
                    <button
                      className="cart-sidebar-quantity-button"
                      onClick={() => handleQuantityChange(item, Math.max(1, (item.quantity || 1) - 1))}
                      aria-label="Decrease quantity"
                    >
                      <MinusIcon />
                    </button>
                    <span className="cart-sidebar-quantity-value">{item.quantity || 1}</span>
                    <button
                      className="cart-sidebar-quantity-button"
                      onClick={() => handleQuantityChange(item, (item.quantity || 1) + 1)}
                      aria-label="Increase quantity"
                    >
                      <PlusIcon />
                    </button>
                  </div>
                  <button
                    className="cart-sidebar-remove"
                    onClick={() => handleRemove(item)}
                    aria-label="Remove item"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-sidebar-footer">
            <div className="cart-sidebar-summary">
              <div className="cart-sidebar-summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="cart-sidebar-summary-row">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="cart-sidebar-summary-row">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="cart-sidebar-summary-row cart-sidebar-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button className="cart-sidebar-checkout" onClick={onCheckout}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartSidebar;

