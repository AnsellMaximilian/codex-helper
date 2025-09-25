export type {
  BasePackageResult,
  ProjectSelectionResult,
} from "../main/handlers/projects/types";

import type {
  BasePackageResult,
  ProjectSelectionResult,
} from "../main/handlers/projects/types";

export type AppAPI = {
  versions: {
    node: string;
    chrome: string;
    electron: string;
  };
  projects: {
    addWorkspace: () => Promise<ProjectSelectionResult>;
  };
};
