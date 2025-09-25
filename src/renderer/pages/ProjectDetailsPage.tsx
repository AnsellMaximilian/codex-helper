import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import type { TemplateCheckMap } from "../../shared/types";
import type { ProjectsOutletContext } from "../components/layout/MainLayout";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

function decodeProjectId(raw: string | undefined): string | null {
  if (!raw) return null;
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

function formatPath(p: string) {
  return p.replace(/\\/g, "/");
}

export default function ProjectDetailsPage() {
  const params = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { projects } = useOutletContext<ProjectsOutletContext>();
  const [templateStatus, setTemplateStatus] = useState<TemplateCheckMap | null>(
    null
  );
  const [isCheckingTemplates, setIsCheckingTemplates] = useState(false);

  const decodedId = useMemo(() => decodeProjectId(params.projectId), [params]);

  const project = useMemo(() => {
    if (!decodedId) return undefined;
    return projects.find((item) => item.id === decodedId);
  }, [decodedId, projects]);

  const runTemplateCheck = useCallback(async () => {
    if (!project) return;
    try {
      setIsCheckingTemplates(true);
      const status = await api.projects.checkTemplates(project.rootDir);
      setTemplateStatus(status);
    } catch (error) {
      console.error("Unable to check template files", error);
      setTemplateStatus({});
    } finally {
      setIsCheckingTemplates(false);
    }
  }, [project]);

  useEffect(() => {
    runTemplateCheck();
  }, [runTemplateCheck]);

  if (!project) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Project not found</CardTitle>
          <CardDescription>
            The requested project could not be located.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>It may have been removed from this session.</p>
          <Button onClick={() => navigate(-1)}>Go back</Button>
        </CardContent>
      </Card>
    );
  }

  const templateEntries = templateStatus
    ? Object.entries(templateStatus).sort(([a], [b]) => a.localeCompare(b))
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <p className="text-sm text-muted-foreground">
            {project.packageName ?? "Package not detected"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button onClick={runTemplateCheck} disabled={isCheckingTemplates}>
            {isCheckingTemplates ? "Checking..." : "Recheck templates"}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Workspace Details</CardTitle>
          <CardDescription>
            Key information about the selected workspace.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Directory: {project.rootDir}</p>
          <p>Module: {project.moduleDir ?? "Not detected"}</p>
          <p>Package source: {project.packageSource}</p>
          <p>Files inspected: {project.filesChecked.length}</p>
          {project.warnings.length > 0 ? (
            <div>
              <p className="font-medium text-foreground">Warnings</p>
              <ul className="list-disc space-y-1 pl-5 text-foreground">
                {project.warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No warnings detected.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Template Files</CardTitle>
          <CardDescription>
            Validation of required files under{" "}
            <code>shared/assets/templates</code>.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          {templateEntries.length === 0 ? (
            <p className="text-muted-foreground">
              {isCheckingTemplates
                ? "Checking template files..."
                : "No template files were found to validate."}
            </p>
          ) : (
            <ul className="space-y-2">
              {templateEntries.map(([file, exists]) => (
                <li
                  key={file}
                  className="flex items-center justify-between rounded-md border border-border px-3 py-2"
                >
                  <span className="truncate text-muted-foreground">
                    {formatPath(file)}
                  </span>
                  <span
                    className={exists ? "text-emerald-600" : "text-destructive"}
                  >
                    {exists ? "Present" : "Missing"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Files Checked</CardTitle>
          <CardDescription>
            Source files scanned during package detection.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          {project.filesChecked.length === 0 ? (
            <p>No files recorded.</p>
          ) : (
            <ul className="space-y-1">
              {project.filesChecked.map((file) => (
                <li key={file}>{formatPath(file)}</li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
