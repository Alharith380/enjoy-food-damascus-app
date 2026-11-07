import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import BottomNavigation from "@/components/BottomNavigation";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Users, Star, Utensils } from "lucide-react";

const HallBookingPage = () => {
  const [orderData, setOrderData] = useState({
    eventDate: "",
    eventTime: "",
    guestCount: "",
    customerName: "",
    phone: "",
    eventType: "",
    specialRequests: "",
    selectedPackage: "1000"
  });

  const [selectedItems, setSelectedItems] = useState({
    mainDishes: [],
    desserts: [],
    nuts: [],
    beverages: []
  });

  const { toast } = useToast();

  const packagePrices = [
    { value: "1000", label: "1,000 ل.س", description: "الباقة الأساسية" },
    { value: "350000", label: "350,000 ل.س", description: "الباقة المتوسطة" },
    { value: "450000", label: "450,000 ل.س", description: "الباقة المميزة" },
    { value: "550000", label: "550,000 ل.س", description: "الباقة الفاخرة" }
  ];

  const packageItems = {
    mainDishes: [
      { id: 1, name: "دجاج مشوي", price: 25000 },
      { id: 2, name: "كباب حلبي", price: 30000 },
      { id: 3, name: "فروج مشوي", price: 35000 },
      { id: 4, name: "لحم مشوي", price: 40000 }
    ],
    desserts: [
      { id: 5, name: "مهلبية", price: 8000 },
      { id: 6, name: "أرز بالحليب", price: 7000 },
      { id: 7, name: "بقلاوة", price: 12000 },
      { id: 8, name: "كنافة", price: 15000 }
    ],
    nuts: [
      { id: 9, name: "مكسرات مشكلة", price: 20000 },
      { id: 10, name: "لوز محمص", price: 18000 },
      { id: 11, name: "فستق حلبي", price: 25000 },
      { id: 12, name: "كاجو", price: 22000 }
    ],
    beverages: [
      { id: 13, name: "عصائر طبيعية", price: 5000 },
      { id: 14, name: "مشروبات غازية", price: 3000 },
      { id: 15, name: "قهوة عربية", price: 4000 },
      { id: 16, name: "شاي", price: 3000 }
    ]
  };

  const handleInputChange = (field, value) => {
    setOrderData(prev => ({ ...prev, [field]: value }));
  };

  const handleItemSelection = (category, item, isChecked) => {
    setSelectedItems(prev => ({
      ...prev,
      [category]: isChecked 
        ? [...prev[category], item]
        : prev[category].filter(i => i.id !== item.id)
    }));
  };

  const calculateTotal = () => {
    const basePrice = parseInt(orderData.selectedPackage);
    const itemsTotal = Object.values(selectedItems)
      .flat()
      .reduce((sum, item) => sum + item.price, 0);
    
    return basePrice + itemsTotal;
  };

  const validateForm = () => {
    const required = ['eventDate', 'eventTime', 'guestCount', 'customerName', 'phone', 'eventType'];
    const missing = required.filter(field => !orderData[field]);
    
    if (missing.length > 0) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return false;
    }

    if (parseInt(orderData.guestCount) < 1) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال عدد صحيح للضيوف",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const total = calculateTotal();
    toast({
      title: "تم إرسال طلب الوجبة العائلية",
      description: `إجمالي التكلفة: ${total.toLocaleString()} ل.س - سيتم التواصل معك قريباً`,
    });

    // Reset form
    setOrderData({
      eventDate: "",
      eventTime: "",
      guestCount: "",
      customerName: "",
      phone: "",
      eventType: "",
      specialRequests: "",
      selectedPackage: "1000"
    });
    setSelectedItems({ mainDishes: [], desserts: [], nuts: [], beverages: [] });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 pb-20">
      {/* Header */}
      <header className="gradient-red text-white p-6">
        <h1 className="text-2xl font-bold text-center text-shadow">الوجبات العائلية</h1>
        <p className="text-center text-red-100 mt-2">اطلب وجبة عائلية مميزة للمناسبات</p>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Pricing Info */}
        <Card className="shadow-xl mb-6 border-2 border-green-500 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="text-center">
              <Utensils className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-green-600 mb-2">الحد الأدنى للطلب</h3>
              <p className="text-3xl font-bold text-green-600">1,000 ل.س</p>
              <p className="text-sm text-gray-600 mt-2">باقات متنوعة تناسب جميع المناسبات والميزانيات</p>
            </div>
          </CardContent>
        </Card>

        {/* Package Selection */}
        <Card className="shadow-xl mb-6 border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-red-600">اختر الباقة المناسبة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {packagePrices.map((pkg) => (
                <div 
                  key={pkg.value}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    orderData.selectedPackage === pkg.value 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-200 hover:border-red-300'
                  }`}
                  onClick={() => handleInputChange('selectedPackage', pkg.value)}
                >
                  <div className="text-center">
                    <h4 className="font-bold text-lg text-red-600">{pkg.label}</h4>
                    <p className="text-sm text-gray-600">{pkg.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card className="shadow-xl mb-6 border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-red-600">معلومات الطلب</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customerName">اسم العميل *</Label>
                <Input
                  id="customerName"
                  placeholder="أدخل اسمك"
                  value={orderData.customerName}
                  onChange={(e) => handleInputChange("customerName", e.target.value)}
                  className="shadow-md"
                />
              </div>
              <div>
                <Label htmlFor="phone">رقم الهاتف *</Label>
                <Input
                  id="phone"
                  placeholder="09xxxxxxxx"
                  value={orderData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="shadow-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="eventDate">تاريخ المناسبة *</Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={orderData.eventDate}
                  onChange={(e) => handleInputChange("eventDate", e.target.value)}
                  className="shadow-md"
                />
              </div>
              <div>
                <Label htmlFor="eventTime">وقت المناسبة *</Label>
                <Input
                  id="eventTime"
                  type="time"
                  value={orderData.eventTime}
                  onChange={(e) => handleInputChange("eventTime", e.target.value)}
                  className="shadow-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="guestCount">عدد الضيوف *</Label>
                <Input
                  id="guestCount"
                  type="number"
                  placeholder="عدد الأشخاص"
                  value={orderData.guestCount}
                  onChange={(e) => handleInputChange("guestCount", e.target.value)}
                  className="shadow-md"
                />
              </div>
              <div>
                <Label htmlFor="eventType">نوع المناسبة *</Label>
                <Input
                  id="eventType"
                  placeholder="خطوبة، زفاف، عيد ميلاد..."
                  value={orderData.eventType}
                  onChange={(e) => handleInputChange("eventType", e.target.value)}
                  className="shadow-md"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Package Builder */}
        <Card className="shadow-xl mb-6 border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-red-600">إضافات الباقة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Main Dishes */}
            <div>
              <h4 className="font-semibold mb-3 text-gray-800">الأطباق الرئيسية</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {packageItems.mainDishes.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2 space-x-reverse p-3 border rounded-lg hover:bg-red-50">
                    <Checkbox
                      id={`main-${item.id}`}
                      onCheckedChange={(checked) => handleItemSelection("mainDishes", item, checked)}
                    />
                    <Label htmlFor={`main-${item.id}`} className="flex-1 cursor-pointer">
                      <span>{item.name}</span>
                      <span className="text-red-600 font-semibold mr-2">{item.price.toLocaleString()} ل.س</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Desserts */}
            <div>
              <h4 className="font-semibold mb-3 text-gray-800">الحلويات</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {packageItems.desserts.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2 space-x-reverse p-3 border rounded-lg hover:bg-red-50">
                    <Checkbox
                      id={`dessert-${item.id}`}
                      onCheckedChange={(checked) => handleItemSelection("desserts", item, checked)}
                    />
                    <Label htmlFor={`dessert-${item.id}`} className="flex-1 cursor-pointer">
                      <span>{item.name}</span>
                      <span className="text-red-600 font-semibold mr-2">{item.price.toLocaleString()} ل.س</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Nuts */}
            <div>
              <h4 className="font-semibold mb-3 text-gray-800">المكسرات</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {packageItems.nuts.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2 space-x-reverse p-3 border rounded-lg hover:bg-red-50">
                    <Checkbox
                      id={`nuts-${item.id}`}
                      onCheckedChange={(checked) => handleItemSelection("nuts", item, checked)}
                    />
                    <Label htmlFor={`nuts-${item.id}`} className="flex-1 cursor-pointer">
                      <span>{item.name}</span>
                      <span className="text-red-600 font-semibold mr-2">{item.price.toLocaleString()} ل.س</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Beverages */}
            <div>
              <h4 className="font-semibold mb-3 text-gray-800">المشروبات</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {packageItems.beverages.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2 space-x-reverse p-3 border rounded-lg hover:bg-red-50">
                    <Checkbox
                      id={`beverage-${item.id}`}
                      onCheckedChange={(checked) => handleItemSelection("beverages", item, checked)}
                    />
                    <Label htmlFor={`beverage-${item.id}`} className="flex-1 cursor-pointer">
                      <span>{item.name}</span>
                      <span className="text-red-600 font-semibold mr-2">{item.price.toLocaleString()} ل.س</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Special Requests */}
        <Card className="shadow-xl mb-6 border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-red-600">طلبات خاصة</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="أي متطلبات خاصة للوجبة العائلية..."
              value={orderData.specialRequests}
              onChange={(e) => handleInputChange("specialRequests", e.target.value)}
              className="shadow-md"
            />
          </CardContent>
        </Card>

        {/* Total Cost */}
        <Card className="shadow-xl mb-6 border-2 border-green-500 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">إجمالي التكلفة</h3>
              <p className="text-4xl font-bold text-green-600">{calculateTotal().toLocaleString()} ل.س</p>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button 
          onClick={handleSubmit}
          className="w-full gradient-red text-white py-3 text-lg font-semibold shadow-xl mb-6"
        >
          تأكيد طلب الوجبة العائلية
        </Button>

        {/* Event Travel Request */}
        <Card className="shadow-xl mb-6 border-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <CardHeader>
            <CardTitle className="text-center">طلب سفرة مناسبة</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">هل تحتاج إلى خدمة سفرة مناسبة خاصة؟</p>
            <Button 
              className="bg-white text-blue-600 hover:bg-blue-50"
              onClick={() => window.open('https://wa.me/0985679167', '_blank')}
            >
              تواصل معنا عبر واتساب
            </Button>
          </CardContent>
        </Card>

        {/* Terms */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-red-600">شروط وأحكام</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• الحد الأدنى للطلب 1,000 ليرة سورية</li>
              <li>• يجب تأكيد الطلب قبل 48 ساعة من التاريخ المحدد</li>
              <li>• يمكن إلغاء الطلب مجاناً قبل 24 ساعة</li>
              <li>• الأسعار قابلة للتغيير حسب التضخم</li>
              <li>• للاستفسار: 0988974612</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default HallBookingPage;
