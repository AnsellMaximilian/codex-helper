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

export type Project = {
  id: string;
  name: string;
  rootDir: string;
  moduleDir: string | null;
  packageName: string | null;
  packageSource: PackageSource;
  warnings: string[];
  filesChecked: string[];
};

export type TemplateCheckMap = Record<string, boolean>;
