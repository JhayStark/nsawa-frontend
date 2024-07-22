import { User } from 'lucide-react';

function isOdd(number: number) {
  return number % 2 !== 0;
}
const DonationHistory = ({ index }: { index: number }) => {
  return (
    <div className='flex items-center gap-5'>
      <div
        className={`h-12 w-12 ${
          isOdd(index) ? 'bg-secondary' : 'bg-primary'
        } rounded-full flex justify-center items-center text-white`}
      >
        <User
          className={`${isOdd(index) ? 'text-primary' : 'text-secondary'}`}
        />
      </div>
      <div>
        <p className='font-medium'>
          A donation of GHS 5000.00 was received from John Doe via MTN Mobile
          Money.
        </p>
        <p className='text-gray- text-sm'>Cummens Doe</p>
      </div>
    </div>
  );
};

export default DonationHistory;
