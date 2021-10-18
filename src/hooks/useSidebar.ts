import {
  SidebarContext,
  SidebarContextProps,
} from "contexts/SidebarProvider";
import { useContext } from "react";

export const useSidebar: (
  defaultOpen?: boolean
) => SidebarContextProps = () => {
  const { isOpen, trigger } = useContext(SidebarContext);

  return { isOpen, trigger };
};
