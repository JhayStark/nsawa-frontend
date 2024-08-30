import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import CoinIcon from '@/components/svgs/CoinIcon';
import DrivingIcon from '@/components/svgs/DrivingIcon';
import MoneyIcon from '@/components/svgs/MoneyIcon';
import { Button } from '@/components/ui/button';
import { ArrowDown, MoveRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
          <p className='mt-4 text-sm font-normal lg:text-2xl md:text-lg lg:mt-5'>
            Have a funeral and want to collect donations with ease
          </p>
          <p className='text-sm font-normal lg:text-2xl md:text-lg'>
            Nsawa is the place for you
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
            Why Choose Nsawa
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
        <section id='howItWorks' className='my-16 lg:my-24'>
          <h1 className='mb-12 font-bold text-center md:text-4xl md:text-left'>
            How it works
          </h1>
          <Image
            src='/image/dashboard.png'
            width={1169.3}
            height={819}
            alt='dashboard image'
          />
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
