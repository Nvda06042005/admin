import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Settings,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
}

const sidebarItems: SidebarItem[] = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
  },
  {
    name: 'Users',
    path: '/users',
    icon: <Users className="mr-2 h-4 w-4" />,
    adminOnly: true,
  },
  {
    name: 'Products',
    path: '/products',
    icon: <ShoppingCart className="mr-2 h-4 w-4" />,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: <Settings className="mr-2 h-4 w-4" />,
  },
];

export default function Sidebar() {
  const { logout, isAdmin, user } = useAuth();
  const location = useLocation();

  const filteredItems = sidebarItems.filter(
    (item) => !item.adminOnly || (item.adminOnly && isAdmin)
  );

  return (
    <div className="bg-gray-900 text-white h-full w-64 min-h-screen flex flex-col">
      <div className="p-5 border-b border-gray-800">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
      </div>

      <div className="p-5 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="bg-gray-700 p-2 rounded-full">
            <span className="font-bold text-sm">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div>
            <p className="font-medium">{user?.username || 'User'}</p>
            <p className="text-xs text-gray-400">{user?.role || 'Role'}</p>
          </div>
        </div>
      </div>

      <nav className="p-5 flex-1">
        <ul className="space-y-2">
          {filteredItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path}>
                <div
                  className={cn(
                    'flex items-center px-4 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white',
                    location.pathname === item.path && 'bg-gray-800 text-white'
                  )}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-5 border-t border-gray-800">
        <Button
          variant="outline"
          className="w-full text-gray-300 hover:text-white hover:bg-gray-800 border-gray-700"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
}
