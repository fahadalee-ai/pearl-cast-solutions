import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { BottomSheet, Button, Field, Header, Select } from "@/components/kit";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/_app/documents/upload")({
  component: UploadScreen,
});

function UploadScreen() {
  const { addDocument } = useApp();
  const navigate = useNavigate();
  const [sheet, setSheet] = useState(true);
  const [name, setName] = useState("New upload.pdf");
  const [type, setType] = useState<"Lab Results" | "Records" | "Insurance" | "Uploaded by Me">("Uploaded by Me");

  return (
    <div className="min-h-dvh bg-canvas">
      <Header title="Upload Document" />
      <div className="px-5">
        <div className="mb-4 flex h-40 items-center justify-center rounded-[20px] bg-white text-sm text-muted-foreground shadow-card">
          Preview · {name}
        </div>
        <Field label="Document type">
          <Select value={type} onChange={(e) => setType(e.target.value as typeof type)}>
            <option>Lab Results</option>
            <option>Records</option>
            <option>Insurance</option>
            <option>Uploaded by Me</option>
          </Select>
        </Field>
        <Button
          full
          onClick={() => {
            addDocument({ name, type, kind: "PDF", size: "120 KB" });
            navigate({ to: "/documents" });
          }}
        >
          Upload
        </Button>
      </div>
      <BottomSheet open={sheet} onClose={() => setSheet(false)} title="Add a file">
        <div className="space-y-2">
          {["Take Photo", "Choose from Library", "Upload File"].map((label) => (
            <Button
              key={label}
              variant="outline"
              full
              onClick={() => {
                setName(label === "Take Photo" ? "Photo capture.jpg" : "New upload.pdf");
                setSheet(false);
              }}
            >
              {label}
            </Button>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
}
