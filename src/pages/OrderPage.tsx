
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import BottomNavigation from "@/components/BottomNavigation";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "react-router-dom";
import { CheckCircle, AlertTriangle } from "lucide-react";

const OrderPage = () => {
  const location = useLocation();
  const [orderType, setOrderType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    tableNumber: "",
    notes: ""
  });
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (location.state?.cartItems) {
      setCartItems(location.state.cartItems);
      setTotalPrice(location.state.totalPrice);
    }
  }, [location.state]);

  const orderTypes = [
    { value: "delivery", label: "توصيل للمنزل", description: "خدمة التوصيل إلى عنوانك" },
    { value: "external", label: "بيع خارجي", description: "استلام من المطعم" },
    { value: "indoor", label: "داخل القاعة", description: "تناول الطعام داخل القاعة (رسوم إضافية)" },
    { value: "outdoor", label: "الطاولات الخارجية", description: "تناول الطعام في الطاولات الخارجية" }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!orderType) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار نوع الطلب",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.name) {
      toast({
        title: "خطأ", 
        description: "يرجى إدخال الاسم",
        variant: "destructive"
      });
      return false;
    }

    if (orderType === "delivery") {
      if (!formData.address || !formData.phone) {
        toast({
          title: "خطأ",
          description: "يرجى إدخال العنوان ورقم الهاتف للتوصيل",
          variant: "destructive"
        });
        return false;
      }
    }

    if ((orderType === "indoor" || orderType === "outdoor") && !formData.tableNumber) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال رقم الطاولة",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    setShowConfirmation(true);
  };

  const confirmOrder = async () => {
    setIsSubmitting(true);
    
    // Format data according to your specification
    const orderData = {
      customerName: formData.name,
      email: formData.phone, // Using phone as email since email field doesn't exist
      phone: formData.phone,
      address: formData.address,
      orderType: orderType,
      tableNumber: formData.tableNumber,
      notes: formData.notes,
      products: cartItems.map((item: any) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: totalPrice,
      orderDate: new Date().toISOString(),
      orderNumber: Math.random().toString(36).substr(2, 9).toUpperCase()
    };

    console.log('Sending order data:', orderData);

    try {
      const response = await fetch('https://sos380.app.n8n.cloud/webhook-test/Enjoy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      console.log('Response status:', response.status);
      console.log('Response:', response);

      if (response.ok) {
        toast({
          title: "✅ تم استلام طلبك بنجاح!",
          description: "Your order has been received successfully!",
        });
      } else {
        // Handle non-200 responses
        const errorText = await response.text();
        console.error('Server response:', errorText);
        toast({
          title: "تنبيه",
          description: "تم إرسال الطلب ولكن هناك مشكلة في معالجته. سيتم التواصل معك قريباً.",
          variant: "destructive"
        });
      }

      // Reset form regardless of response
      setOrderType("");
      setFormData({
        name: "",
        address: "",
        phone: "",
        tableNumber: "",
        notes: ""
      });
      setCartItems([]);
      setTotalPrice(0);
      setShowConfirmation(false);

    } catch (error) {
      console.error('Network error sending order:', error);
      toast({
        title: "خطأ في الإرسال",
        description: "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRequiredFields = () => {
    switch (orderType) {
      case "delivery":
        return ["name", "address", "phone"];
      case "external":
        return ["name"];
      case "indoor":
      case "outdoor":
        return ["name", "tableNumber"];
      default:
        return [];
    }
  };

  const requiredFields = getRequiredFields();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 pb-20">
      {/* Header */}
      <header className="gradient-red text-white p-6">
        <h1 className="text-2xl font-bold text-center text-shadow">إضافة طلب جديد</h1>
        <p className="text-center text-red-100 mt-2">املأ البيانات المطلوبة</p>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Cart Summary */}
        {cartItems.length > 0 && (
          <Card className="shadow-xl mb-6 border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
              <CardTitle className="text-center">ملخص الطلب</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2 mb-4">
                {cartItems.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <span>{item.name} × {item.quantity}</span>
                    <span className="font-semibold">{(item.price * item.quantity).toLocaleString()} ل.س</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-2 flex justify-between items-center">
                <span className="text-lg font-bold">المجموع:</span>
                <span className="text-xl font-bold text-green-600">{totalPrice.toLocaleString()} ل.س</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Order Type Selection */}
        <Card className="shadow-xl mb-6 border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-red-600">نوع الطلب *</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={orderType} onValueChange={setOrderType}>
              {orderTypes.map((type) => (
                <div key={type.value} className="flex items-center space-x-2 space-x-reverse p-3 border rounded-lg hover:bg-red-50 transition-colors">
                  <RadioGroupItem value={type.value} id={type.value} />
                  <div className="flex-1">
                    <Label htmlFor={type.value} className="font-semibold cursor-pointer">
                      {type.label}
                    </Label>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Order Form */}
        {orderType && (
          <Card className="shadow-xl mb-6 border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-red-600">بيانات الطلب</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Name - Always Required */}
              <div>
                <Label htmlFor="name">الاسم *</Label>
                <Input
                  id="name"
                  placeholder="أدخل اسمك"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`shadow-md ${requiredFields.includes("name") ? "border-red-300" : ""}`}
                />
              </div>

              {orderType === "delivery" && (
                <div>
                  <Label htmlFor="address">العنوان *</Label>
                  <Textarea
                    id="address"
                    placeholder="أدخل العنوان التفصيلي للتوصيل"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="border-red-300 shadow-md"
                  />
                </div>
              )}

              {orderType === "delivery" && (
                <div>
                  <Label htmlFor="phone">رقم الهاتف *</Label>
                  <Input
                    id="phone"
                    placeholder="09xxxxxxxx"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="border-red-300 shadow-md"
                  />
                </div>
              )}

              {(orderType === "indoor" || orderType === "outdoor") && (
                <div>
                  <Label htmlFor="tableNumber">رقم الطاولة *</Label>
                  <Input
                    id="tableNumber"
                    placeholder="أدخل رقم الطاولة"
                    value={formData.tableNumber}
                    onChange={(e) => handleInputChange("tableNumber", e.target.value)}
                    className="border-red-300 shadow-md"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="notes">ملاحظات خاصة</Label>
                <Textarea
                  id="notes"
                  placeholder="أي ملاحظات أو طلبات خاصة..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  className="shadow-md"
                />
              </div>

              {orderType === "indoor" && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>تنبيه:</strong> يتم إضافة رسوم خدمة للطلبات داخل القاعة
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Submit Button */}
        {orderType && (
          <Button 
            onClick={handleSubmit}
            className="w-full gradient-red text-white py-3 text-lg font-semibold shadow-xl"
          >
            تأكيد الطلب
          </Button>
        )}

        {/* Help Section */}
        <Card className="shadow-xl mt-6 border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-red-600">معلومات مهمة</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• جميع الحقول المميزة بـ (*) مطلوبة</li>
              <li>• خدمة التوصيل متاحة داخل دوما</li>
              <li>• يتم إضافة رسوم خدمة للطلبات داخل القاعة</li>
              <li>• للاستفسار: 0988974612</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <Card className="w-full max-w-md mx-4 shadow-2xl border-0">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
              <CardTitle className="text-center flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 ml-2" />
                تأكيد الطلب
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-center">
              <p className="text-lg mb-6">هل أنت متأكد من تأكيد هذا الطلب؟</p>
              <div className="flex gap-4">
                <Button 
                  onClick={confirmOrder}
                  disabled={isSubmitting}
                  className="flex-1 gradient-red text-white"
                >
                  <CheckCircle className="w-4 h-4 ml-2" />
                  {isSubmitting ? "جاري الإرسال..." : "نعم، تأكيد"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowConfirmation(false)}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  إلغاء
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
};

export default OrderPage;
