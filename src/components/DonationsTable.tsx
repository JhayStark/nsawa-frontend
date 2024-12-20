import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
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
import { Filter, HandCoins, UsersIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  useGetDonationsQuery,
  useGetDonationStatsQuery,
} from '@/lib/features/donationsApiSlice';
import { useDebounce } from 'use-debounce';
import PaginationComponent from './PaginationComponent';
import { formatToGhanaCurrency } from '@/lib/utils';
import { DatePicker } from './ui/DatePicker';

export default function DonationTable({ funeralDetails }: any) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [value] = useDebounce(search, 500);
  const [modeFilter, setModeFilter] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { data } = useGetDonationsQuery({
    id: funeralDetails?._id,
    pageSize,
    pageNumber,
    search: value,
    paymentMethod: modeFilter,
    startDate,
    endDate,
  });

  const { data: stats } = useGetDonationStatsQuery(funeralDetails?._id || '');

  return (
    <div className='sm:max-w-[800px] h-[100vh] md:h-auto'>
      <div className='flex space-x-4 justify-between w-full mb-4'>
        <Input
          placeholder='Search by name'
          value={search}
          onChange={e => setSearch(e.target.value)}
          className='max-w-sm'
        />
        <Popover>
          <PopoverTrigger className='flex items-center gap-x-1 border px-2 rounded-md text-gray-600'>
            <Filter />
          </PopoverTrigger>
          <PopoverContent className='w-full flex flex-col gap-y-3'>
            <DatePicker placeholder='Start date' onDateChange={setStartDate} />
            <DatePicker placeholder='End date' onDateChange={setEndDate} />
            <Select value={modeFilter} onValueChange={setModeFilter}>
              <SelectTrigger className='min:w-[180px]'>
                <SelectValue placeholder='Select payment method' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All</SelectItem>
                <SelectItem value='Cash'>Cash</SelectItem>
                <SelectItem value='Online'>Online</SelectItem>
              </SelectContent>
            </Select>
          </PopoverContent>
        </Popover>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Donations
            </CardTitle>
            <HandCoins className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {(!modeFilter || modeFilter == 'all') &&
                formatToGhanaCurrency(stats?.totalDonations)}
              {modeFilter == 'Cash' &&
                formatToGhanaCurrency(stats?.totalCashDonations)}
              {modeFilter == 'Online' &&
                formatToGhanaCurrency(stats?.totalMomoDonations)}
            </div>
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
              {(!modeFilter || modeFilter == 'all') && stats?.numberOfDonations}
              {modeFilter == 'Cash' && stats?.totalNumberOfCashDonations}
              {modeFilter == 'Online' && stats?.totalNumberOfOnlineDonations}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className='max-h-[60vh]  min-h-[400px] overflow-y-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Donor Name</TableHead>
              <TableHead className='hidden md:table-cell'>
                Phone Number
              </TableHead>
              <TableHead>Donated To</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className='hidden md:table-cell'>Mode</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.donations.map((donation: any) => (
              <TableRow key={donation._id}>
                <TableCell>{donation.donorName}</TableCell>
                <TableCell className='hidden md:table-cell'>
                  {donation.donorPhoneNumber}
                </TableCell>
                <TableCell>{donation?.keyPerson?.name || ''}</TableCell>
                <TableCell>
                  {formatToGhanaCurrency(donation.amountDonated)}
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  {donation.modeOfDonation}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <PaginationComponent
        currentPage={pageNumber}
        itemsPerPage={pageSize}
        onPageChange={page => setPageNumber(() => page)}
        totalItems={data?.total}
      />
    </div>
  );
}
