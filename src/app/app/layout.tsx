import BottomNavigation from '@/components/BottomNavigation';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import Link from 'next/link';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='grid h-screen w-full grid-cols-1 xl:grid-cols-[350px_1fr] font-sentient'>
      <Sidebar />
      <div className='box-border overflow-hidden'>
        <div className='h-[calc(100vh-70px)] max-w-[1960px] xl:h-[100vh] py-6 px-5  2xl:px-20 overflow-auto'>
          <div className='flex justify-between items-center mb-4'>
            <p className=' text-lg'>Selected Funeral</p>
            <Link href='/app/funerals/create'>
              <Button className='flex items-center gap-x-3 rounded-3xl p-5 '>
                <CirclePlus />
                <span> Create New Funeral</span>
              </Button>
            </Link>
          </div>
          {children}
        </div>
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Layout;
