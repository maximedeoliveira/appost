import {PropsWithChildren} from "react";

type AppLayoutProps = PropsWithChildren

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div>{children}</div>
  )
}

export default AppLayout
