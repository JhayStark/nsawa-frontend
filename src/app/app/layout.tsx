import BottomNavigation from '@/components/BottomNavigation';
import Sidebar from '@/components/Sidebar';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='grid h-screen w-full grid-cols-1 xl:grid-cols-[300px_1fr] font-sentient'>
      <Sidebar />
      <div className='box-border'>
        <div className='h-[calc(100vh-70px)] max-w-[1960px] xl:h-[100vh] py-6 px-5  2xl:px-10 overflow-auto'>
          {children}
        </div>
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Layout;
