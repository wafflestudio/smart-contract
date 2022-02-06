import { Flavor } from '../components/organization/token-list/token-list.queries';
import { $chocolate, $plain, $vanilla } from '../styles/palette';

export const FLAVOR_COLOR_MAP = {
  [Flavor.VANILLA]: $vanilla,
  [Flavor.PLAIN]: $plain,
  [Flavor.CHOCOLATE]: $chocolate,
};
