import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../state/StoreContext';
import { X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

export const ReceiptCartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartCount,
    cartTotalINR,
    updateCartQty,
    removeFromCart,
    checkoutOrder,
    activeReceipt,
    closeReceipt,
    discoverClue,
    triggerSecretScanner,
  } = useStore();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerName, setCustomerName] = useState('Rohan Sharma');
  const [phone, setPhone] = useState('+91 98765-43210');
  const [address, setAddress] = useState('Flat 4B, Haveli Kalan, Old Delhi');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

  if (!isCartOpen && !activeReceipt) return null;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkoutOrder({
      name: customerName,
      phone,
      address,
      payment: paymentMethod,
    });
    setIsCheckingOut(false);
  };

  const handleSecretGlyphClick = () => {
    discoverClue('receiptSeal');
    triggerSecretScanner();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="bg-[#FFF9EF] border-l border-[#D8D0C1] max-w-md w-full h-full flex flex-col justify-between shadow-2xl overflow-y-auto"
        >
          {/* Drawer Header */}
          <div className="p-4 border-b border-[#D8D0C1] flex items-center justify-between bg-[#F5F0E6]">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base text-[#173F35] font-display">
                {activeReceipt ? 'DELIVERY RECEIPT & INVOICE' : 'YOUR SHOPPING BASKET'}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#173F35] text-[#E8B94F]">
                {cartCount} Items
              </span>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                closeReceipt();
              }}
              className="p-1.5 rounded-lg text-[#6F756F] hover:text-[#1C2421] hover:bg-[#EFE8DA] transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* RECEIPT VIEW (IF CHECKOUT COMPLETED) */}
          {activeReceipt ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="p-5 flex-1 space-y-4"
            >
              {/* Perforated Thermal Receipt Style */}
              <div className="bg-[#FDFBF7] border-2 border-dashed border-[#D8D0C1] rounded-xl p-4 font-mono text-xs text-[#1C2421] shadow-inner space-y-3 relative">
                {/* Receipt Header */}
                <div className="text-center border-b border-dashed border-[#D8D0C1] pb-3 space-y-1">
                  <span className="font-bold text-sm block tracking-tight text-[#173F35]">
                    ABDUL'S GENERAL STORE
                  </span>
                  <span className="text-[10px] text-[#6F756F] block">
                    Gali Mir Jumla, Old Delhi • GSTIN: 07AAAPA1979K1Z4
                  </span>
                  <span className="text-[9px] text-[#8A908A] block">
                    ORDER ID: {activeReceipt.orderId} • TIME: {activeReceipt.timestamp}
                  </span>
                </div>

                {/* Itemized Rows */}
                <div className="space-y-1.5 py-1">
                  {activeReceipt.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-[11px]">
                      <span className="truncate max-w-[200px]">
                        {item.quantity}x {item.product.name}
                      </span>
                      <span className="font-bold">₹{item.product.priceINR * item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Taxes & Total */}
                <div className="border-t border-dashed border-[#D8D0C1] pt-2 space-y-1 text-[11px]">
                  <div className="flex justify-between text-[#6F756F]">
                    <span>Subtotal:</span>
                    <span>₹{activeReceipt.subtotalINR}</span>
                  </div>
                  <div className="flex justify-between text-[#6F756F]">
                    <span>GST (5% Local):</span>
                    <span>₹{activeReceipt.gstINR}</span>
                  </div>
                  <div className="flex justify-between font-extrabold text-sm text-[#173F35] pt-1 border-t border-[#D8D0C1]">
                    <span>TOTAL AMOUNT:</span>
                    <span>₹{activeReceipt.totalINR}</span>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="text-[10px] text-[#6F756F] border-t border-dashed border-[#D8D0C1] pt-2">
                  <span>Deliver To: {activeReceipt.customerName} ({activeReceipt.contactNumber})</span>
                  <span className="block truncate">{activeReceipt.address}</span>
                </div>

                {/* CLUE 3 / SECRET TRIGGER: ORION-3 GUILD SEAL */}
                <div className="border-t-2 border-dashed border-[#C66B4A] pt-3 text-center space-y-1.5">
                  <span className="text-[9px] text-[#A94335] uppercase font-bold tracking-widest block">
                    TERRAN DISPATCH SEAL #07
                  </span>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSecretGlyphClick}
                    className="group mx-auto p-3 rounded-xl bg-[#FFF9EF] border border-[#C66B4A] hover:border-[#52E5FF] hover:bg-[#070B18] transition-all duration-300 shadow-sm flex flex-col items-center gap-1 cursor-pointer focus:ring-2 focus:ring-cyan-400"
                    aria-label="Decrypt extraterrestrial supply manifest"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="text-xl font-mono text-[#A94335] group-hover:text-[#52E5FF] group-hover:rotate-180 transition-transform duration-500"
                    >
                      Δ○
                    </motion.span>
                    <span className="text-[9px] font-mono text-[#6F756F] group-hover:text-[#DDE7FF]">
                      [Tap Guild Seal to Decrypt Coordinates]
                    </span>
                  </motion.button>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={closeReceipt}
                  className="w-full bg-[#173F35] text-[#FFF9EF] py-2.5 rounded-lg text-xs font-bold hover:bg-[#2D6652] transition-colors"
                >
                  Back to Grocery Catalog
                </button>
              </div>
            </motion.div>
          ) : (
            /* CART ITEMS & CHECKOUT FORM */
            <div className="p-4 flex-1 flex flex-col justify-between overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <span className="text-4xl block">🛍️</span>
                  <span className="font-extrabold text-sm text-[#173F35] block">
                    Your Basket is Empty
                  </span>
                  <p className="text-xs text-[#6F756F] max-w-xs mx-auto">
                    Fresh milk, cardamom tea, and aged basmati rice are ready in store!
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-3 px-4 py-2 rounded-lg bg-[#173F35] text-[#FFF9EF] text-xs font-bold"
                  >
                    Explore Groceries
                  </button>
                </div>
              ) : !isCheckingOut ? (
                /* Item list view */
                <div className="space-y-4">
                  <div className="space-y-2.5">
                    {cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="bg-[#F5F0E6] border border-[#D8D0C1] rounded-xl p-3 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-12 h-12 rounded-lg object-cover border border-[#D8D0C1]"
                          />
                          <div>
                            <span className="font-bold text-[#173F35] block truncate max-w-[150px]">
                              {item.product.name}
                            </span>
                            <span className="text-[10px] text-[#6F756F]">
                              ₹{item.product.priceINR} / {item.product.unit}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-[#D8D0C1] rounded-lg bg-[#FFF9EF]">
                            <button
                              onClick={() => updateCartQty(item.product.id, item.quantity - 1)}
                              className="p-1 text-[#6F756F] hover:text-[#173F35]"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 font-mono font-bold text-xs">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQty(item.product.id, item.quantity + 1)}
                              className="p-1 text-[#6F756F] hover:text-[#173F35]"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-1 text-[#A94335] hover:bg-[#EFE8DA] rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary Box */}
                  <div className="bg-[#F5F0E6] rounded-xl p-3 border border-[#D8D0C1] space-y-1.5 text-xs">
                    <div className="flex justify-between text-[#6F756F]">
                      <span>Items Subtotal:</span>
                      <span className="font-mono font-bold">₹{cartTotalINR}</span>
                    </div>
                    <div className="flex justify-between text-[#6F756F]">
                      <span>Estimated GST (5%):</span>
                      <span className="font-mono font-bold">₹{Math.round(cartTotalINR * 0.05)}</span>
                    </div>
                    <div className="flex justify-between font-extrabold text-sm text-[#173F35] pt-1.5 border-t border-[#D8D0C1]">
                      <span>Total Payable:</span>
                      <span className="font-mono">₹{cartTotalINR + Math.round(cartTotalINR * 0.05)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full bg-[#173F35] hover:bg-[#2D6652] text-[#FFF9EF] py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <span>Proceed to Delivery Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                /* Checkout details form */
                <form onSubmit={handleCheckoutSubmit} className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-[#173F35] text-[11px]">Full Name</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full p-2 bg-[#F5F0E6] border border-[#D8D0C1] rounded-lg text-xs focus:ring-1 focus:ring-[#173F35]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#173F35] text-[11px]">Contact Number</label>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2 bg-[#F5F0E6] border border-[#D8D0C1] rounded-lg text-xs focus:ring-1 focus:ring-[#173F35]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#173F35] text-[11px]">Old Delhi Address</label>
                    <textarea
                      rows={2}
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-2 bg-[#F5F0E6] border border-[#D8D0C1] rounded-lg text-xs focus:ring-1 focus:ring-[#173F35]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#173F35] text-[11px]">Payment Method</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full p-2 bg-[#F5F0E6] border border-[#D8D0C1] rounded-lg text-xs focus:ring-1 focus:ring-[#173F35]"
                    >
                      <option value="Cash on Delivery">Cash on Delivery (Pay at Doorstep)</option>
                      <option value="UPI / QR Code">UPI / QR Code Scan</option>
                    </select>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsCheckingOut(false)}
                      className="w-1/3 bg-[#F5F0E6] border border-[#D8D0C1] text-[#6F756F] py-2.5 rounded-lg font-bold"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 bg-[#173F35] hover:bg-[#2D6652] text-[#FFF9EF] py-2.5 rounded-lg font-bold shadow-md"
                    >
                      Confirm & Place Order
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
