import BottomNavigation from '@/components/BottomNavigation';
import Sidebar from '@/components/Sidebar';
import React from 'react';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='grid h-screen w-full grid-cols-1 xl:grid-cols-[280px_1fr]'>
      <Sidebar />
      <div className='box-border overflow-hidden'>
        <div className='h-[calc(100vh-70px)] xl:h-[100vh] p-6 overflow-auto'>
          {children}
        </div>
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Layout;
