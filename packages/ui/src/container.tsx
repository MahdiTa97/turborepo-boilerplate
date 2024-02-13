import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export function Container({ children }: ContainerProps): ReactNode {
  return <div className="container mx-auto">{children}</div>;
}
