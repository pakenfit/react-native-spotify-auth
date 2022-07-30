import { Routes } from './../navigations/routes';

export type RootNavigationTypes = {
  [Routes.WELCOME]: undefined;
  [Routes.HOMETABNAV]: undefined;
};

export type HomeNavigationTypes = {
  [Routes.HOME]: { data: string };
  [Routes.LIBRARY]: undefined;
  [Routes.SEARCH]: undefined;
};
