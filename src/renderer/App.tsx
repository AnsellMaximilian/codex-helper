import { useCallback } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Plus } from "lucide-react";
import type { Project } from "../shared/types";
import type { ProjectsOutletContext } from "./components/layout/MainLayout";
import { Button } from "./components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

const normalizeDir = (dir: string) => dir.replace(/\\/g, "/");

export default function App() {
  const navigate = useNavigate();
  const { projects, upsertProject } = useOutletContext<ProjectsOutletContext>();

  const handleAddWorkspace = useCallback(async () => {
    try {
      const project = await api.projects.addWorkspace();
      if (!project) return;

      upsertProject(project);
    } catch (error) {
      console.error("Failed to add workspace", error);
    }
  }, [upsertProject]);

  const getWorkspaceName = useCallback((project: Project) => {
    const normalized = normalizeDir(project.rootDir);
    const segments = normalized.split("/").filter(Boolean);
    return segments[segments.length - 1] ?? project.rootDir;
  }, []);

  const renderWarnings = useCallback((project: Project) => {
    if (project.warnings.length === 0) return "No warnings";
    const label = project.warnings.length === 1 ? "warning" : "warnings";
    return `${project.warnings.length} ${label}`;
  }, []);

  const goToDetails = useCallback(
    (project: Project) => {
      navigate(`/projects/${encodeURIComponent(project.id)}`);
    },
    [navigate]
  );

  return (
    <div className="">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button onClick={handleAddWorkspace}>
          <span>Add</span> <Plus />
        </Button>
      </div>
      <div className="grid grid-cols-12 gap-2">
        {projects.length === 0 ? (
          <div className="col-span-12 rounded-md border border-dashed p-8 text-center text-muted-foreground">
            No projects yet. Add your first Android workspace to get started.
          </div>
        ) : (
          projects.map((project) => {
            const workspaceName = getWorkspaceName(project);
            return (
              <Card key={project.id} className="col-span-4">
                <CardHeader>
                  <CardTitle>{workspaceName}</CardTitle>
                  <CardDescription>
                    {project.packageName ?? "Package not detected"}
                  </CardDescription>
                  <CardAction>
                    <Button
                      variant="outline"
                      onClick={() => goToDetails(project)}
                    >
                      Open
                    </Button>
                  </CardAction>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>Directory: {project.rootDir}</p>
                  <p>Module: {project.moduleDir ?? "Not detected"}</p>
                  <p>Source: {project.packageSource}</p>
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">
                  <p>{renderWarnings(project)}</p>
                </CardFooter>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
