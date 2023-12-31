"use client";

import { Card } from "@/components/ui/card";
import React from "react";
import { Image } from "@nextui-org/react";
import { convertDateTimeToDate, parseJSON } from "@/lib/utils";
import { SiEventstore } from "react-icons/si";
import { BsCheck2Circle } from "react-icons/bs";
import { TbCalendarCancel } from "react-icons/tb";
import {
  AiOutlineLock,
  AiOutlineClockCircle,
  AiFillEdit,
} from "react-icons/ai";
import { IoLocationOutline, IoPeople } from "react-icons/io5";
import { BiSolidDiscount } from "react-icons/bi";
import { FaChartBar, FaQrcode } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import LiveMusic from "@/components/livemusic";
import NightLifeIcon from "@/components/nightlife";
import StageIcon from "@/components/stage";
import ConferenceIcon from "@/components/conference";
import CourseIcon from "@/components/course";
import TourismIcon from "@/components/tourism";
import SportIcon from "@/components/sport";
import OutsideIcon from "@/components/outside";
import Link from "next/link";

const getIconById = (id) => {
  switch (id) {
    case 1:
      return <OutsideIcon className={"mt-1 w-4 h-4"} />;
    case 2:
      return <LiveMusic className={"mt-1 w-4 h-4"} />;
    case 3:
      return <StageIcon className={"mt-1 w-4 h-4"} />;
    case 4:
      return <NightLifeIcon className={"mt-1 w-4 h-4"} />;
    case 5:
      return <ConferenceIcon className={"mt-1 w-4 h-4"} />;
    case 6:
      return <CourseIcon className={"mt-1 w-4 h-4"} />;
    case 7:
      return <TourismIcon className={"mt-1 w-4 h-4"} />;
    case 8:
      return <SportIcon className={"mt-1 w-4 h-4"} />;
    default:
      return null;
  }
};

export function EventListItemComponent({ item }) {
  const currentDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
    0,
    0,
    0,
    0
  );
  return (
    <Card className="mt-4 cursor-pointer" key={`event_${"item.id"}`}>
      <div>
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3 h-[180px] m-3 relative">
            <img
              className="rounded-md h-[180px] w-full object-cover"
              src={item?.hinhAnhSuKien}
            />
            {getDateTimeKetThuc(item?.ngayKetThuc) &&
            item?.trangThai === "Đã duyệt" ? (
              <div className="absolute top-2 left-2 w-[180px]">
                <div className="bg-blue-500 font-medium text-white p-2 rounded flex flex-row gap-2 justify-center">
                  <SiEventstore className="mt-1" />
                  <div>Đang hoạt động</div>
                </div>
              </div>
            ) : !getDateTimeKetThuc(item?.ngayKetThuc) &&
              item?.trangThai === "Đã duyệt" ? (
              <div className="absolute top-2 left-2 w-[180px]">
                <div className="bg-emerald-400 font-medium text-white p-2 rounded flex flex-row gap-2 justify-center">
                  <BsCheck2Circle className="mt-1" />
                  <div>Hoàn thành</div>
                </div>
              </div>
            ) : item?.trangThai === "Đã hủy" ? (
              <div className="absolute top-2 left-2 w-[180px]">
                <div className="bg-red-400 font-medium text-white p-2 rounded flex flex-row gap-2 justify-center">
                  <TbCalendarCancel className="mt-1" />
                  <div>Đã hủy</div>
                </div>
              </div>
            ) : item?.trangThai === "Đã khóa" ? (
              <div className="absolute top-2 left-2 w-[180px]">
                <div className="bg-gray-400 font-medium text-white p-2 rounded flex flex-row gap-2 justify-center">
                  <AiOutlineLock className="mt-1" />
                  <div>Đã bị khóa</div>
                </div>
              </div>
            ) : null}
          </div>
          <div className="lg:w-2/3 m-3">
            <h1 className="text-base text-blue-700 mt-1 flex flex-row gap-2">
              {getIconById(item?.ChuDe?.id)}
              {item?.ChuDe?.name}
            </h1>
            <div className="flex flex-row">
              <h1 className="text-2xl font-extrabold mt-1">{item?.name}</h1>
            </div>
            <h1 className="text-base text-slate-500 mt-1 flex flex-row gap-2">
              <IoLocationOutline className="mt-1" />
              {item?.diaChi}
            </h1>
            <h1 className="text-base text-slate-500 mt-1 flex flex-row gap-2">
              <AiOutlineClockCircle className="mt-1" />
              {convertDateTimeToDate(item?.ngayBatDau)}
              {" - "}
              {convertDateTimeToDate(item?.ngayKetThuc)}
            </h1>
            <p
              className="mt-2 text-medium h-24 overflow-clip"
              dangerouslySetInnerHTML={{ __html: `${item?.moTa}` }}
            ></p>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-5 gap-2 rounded-md text-blue-700 h-full font-medium w-full place-content-center">
          <Link href={`/organizer/event/details/${item?.id}/guest-list`}>
            <div className="grid place-content-center text-center gap-2 hover:bg-blue-500 h-full hover:text-white py-4 rounded-bl-lg">
              <IoPeople className="w-full" />
              Danh sách khách
            </div>
          </Link>
          <Link href={`/organizer/event/details/${item?.id}/coupon`}>
            <div className="grid place-content-center text-center gap-2 hover:bg-blue-500 h-full hover:text-white py-4">
              <BiSolidDiscount className="w-full" />
              Mã giảm giá
            </div>
          </Link>
          <Link href={`/organizer/event/details/${item?.id}/edit`}>
            <div className="grid place-content-center text-center gap-2 hover:bg-blue-500 h-full hover:text-white py-4">
              <AiFillEdit className="w-full" />
              Chỉnh sửa
            </div>
          </Link>
          <Link href={`/organizer/event/details/${item?.id}/summary`}>
            <div className="grid place-content-center text-center gap-2 hover:bg-blue-500 h-full hover:text-white py-4">
              <FaChartBar className="w-full" />
              Tổng kết
            </div>
          </Link>
          <Link href={`/organizer/event/details/${item?.id}/check-in`}>
            <div className="grid place-content-center text-center gap-2 hover:bg-blue-500 h-full hover:text-white py-4 rounded-br-lg">
              <FaQrcode className="w-full" />
              Checkin
            </div>
          </Link>
        </div>
      </div>
    </Card>
  );
}

const getDateTimeKetThuc = (type) => {
  const time = convertDateTimeToDate(type).split("/");
  const year = new Date().getFullYear() - parseInt(time[2]);
  const month = new Date().getMonth() + 1 - parseInt(time[1]);
  const day = new Date().getDate() - parseInt(time[0]);
  console.log(year, month, day);
  return (
    year < 0 ||
    (year === 0 && month < 0) ||
    (year === 0 && month === 0 && day < 0)
  );
};
export default EventListItemComponent;
