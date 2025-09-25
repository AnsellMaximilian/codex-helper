import { useState } from "react";
import { Plus } from "lucide-react";
import type { BasePackageResult } from "../shared/types";
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

export default function App() {
  const [projects, setProjects] = useState<BasePackageResult[]>([]);

  const handleAddWorkspace = async () => {
    try {
      const project = await api.projects.addWorkspace();
      if (!project) return;

      setProjects((prev) => {
        const index = prev.findIndex(
          (item) => item.dirScanned === project.dirScanned
        );
        if (index !== -1) {
          const next = [...prev];
          next[index] = project;
          return next;
        }
        return [...prev, project];
      });
    } catch (error) {
      console.error("Failed to add workspace", error);
    }
  };

  const getWorkspaceName = (project: BasePackageResult) => {
    const normalized = project.dirScanned.replace(/\\/g, "/");
    const segments = normalized.split("/").filter(Boolean);
    return segments[segments.length - 1] ?? project.dirScanned;
  };

  const renderWarnings = (project: BasePackageResult) => {
    if (project.warnings.length === 0) return "No warnings";
    const label = project.warnings.length === 1 ? "warning" : "warnings";
    return `${project.warnings.length} ${label}`;
  };

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
              <Card key={project.dirScanned} className="col-span-4">
                <CardHeader>
                  <CardTitle>{workspaceName}</CardTitle>
                  <CardDescription>
                    <code className="italic">
                      {project.packageName ?? "Package not detected"}
                    </code>
                  </CardDescription>
                  <CardAction>
                    <Button variant="outline" disabled>
                      Open
                    </Button>
                  </CardAction>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    Directory:{" "}
                    <code className="italic">{project.dirScanned}</code>
                  </p>
                  <p>
                    Module:{" "}
                    <code className="italic">
                      {project.moduleDir ?? "Not detected"}
                    </code>
                  </p>
                  <p>
                    Source: <code className="italic">{project.source}</code>
                  </p>
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
