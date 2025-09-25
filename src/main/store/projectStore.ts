import Store from "electron-store";
import type { Project } from "../handlers/projects/types";

type ProjectStoreSchema = {
  projects: Project[];
};

function normalizePackageName(pkg: string | null | undefined): string | null {
  if (!pkg) return null;
  return pkg.trim().toLowerCase();
}

class ProjectStore {
  private store: Store<ProjectStoreSchema>;

  constructor() {
    this.store = new Store<ProjectStoreSchema>({
      name: "projects",
      clearInvalidConfig: true,
      defaults: {
        projects: [],
      },
    });
    this.migrate();
  }

  getAll(): Project[] {
    const projects = this.store.get("projects");
    return Array.isArray(projects) ? [...projects] : [];
  }

  private setAll(projects: Project[]): void {
    this.store.set("projects", projects);
  }

  private migrate(): void {
    const existing = this.store.get("projects");
    if (!Array.isArray(existing) || existing.length === 0) {
      return;
    }
    const deduped = this.dedupe(existing);
    if (deduped.length !== existing.length) {
      this.setAll(deduped);
    }
  }

  private dedupe(projects: Project[]): Project[] {
    const result: Project[] = [];
    const packageToIndex = new Map<string, number>();
    const idToIndex = new Map<string, number>();

    projects.forEach((project) => {
      const normalizedPackage = normalizePackageName(project.packageName);
      const idIndex = idToIndex.get(project.id);
      if (typeof idIndex === "number") {
        result[idIndex] = project;
        if (normalizedPackage) {
          packageToIndex.set(normalizedPackage, idIndex);
        }
        return;
      }

      if (normalizedPackage) {
        const pkgIndex = packageToIndex.get(normalizedPackage);
        if (typeof pkgIndex === "number") {
          const mergedProject: Project = {
            ...project,
            id: result[pkgIndex].id,
          };
          result[pkgIndex] = mergedProject;
          idToIndex.set(mergedProject.id, pkgIndex);
          packageToIndex.set(normalizedPackage, pkgIndex);
          return;
        }
      }

      const nextIndex = result.push(project) - 1;
      idToIndex.set(project.id, nextIndex);
      if (normalizedPackage) {
        packageToIndex.set(normalizedPackage, nextIndex);
      }
    });

    return result;
  }

  upsert(project: Project): {
    project: Project;
    wasInserted: boolean;
    replacedByPackage: boolean;
  } {
    const projects = this.getAll();
    const next = [...projects];

    const idIndex = next.findIndex((item) => item.id === project.id);
    const normalizedNewPackage = normalizePackageName(project.packageName);
    const packageIndex =
      normalizedNewPackage !== null
        ? next.findIndex(
            (item) => normalizePackageName(item.packageName) === normalizedNewPackage
          )
        : -1;

    if (packageIndex !== -1 && packageIndex !== idIndex) {
      const mergedProject: Project = {
        ...project,
        id: next[packageIndex].id,
      };
      next[packageIndex] = mergedProject;
      if (idIndex !== -1) {
        next.splice(idIndex, 1);
      }
      this.setAll(next);
      return {
        project: mergedProject,
        wasInserted: false,
        replacedByPackage: true,
      };
    }

    if (idIndex !== -1) {
      next[idIndex] = project;
      this.setAll(next);
      return {
        project,
        wasInserted: false,
        replacedByPackage: false,
      };
    }

    next.push(project);
    this.setAll(next);
    return {
      project,
      wasInserted: true,
      replacedByPackage: false,
    };
  }

  delete(projectId: string): boolean {
    const projects = this.getAll();
    const next = projects.filter((project) => project.id !== projectId);
    if (next.length === projects.length) {
      return false;
    }
    this.setAll(next);
    return true;
  }
}

const projectStore = new ProjectStore();

export default projectStore;
