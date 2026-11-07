
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const BottomNavigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "الرئيسية", icon: "🏠" },
    { path: "/menu", label: "قائمة الطعام", icon: "📋" },
    { path: "/order", label: "الطلبات", icon: "🛒" },
    { path: "/hall-booking", label: "وجبات عائلية", icon: "🍽️" },
    { path: "/hall-reservation", label: "حجز القاعة", icon: "🎉" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center py-1 overflow-x-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center py-2 px-2 rounded-lg transition-all duration-200 min-w-0 flex-shrink-0",
              location.pathname === item.path
                ? "bg-primary text-primary-foreground"
                : "text-gray-600 hover:text-primary"
            )}
          >
            <span className="text-lg mb-1">{item.icon}</span>
            <span className="text-xs font-medium text-center leading-tight">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
