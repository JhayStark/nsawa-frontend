import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ExternalLink, HandCoins, UsersIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  useGetDonationsQuery,
  useGetDonationStatsQuery,
} from '@/lib/features/donationsApiSlice';
import { useDebounce } from 'use-debounce';

export default function DonationHistory({ funeralDetails }: any) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [value] = useDebounce(search, 500);
  const [modeFilter, setModeFilter] = useState('');
  const { data } = useGetDonationsQuery({
    id: funeralDetails?._id,
    pageSize: 10,
    pageNumber: 1,
    search: value,
    paymentMethod: modeFilter,
  });

  const { data: stats } = useGetDonationStatsQuery(funeralDetails?._id || '');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='default' className='gap-3'>
          Donation History <ExternalLink />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[800px] h-[100vh] md:h-auto'>
        <DialogHeader>
          <DialogTitle>Donation History</DialogTitle>
        </DialogHeader>

        <div className='flex space-x-4 '>
          <Input
            placeholder='Search by name or organization'
            value={search}
            onChange={e => setSearch(e.target.value)}
            className='max-w-sm'
          />
          <Select value={modeFilter} onValueChange={setModeFilter}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Select filter' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Cash'>Cash</SelectItem>
              <SelectItem value='Online'>Online</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Donations
              </CardTitle>
              <HandCoins className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{stats?.totalDonations}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Number of Donations
              </CardTitle>
              <UsersIcon className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {stats?.numberOfDonations}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className='max-h-[60vh]  min-h-[400px] overflow-y-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Donor Name</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Donated To</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Mode</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.donations.map((donation: any) => (
                <TableRow key={donation._id}>
                  <TableCell>{donation.donorName}</TableCell>
                  <TableCell>{donation.donorPhoneNumber}</TableCell>
                  <TableCell>{donation.keyPerson.name}</TableCell>
                  <TableCell>{donation.amountDonated}</TableCell>
                  <TableCell>{donation.modeOfDonation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
