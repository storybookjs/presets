// Extend types of NodeJS to add `pnp` attribute to `process.versions`
// When operating under PnP environments, this value will be set to a number
// indicating the version of the PnP standard, see: https://yarnpkg.com/advanced/pnpapi#processversionspnp
declare namespace NodeJS {
  interface Process {
    versions: ProcessVersions & { pnp?: number };
  }
}
