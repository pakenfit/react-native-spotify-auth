import React, { createContext, ReactNode, useContext, useState } from 'react';
import { LoaderScreen, LoaderScreenProps } from 'react-native-ui-lib';

type LoaderContext = {
  show: (props?: LoaderScreenProps) => void;
  hide: () => void;
  isLoading: boolean;
};
const context = createContext<LoaderContext>({
  show: () => {},
  hide: () => {},
  isLoading: false,
});

type Props = { children: ReactNode };

export const LoadingProvider = ({ children }: Props) => {
  const [options, setOptions] = useState<
    LoaderScreenProps & { visible: boolean }
  >({ visible: false });
  const show = (props?: LoaderScreenProps) =>
    setOptions({
      visible: true,
      overlay: props?.overlay ?? true,
      ...props,
    });

  const hide = () => setOptions({ ...options, visible: false });
  return (
    <context.Provider value={{ show, hide, isLoading: options.visible }}>
      {children}
      {options?.visible && <LoaderScreen {...options} />}
    </context.Provider>
  );
};

export default LoadingProvider;

export const useLoading = () => useContext(context);
