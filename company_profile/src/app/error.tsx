"use client"; // Error boundaries must be Client Components

import PlaceCenterContainer from "@/components/containers/place.center.container";
import axios from "axios";
import { Button } from "flowbite-react";
import { HomeIcon, RotateCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <PlaceCenterContainer>
      <div className="flex flex-col items-center justify-center gap-2">
        <Image src="/500.svg" alt="Not Found" width={200} height={200} />
        <h2 className="mt-4 text-2xl font-bold">Something went wrong!</h2>
        <p className="text-center">
          {axios.isAxiosError(error)
            ? error?.response?.data?.error?.message
            : error.message}
        </p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <Button
            color="red"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            <RotateCcw className="mr-2 size-5" />
            Try again
          </Button>
          <Button as={Link} href={"/"}>
            <HomeIcon className="mr-2 size-5" />
            Home
          </Button>
        </div>
      </div>
    </PlaceCenterContainer>
  );
}
