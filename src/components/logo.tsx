import Image from "next/image";
import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link className="mr-2" href={"/"}>
      <div className="items-center w-full flex flex-row gap-2">
        <Image alt="TicketBox" src="/logo.svg" width={40} height={40} />
      </div>
    </Link>
  );
}

export default Logo;
