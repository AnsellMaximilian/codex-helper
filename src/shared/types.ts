export type {
  BasePackageResult,
  Project,
  AndroidTemplateStatus,
  AndroidTemplateSummary,
  AndroidTemplateActionResult,
  TemplateCheckMap,
  TemplateSyncMode,
  TemplateSyncProgress,
  TemplateSyncRequest,
  TemplateSyncResult,
} from "../main/handlers/projects/types";

import type {
  Project,
  AndroidTemplateActionResult,
  TemplateCheckMap,
  TemplateSyncProgress,
  TemplateSyncRequest,
  TemplateSyncResult,
} from "../main/handlers/projects/types";

export type AppAPI = {
  versions: {
    node: string;
    chrome: string;
    electron: string;
  };
  projects: {
    addWorkspace: () => Promise<Project | null>;
    getAll: () => Promise<Project[]>;
    remove: (projectId: string) => Promise<boolean>;
    checkTemplates: (projectDir: string) => Promise<TemplateCheckMap>;
    syncTemplates: (
      request: TemplateSyncRequest
    ) => Promise<TemplateSyncResult>;
    checkAndroidTemplates: (
      projectId: string
    ) => Promise<AndroidTemplateActionResult>;
    generateAndroidTemplates: (
      projectId: string
    ) => Promise<AndroidTemplateActionResult>;
    onTemplateSyncProgress: (
      callback: (event: TemplateSyncProgress) => void
    ) => () => void;
  };
  templates: {
    loadAgents: () => Promise<string>;
    saveAgents: (content: string) => Promise<void>;
  };
};
