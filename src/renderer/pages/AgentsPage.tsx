import { useCallback, useEffect, useMemo, useState } from "react";
import MDEditor from "@uiw/react-md-editor";

import { Button } from "../components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "../components/ui/toggle-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const EDITOR_HEIGHT = 480;
const VIEW_MODES = ["editor", "split", "preview"] as const;

type ViewMode = (typeof VIEW_MODES)[number];

const normalizeLineEndings = (value: string) => value.replace(/\r\n/g, "\n");

const isViewMode = (value: string): value is ViewMode => {
  return (VIEW_MODES as readonly string[]).includes(value);
};

export default function AgentsPage() {
  const [content, setContent] = useState<string>("");
  const [initialContent, setInitialContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("split");

  const hasChanges = useMemo(() => {
    return (
      normalizeLineEndings(content) !== normalizeLineEndings(initialContent)
    );
  }, [content, initialContent]);

  const canSave = hasChanges && !isSaving && !isLoading && !loadError;

  const applyLoadedContent = useCallback((value: string) => {
    setContent(value);
    setInitialContent(value);
  }, []);

  const loadTemplate = useCallback(async () => {
    setIsLoading(true);
    try {
      const value = await api.templates.loadAgents();
      applyLoadedContent(value);
      setLoadError(null);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : String(error ?? "Unknown error");
      setLoadError(message);
    } finally {
      setIsLoading(false);
    }
  }, [applyLoadedContent]);

  useEffect(() => {
    void loadTemplate();
  }, [loadTemplate]);

  const handleChange = useCallback((value: string | undefined) => {
    setSaveError(null);
    setContent(value ?? "");
  }, []);

  const handleSave = useCallback(async () => {
    if (!canSave) return;

    setIsSaving(true);
    try {
      await api.templates.saveAgents(content);
      setInitialContent(content);
      setSaveError(null);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : String(error ?? "Unknown error");
      setSaveError(message);
    } finally {
      setIsSaving(false);
    }
  }, [canSave, content]);

  const handleViewModeChange = useCallback((value: string) => {
    if (isViewMode(value)) {
      setViewMode(value);
    }
  }, []);

  const statusMessage = useMemo(() => {
    if (isLoading) return "Loading template...";
    if (isSaving) return "Updating template...";
    if (saveError) return saveError;
    if (loadError) return loadError;
    if (hasChanges) return "Unsaved changes";
    return "All changes saved";
  }, [hasChanges, isLoading, isSaving, loadError, saveError]);

  const showEditor = viewMode !== "preview";
  const showPreview = viewMode !== "editor";
  const layoutClass =
    showEditor && showPreview ? "grid gap-4 lg:grid-cols-2" : "grid gap-4";

  return (
    <div className="space-y-6" data-color-mode="light">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Agents Template</h1>
          <p className="text-sm text-muted-foreground">
            Edit the shared agent instructions used across new workspaces.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            onClick={loadTemplate}
            disabled={isLoading || isSaving}
          >
            {isLoading ? "Loading..." : "Reload"}
          </Button>
          <Button onClick={handleSave} disabled={!canSave}>
            {isSaving ? "Updating..." : "Update template"}
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div
          className={`text-sm ${saveError || loadError ? "text-destructive" : "text-muted-foreground"}`}
        >
          {statusMessage}
        </div>

        <ToggleGroup
          type="single"
          value={viewMode}
          onValueChange={handleViewModeChange}
          aria-label="Template view mode"
          size="lg"
          variant="outline"
        >
          <ToggleGroupItem value="editor">Editor</ToggleGroupItem>
          <ToggleGroupItem value="split">Both</ToggleGroupItem>
          <ToggleGroupItem value="preview">Preview</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className={layoutClass}>
        {showEditor ? (
          <Card className="min-h-[320px]">
            <CardHeader>
              <CardTitle>Markdown Editor</CardTitle>
              <CardDescription>
                Update the agent instructions. Changes are saved when you click
                update.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MDEditor
                value={content}
                onChange={handleChange}
                height={EDITOR_HEIGHT}
                preview="edit"
                textareaProps={{
                  placeholder: "Start writing agent instructions...",
                }}
              />
            </CardContent>
          </Card>
        ) : null}

        {showPreview ? (
          <Card className="min-h-[320px]">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                Rendered markdown preview of the template.
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-[320px] overflow-auto text-sm">
              <MDEditor.Markdown source={content} />
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
