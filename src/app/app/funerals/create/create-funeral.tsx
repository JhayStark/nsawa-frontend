'use client';

import { useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { DatePickerField, InputField } from '@/components/ui/form-fields';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useCreateMutation } from '@/lib/features/funeralApiSlice';
import FileUpload from '@/components/FileUpload';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Upload } from 'lucide-react';
import { ImageListType } from 'react-images-uploading';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

// withdrawal details

const createFuneralSchema = z.object({
  nameOfDeceased: z.string(),
  familyName: z.string(),
  yearOfBirth: z.string(),
  yearOfDeath: z.string(),
  phoneNumber: z.string(),
  funeralLocation: z.string(),
  startDate: z.date(),
  endDate: z.date(),
});

const preset_key: string = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET as string;
const cloud_name: string = process.env
  .NEXT_PUBLIC_CLOUDINARY_USERNAME as string;

const handleImageUpload = async (imageFiles: File[]) => {
  const files = imageFiles;

  try {
    const uploadPromises = files.map(async file => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', preset_key);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      );
      return response.data.secure_url;
    });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const CreateFuneral = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [createFuneral] = useCreateMutation();
  const [submitting, setSubmitting] = useState(false);
  const [imageData, setImageData] = useState<{
    bannerIndex: number | null;
    images: ImageListType | [];
  }>({ bannerIndex: null, images: [] });
  const form = useForm<z.infer<typeof createFuneralSchema>>({
    resolver: zodResolver(createFuneralSchema),
  });

  const onSubmit = async (data: z.infer<typeof createFuneralSchema>) => {
    setSubmitting(true);
    if (imageData?.images?.length <= 0 || imageData?.bannerIndex == null) {
      setSubmitting(false);
      toast({
        title: 'Upload images of deceased',
        description:
          'You failed to upload images of the deacesd or set a banner Image',
      });

      return;
    }

    const bannerImage = imageData.images[imageData.bannerIndex].file as File;

    // Filter out the undefined values
    const imagesWithoutBannerImage = imageData.images
      .map((image, index) =>
        index !== imageData.bannerIndex ? image.file : null
      )
      .filter((file): file is File => file !== null);

    // Debug: Log filtered images
    console.log('Images without banner:', imagesWithoutBannerImage);

    // Upload images
    let imageToUpload = [];
    if (imageData.images?.length > 1) {
      imageToUpload = (await handleImageUpload(imagesWithoutBannerImage)) || [];
    }
    const uploadedBannerImage = (await handleImageUpload([bannerImage])) || [];

    // Add image URLs to the data
    if ([...imageToUpload, ...uploadedBannerImage].length < 1) {
      toast({
        title: 'Image upload failed',
        description:
          'An error occurred while uploading the images. Please try again.',
        variant: 'destructive',
      });
      setSubmitting(false);
      return;
    }

    const objectToSubmit = {
      ...data,
      imagesOfDeceased: [...imageToUpload, ...uploadedBannerImage],
      bannerImage: uploadedBannerImage[0],
    };

    createFuneral(objectToSubmit)
      .unwrap()
      .then(res => {
        console.log(res);
        toast({
          title: 'Funeral Created',
        });
        router.push(`/app/funerals/${res?.id}`);
      })
      .catch(err => {
        console.log(err);
        toast({
          title: 'Failed to create funeral',
          variant: 'destructive',
        });
      });
  };

  const onImageChange = (data: any) => {
    setImageData(data);
  };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 h-full max-w-[1500px]'>
      <Form {...form}>
        <div className='space-y-5 max-w-xl'>
          <h2 className='text-primary font-bold text-2xl'>Set Up Funeral</h2>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-5'
            id='funeral-form'
          >
            <InputField
              form={form}
              placeholder='Name of Deceased'
              name='nameOfDeceased'
              className='placeholder:text-gray-500'
            />
            <InputField
              form={form}
              placeholder='Family Name'
              name='familyName'
              className='placeholder:text-gray-500'
            />
            <InputField
              form={form}
              placeholder='Designated Phone Number for Funeral'
              name='phoneNumber'
              className='placeholder:text-gray-500'
            />
            <InputField
              form={form}
              placeholder='Funeral location'
              name='funeralLocation'
              className='placeholder:text-gray-500'
            />
            <InputField
              form={form}
              placeholder='Year of Birth'
              name='yearOfBirth'
              className='placeholder:text-gray-500'
            />
            <InputField
              form={form}
              placeholder='Year of Passing'
              name='yearOfDeath'
              className='placeholder:text-gray-500'
            />
            <DatePickerField
              form={form}
              placeholder='Start date of funeral'
              name='startDate'
            />
            <DatePickerField
              form={form}
              placeholder='End date of funeral'
              name='endDate'
            />
          </form>
          <div className='flex justify-end'>
            <Dialog>
              <DialogTrigger className='flex gap-2 text-sm items-center bg-secondary rounded-md p-2 lg:hidden'>
                <Upload size={18} />
                <span>Upload Images</span>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className='mb-5'>Upload Images</DialogTitle>

                  <FileUpload onUpdate={onImageChange} />
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <Button
            className='bg-primary h-16 w-48'
            form='funeral-form'
            disabled={submitting}
          >
            {submitting && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Set Up Funeral
          </Button>
        </div>
      </Form>
      <div className='hidden lg:block'>
        <div className='max-w-xl ml-auto'>
          <FileUpload onUpdate={onImageChange} />
        </div>
      </div>
    </div>
  );
};

export default CreateFuneral;
