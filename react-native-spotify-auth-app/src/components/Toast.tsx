import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Incubator, ToastPresets, ToastProps } from 'react-native-ui-lib';

type Options = Omit<
  ToastProps,
  'visible' | 'position' | 'autoDismiss' | 'onDismiss' | 'swipeable' | 'preset'
> & {
  position?: 'top' | 'bottom';
  autoDismiss?: number;
  onDismiss?: () => void;
  swipeable?: boolean;
  type?: 'success' | 'failure' | 'general' | 'offline';
};

type ToastContext = {
  show: (props: Options) => void;
  hide: () => void;
};
const context = createContext<ToastContext>({
  show: () => {},
  hide: () => {},
});

type Props = { children: ReactNode };

export const ToastProvider = ({ children }: Props) => {
  const [options, setOptions] = useState<ToastProps>({});
  const show = ({
    position = 'top',
    autoDismiss = 3000,
    swipeable = true,
    type = 'general',
    onDismiss = () => hide({ ...options, position }),
    ...rest
  }: Options) =>
    setOptions({
      ...rest,
      visible: true,
      position,
      onDismiss,
      autoDismiss,
      swipeable,
      preset: type as ToastPresets,
    });

  const hide = (props?: ToastProps) =>
    setOptions({ ...(props ?? options), visible: false });
  return (
    <context.Provider value={{ show, hide }}>
      {children}
      <Incubator.Toast visible={options?.visible} {...options} />
    </context.Provider>
  );
};

export default ToastProvider;

export const useToast = () => useContext(context);
