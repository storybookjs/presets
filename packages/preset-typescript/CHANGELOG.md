## 3.0.0

- Use babel to process typescript [#115](https://github.com/storybookjs/presets/pull/115)
- Fix for nullish babel include [#117](https://github.com/storybookjs/presets/pull/117)

## 2.1.0

- Improve compatibility with Vue [#108](https://github.com/storybookjs/presets/pull/108)

## 2.0.0

- Remove builtin support for `react-docgen-typescript-loader`, which is React-specific [#68](https://github.com/storybookjs/presets/pull/68)

Starting in `v5.x`, `react-docgen` supports typescript natively, so we no longer recommend `react-docgen-typescript-loader` and have removed it from the preset. This is a breaking change and the migration is documented in [Storybook](https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#react-prop-tables-with-typescript).

## 1.2.2

- Don't default to empty include option [#106](https://github.com/storybookjs/presets/pull/106)
