"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <div className="w-[90%] mx-auto my-5 relative ">
      <Image
        src="/not found.png"
        width={1000}
        height={500}
        alt="not found page"
        className="w-full rounded-3xl"
      />
      <button
        className="absolute bottom-40 left-1/2 bg-red-500 "
        onClick={() => router.push(`/`)}
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFoundPage;
