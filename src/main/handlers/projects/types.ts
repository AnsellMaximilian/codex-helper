export type PackageSource =
  | "applicationId"
  | "namespace"
  | "manifest"
  | "none";

export type BasePackageResult = {
  dirScanned: string;
  moduleDir: string | null;
  packageName: string | null;
  source: PackageSource;
  filesChecked: string[];
  warnings: string[];
};

export type ProjectSelectionResult = BasePackageResult | null;
