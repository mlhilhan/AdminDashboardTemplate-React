import { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Handle responsive sidebar behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false); // Close mobile sidebar on desktop
      }
    };

    // Check initial screen size
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isSidebarOpen && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (

<div className="flex h-screen bg-gray-50">
  {/* Sidebar */}
  <Sidebar
    isOpen={isSidebarOpen}
    onClose={closeSidebar}
    isCollapsed={isSidebarCollapsed}
    onToggleCollapse={toggleSidebarCollapse}
  />

  {/* Main content */}
  <div className="flex-1 flex flex-col min-w-0">
    <Header
          onMenuToggle={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
    <main className="flex-1 overflow-y-auto px-4 py-6 lg:px-8">
      {children}
    </main>
  </div>
</div>
  );
};

export default Layout;
