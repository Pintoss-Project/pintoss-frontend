"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useRedirect = () => {
  const router = useRouter();
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  useEffect(() => {
    if (redirectPath) {
      router.push(redirectPath);
    }
  }, [redirectPath, router]);

  return { setRedirectPath };
};

export default useRedirect;
