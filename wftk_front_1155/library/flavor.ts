import { $chocolate, $plain, $vanilla } from '../styles/palette';

export enum Flavor {
  PLAIN,
  CHOCOLATE,
  VANILLA,
}

export const FLAVOR_COLOR_MAP = {
  [Flavor.VANILLA]: $vanilla,
  [Flavor.PLAIN]: $plain,
  [Flavor.CHOCOLATE]: $chocolate,
};

export const FLAVOR_LABEL_MAP = {
  [Flavor.VANILLA]: 'vanilla',
  [Flavor.PLAIN]: 'plain',
  [Flavor.CHOCOLATE]: 'chocolate',
};
