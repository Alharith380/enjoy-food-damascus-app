
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BottomNavigation from "@/components/BottomNavigation";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Users, Building, MessageCircle } from "lucide-react";

const HallReservationPage = () => {
  const [reservationData, setReservationData] = useState({
    customerName: "",
    phone: "",
    email: "",
    eventType: "",
    eventDate: "",
    eventTime: "",
    guestCount: "",
    duration: "",
    hallAdditions: "",
    specialRequests: "",
    budget: ""
  });

  const { toast } = useToast();

  const eventTypes = [
    "حفل زفاف",
    "خطوبة", 
    "عيد ميلاد",
    "اجتماع عمل",
    "مؤتمر",
    "ندوة",
    "احتفال تخرج",
    "لقاء عائلي",
    "أخرى"
  ];

  const hallAdditions = [
    "تزيين بالورود",
    "إضاءة خاصة",
    "منصة للعروس",
    "نظام صوتي متطور",
    "شاشات عرض",
    "كراسي VIP",
    "خدمة تصوير",
    "فرقة موسيقية",
    "مصور فوتوغرافي"
  ];

  const handleInputChange = (field: string, value: string) => {
    setReservationData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const required = ['customerName', 'phone', 'eventType', 'eventDate', 'eventTime', 'guestCount'];
    const missing = required.filter(field => !reservationData[field]);
    
    if (missing.length > 0) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return false;
    }

    // Check if event date is at least 7 days from now
    const eventDate = new Date(reservationData.eventDate);
    const today = new Date();
    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    if (eventDate < weekFromNow) {
      toast({
        title: "خطأ في التاريخ",
        description: "يجب أن يكون تاريخ المناسبة بعد أسبوع على الأقل من اليوم",
        variant: "destructive"
      });
      return false;
    }

    if (parseInt(reservationData.guestCount) < 1) {
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

    const whatsappMessage = `
مرحباً، أود حجز القاعة بالتفاصيل التالية:

👤 الاسم: ${reservationData.customerName}
📞 الهاتف: ${reservationData.phone}
📧 الإيميل: ${reservationData.email || 'غير محدد'}
🎉 نوع المناسبة: ${reservationData.eventType}
📅 التاريخ: ${reservationData.eventDate}
⏰ الوقت: ${reservationData.eventTime}
👥 عدد الضيوف: ${reservationData.guestCount}
⏳ المدة المتوقعة: ${reservationData.duration || 'غير محدد'}
💰 الميزانية المتوقعة: ${reservationData.budget || 'غير محدد'}

🎨 الإضافات المطلوبة للقاعة:
${reservationData.hallAdditions || 'لا توجد'}

📝 طلبات خاصة:
${reservationData.specialRequests || 'لا توجد'}

أتطلع للتواصل معكم لتأكيد التفاصيل.
    `;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/0985679167?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "تم إرسال طلب الحجز",
      description: "سيتم فتح محادثة واتساب مع المدير لتأكيد التفاصيل",
    });
  };

  const openWhatsAppChat = () => {
    window.open('https://wa.me/0985679167', '_blank');
  };

  // Calculate minimum date (7 days from now)
  const getMinDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
        <h1 className="text-2xl font-bold text-center text-shadow">حجز القاعة</h1>
        <p className="text-center text-purple-100 mt-2">احجز قاعتنا للمناسبات الخاصة</p>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Important Notice */}
        <Card className="shadow-xl mb-6 border-2 border-amber-500 bg-amber-50">
          <CardContent className="p-6">
            <div className="text-center">
              <Calendar className="w-12 h-12 text-amber-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-amber-800 mb-2">تنبيه مهم</h3>
              <p className="text-amber-700">يجب الحجز قبل أسبوع على الأقل من تاريخ المناسبة</p>
            </div>
          </CardContent>
        </Card>

        {/* Customer Information */}
        <Card className="shadow-xl mb-6 border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-purple-600">معلومات العميل</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customerName">الاسم الكامل *</Label>
                <Input
                  id="customerName"
                  placeholder="أدخل اسمك الكامل"
                  value={reservationData.customerName}
                  onChange={(e) => handleInputChange("customerName", e.target.value)}
                  className="shadow-md"
                />
              </div>
              <div>
                <Label htmlFor="phone">رقم الهاتف *</Label>
                <Input
                  id="phone"
                  placeholder="09xxxxxxxx"
                  value={reservationData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="shadow-md"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">البريد الإلكتروني (اختياري)</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={reservationData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="shadow-md"
              />
            </div>
          </CardContent>
        </Card>

        {/* Event Details */}
        <Card className="shadow-xl mb-6 border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-purple-600">تفاصيل المناسبة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="eventType">نوع المناسبة *</Label>
              <Select value={reservationData.eventType} onValueChange={(value) => handleInputChange("eventType", value)}>
                <SelectTrigger className="shadow-md">
                  <SelectValue placeholder="اختر نوع المناسبة" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="eventDate">تاريخ المناسبة *</Label>
                <Input
                  id="eventDate"
                  type="date"
                  min={getMinDate()}
                  value={reservationData.eventDate}
                  onChange={(e) => handleInputChange("eventDate", e.target.value)}
                  className="shadow-md"
                />
              </div>
              <div>
                <Label htmlFor="eventTime">وقت بداية المناسبة *</Label>
                <Input
                  id="eventTime"
                  type="time"
                  value={reservationData.eventTime}
                  onChange={(e) => handleInputChange("eventTime", e.target.value)}
                  className="shadow-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="guestCount">عدد الضيوف المتوقع *</Label>
                <Input
                  id="guestCount"
                  type="number"
                  placeholder="عدد الضيوف"
                  value={reservationData.guestCount}
                  onChange={(e) => handleInputChange("guestCount", e.target.value)}
                  className="shadow-md"
                />
              </div>
              <div>
                <Label htmlFor="duration">مدة المناسبة المتوقعة</Label>
                <Input
                  id="duration"
                  placeholder="مثال: 4 ساعات"
                  value={reservationData.duration}
                  onChange={(e) => handleInputChange("duration", e.target.value)}
                  className="shadow-md"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="budget">الميزانية المتوقعة</Label>
              <Input
                id="budget"
                placeholder="مثال: 500,000 ل.س"
                value={reservationData.budget}
                onChange={(e) => handleInputChange("budget", e.target.value)}
                className="shadow-md"
              />
            </div>
          </CardContent>
        </Card>

        {/* Hall Additions */}
        <Card className="shadow-xl mb-6 border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-purple-600">إضافات القاعة</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="hallAdditions">الإضافات المطلوبة</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 mb-4">
              {hallAdditions.map((addition) => (
                <Button
                  key={addition}
                  variant="outline"
                  size="sm"
                  className="text-xs justify-start"
                  onClick={() => {
                    const current = reservationData.hallAdditions;
                    const newAdditions = current.includes(addition)
                      ? current.replace(addition + ", ", "").replace(addition, "")
                      : current ? current + ", " + addition : addition;
                    handleInputChange("hallAdditions", newAdditions.replace(/^, /, ""));
                  }}
                >
                  {addition}
                </Button>
              ))}
            </div>
            <Textarea
              id="hallAdditions"
              placeholder="اختر من الإضافات أعلاه أو اكتب إضافات أخرى..."
              value={reservationData.hallAdditions}
              onChange={(e) => handleInputChange("hallAdditions", e.target.value)}
              className="shadow-md"
            />
          </CardContent>
        </Card>

        {/* Special Requests */}
        <Card className="shadow-xl mb-6 border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-purple-600">طلبات خاصة</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="أي طلبات أو ترتيبات خاصة للمناسبة..."
              value={reservationData.specialRequests}
              onChange={(e) => handleInputChange("specialRequests", e.target.value)}
              className="shadow-md"
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button 
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 text-lg font-semibold shadow-xl mb-6"
        >
          <MessageCircle className="w-5 h-5 ml-2" />
          إرسال طلب الحجز عبر واتساب
        </Button>

        {/* Direct WhatsApp Contact */}
        <Card className="shadow-xl mb-6 border-0 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
          <CardHeader>
            <CardTitle className="text-center">تواصل مباشر مع المدير</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">للاستفسارات الفورية أو المساعدة في التخطيط</p>
            <Button 
              onClick={openWhatsAppChat}
              className="bg-white text-green-600 hover:bg-green-50"
            >
              <MessageCircle className="w-5 h-5 ml-2" />
              محادثة واتساب: 0985679167
            </Button>
          </CardContent>
        </Card>

        {/* Terms */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-purple-600">شروط وأحكام الحجز</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• يجب الحجز قبل أسبوع على الأقل من تاريخ المناسبة</li>
              <li>• يتم تأكيد الحجز بعد دفع مقدم 30% من إجمالي التكلفة</li>
              <li>• يمكن إلغاء الحجز مجاناً قبل 72 ساعة من المناسبة</li>
              <li>• القاعة متاحة لجميع المناسبات عدا الاحتفالات</li>
              <li>• تكلفة الحجز تختلف حسب نوع المناسبة وعدد الضيوف</li>
              <li>• للطوارئ والاستفسارات: 0988974612</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default HallReservationPage;
