import { createContext, PropsWithChildren, useContext, useState } from 'react';

interface MetamaskContext {
  address: string | null;
  setAddress: (e: string) => void;
  clearAddress: () => void;
}

const initialValue: MetamaskContext = {
  address: null,
  setAddress: () => null,
  clearAddress: () => null,
};

const MetamaskContext = createContext<MetamaskContext>(initialValue);

interface Props {}

export const MetamaskProvider = ({ children }: PropsWithChildren<Props>) => {
  const [address, setAddress] = useState<MetamaskContext['address']>(null);

  const clearAddress = () => setAddress(null);

  return <MetamaskContext.Provider value={{ address, setAddress, clearAddress }}>{children}</MetamaskContext.Provider>;
};

export const useMetamaskContext = () => useContext(MetamaskContext) as MetamaskContext;
