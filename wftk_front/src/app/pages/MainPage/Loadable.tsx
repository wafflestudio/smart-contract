/**
 * Asynchronously loads the component for MainPage
 */
import React from 'react';
import { lazyLoad } from 'utils/loadable';

export const MainPage = lazyLoad(
  () => import('./index'),
  module => module.MainPage,
  {
    fallback: <h1>Loading...</h1>,
  },
);
