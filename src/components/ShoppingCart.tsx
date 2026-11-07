
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Minus, ShoppingCart as ShoppingCartIcon, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onClearCart: () => void;
}

const ShoppingCart = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onClearCart }: ShoppingCartProps) => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleConfirmOrder = () => {
    setIsAnimating(true);
    setTimeout(() => {
      navigate('/order', { state: { cartItems: items, totalPrice } });
      onClose();
      setIsAnimating(false);
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm">
      <div 
        className={`w-full max-w-md bg-white rounded-t-3xl shadow-2xl transform transition-all duration-500 ease-out ${
          isAnimating ? 'animate-bounce' : 'animate-slide-in-bottom'
        }`}
        style={{
          maxHeight: '80vh',
          animation: isOpen ? 'slideInBottom 0.5s ease-out' : 'slideOutBottom 0.3s ease-in'
        }}
      >
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-t-3xl relative">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-xl">
              <ShoppingCartIcon className="w-6 h-6 ml-2" />
              سلة التسوق
              {totalItems > 0 && (
                <Badge className="bg-white text-red-500 mr-2 animate-pulse">
                  {totalItems}
                </Badge>
              )}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="p-0 max-h-96 overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">السلة فارغة</p>
              <p className="text-gray-400 text-sm">أضف بعض الأطباق اللذيذة!</p>
            </div>
          ) : (
            <div className="space-y-4 p-4">
              {items.map((item) => (
                <Card key={item.id} className="shadow-md border border-gray-100">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className="w-16 h-16 rounded-lg overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{item.name}</h4>
                        <p className="text-red-600 font-bold">{item.price.toLocaleString()} ل.س</p>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-8 h-8 rounded-full"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-8 h-8 rounded-full"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t bg-gray-50 rounded-b-3xl">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">المجموع:</span>
              <span className="text-2xl font-bold text-green-600">{totalPrice.toLocaleString()} ل.س</span>
            </div>
            <div className="space-y-2">
              <Button 
                onClick={handleConfirmOrder}
                className="w-full gradient-red text-white py-3 text-lg font-semibold animate-pulse hover:animate-none"
              >
                <CheckCircle className="w-5 h-5 ml-2" />
                تأكيد الطلب
              </Button>
              <Button 
                variant="outline" 
                onClick={onClearCart}
                className="w-full text-red-600 border-red-200 hover:bg-red-50"
              >
                مسح السلة
              </Button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInBottom {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOutBottom {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ShoppingCart;
