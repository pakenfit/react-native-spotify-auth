import React, { ComponentProps, ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../theme';
import { BackArrow } from './BackArrow';
import { Header } from './Header';

type Props = {
  children?: ReactNode;
  headerProps?: ComponentProps<typeof Header>;
  hasBackArrow?: boolean;
  onBackArrowPress?: () => void;
};
export function Layout({
  children,
  headerProps,
  hasBackArrow,
  onBackArrowPress,
}: Props): JSX.Element {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Header
        {...headerProps}
        left={
          hasBackArrow && onBackArrowPress ? (
            <BackArrow onPress={onBackArrowPress} />
          ) : (
            headerProps?.left
          )
        }
      />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BLACK,
    flex: 1,
  },
});
