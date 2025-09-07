import Image from "next/image";
import PlaceCenterContainer from "../containers/place.center.container";

type Props = {
  customMessage?: string;
  hidden?: boolean;
};
const EmptyListScreen = ({
  customMessage = "No posts found",
  hidden = false,
}: Props) => {
  return (
    <PlaceCenterContainer {...{ hidden }}>
      <div className="flex flex-col items-center justify-center gap-2">
        <Image src="/empty.svg" alt={customMessage} width={200} height={200} />
        <p className="text-lg font-semibold">{customMessage}</p>
      </div>
    </PlaceCenterContainer>
  );
};
export default EmptyListScreen;
