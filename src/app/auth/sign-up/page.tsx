import type { Metadata } from 'next';
import SignUp from './partial';

export const metadata: Metadata = {
  title: 'NSAWA - Sign Up',
  description:
    'Have a funeral and want to collect donations with ease Nsawa is the place for you, Sign up here',
};

const Page = () => {
  return <SignUp />;
};

export default Page;
