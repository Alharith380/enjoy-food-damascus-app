
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import BottomNavigation from "@/components/BottomNavigation";
import ShoppingCart from "@/components/ShoppingCart";
import { Search, Plus, ShoppingCart as ShoppingCartIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAdminContent } from "@/contexts/AdminContentContext";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const MenuPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();
  const { getPage } = useAdminContent();

  // Get editable content
  const pageContent = getPage('menu')?.content || {};
  const categories = pageContent.categories || ["الكل", "وجبات رئيسية", "مقبلات", "حلويات", "مشروبات"];
  const menuItems = pageContent.menuItems || [];

  const filteredItems = menuItems.filter((item: any) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "الكل" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (item: any) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCart(prev => prev.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart(prev => [...prev, { ...item, quantity: 1 }]);
    }
    
    toast({
      title: "تم الإضافة للسلة",
      description: `تم إضافة ${item.name} إلى سلة التسوق`,
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
    toast({
      title: "تم الحذف",
      description: "تم حذف العنصر من السلة",
    });
  };

  const clearCart = () => {
    setCart([]);
    toast({
      title: "تم مسح السلة",
      description: "تم مسح جميع العناصر من السلة",
    });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 pb-20">
      {/* Header */}
      <header className="gradient-red text-white p-6 relative">
        <h1 className="text-2xl font-bold text-center text-shadow">{pageContent.title || 'قائمة الطعام'}</h1>
        <p className="text-center text-red-100 mt-2">{pageContent.subtitle || 'اختر من أشهى أطباقنا'}</p>
        
        {/* Floating Cart Button */}
        {totalItems > 0 && (
          <Button
            onClick={() => setIsCartOpen(true)}
            className="fixed top-20 left-4 z-40 bg-white text-red-500 hover:bg-red-50 rounded-full shadow-2xl animate-bounce"
            size="icon"
          >
            <ShoppingCartIcon className="w-6 h-6" />
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
              {totalItems}
            </Badge>
          </Button>
        )}
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="ابحث عن الطبق..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10 shadow-lg border-0 bg-white/80 backdrop-blur-sm"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category: string) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap shadow-lg ${
                selectedCategory === category 
                  ? "gradient-red text-white" 
                  : "bg-white/80 backdrop-blur-sm border-red-200 text-red-600 hover:bg-red-50"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid gap-6">
          {filteredItems.map((item: any) => (
            <Card key={item.id} className="shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex">
                <div className="w-28 h-28 flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover rounded-r-lg"
                  />
                </div>
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                    <span className="text-red-600 font-bold text-lg">{item.price.toLocaleString()} ل.س</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                  <p className="text-xs text-gray-500 mb-3">{item.nutrition}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary" className="text-xs bg-red-100 text-red-700">
                      {item.category}
                    </Badge>
                    <Button
                      onClick={() => addToCart(item)}
                      size="sm"
                      className="gradient-red text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Plus className="w-4 h-4 ml-1" />
                      إضافة للسلة
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">لا توجد أطباق تطابق البحث</p>
          </div>
        )}
      </div>

      {/* Shopping Cart Modal */}
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />

      <BottomNavigation />
    </div>
  );
};

export default MenuPage;
