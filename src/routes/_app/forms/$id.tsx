import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SuccessState } from "@/components/SuccessState";
import { Button, Card, Field, Header, Input, LinkButton, ProgressBar, Select, Textarea } from "@/components/kit";
import { providerById } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/_app/forms/$id")({
  component: FormFillScreen,
});

function FormFillScreen() {
  const { id } = Route.useParams();
  const { forms, providers, saveForm, pushToast } = useApp();
  const form = forms.find((f) => f.id === id);
  const [step, setStep] = useState(0);
  const [values, setValues] = useState(form?.values ?? {});
  const [review, setReview] = useState(false);
  const [done, setDone] = useState(false);

  if (!form) return <p className="p-6">Form not found.</p>;
  const field = form.fields[step];
  const provider = providerById(form.providerId, providers);

  if (done) {
    return (
      <SuccessState title="Form submitted" body={`Sent to ${provider?.name}.`}>
        <LinkButton to="/forms" full>
          Back to forms
        </LinkButton>
      </SuccessState>
    );
  }

  if (review) {
    return (
      <div className="min-h-dvh bg-canvas pb-8">
        <Header title="Review & Submit" />
        <div className="space-y-3 px-5">
          {form.fields.map((f, i) => (
            <Card key={f.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">{f.label}</p>
                  <p className="mt-1 text-sm">{values[f.id] || "—"}</p>
                </div>
                <button
                  type="button"
                  className="text-sm text-mauve"
                  onClick={() => {
                    setStep(i);
                    setReview(false);
                  }}
                >
                  Edit
                </button>
              </div>
            </Card>
          ))}
          <Button
            full
            onClick={() => {
              saveForm(id, values, "Submitted");
              setDone(true);
            }}
          >
            Submit Form
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-canvas">
      <Header title={form.title} subtitle={`Step ${step + 1} of ${form.fields.length}`} right={<span className="text-xs text-mauve">Saved</span>} />
      <div className="px-5">
        <div className="mb-5">
          <ProgressBar value={((step + 1) / form.fields.length) * 100} />
        </div>
        <Field label={field.label}>
          {field.type === "textarea" && (
            <Textarea value={values[field.id] ?? ""} onChange={(e) => setValues((v) => ({ ...v, [field.id]: e.target.value }))} />
          )}
          {field.type === "text" && (
            <Input value={values[field.id] ?? ""} onChange={(e) => setValues((v) => ({ ...v, [field.id]: e.target.value }))} />
          )}
          {field.type === "date" && (
            <Input type="date" value={values[field.id] ?? ""} onChange={(e) => setValues((v) => ({ ...v, [field.id]: e.target.value }))} />
          )}
          {field.type === "select" && (
            <Select value={values[field.id] ?? ""} onChange={(e) => setValues((v) => ({ ...v, [field.id]: e.target.value }))}>
              <option value="">Select</option>
              {field.options?.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </Select>
          )}
          {field.type === "checkbox" && (
            <label className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={values[field.id] === "yes"}
                onChange={(e) => setValues((v) => ({ ...v, [field.id]: e.target.checked ? "yes" : "" }))}
                className="accent-mauve"
              />
              I agree
            </label>
          )}
          {field.type === "signature" && (
            <Input
              placeholder="Type your full name"
              value={values[field.id] ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, [field.id]: e.target.value }))}
            />
          )}
        </Field>
        <div className="flex gap-3">
          {step > 0 && (
            <Button variant="outline" full onClick={() => setStep((s) => s - 1)}>
              Back
            </Button>
          )}
          <Button
            full
            onClick={() => {
              saveForm(id, values, "In Progress");
              pushToast("Saved");
              if (step < form.fields.length - 1) setStep((s) => s + 1);
              else setReview(true);
            }}
          >
            Save & Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
