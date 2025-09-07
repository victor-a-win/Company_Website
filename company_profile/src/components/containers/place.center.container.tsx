import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  hidden?: boolean;
};
const PlaceCenterContainer = ({ children, hidden }: Props) => {
  return (
    <main className={`container mx-auto grow ${hidden ? "hidden" : ""}`}>
      <div className="grid min-h-screen place-items-center">{children}</div>
    </main>
  );
};
export default PlaceCenterContainer;
