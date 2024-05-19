import {PropsWithChildren} from "react";

type AuthLayoutProps = PropsWithChildren

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default AuthLayout
