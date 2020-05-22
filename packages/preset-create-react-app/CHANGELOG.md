## 3.0.0

Reverse course on typescript docgen handling [#142](https://github.com/storybookjs/presets/pull/142)

- Add back `react-docgen-typescript-loader` to the preset
- Add compatibility with SB6's main.js `typescript` setting

## 2.1.2

- Make `@storybook/node-logger` dependency less strict [#138](https://github.com/storybookjs/presets/pull/138)

## 2.1.1

- Set PUBLIC_URL if not set [#104](https://github.com/storybookjs/presets/pull/104)

## 2.1.0

- Yarn PNP compatibility [#104](https://github.com/storybookjs/presets/pull/104)

## 2.0.0

- Remove `react-docgen-typescript-loader` from the preset [#103](https://github.com/storybookjs/presets/pull/103)

Starting in `v5.x`, `react-docgen` supports typescript natively, so we no longer recommend `react-docgen-typescript-loader` and have removed it from the preset. This is a breaking change and the migration is documented in [Storybook](https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#react-prop-tables-with-typescript).
