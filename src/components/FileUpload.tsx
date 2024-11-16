'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

export default function FileUpload({ onUpdate }: { onUpdate?: any }) {
  const [images, setImages] = useState<ImageListType>([]);
  const [bannerIndex, setBannerIndex] = useState<number | null>(null);
  const [showUpload, setShowUpload] = useState(true);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const toast = useToast();
  const maxNumber = 4;

  const onChange = (imageList: ImageListType) => {
    // data for submit
    setImages(imageList);
  };

  useEffect(() => {
    if (onUpdate) {
      onUpdate({ images, bannerIndex });
    }
  }, [images, bannerIndex]);
  return (
    <div className='h-full'>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey='data_url'
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className='h-full flex flex-col py-2 2xl:py-0'>
            {showUpload && (
              <div
                style={isDragging ? { color: 'red' } : undefined}
                onClick={onImageUpload}
                {...dragProps}
                className='border-dashed border-2 border-blue-800 flex justify-center items-center py-5 lg:h-96 rounded-lg min-h-80  cursor-pointer'
              >
                <div>
                  <p className='text-sm font-medium'>
                    Click or Drop Images of Deceased here
                  </p>
                  <p className='text-gray-500 text-xs text-center'>
                    PNG, JPEG (Max 4 images)
                  </p>
                </div>
              </div>
            )}
            {!showUpload && selectedImage !== null && (
              <div className='h-96 w-full relative rounded-md shadow-lg'>
                <Image
                  src={imageList[selectedImage]['data_url']}
                  alt='selected image'
                  fill
                  className='mx-auto'
                />
                <div className='absolute  -right-1 -top-3'>
                  <Button
                    variant='secondary'
                    className='text-xs p-2'
                    onClick={() => {
                      setBannerIndex(selectedImage);
                      toast.toast({
                        title: 'Banner Set',
                        description: 'Banner has been set',
                        variant: 'default',
                      });
                    }}
                  >
                    Set as Banner
                  </Button>
                </div>
              </div>
            )}
            <div className=' mt-2 overflow-y-auto  flex gap-3 p-2 justify-center items-center'>
              <div
                className='h-16 w-16 flex items-center justify-center border-2 border-dashed rounded-md border-blue-800 text-blue-600 cursor-pointer'
                onClick={() => {
                  setShowUpload(true);
                }}
              >
                +
              </div>
              {imageList.map((image, index) => (
                <div
                  key={index}
                  className='image-item relative h-16 w-16 hover:scale-105'
                  onClick={() => {
                    setShowUpload(false);
                    setSelectedImage(index);
                  }}
                >
                  <Image
                    src={image['data_url']}
                    alt='image of deceased'
                    fill
                    className='rounded-lg cursor-pointer hover:scale-105'
                  />
                  <div className='absolute -right-1 -top-1'>
                    <div className='p-1 bg-destructive/85 rounded-md text-white cursor-pointer'>
                      <Trash2
                        className='text-white'
                        size={15}
                        onClick={e => {
                          e.stopPropagation();
                          if (index == selectedImage) {
                            setSelectedImage(null);
                            setShowUpload(true);
                          }
                          onImageRemove(index);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
