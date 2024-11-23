import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import CoinIcon from '@/components/svgs/CoinIcon';
import DrivingIcon from '@/components/svgs/DrivingIcon';
import MoneyIcon from '@/components/svgs/MoneyIcon';
import { Button } from '@/components/ui/button';
import {
  ArrowDown,
  Check,
  MessageSquare,
  MoveRight,
  Terminal,
  X,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { smsPlanData } from '@/lib/config';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function HomePage() {
  return (
    <main className='font-sentient'>
      <Navbar />
      <div className='mx-auto max-w-[1600px] px-5'>
        <section
          id='#about'
          className='flex flex-col items-center font-medium text-2xl md:text-5xl pt-5'
        >
          <h1>Receive Funeral</h1>
          <h1>Donations With Ease</h1>
          {/* <p className='mt-4 text-sm font-normal lg:text-2xl md:text-lg lg:mt-5'>
            Collect funeral donations with ease
          </p> */}
          <p className='text-sm font-normal mt-4 lg:text-2xl md:text-lg lg:mt-5'>
            Nsawa Digital is the platform for you
          </p>
          <Link
            href='/auth'
            className='px-[1.1875rem] py-[0.625rem] mt-4 font-normal 
              text-sm text-white bg-black md:text-base lg:text-2xl lg:mt-12 rounded-[2.9375rem]'
          >
            Set Up Funeral
          </Link>
          <div className=' flex justify-center relative gap-x-2 md:gap-x-8 p-2 max-w-[1600px] w-full pt-36 2xl:pt-56 mx-auto '>
            <div className='absolute md:h-[calc(100%)] w-[30%] h-[60%] md:w-[25%] 2xl:w-[28%] 2xl:h-[calc(100%-50px)] top-6  md:-top-8 left-2'>
              <Image fill src='/image/grandpa.png' alt='Grand dad' />
            </div>
            <Image
              src='/image/father.png'
              alt='Grand dad'
              width={300}
              height={250}
              className='w-[30%] h-[25%] md:w-[18%] md:h-[50%]'
            />
            <Image
              src='/image/son.png'
              alt='Grand dad'
              width={300}
              height={250}
              className='w-[30%] h-[25%] md:w-[18%] md:h-[50%]'
            />
            <div className='w-[30%] h-[60%] absolute md:h-[calc(100%)] md:w-[25%] 2xl:w-[28%] 2xl:h-[calc(100%-50px)] top-6 md:-top-8 right-2'>
              <Image
                fill
                src='/image/daughter.png'
                alt='Grand dad'
                className=''
              />
            </div>
          </div>
        </section>
        <section className='bg-secondary rounded-2xl my-16 lg:my-24 py-28 px-12'>
          <h1 className='text-2xl font-medium text-center md:text-4xl'>
            Why Choose Nsawa Digital
          </h1>
          <div className='flex flex-col items-center justify-center gap-24 mt-11 md:mt-32 lg:flex-row'>
            <div className='flex flex-col items-center justify-center '>
              <MoneyIcon />
              <h1 className='mt-5 mb-5 font-medium md:mt-9 md:mb-7 md:text-xl lg:text-base '>
                Donations
              </h1>
              <p>Donations to families</p>
              <p>and loved ones is</p>
              <p>made easy and organized</p>
            </div>
            <div className='flex flex-col items-center justify-center '>
              <DrivingIcon />
              <h1 className='mt-5 mb-5 font-medium md:mt-9 md:mb-7 md:text-xl lg:text-base '>
                Location
              </h1>
              <p className='text-center'>Location of the funeral is</p>
              <p className='text-center'>
                not a barrier, you can create donations
              </p>
              <p className='text-center'>
                and share to people who cant make it
              </p>
            </div>
            <div className='flex flex-col items-center justify-center '>
              <CoinIcon />
              <h1 className='mt-5 mb-5 font-medium md:mt-9 md:mb-7 md:text-xl lg:text-base '>
                Payment
              </h1>
              <p>Donations can be collected</p>
              <p>virtually through our platform</p>
            </div>
          </div>
        </section>
        <section className='  my-16   '>
          <h2 className='text-3xl font-bold text-center mb-10 text-primary'>
            Subscriptions
          </h2>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {smsPlanData.map(plan => (
              <Card key={plan.id} className='flex flex-col'>
                <CardHeader>
                  <CardTitle className='text-2xl'>{plan.name}</CardTitle>
                  <CardDescription className='font-bold text-lg text-primary'>
                    GHS {plan.price}
                  </CardDescription>
                </CardHeader>
                <CardContent className='flex-grow'>
                  <ul className='space-y-2'>
                    <li className='flex items-center'>
                      <Check className='mr-2 h-4 w-4 text-green-500' />
                      {plan.messages} SMS bundle
                    </li>
                    {plan.features.map(feature => (
                      <li className='flex items-center' key={feature}>
                        <Check className='mr-2 h-4 w-4 text-green-500' />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
            <Alert className='text-orange-600 border-orange-600 w-full col-span-2'>
              <Terminal className='h-4 w-4' />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription className='text-lg italic'>
                All sms related featues are capped to your sms bundle
              </AlertDescription>
            </Alert>
            {/* <Card className='flex flex-col'>
              <CardHeader>
                <CardTitle className='text-2xl'>Basic Plan</CardTitle>
                <CardDescription>Free</CardDescription>
              </CardHeader>
              <CardContent className='flex-grow'>
                <ul className='space-y-2'>
                  <li className='flex items-center'>
                    <Check className='mr-2 h-4 w-4 text-green-500' />
                    Receive cash donations
                  </li>
                  <li className='flex items-center'>
                    <X className='mr-2 h-4 w-4 text-red-500' />
                    No thank you message for cash donations
                  </li>
                  <li className='flex items-center'>
                    <Check className='mr-2 h-4 w-4 text-green-500' />
                    Accept online donations
                  </li>
                  <li className='flex items-center'>
                    <Check className='mr-2 h-4 w-4 text-green-500' />
                    Automatic thank you message for online donations
                  </li>
                  <li className='flex items-center'>
                    <X className='mr-2 h-4 w-4 text-red-500' />
                    No appreciation messages after funeral
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className='w-full' variant='secondary'>
                  Select Basic Plan
                </Button>
              </CardFooter>
            </Card>

            <Card className='flex flex-col border-primary'>
              <CardHeader>
                <CardTitle className='text-2xl'>Standard Plan</CardTitle>
                <CardDescription className='font-bold text-lg'>
                  GHS 199
                </CardDescription>
              </CardHeader>
              <CardContent className='flex-grow mt-5'>
                <ul className='space-y-2'>
                  <li className='flex items-center'>
                    <Check className='mr-2 h-4 w-4 text-green-500' />
                    All Basic Plan features
                  </li>
                  <li className='flex items-center'>
                    <Check className='mr-2 h-4 w-4 text-green-500' />
                    Thank you message for all donations
                  </li>
                  <li className='flex items-center'>
                    <Check className='mr-2 h-4 w-4 text-green-500' />
                    Appreciation message later
                  </li>
                  <li className='flex items-center'>
                    <Check className='mr-2 h-4 w-4 text-green-500' />
                    Limited to 3,000 messages
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className='w-full' variant='outline'>
                  Select Standard Plan
                </Button>
              </CardFooter>
            </Card>

            <Card className='flex flex-col'>
              <CardHeader>
                <CardTitle className='text-2xl'>Premium Plan</CardTitle>
                <CardDescription className='font-bold text-lg'>
                  GHS 299
                </CardDescription>
              </CardHeader>
              <CardContent className='flex-grow mt-5'>
                <ul className='space-y-2'>
                  <li className='flex items-center'>
                    <Check className='mr-2 h-4 w-4 text-green-500' />
                    All Standard Plan features
                  </li>
                  <li className='flex items-center'>
                    <Check className='mr-2 h-4 w-4 text-green-500' />
                    Increased message limit
                  </li>
                  <li className='flex items-center'>
                    <Check className='mr-2 h-4 w-4 text-green-500' />
                    Up to 7,000 messages
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className='w-full' variant='secondary'>
                  Select Premium Plan
                </Button>
              </CardFooter>
            </Card> */}
          </div>
        </section>

        <section
          id='faqs'
          className='py-[5.6875rem] text-[#FFFFE2] bg-[#043F2E] mb-12 md:mb-28 rounded-[0.6875rem] px-5'
        >
          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-xl font-bold md:text-3xl'>
              Frequently Asked Questions
            </h1>
            <p className='text-sm md:text-base'>
              have any other questions email us
            </p>
          </div>
          <div className='lg:mt-32 mt-14 space-y-[2.875rem]'>
            <details className='md:px-9 '>
              <summary className='flex items-center justify-between font-medium cursor-pointer '>
                <span className='text-base'>How do i create a donation</span>
                <span className='ml-auto text-lg text-black bg-white rounded-md '>
                  <ArrowDown />
                </span>
              </summary>
              <p className='text-lg font-normal pt-2  text-[#FFFFE2]'>
                To create a donation, create an account on nsawa, click on
                create new donation, now you can add the venue and key
                personalities and the date of the funeral.
              </p>
            </details>
            <details className='md:px-9 '>
              <summary className='flex items-center justify-between font-medium cursor-pointer '>
                <span className='  text-base '>
                  How do people who cant make it donate
                </span>
                <span className='ml-auto text-lg text-black bg-white rounded-md '>
                  <ArrowDown />
                </span>
              </summary>
              <p className=' text-lg pt-2 font-normal text-[#FFFFE2]'>
                After your donation has been created you are given a unique link
                to share to friends and family who may not be able to make it to
                the venue
              </p>
            </details>
            <details className='md:px-9 '>
              <summary className='flex items-center justify-between font-medium cursor-pointer '>
                <span className=' font-medium text-base'>
                  Does Nsawa have a online payment system
                </span>
                <span className='ml-auto text-lg text-black bg-white rounded-md '>
                  <ArrowDown />
                </span>
              </summary>
              <p className=' text-lg  pt-2 font-normal text-[#FFFFE2]'>
                Friends and family can make donations on Nsawa through our
                online payment system, which collects the data and help
                organizers track donors
              </p>
            </details>
            <details className='md:px-9 '>
              <summary className='flex items-center justify-between font-medium cursor-pointer '>
                <span className=' font-medium text-base'>
                  How do i withdraw online donations
                </span>
                <span className='ml-auto text-lg text-black bg-white rounded-md '>
                  <ArrowDown />
                </span>
              </summary>
              <p className=' text-lg  pt-2 font-normal text-[#FFFFE2]'>
                Withdrawal of online donations are allowed 24hrs after the end
                of the funeral. Funds can be withdrawn into either your bank or
                mobile money account
              </p>
            </details>
          </div>
        </section>
        <section
          id='contactUs'
          className='flex flex-col items-center text-primary justify-center'
        >
          <h1 className='mb-3 text-2xl lg:text-4xl font-bold text-center'>
            Get In touch
          </h1>
          <p className='mb-3 text-xs text-center md:mb-12 md:text-base'>
            Have any question or need clarity, please send us an email
          </p>
          <div className='flex items-center justify-between bg-primary max-w-[75%] md:max-w-[70%] gap-x-4 w-full rounded-[5.4375rem] p-1 md:p-2'>
            <input
              type='text'
              className='text-white bg-transparent outline-none w-full ml-5 md:py-2'
              placeholder='Email'
            />
            <Button className='bg-secondary text-primary rounded-full md:h-16 md:w-[70px] h-10 w-10'>
              <MoveRight />
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
