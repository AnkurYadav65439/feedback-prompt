'use client'
import React, { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import ReactStars from 'react-rating-stars-component'
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

type FormData = {
  safety: number;
  communication: number;
  recommend: 'up' | 'down' | '';
};

const Home = () => {
  const [open, setOpen] = useState(false);      //to open/close form manually
  const [formData, setFormData] = useState<FormData>({
    safety: 0,
    communication: 0,
    recommend: ''
  });

  const router = useRouter();

  console.log("formData: ", formData);          //log each time formData updated/changed

  const handleRatingChange = (ratingKey: string, newRating: number) => {
    setFormData(prev => ({ ...prev, [ratingKey]: newRating }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("submitted form: ", formData);
    setOpen(false);                            // Close the dialog after submission
    router.push('/submitted');
  }

  const handleRecommendChange = (recommendation: 'up' | 'down') => {
    setFormData(prev => ({ ...prev, recommend: recommendation }));
  }

  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <AlertDialog open={open}>
          <Button variant="outline" onClick={() => setOpen(true)}>Give feedback</Button>

          <AlertDialogContent className='w-96 '>
            <div className=' h-6 w-6 border border-gray-200 rounded-sm font-bold text-2xl cursor-pointer flex items-center justify-center' onClick={() => setOpen(false)}>x</div>

            <AlertDialogHeader>
              <AlertDialogTitle className='font-bold text-3xl'>Leave a review</AlertDialogTitle>
            </AlertDialogHeader>

            <form onSubmit={handleSubmit}>
              <div className='mt-6'>
                <span className='font-bold text-xl'>Safety</span>
                <ReactStars
                  count={5}
                  value={formData.safety}
                  onChange={(newRating: number) => handleRatingChange('safety', newRating)}
                  size={44}
                  activeColor="#ffd700"
                />
              </div>
              <div className='mt-4'>
                <span className='font-bold text-xl'>Communication</span>
                <ReactStars
                  count={5}
                  value={formData.communication}
                  onChange={(newRating: number) => handleRatingChange('communication', newRating)}
                  size={44}
                  activeColor="#ffd700"
                />
              </div>
              <div className='mt-4'>
                <span className='font-bold text-xl'>Would you recommend Trausti?</span>
                <div className='flex gap-24 mt-2'>
                  <FaThumbsDown
                    size={40}
                    className={`${formData.recommend === 'down' ? 'text-red-500' : 'text-gray-500 hover:text-gray-400'} cursor-pointer mt-2`}
                    onClick={() => handleRecommendChange('down')}
                  />
                  <FaThumbsUp
                    size={40}
                    className={`${formData.recommend === 'up' ? 'text-green-500' : 'text-gray-500 hover:text-gray-400'} cursor-pointer`}
                    onClick={() => handleRecommendChange('up')}
                  />
                </div>
              </div>

              <AlertDialogFooter>
                <AlertDialogAction type='submit'>Submit</AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default Home