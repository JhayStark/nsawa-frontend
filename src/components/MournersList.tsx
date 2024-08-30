import { useState, useMemo } from 'react';
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
import { ExternalLink } from 'lucide-react';
import { useGetKeyPersonsQuery } from '@/lib/features/keyPersonsApiSlice';

export default function MournersList({ funeralDetails }: any) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { data } = useGetKeyPersonsQuery(funeralDetails?._id || '');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='secondary' className='gap-3'>
          Mourners List <ExternalLink />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[800px]'>
        <DialogHeader>
          <DialogTitle>Mourners List</DialogTitle>
        </DialogHeader>
        <div className='mb-4'>
          <Input
            placeholder='Search by name or relation'
            value={search}
            onChange={e => setSearch(e.target.value)}
            className='max-w-sm'
          />
        </div>
        <div className='max-h-[60vh] min-h-[400px] overflow-y-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mourner Name</TableHead>
                <TableHead>Relation</TableHead>
                {/* <TableHead>Donations Received</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.persons?.map(mourner => (
                <TableRow key={mourner._id}>
                  <TableCell>{mourner.name}</TableCell>
                  <TableCell>{mourner.relation}</TableCell>
                  {/* <TableCell>{mourner.donationsReceived}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
