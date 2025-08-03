import {
  LayoutDashboard,
  Users,
  Package,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const iconMap = {
  LayoutDashboard,
  Users,
  Package,
  BarChart3,
  Settings,
};

const Sidebar = ({ isOpen, onClose, isCollapsed, onToggleCollapse }) => {
  const location = useLocation();
  const { getUserMenuItems } = useAuth();
  const menuItems = getUserMenuItems();

  const [openSubmenus, setOpenSubmenus] = useState({});

  const isActive = (path) => location.pathname === path;

  const toggleSubmenu = (id) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          ${isCollapsed ? 'w-16' : 'w-64 lg:w-64'}
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isCollapsed
            ? 'h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out'
            : 'h-screen bg-white border-r shadow-sm overflow-y-auto'}
          max-w-full
          lg:translate-x-0 lg:static
        `}
      >
        <div className="flex flex-col h-full relative">
          {/* Logo + collapse/close */}
          <div
            className={`flex items-center justify-between px-4 py-4 border-b border-gray-200`}
          >
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              {!isCollapsed && (
                <span className="text-xl font-bold text-gray-900">Dashboard</span>
              )}
            </div>

            {/* Masaüstü: collapse butonu */}
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex items-center justify-center w-6 h-6 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>

            {/* Mobil: kapat butonu (X) */}
            <button
              onClick={onClose}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item, index) => {
              if (item.title && !isCollapsed) {
                return (
                  <div
                    key={`title-${index}`}
                    className="px-3 text-xs text-gray-500 uppercase tracking-wider pt-2 pb-1"
                  >
                    {item.title}
                  </div>
                );
              }

              const Icon = iconMap[item.icon] || LayoutDashboard;
              const active = isActive(item.path);
              const hasChildren = item.children && item.children.length > 0;
              const submenuOpen = openSubmenus[item.id];

              return (
                <div key={item.id}>
                  <button
                    onClick={() => {
                      if (hasChildren) {
                        toggleSubmenu(item.id);
                      } else if (window.innerWidth < 1024) {
                        onClose();
                      }
                    }}
                    className={`
                      w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                      ${active
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}
                      ${isCollapsed ? 'justify-center' : ''}
                    `}
                    title={isCollapsed ? item.label : ''}
                  >
                    <Icon
                      className={`w-5 h-5 flex-shrink-0 ${
                        active
                          ? 'text-blue-700'
                          : 'text-gray-500 group-hover:text-gray-700'
                      }`}
                    />
                    {!isCollapsed && (
                      <span className="ml-3 flex-1 text-left">{item.label}</span>
                    )}
                    {!isCollapsed && hasChildren && (
                      submenuOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )
                    )}
                  </button>

                  {hasChildren && submenuOpen && !isCollapsed && (
                    <div className="ml-6 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.id}
                          to={child.path}
                          onClick={() => window.innerWidth < 1024 && onClose()}
                          className={`
                            block text-sm px-3 py-1 rounded-md transition-colors
                            ${
                              isActive(child.path)
                                ? 'text-blue-600 font-medium bg-blue-50'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                            }
                          `}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-gray-600" />
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    Modern Dashboard
                  </p>
                  <p className="text-xs text-gray-500 truncate">v1.0.0</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
