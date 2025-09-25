import { ReactNode, useCallback, useEffect, useState } from "react";
import { NavLink, Outlet, useLoaderData, useNavigation } from "react-router-dom";
import { Project } from "../../../shared/types";

export type ProjectsOutletContext = {
  projects: Project[];
  upsertProject: (project: Project) => void;
  removeProject: (projectId: string) => Promise<boolean>;
  reloadProjects: () => Promise<void>;
};

type LinkProps = {
  to: string;
  children: ReactNode;
};

const Link = ({ to, children }: LinkProps) => {
  return (
    <NavLink to={to} className={({ isActive }) => (isActive ? "underline" : "")}>
      {children}
    </NavLink>
  );
};

const normalizePackageName = (pkg: string | null | undefined) =>
  pkg?.trim().toLowerCase() ?? null;

export default function MainLayout() {
  const { name } = useLoaderData() as { name: string };
  const nav = useNavigation();
  const [projects, setProjects] = useState<Project[]>([]);

  const reloadProjects = useCallback(async () => {
    try {
      const storedProjects = await api.projects.getAll();
      setProjects(storedProjects);
    } catch (error) {
      console.error("Failed to load persisted projects", error);
    }
  }, []);

  useEffect(() => {
    void reloadProjects();
  }, [reloadProjects]);

  const upsertProject = useCallback((project: Project) => {
    setProjects((prev) => {
      const next = [...prev];
      const idIndex = next.findIndex((item) => item.id === project.id);
      const pkg = normalizePackageName(project.packageName);
      const packageIndex =
        pkg !== null
          ? next.findIndex(
              (item) => normalizePackageName(item.packageName) === pkg
            )
          : -1;

      if (packageIndex !== -1 && packageIndex !== idIndex) {
        next[packageIndex] = project;
        if (idIndex !== -1) {
          next.splice(idIndex, 1);
        }
        return next;
      }

      if (idIndex !== -1) {
        next[idIndex] = project;
        return next;
      }

      next.push(project);
      return next;
    });
  }, []);

  const removeProject = useCallback(async (projectId: string) => {
    try {
      const removed = await api.projects.remove(projectId);
      if (!removed) {
        return false;
      }
      setProjects((prev) => prev.filter((project) => project.id !== projectId));
      return true;
    } catch (error) {
      console.error("Failed to remove project", error);
      return false;
    }
  }, []);

  return (
    <div className="">
      <header className="p-4 border-b border-border shadow-md">
        <nav className="flex items-center">
          <ul className="flex gap-4 items-center">
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/agents">Agents</Link>
          </ul>
          <div className="ms-auto">
            <span>Hi, {name}</span>
          </div>
        </nav>
      </header>

      {nav.state === "loading" ? <p>Loading...</p> : null}

      <main className="p-4">
        <Outlet
          context={{
            projects,
            upsertProject,
            removeProject,
            reloadProjects,
          }}
        />
      </main>
    </div>
  );
}
