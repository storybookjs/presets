declare namespace NodeJS {
  interface Process {
    versions: ProcessVersions & { pnp?: number };
  }
}
