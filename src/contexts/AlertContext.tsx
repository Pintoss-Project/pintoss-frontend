"use client";

import Alert from "@/shared/components/alert/Alert";

import {
  ComponentProps,
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import { createPortal } from "react-dom";

type AlertProps = ComponentProps<typeof Alert>;
type AlertOptions = Omit<AlertProps, "open">;

export interface AlertContextValue {
  open: (options: AlertOptions) => void;
  close: () => void;
}

interface AlertContextProviderProps {
  children: ReactNode;
}

const AlertContext = createContext<AlertContextValue | undefined>(undefined);

const defaultValues: AlertProps = {
  width: "0px",
  height: "0px",
  open: false,
  title: null,
  main: "",
  leftButtonLabel: "",
  rightButtonLabel: "",
  onLeftButtonClick: () => {},
  onRightButtonClick: () => {},
  onBackDropClick: () => {},
};

export const AlertContextProvider = ({ children }: AlertContextProviderProps) => {
  const [alertState, setAlertState] = useState(defaultValues);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  const close = useCallback(() => {
    setAlertState(defaultValues);
  }, []);

  const open = useCallback(
    ({ onLeftButtonClick, onRightButtonClick, onBackDropClick, ...options }: AlertOptions) => {
      setAlertState({
        ...options,
        onLeftButtonClick: () => {
          onLeftButtonClick && onLeftButtonClick();
        },
        onRightButtonClick: () => {
          onRightButtonClick && onRightButtonClick();
        },
        onBackDropClick: () => {
          onBackDropClick && onBackDropClick();
        },
        open: true,
      });
    },
    [],
  );

  useEffect(() => {
    let el = document.getElementById("root-portal");

    if (!el) {
      el = document.createElement("div");
      el.id = "root-portal";
      document.body.appendChild(el);
    }

    setPortalRoot(el);

    return () => {
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    };
  }, []);

  const values = useMemo(() => ({ open, close }), [open, close]);

  return (
    <AlertContext.Provider value={values}>
      {children}
      {portalRoot ? createPortal(<Alert {...alertState} />, portalRoot) : null}
    </AlertContext.Provider>
  );
};

export default AlertContext;
