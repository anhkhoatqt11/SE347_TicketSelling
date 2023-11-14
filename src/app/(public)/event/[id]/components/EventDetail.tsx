'use client';

import React, { useEffect } from 'react'
import { useEvent } from '@/hooks/useEvent'
import { useQuery } from '@tanstack/react-query';
import { Image } from '@nextui-org/react';
import { ClockIcon, PhoneIcon } from 'lucide-react';
import { IoLocationOutline } from 'react-icons/io5'
import { Button } from '@/components/ui/button';
import Loader from '@/components/Loader';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { parseJSON } from 'date-fns';
import { ChevronDownIcon } from '@radix-ui/react-icons';



const CURRENCY_FORMAT = new Intl.NumberFormat(undefined, {
  currency: 'VND',
  style: 'currency',
});

export function formatCurrency(value: number) {
  return CURRENCY_FORMAT.format(value);
}

export function EventDetail({ id }) {
  const { fetchEventById } = useEvent();
  const [isLoading, setIsLoading] = React.useState(false);


  const { data: EventDetail } = useQuery({
    queryKey: ['EventDetail', id],
    queryFn: async () => {
      const res = await fetchEventById(id);
      setIsLoading(true);
      return res?.[0];
    }
  })

  useEffect(() => {
    console.log(EventDetail);
  })


  return (
    <div className='w-full h-full bg-slate-50'>
      {!isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div>
          <div className='w-full md:h-2/5'>
            <Image
              src={EventDetail?.hinhAnhSuKien}
              width={1920}
              height={512}
              alt='hinhAnhSuKien'
              className='w-full h-full rounded-none'
            ></Image>
            <div className='bg-white md:px-[180px] px-4 pb-10 pt-10 flex flex-col md:flex-row border-[1px] shadow'>
              <div className='md:w-1/2'>
                <h1 className='text-xl font-bold'>{EventDetail?.name}</h1>
                <div className='pt-3 flex flex-row'>
                  <ClockIcon size={18} className='mt-1' />
                  <p className='ml-2'>{EventDetail?.ngayBatDau}-{EventDetail?.ngayKetThuc}</p>
                </div>
                <div className='pt-3 flex flex-row'>
                  <IoLocationOutline size={18} className='mt-1' />
                  <p className='ml-2'>{EventDetail?.diaChi}</p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-center md:justify-end mt-10'> {/* Center button on mobile and push it to the right on larger screens */}
                <Button className='w-full md:w-[340px]'>Đặt vé ngay</Button>
              </div>
            </div>
          </div>
          <div className='container mx-auto md:px-[180px] px-4 flex flex-row mt-4'>
            {/* Content for the container */}
            <div className='w-full h-full md:w-2/3'>
              <div className="mt-8 mb-8 w-full rounded-md bg-white border-[1px] shadow p-8">
                <div className="flex flex-row justify-between flex-wrap">
                  <div className="text-gray-600 font-semibold">Về sự kiện</div>
                </div>
                <div className="mt-4 text-gray-600 text-[14px]">
                  {EventDetail?.moTa}
                </div>
              </div>

              <div className="mt-8 mb-8 w-full rounded-md bg-white border-[1px] shadow p-8">
                <div className="flex flex-row justify-between flex-wrap">
                  <div className="text-gray-600 font-semibold">Thông tin vé</div>
                </div>
                <div className="mt-4 text-gray-600 text-[14px]">
                  <Accordion type="single" collapsible className="w-full">
                    {EventDetail?.ves.map((item) => (
                      <AccordionItem value={item.id} key={`item-${item.id}`}>
                        <AccordionTrigger className='cursor-pointer flex justify-between'>
                          <p className='flex flex-row'>{item.name}
                            <ChevronDownIcon className="h-4 w-4 ml-1 shrink-0 text-muted-foreground transition-transform duration-200" />
                          </p>
                          <p className='font-bold'>{formatCurrency(item.gia)}</p>
                        </AccordionTrigger>
                        <AccordionContent>
                          <p>{item.moTa}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>



              <div className="mt-8 mb-8 w-full rounded-md bg-white border-[1px] shadow p-8">
                <div className="flex flex-row justify-between flex-wrap">
                  <div className="text-gray-600 font-semibold">Nhà tổ chức</div>
                </div>
                <div className="mt-4 text-gray-600 text-[14px] flex flex-row">
                  <div>
                    <Image src={EventDetail?.user?.avatar} width={100} height={100}></Image>
                  </div>
                  <div className='ml-4'>
                    <p className='text-lg font-bold'>{EventDetail?.user?.name}</p>
                    <div className='pt-3 flex flex-row'>
                      <PhoneIcon size={18} />
                      <p className='ml-2'>{EventDetail?.user?.phoneNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Side bar for the container */}
            <div className='w-1/3 ml-10 h-[250px] sticky top-0 hidden md:block'>
              <div className="mt-8 mb-8 w-full rounded-md bg-white border-[1px] shadow p-8">
                <div className="flex flex-row justify-between flex-wrap">
                  <div className="font-semibold">{EventDetail?.name}</div>
                  <div className='pt-3 flex flex-row'>
                    <ClockIcon size={18} className='mt-1' />
                    <p className='ml-2'>{EventDetail?.ngayBatDau}-{EventDetail?.ngayKetThuc}</p>
                  </div>
                  <div className='pt-3 flex flex-row'>
                    <IoLocationOutline size={18} className='mt-1' />
                    <p className='ml-2'>{EventDetail?.diaChi}</p>
                  </div>
                  <div className='md:w-1/2 flex justify-center md:justify-end mt-10'> {/* Center button on mobile and push it to the right on larger screens */}
                    <Button className='w-full'>Đặt vé ngay</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

  )
}