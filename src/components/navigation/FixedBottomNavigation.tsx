import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming react-router-dom is used
import { cn } from '@/lib/utils'; // For conditional class names

// Define the type for a navigation item
interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType; // Lucide icon component
  activeIcon?: React.ElementType; // Optional active state icon
}

interface FixedBottomNavigationProps {
  navItems: NavItem[];
  className?: string;
}

const FixedBottomNavigation: React.FC<FixedBottomNavigationProps> = ({ navItems, className }) => {
  const location = useLocation();
  console.log("Rendering FixedBottomNavigation, current path:", location.pathname);

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 h-16 bg-background border-t border-border shadow-top",
        "flex items-center justify-around",
        className
      )}
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
        const IconComponent = isActive && item.activeIcon ? item.activeIcon : item.icon;

        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center p-2 text-muted-foreground hover:text-primary transition-colors w-full h-full",
              isActive && "text-primary"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <IconComponent className="h-6 w-6 mb-0.5" strokeWidth={isActive ? 2.5 : 2} />
            <span className={cn("text-xs", isActive && "font-semibold")}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default FixedBottomNavigation;