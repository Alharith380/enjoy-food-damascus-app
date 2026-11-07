
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import BottomNavigation from "@/components/BottomNavigation";
import { MapPin, Phone, Calendar, Star, Users, Clock, Facebook, Utensils, Crown, Zap, Share2, Settings, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAdminContent } from "@/contexts/AdminContentContext";

const Index = () => {
  const [adminCredentials, setAdminCredentials] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getPage } = useAdminContent();

  // Get editable content
  const pageContent = getPage('home')?.content || {};

  const handleAdminLogin = () => {
    if (adminCredentials.username === "Root@Root" && adminCredentials.password === "Root") {
      navigate("/admin");
      setIsAdminDialogOpen(false);
      setAdminCredentials({ username: "", password: "" });
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في لوحة الإدارة",
      });
    } else {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: "اسم المستخدم أو كلمة المرور غير صحيحة",
        variant: "destructive"
      });
    }
  };

  const restaurantFeatures = [
    { 
      icon: <Users className="w-8 h-8" />, 
      title: "قاعة واسعة", 
      description: "مجهزة لجميع المناسبات عدا الاحتفالات",
      gradient: "from-red-500 to-pink-500"
    },
    { 
      icon: <Zap className="w-8 h-8" />, 
      title: "خدمة سريعة", 
      description: "تقديم الطلبات في أسرع وقت ممكن",
      gradient: "from-orange-500 to-red-500"
    },
    { 
      icon: <Crown className="w-8 h-8" />, 
      title: "تجهيز أطاولة العرائس", 
      description: "خدمة مميزة للمناسبات الخاصة والأعراس",
      gradient: "from-yellow-500 to-orange-500"
    },
    { 
      icon: <Share2 className="w-8 h-8" />, 
      title: "صفحتنا على فيسبوك", 
      description: "تابعونا للعروض والأخبار الجديدة",
      gradient: "from-blue-500 to-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 pb-20">
      {/* Header with restaurant image overlay */}
      <header className="relative gradient-red text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Hidden Admin Button */}
        <Dialog open={isAdminDialogOpen} onOpenChange={setIsAdminDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 left-4 z-10 text-white/70 hover:text-white hover:bg-white/10 w-8 h-8 opacity-30 hover:opacity-100 transition-all duration-300"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-center text-blue-600">
                <Settings className="w-5 h-5 ml-2" />
                تسجيل دخول الإدارة
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="admin-username">اسم المستخدم</Label>
                <Input
                  id="admin-username"
                  placeholder="Root@Root"
                  value={adminCredentials.username}
                  onChange={(e) => setAdminCredentials(prev => ({ ...prev, username: e.target.value }))}
                  className="shadow-md"
                />
              </div>
              <div>
                <Label htmlFor="admin-password">كلمة المرور</Label>
                <div className="relative">
                  <Input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Root"
                    value={adminCredentials.password}
                    onChange={(e) => setAdminCredentials(prev => ({ ...prev, password: e.target.value }))}
                    className="shadow-md pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <Button 
                onClick={handleAdminLogin}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              >
                تسجيل الدخول
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="relative p-6 text-center">
          <div className="mb-4 flex justify-center">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl shadow-2xl">
              <img 
                src="/uploads/1d80cf78-3c22-40d9-8bb0-56aba8d96e61.png"
                alt="Enjoy Restaurant Logo" 
                className="w-32 h-20 mx-auto object-contain"
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-shadow mb-3">{pageContent.restaurantName || 'مطعم إنجوي للوجبات السريعة'}</h1>
          <p className="text-red-100 text-lg mb-4">{pageContent.subtitle || 'أفضل الأطباق الشهية في دوما'}</p>
          <div className="flex justify-center">
            <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm">
              <Utensils className="w-4 h-4 ml-2" />
              قائمة الطعام
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-10">
        {/* Restaurant Description */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-t-lg">
            <CardTitle className="text-center text-2xl">عن المطعم</CardTitle>
          </CardHeader>
          <CardContent className="text-center p-8">
            <p className="text-gray-700 leading-relaxed text-lg">
              {pageContent.description || 'مطعم إنجوي للوجبات السريعة يقدم أشهى الأطباق والوجبات في دوما. نحن نفتخر بتقديم خدمة متميزة وطعام لذيذ في أجواء مريحة وودية. مطعمنا مجهز بقاعة واسعة تناسب جميع المناسبات عدا الاحتفالات.'}
            </p>
          </CardContent>
        </Card>

        {/* Weekly Specials */}
        <section>
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2">
              عروض الأسبوع
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full"></div>
          </div>
          <Carousel className="w-full">
            <CarouselContent>
              {(pageContent.weeklySpecials || []).map((special: any, index: number) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-red-50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Star className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-red-600 mb-3">{special.title}</h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">{special.description}</p>
                        <div className="space-y-2">
                          <div className="text-2xl font-bold text-green-600">{special.price}</div>
                          <div className="text-sm text-gray-500 line-through">{special.originalPrice}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        {/* Featured Dishes Gallery */}
        <section>
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2">
              أطباقنا المميزة
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(pageContent.featuredDishes || []).map((dish: any, index: number) => (
              <Card key={index} className="shadow-xl overflow-hidden border-0 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
                <div className="aspect-square relative">
                  <img 
                    src={dish.image} 
                    alt={dish.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="font-bold text-gray-800 text-lg">{dish.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Restaurant Features */}
        <section>
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2">
              مميزات المطعم
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {restaurantFeatures.map((feature, index) => (
              <Card key={index} className="shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white shadow-lg`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-xl mb-2">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Information */}
        <Card className="shadow-2xl border-0 bg-gradient-to-r from-red-500 to-orange-500 text-white">
          <CardHeader>
            <CardTitle className="text-center text-2xl">معلومات التواصل</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <div className="flex items-center justify-center space-x-3 space-x-reverse">
              <div className="p-3 bg-white/20 rounded-full">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-lg">{pageContent.contactInfo?.address || 'دوما - مقابل مشفى دوما'}</span>
            </div>
            <div className="flex items-center justify-center space-x-3 space-x-reverse">
              <div className="p-3 bg-white/20 rounded-full">
                <Phone className="w-6 h-6" />
              </div>
              <a href={`tel:${pageContent.contactInfo?.phone || '0988974612'}`} className="text-lg font-semibold hover:text-red-100 transition-colors">
                {pageContent.contactInfo?.phone || '0988974612'}
              </a>
            </div>
            <div className="text-center">
              <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm text-lg px-8 py-3">
                <Facebook className="w-5 h-5 ml-2" />
                تابعونا على فيسبوك
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Index;
