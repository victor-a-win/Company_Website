import { HelperText } from "flowbite-react";

type Props = {
  touched: boolean | undefined;
  error: string | undefined;
  color?: string;
};
function ValidationText({ touched, error, color = "failure" }: Props) {
  return (
    <>
      {touched && error ? <HelperText color={color}>{error}</HelperText> : null}
    </>
  );
}
export default ValidationText;
