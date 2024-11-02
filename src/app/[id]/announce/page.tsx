import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
// import { ScrollArea } from '@/components/ui/scroll-area';
import { Megaphone, Check } from 'lucide-react';

interface Announcement {
  id: string;
  donorName: string;
  message: string;
  announced: boolean;
}

export default function Page() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      donorName: 'John Doe',
      message: 'Condolences to the family. May they find peace.',
      announced: false,
    },
    {
      id: '2',
      donorName: 'Jane Smith',
      message: 'Remembering the good times we shared. Rest in peace.',
      announced: false,
    },
    {
      id: '3',
      donorName: 'Mike Johnson',
      message: 'Our thoughts and prayers are with the family.',
      announced: false,
    },
    {
      id: '4',
      donorName: 'Emily Brown',
      message: 'A life well-lived. You will be missed.',
      announced: false,
    },
    {
      id: '5',
      donorName: 'David Wilson',
      message: 'Sending love and support during this difficult time.',
      announced: false,
    },
  ]);

  const handleMarkAnnounced = (id: string) => {
    setAnnouncements(prevAnnouncements =>
      prevAnnouncements.map(announcement =>
        announcement.id === id
          ? { ...announcement, announced: true }
          : announcement
      )
    );
  };

  return (
    <div className='container mx-auto py-10'>
      <Card>
        <CardHeader>
          <CardTitle>Donor Announcements</CardTitle>
          <CardDescription>
            Manage and announce messages from donors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='h-[75vh] overflow-auto'>
            <div className='space-y-4'>
              {announcements.map(announcement => (
                <Card
                  key={announcement.id}
                  className={announcement.announced ? 'bg-muted' : ''}
                >
                  <CardHeader>
                    <CardTitle className='text-lg'>
                      {announcement.donorName}
                    </CardTitle>
                    <CardDescription>
                      {announcement.announced ? (
                        <span className='flex items-center text-green-600'>
                          <Check className='w-4 h-4 mr-1' />
                          Announced
                        </span>
                      ) : (
                        <span className='text-yellow-600'>Pending</span>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{announcement.message}</p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => handleMarkAnnounced(announcement.id)}
                      disabled={announcement.announced}
                      className='w-full'
                    >
                      <Megaphone className='w-4 h-4 mr-2' />
                      {announcement.announced
                        ? 'Announced'
                        : 'Mark as Announced'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
