export type {
  BasePackageResult,
  Project,
  TemplateCheckMap,
  TemplateSyncMode,
  TemplateSyncProgress,
  TemplateSyncRequest,
  TemplateSyncResult,
} from "../main/handlers/projects/types";

import type {
  Project,
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
    onTemplateSyncProgress: (
      callback: (event: TemplateSyncProgress) => void
    ) => () => void;
  };
  templates: {
    loadAgents: () => Promise<string>;
    saveAgents: (content: string) => Promise<void>;
  };
};
