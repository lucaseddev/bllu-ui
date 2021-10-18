import React, { useCallback, useState } from "react";

export interface SidebarContextProps {
  isOpen: boolean;
  trigger: (value?: boolean) => void;
}

export const SidebarContext: React.Context<SidebarContextProps> = React.createContext<any>(
  null
);

export interface SidebarProviderProps {
  isOpen?: boolean;
  children: any;
}

export const SidebarProvider = (props: SidebarProviderProps) => {
  const [open, setOpen] = useState<boolean>(props.isOpen || false);

  const trigger = useCallback((value: boolean) => {
    setOpen(value);
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        isOpen: open,
        trigger,
      }}
    >
      {props.children}
    </SidebarContext.Provider>
  );
};
