
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAdminContent } from "@/contexts/AdminContentContext";
import { useToast } from "@/hooks/use-toast";
import { Save, Plus, Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const { pages, updatePage, resetToDefaults } = useAdminContent();
  const [selectedPage, setSelectedPage] = useState(pages[0]?.id || 'home');
  const { toast } = useToast();
  const navigate = useNavigate();

  const currentPage = pages.find(p => p.id === selectedPage);
  const [editingContent, setEditingContent] = useState(currentPage?.content || {});

  const handleSave = () => {
    if (currentPage) {
      updatePage(selectedPage, editingContent);
      toast({
        title: "تم الحفظ",
        description: `تم حفظ تغييرات ${currentPage.title} بنجاح`,
      });
    }
  };

  const handlePageChange = (pageId: string) => {
    setSelectedPage(pageId);
    const page = pages.find(p => p.id === pageId);
    setEditingContent(page?.content || {});
  };

  const updateEditingContent = (path: string, value: any) => {
    setEditingContent(prev => {
      const newContent = { ...prev };
      const keys = path.split('.');
      let current = newContent;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newContent;
    });
  };

  const addArrayItem = (path: string, item: any) => {
    setEditingContent(prev => {
      const newContent = { ...prev };
      const keys = path.split('.');
      let current = newContent;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = [];
        current = current[keys[i]];
      }
      
      if (!current[keys[keys.length - 1]]) current[keys[keys.length - 1]] = [];
      current[keys[keys.length - 1]].push(item);
      return newContent;
    });
  };

  const removeArrayItem = (path: string, index: number) => {
    setEditingContent(prev => {
      const newContent = { ...prev };
      const keys = path.split('.');
      let current = newContent;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]].splice(index, 1);
      return newContent;
    });
  };

  const renderHomePageEditor = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>معلومات المطعم الأساسية</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>اسم المطعم</Label>
            <Input
              value={editingContent.restaurantName || ''}
              onChange={(e) => updateEditingContent('restaurantName', e.target.value)}
            />
          </div>
          <div>
            <Label>العنوان الفرعي</Label>
            <Input
              value={editingContent.subtitle || ''}
              onChange={(e) => updateEditingContent('subtitle', e.target.value)}
            />
          </div>
          <div>
            <Label>وصف المطعم</Label>
            <Textarea
              value={editingContent.description || ''}
              onChange={(e) => updateEditingContent('description', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            عروض الأسبوع
            <Button
              size="sm"
              onClick={() => addArrayItem('weeklySpecials', {
                title: "عرض جديد",
                description: "وصف العرض",
                price: "0 ل.س",
                originalPrice: "0 ل.س"
              })}
            >
              <Plus className="w-4 h-4 ml-1" />
              إضافة عرض
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {editingContent.weeklySpecials?.map((special: any, index: number) => (
            <Card key={index} className="mb-4">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-semibold">العرض {index + 1}</h4>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeArrayItem('weeklySpecials', index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>عنوان العرض</Label>
                    <Input
                      value={special.title}
                      onChange={(e) => updateEditingContent(`weeklySpecials.${index}.title`, e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>وصف العرض</Label>
                    <Input
                      value={special.description}
                      onChange={(e) => updateEditingContent(`weeklySpecials.${index}.description`, e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>السعر</Label>
                    <Input
                      value={special.price}
                      onChange={(e) => updateEditingContent(`weeklySpecials.${index}.price`, e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>السعر الأصلي</Label>
                    <Input
                      value={special.originalPrice}
                      onChange={(e) => updateEditingContent(`weeklySpecials.${index}.originalPrice`, e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>معلومات التواصل</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>العنوان</Label>
            <Input
              value={editingContent.contactInfo?.address || ''}
              onChange={(e) => updateEditingContent('contactInfo.address', e.target.value)}
            />
          </div>
          <div>
            <Label>رقم الهاتف</Label>
            <Input
              value={editingContent.contactInfo?.phone || ''}
              onChange={(e) => updateEditingContent('contactInfo.phone', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMenuPageEditor = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>إعدادات قائمة الطعام</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>عنوان الصفحة</Label>
            <Input
              value={editingContent.title || ''}
              onChange={(e) => updateEditingContent('title', e.target.value)}
            />
          </div>
          <div>
            <Label>العنوان الفرعي</Label>
            <Input
              value={editingContent.subtitle || ''}
              onChange={(e) => updateEditingContent('subtitle', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            عناصر القائمة
            <Button
              size="sm"
              onClick={() => addArrayItem('menuItems', {
                id: Date.now(),
                name: "طبق جديد",
                category: "وجبات رئيسية",
                price: 0,
                description: "وصف الطبق",
                nutrition: "معلومات غذائية",
                image: "/uploads/c7c6978e-64af-4c90-8d42-81cfd608210b.png"
              })}
            >
              <Plus className="w-4 h-4 ml-1" />
              إضافة طبق
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {editingContent.menuItems?.map((item: any, index: number) => (
            <Card key={index} className="mb-4">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-semibold">{item.name}</h4>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeArrayItem('menuItems', index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>اسم الطبق</Label>
                    <Input
                      value={item.name}
                      onChange={(e) => updateEditingContent(`menuItems.${index}.name`, e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>الفئة</Label>
                    <Input
                      value={item.category}
                      onChange={(e) => updateEditingContent(`menuItems.${index}.category`, e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>السعر</Label>
                    <Input
                      type="number"
                      value={item.price}
                      onChange={(e) => updateEditingContent(`menuItems.${index}.price`, Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label>رابط الصورة</Label>
                    <Input
                      value={item.image}
                      onChange={(e) => updateEditingContent(`menuItems.${index}.image`, e.target.value)}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>وصف الطبق</Label>
                    <Textarea
                      value={item.description}
                      onChange={(e) => updateEditingContent(`menuItems.${index}.description`, e.target.value)}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>المعلومات الغذائية</Label>
                    <Input
                      value={item.nutrition}
                      onChange={(e) => updateEditingContent(`menuItems.${index}.nutrition`, e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4 space-x-reverse">
            <Button
              variant="outline"
              onClick={() => navigate('/admin')}
            >
              <ArrowLeft className="w-4 h-4 ml-1" />
              العودة للوحة الإدارة
            </Button>
            <h1 className="text-3xl font-bold text-gray-800">تحرير محتوى الصفحات</h1>
          </div>
          <div className="flex space-x-2 space-x-reverse">
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 ml-1" />
              حفظ التغييرات
            </Button>
            <Button 
              variant="destructive"
              onClick={() => {
                resetToDefaults();
                toast({
                  title: "تم الإعادة",
                  description: "تم إعادة جميع الصفحات للإعدادات الافتراضية",
                });
              }}
            >
              إعادة للافتراضي
            </Button>
          </div>
        </div>

        <Tabs value={selectedPage} onValueChange={handlePageChange}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="home">الصفحة الرئيسية</TabsTrigger>
            <TabsTrigger value="menu">قائمة الطعام</TabsTrigger>
            <TabsTrigger value="hall-booking">الوجبات العائلية</TabsTrigger>
            <TabsTrigger value="hall-reservation">حجز القاعة</TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="mt-6">
            {renderHomePageEditor()}
          </TabsContent>

          <TabsContent value="menu" className="mt-6">
            {renderMenuPageEditor()}
          </TabsContent>

          <TabsContent value="hall-booking" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الوجبات العائلية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>الحد الأدنى للطلب</Label>
                  <Input
                    type="number"
                    value={editingContent.minimumOrder || 0}
                    onChange={(e) => updateEditingContent('minimumOrder', Number(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hall-reservation" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات حجز القاعة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>رقم الواتساب</Label>
                  <Input
                    value={editingContent.whatsappNumber || ''}
                    onChange={(e) => updateEditingContent('whatsappNumber', e.target.value)}
                  />
                </div>
                <div>
                  <Label>الحد الأدنى للحجز المسبق (بالأيام)</Label>
                  <Input
                    type="number"
                    value={editingContent.minimumAdvanceBooking || 7}
                    onChange={(e) => updateEditingContent('minimumAdvanceBooking', Number(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
