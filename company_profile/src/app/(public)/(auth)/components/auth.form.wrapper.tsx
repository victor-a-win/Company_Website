import cardTheme from "@/theme/card.theme";
import { Card } from "flowbite-react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const AuthFormWrapper = ({ children }: Props) => {
  return (
    <Card theme={cardTheme.card} className="min-w-xs sm:max-w-sm md:min-w-md">
      {children}
    </Card>
  );
};
export default AuthFormWrapper;
