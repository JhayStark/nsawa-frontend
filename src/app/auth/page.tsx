import LoginPartial from './login-partial';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NSAWA - Login',
  description:
    'Have a funeral and want to collect donations with ease Nsawa is the place for you, Sign up here',
};

const Page = () => {
  return <LoginPartial />;
};

export default Page;
