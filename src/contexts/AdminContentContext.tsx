
import React, { createContext, useContext, useState, useEffect } from 'react';

interface PageContent {
  id: string;
  title: string;
  description: string;
  content: any;
  lastModified: string;
}

interface AdminContentContextType {
  pages: PageContent[];
  updatePage: (pageId: string, content: any) => void;
  getPage: (pageId: string) => PageContent | undefined;
  resetToDefaults: () => void;
}

const AdminContentContext = createContext<AdminContentContextType | undefined>(undefined);

const defaultPages: PageContent[] = [
  {
    id: 'home',
    title: 'الصفحة الرئيسية',
    description: 'محتوى الصفحة الرئيسية',
    content: {
      restaurantName: 'مطعم إنجوي للوجبات السريعة',
      subtitle: 'أفضل الأطباق الشهية في دوما',
      description: 'مطعم إنجوي للوجبات السريعة يقدم أشهى الأطباق والوجبات في دوما. نحن نفتخر بتقديم خدمة متميزة وطعام لذيذ في أجواء مريحة وودية. مطعمنا مجهز بقاعة واسعة تناسب جميع المناسبات عدا الاحتفالات.',
      weeklySpecials: [
        {
          title: "عرض الأسبوع",
          description: "وجبة دجاج مقرمش + بطاطس + مشروب",
          price: "15,000 ل.س",
          originalPrice: "20,000 ل.س"
        },
        {
          title: "عرض العائلة", 
          description: "وجبة عائلية كبيرة تكفي 4 أشخاص",
          price: "45,000 ل.س",
          originalPrice: "55,000 ل.س"
        },
        {
          title: "عرض الحلويات",
          description: "كوب آيس كريم فواكه + كيك شوكولاتة",
          price: "12,000 ل.س", 
          originalPrice: "16,000 ل.س"
        }
      ],
      featuredDishes: [
        { name: "دجاج مقرمش", image: "/uploads/c7c6978e-64af-4c90-8d42-81cfd608210b.png" },
        { name: "آيس كريم فواكه", image: "/uploads/9aa1c7ae-e7f9-428d-9201-955d12faa63b.png" },
        { name: "حلويات مشكلة", image: "/uploads/d2346a68-735f-4079-8fdf-65a712168d9f.png" },
        { name: "كوب فواكه", image: "/uploads/b073a57a-21c7-41ea-9bed-33838bc431f1.png" }
      ],
      contactInfo: {
        address: 'دوما - مقابل مشفى دوما',
        phone: '0988974612'
      }
    },
    lastModified: new Date().toISOString()
  },
  {
    id: 'menu',
    title: 'قائمة الطعام',
    description: 'عناصر قائمة الطعام',
    content: {
      title: 'قائمة الطعام',
      subtitle: 'اختر من أشهى أطباقنا',
      categories: ["الكل", "وجبات رئيسية", "مقبلات", "حلويات", "مشروبات"],
      menuItems: [
        {
          id: 1,
          name: "دجاج مقرمش",
          category: "وجبات رئيسية",
          price: 18000,
          description: "قطع دجاج مقرمشة مع البهارات الخاصة",
          nutrition: "سعرات: 450، بروتين: 35غ، دهون: 22غ",
          image: "/uploads/c7c6978e-64af-4c90-8d42-81cfd608210b.png"
        },
        {
          id: 2,
          name: "بطاطس مقلية",
          category: "مقبلات", 
          price: 8000,
          description: "بطاطس ذهبية مقرمشة مع الملح والبهارات",
          nutrition: "سعرات: 320، كربوهيدرات: 45غ، دهون: 15غ",
          image: "/uploads/056dfd70-19f9-42e9-9be1-c51fd3467482.png"
        },
        {
          id: 3,
          name: "آيس كريم فواكه",
          category: "حلويات",
          price: 12000, 
          description: "آيس كريم فانيلا مع فواكه طازجة وشوكولاتة",
          nutrition: "سعرات: 280، سكريات: 35غ، كالسيوم: 120ملغ",
          image: "/uploads/9aa1c7ae-e7f9-428d-9201-955d12faa63b.png"
        },
        {
          id: 4,
          name: "كوب فواكه مشكلة",
          category: "حلويات",
          price: 10000,
          description: "مزيج من الفواكه الطازجة مع الكريمة",
          nutrition: "سعرات: 180، فيتامين C: 60ملغ، ألياف: 8غ",
          image: "/uploads/d2346a68-735f-4079-8fdf-65a712168d9f.png"
        },
        {
          id: 5,
          name: "عصير طبيعي",
          category: "مشروبات",
          price: 6000,
          description: "عصائر طبيعية متنوعة برتقال، تفاح، مانجو",
          nutrition: "سعرات: 120، فيتامين C: 80ملغ، سكر طبيعي: 28غ",
          image: "/uploads/b073a57a-21c7-41ea-9bed-33838bc431f1.png"
        }
      ]
    },
    lastModified: new Date().toISOString()
  },
  {
    id: 'hall-booking',
    title: 'الوجبات العائلية',
    description: 'إعدادات صفحة الوجبات العائلية',
    content: {
      title: 'الوجبات العائلية',
      subtitle: 'اطلب وجبة عائلية مميزة للمناسبات',
      minimumOrder: 1000,
      packagePrices: [
        { value: "1000", label: "1,000 ل.س", description: "الباقة الأساسية" },
        { value: "350000", label: "350,000 ل.س", description: "الباقة المتوسطة" },
        { value: "450000", label: "450,000 ل.س", description: "الباقة المميزة" },
        { value: "550000", label: "550,000 ل.س", description: "الباقة الفاخرة" }
      ]
    },
    lastModified: new Date().toISOString()
  },
  {
    id: 'hall-reservation',
    title: 'حجز القاعة',
    description: 'إعدادات صفحة حجز القاعة',
    content: {
      title: 'حجز القاعة',
      subtitle: 'احجز قاعتنا للمناسبات الخاصة',
      whatsappNumber: '0985679167',
      minimumAdvanceBooking: 7,
      eventTypes: [
        "حفل زفاف",
        "خطوبة", 
        "عيد ميلاد",
        "اجتماع عمل",
        "مؤتمر",
        "ندوة",
        "احتفال تخرج",
        "لقاء عائلي",
        "أخرى"
      ]
    },
    lastModified: new Date().toISOString()
  }
];

export const AdminContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pages, setPages] = useState<PageContent[]>(() => {
    const saved = localStorage.getItem('adminPageContent');
    return saved ? JSON.parse(saved) : defaultPages;
  });

  useEffect(() => {
    localStorage.setItem('adminPageContent', JSON.stringify(pages));
  }, [pages]);

  const updatePage = (pageId: string, content: any) => {
    setPages(prev => prev.map(page => 
      page.id === pageId 
        ? { ...page, content, lastModified: new Date().toISOString() }
        : page
    ));
  };

  const getPage = (pageId: string) => {
    return pages.find(page => page.id === pageId);
  };

  const resetToDefaults = () => {
    setPages(defaultPages);
  };

  return (
    <AdminContentContext.Provider value={{ pages, updatePage, getPage, resetToDefaults }}>
      {children}
    </AdminContentContext.Provider>
  );
};

export const useAdminContent = () => {
  const context = useContext(AdminContentContext);
  if (context === undefined) {
    throw new Error('useAdminContent must be used within an AdminContentProvider');
  }
  return context;
};
