import PlaceCenterContainer from "@/components/containers/place.center.container";
import { Button } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <PlaceCenterContainer>
      <div className="flex flex-col items-center justify-center gap-2">
        <Image src="/404.svg" alt="Not Found" width={200} height={200} />
        <p className="text-lg font-semibold">Page Not Found</p>
        <Button color="red" as={Link} href={"/"}>
          Go to Home
        </Button>
      </div>
    </PlaceCenterContainer>
  );
};
export default NotFoundPage;
