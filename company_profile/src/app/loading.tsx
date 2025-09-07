import PlaceCenterContainer from "@/components/containers/place.center.container";
import { Spinner } from "flowbite-react";

const GlobalLoadingPage = () => {
  return (
    <PlaceCenterContainer>
      <div className="flex flex-col items-center justify-center gap-4">
        <Spinner color="pink" aria-label="Global Loading Page" />
        <h2>Loading...</h2>
      </div>
    </PlaceCenterContainer>
  );
};
export default GlobalLoadingPage;
