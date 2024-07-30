import { User } from 'lucide-react';

function isOdd(number: number) {
  return number % 2 !== 0;
}
const DonationHistory = ({ index, data }: { index: any; data: any }) => {
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
          A donation of GHS {data?.amountDonated} was received from{' '}
          {data?.donorName} via
          {data?.modeOfDonation}.
        </p>
        <p className='text-gray- text-sm'>Omani Dankwah </p>
      </div>
    </div>
  );
};

export default DonationHistory;
