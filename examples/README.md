# Examples

This folder holds example projects, designed to test presets in isolation and in-combination.

## Current examples

| Name             | Command                                     | addon-docs | ant-design | create-react-app | scss | storysource | typescript |
| ---------------- | ------------------------------------------- | ---------- | ---------- | ---------------- | ---- | ----------- | ---------- |
| example-cra      | `yarn workspace example-cra storybook`      | ✔          |            | ✔                |      |             |            |
| example-cra-ts   | `yarn workspace example-cra-ts storybook`   | ✔          |            | ✔                |      |             |            |
| example-ts-react | `yarn workspace example-ts-react storybook` | ✔          |            |                  |      |             | ✔          |
| example-ts-vue   | `yarn workspace example-ts-vue storybook`   | ✔          |            |                  |      |             | ✔          |

## Notes

- Create React App does not require any other presets to work, and may conflict with presets such as SCSS and TypeScript.
