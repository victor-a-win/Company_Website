import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  hidden?: boolean;
};
const GenericContainer = ({ children, hidden = false }: Props) => {
  return (
    <main className={`container mx-auto grow ${hidden ? "hidden" : ""}`}>
      {children}
    </main>
  );
};
export default GenericContainer;
