
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BottomNavigation from "@/components/BottomNavigation";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  ShoppingBag, 
  Calendar, 
  TrendingUp, 
  Phone,
  MapPin,
  Clock,
  Star,
  ChefHat,
  Edit3,
  FileText,
  Settings
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("overview");

  // Mock data - في التطبيق الحقيقي ستأتي من قاعدة البيانات
  const stats = {
    totalOrders: 156,
    dailyRevenue: 2450000,
    pendingOrders: 12,
    completedToday: 43,
    hallBookings: 8,
    familyMeals: 23
  };

  const recentOrders = [
    { id: 1, customer: "أحمد محمد", items: 3, total: 45000, status: "pending", time: "10:30" },
    { id: 2, customer: "فاطمة علي", items: 2, total: 28000, status: "completed", time: "10:15" },
    { id: 3, customer: "محمد حسن", items: 5, total: 67000, status: "preparing", time: "10:00" },
    { id: 4, customer: "زينب أحمد", items: 1, total: 18000, status: "completed", time: "09:45" },
    { id: 5, customer: "علي محمود", items: 4, total: 52000, status: "pending", time: "09:30" }
  ];

  const hallReservations = [
    { id: 1, customer: "عائلة الأحمد", date: "2024-01-15", guests: 50, event: "خطوبة", status: "confirmed" },
    { id: 2, customer: "شركة النور", date: "2024-01-20", guests: 80, event: "مؤتمر", status: "pending" },
    { id: 3, customer: "عائلة حسن", date: "2024-01-25", guests: 120, event: "زفاف", status: "confirmed" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'preparing': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'confirmed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'في الانتظار';
      case 'preparing': return 'قيد التحضير';
      case 'completed': return 'مكتمل';
      case 'confirmed': return 'مؤكد';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-shadow">لوحة إدارة المطعم</h1>
            <p className="text-blue-100 mt-2">إدارة شاملة لجميع عمليات المطعم</p>
          </div>
          <div className="flex space-x-2 space-x-reverse">
            <Button 
              onClick={() => navigate('/admin/content')}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
            >
              <Edit3 className="w-4 h-4 ml-2" />
              تحرير المحتوى
            </Button>
            <Button 
              onClick={() => navigate('/')}
              variant="outline" 
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
            >
              العودة للموقع
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="p-4">
              <ShoppingBag className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">{stats.totalOrders}</p>
              <p className="text-sm text-gray-600">إجمالي الطلبات</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">{stats.dailyRevenue.toLocaleString()}</p>
              <p className="text-sm text-gray-600">إيرادات اليوم</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-4">
              <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</p>
              <p className="text-sm text-gray-600">طلبات معلقة</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-4">
              <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">{stats.completedToday}</p>
              <p className="text-sm text-gray-600">مكتملة اليوم</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-4">
              <Calendar className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-indigo-600">{stats.hallBookings}</p>
              <p className="text-sm text-gray-600">حجوزات القاعة</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-4">
              <ChefHat className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-600">{stats.familyMeals}</p>
              <p className="text-sm text-gray-600">وجبات عائلية</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="orders">إدارة الطلبات</TabsTrigger>
            <TabsTrigger value="reservations">حجوزات القاعة</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShoppingBag className="w-5 h-5 ml-2" />
                    الطلبات الأخيرة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold">{order.customer}</p>
                          <p className="text-sm text-gray-600">{order.items} عناصر - {order.time}</p>
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-green-600">{order.total.toLocaleString()} ل.س</p>
                          <Badge className={`${getStatusColor(order.status)} text-white`}>
                            {getStatusText(order.status)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 ml-2" />
                    إجراءات سريعة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => navigate('/admin/content')}
                    >
                      <Edit3 className="w-4 h-4 ml-2" />
                      تحرير محتوى الصفحات
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="w-4 h-4 ml-2" />
                      إضافة طبق جديد
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="w-4 h-4 ml-2" />
                      إدارة العملاء
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <TrendingUp className="w-4 h-4 ml-2" />
                      تقارير المبيعات
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>إدارة الطلبات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <Card key={order.id} className="border-r-4 border-r-blue-500">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-bold">طلب #{order.id}</h4>
                            <p className="text-gray-600">العميل: {order.customer}</p>
                            <p className="text-sm text-gray-500">{order.items} عناصر - {order.time}</p>
                          </div>
                          <div className="text-left">
                            <p className="text-xl font-bold text-green-600">{order.total.toLocaleString()} ل.س</p>
                            <Badge className={`${getStatusColor(order.status)} text-white mt-1`}>
                              {getStatusText(order.status)}
                            </Badge>
                          </div>
                        </div>
                        <div className="mt-4 flex space-x-2 space-x-reverse">
                          <Button size="sm" variant="outline">عرض التفاصيل</Button>
                          <Button size="sm">تحديث الحالة</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reservations" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>حجوزات القاعة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hallReservations.map((reservation) => (
                    <Card key={reservation.id} className="border-r-4 border-r-purple-500">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-bold">{reservation.customer}</h4>
                            <p className="text-gray-600">{reservation.event} - {reservation.guests} ضيف</p>
                            <p className="text-sm text-gray-500">{reservation.date}</p>
                          </div>
                          <Badge className={`${getStatusColor(reservation.status)} text-white`}>
                            {getStatusText(reservation.status)}
                          </Badge>
                        </div>
                        <div className="mt-4 flex space-x-2 space-x-reverse">
                          <Button size="sm" variant="outline">عرض التفاصيل</Button>
                          <Button size="sm">تأكيد الحجز</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>إعدادات المطعم</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => navigate('/admin/content')}
                  >
                    <Edit3 className="w-4 h-4 ml-2" />
                    تحرير محتوى الصفحات
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <MapPin className="w-4 h-4 ml-2" />
                    تحديث معلومات التواصل
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Phone className="w-4 h-4 ml-2" />
                    إدارة أرقام الهواتف
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>إعدادات النظام</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="w-4 h-4 ml-2" />
                    إدارة المستخدمين
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="w-4 h-4 ml-2" />
                    تقارير التحليلات
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="w-4 h-4 ml-2" />
                    إعدادات النظام
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default AdminDashboard;
