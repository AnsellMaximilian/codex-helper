import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import type { TemplateCheckMap } from "../../shared/types";
import type { ProjectsOutletContext } from "../components/layout/MainLayout";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";

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
  const [isTemplateSheetOpen, setIsTemplateSheetOpen] = useState(false);
  const [templateQuery, setTemplateQuery] = useState("");

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

  useEffect(() => {
    if (!isTemplateSheetOpen) {
      setTemplateQuery("");
    }
  }, [isTemplateSheetOpen]);

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

  const templateEntries = useMemo(() => {
    if (!templateStatus) return [];
    const projectName = project?.name ?? "";
    return Object.entries(templateStatus)
      .map(([relativePath, exists]) => ({
        relativePath,
        displayPath: `${projectName}/${relativePath}`,
        exists,
      }))
      .sort((a, b) => a.displayPath.localeCompare(b.displayPath));
  }, [project?.name, templateStatus]);

  const filteredTemplateEntries = useMemo(() => {
    if (!templateQuery) return templateEntries;
    const q = templateQuery.toLowerCase();
    return templateEntries.filter((entry) =>
      entry.displayPath.toLowerCase().includes(q)
    );
  }, [templateEntries, templateQuery]);

  const totalTemplates = templateEntries.length;
  const totalPresent = templateEntries.filter((entry) => entry.exists).length;
  const totalMissing = totalTemplates - totalPresent;

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
            Summary of expected files copied into this workspace.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2 text-sm text-muted-foreground">
          <p>
            Total templates:{" "}
            {templateStatus === null ? "Checking..." : totalTemplates}
          </p>
          <p className="text-emerald-600">
            Present: {templateStatus === null ? "-" : totalPresent}
          </p>
          <p className="text-destructive">
            Missing: {templateStatus === null ? "-" : totalMissing}
          </p>
        </CardContent>
        <CardFooter>
          <Sheet
            open={isTemplateSheetOpen}
            onOpenChange={setIsTemplateSheetOpen}
          >
            <SheetTrigger asChild>
              <Button disabled={templateStatus === null}>
                View template files
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>Template file checks</SheetTitle>
                <SheetDescription>
                  Search and review template files validated under this project.
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-4 px-4 pb-4">
                <Input
                  value={templateQuery}
                  onChange={(event) => setTemplateQuery(event.target.value)}
                  placeholder="Search files"
                />
                <div className="text-sm text-muted-foreground">
                  Showing {filteredTemplateEntries.length} of{" "}
                  {templateEntries.length} files
                </div>
                <div className="h-[60vh] overflow-y-auto pr-2">
                  {templateStatus === null ? (
                    <p className="text-muted-foreground">
                      {isCheckingTemplates
                        ? "Checking template files..."
                        : "No results yet."}
                    </p>
                  ) : filteredTemplateEntries.length === 0 ? (
                    <p className="text-muted-foreground">
                      No files match your search.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {filteredTemplateEntries.map((entry) => (
                        <li
                          key={entry.relativePath}
                          className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm"
                        >
                          <span className="truncate text-muted-foreground">
                            {formatPath(entry.displayPath)}
                          </span>
                          <span
                            className={
                              entry.exists
                                ? "text-emerald-600"
                                : "text-destructive"
                            }
                          >
                            {entry.exists ? "Present" : "Missing"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  Paths are relative to the project root: {project.name}/
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </CardFooter>
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
