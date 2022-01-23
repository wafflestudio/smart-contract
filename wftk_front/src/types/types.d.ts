type WAFFLE_FLAVOR = typeof WAFFLE_FLAVORS[keyof typeof WAFFLE_FLAVORS]; // 'Plain', 'Chocolate', 'Vanilla'
type WAFFLE_COLOR = typeof WAFFLE_COLORS[keyof typeof WAFFLE_COLORS];

interface Waffle {
  0: string;
  1: string;
  flavor: string;
  name: string;
}
