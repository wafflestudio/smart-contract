/**
 *
 * Asynchronously loads the component for WafflePage
 *
 */
import React from 'react';
import { lazyLoad } from 'utils/loadable';

export const WafflePage = lazyLoad(
  () => import('./index'),
  module => module.WafflePage,
  {
    fallback: <div>Loading...</div>,
  },
);
