"use client";

import { RecoilRoot } from "recoil";

import { ReactNode } from "react";

interface RecoilRootProviderProps {
  children: ReactNode;
}

const RecoilRootProvider = ({ children }: RecoilRootProviderProps) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilRootProvider;
