import AlertContext, { AlertContextValue } from "@/contexts/AlertContext";

import { useContext } from "react";

const useAlertContext = () => {
  const values = useContext(AlertContext) as AlertContextValue;

  if (values === null) throw new Error("AlertContext 내부에서 사용해주세요.");

  return values;
};

export default useAlertContext;
