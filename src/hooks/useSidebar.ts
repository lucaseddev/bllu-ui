import {
  SidebarContext,
  SidebarContextProps,
} from "contexts/SidebarProvider";
import { useContext, useEffect } from "react";

export const useSidebar: (
  defaultOpen?: boolean
) => SidebarContextProps = () => {
  const { isOpen, trigger } = useContext(SidebarContext);

  return { isOpen, trigger };
};
