export type {
  BasePackageResult,
  Project,
  TemplateCheckMap,
} from "../main/handlers/projects/types";

import type {
  Project,
  TemplateCheckMap,
} from "../main/handlers/projects/types";

export type AppAPI = {
  versions: {
    node: string;
    chrome: string;
    electron: string;
  };
  projects: {
    addWorkspace: () => Promise<Project | null>;
    checkTemplates: (projectDir: string) => Promise<TemplateCheckMap>;
  };
};
