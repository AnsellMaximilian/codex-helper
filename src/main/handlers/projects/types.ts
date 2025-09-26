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

export type AndroidTemplateStatus = "notStarted" | "incomplete" | "ready";

export type Project = {
  id: string;
  name: string;
  rootDir: string;
  moduleDir: string | null;
  packageName: string | null;
  packageSource: PackageSource;
  androidTemplateStatus: AndroidTemplateStatus;
  warnings: string[];
  filesChecked: string[];
};

export type AndroidTemplateSummary = {
  status: AndroidTemplateStatus;
  total: number;
  present: number;
  missing: number;
};

export type AndroidTemplateActionResult = {
  summary: AndroidTemplateSummary;
  written: number;
  project: Project;
};

export type TemplateCheckMap = Record<string, boolean>;

export type TemplateSyncMode = "missing" | "all" | "single";

export type TemplateSyncRequest = {
  projectDir: string;
  mode: TemplateSyncMode;
  files?: string[];
};

export type TemplateSyncProgressState =
  | "start"
  | "success"
  | "skipped"
  | "error"
  | "complete";

export type TemplateSyncProgress = {
  projectDir: string;
  runId: string;
  mode: TemplateSyncMode;
  relativePath: string | null;
  state: TemplateSyncProgressState;
  error?: string;
  copiedCount?: number;
  totalCount?: number;
};

export type TemplateSyncResult = {
  runId: string;
  status: TemplateCheckMap;
};
