"use client";

import { useActionState, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");

  const router = useRouter();
  // const [isPending, setPending] = useState(false);

  //   const [state, formAction, isPending] = useActionState(
  //     action,
  //     initialState,
  //     permalink
  //   );
  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
        link: formData.get("link"),
        pitch,
      };

      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitch)
      if(result.status === 'SUCCESS') {
        toast.success("Startup created successfully.")
       router.push(`/startup/${result._id}`)
      }
      return result;

      console.log(formValues);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        toast.error(
          "One or more errors occurred. Please check form and resubmit."
        );
        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast.error("An unexepcted error occured. Please try agaim.");
      return {
        ...prevState,
        error: "An unexpected error occurred.",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Startup title"
        />
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          required
          placeholder="Startup description"
        />
        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Startup category (Tech, Health, Education...)"
        />
        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="link" className="startup-form_label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="startup-form_input"
          required
          placeholder="Startup image url"
        />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="link" className="startup-form_label">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves",
          }}
          previewOptions={{ disallowedElements: ["style"] }}
        />
        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>

      <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting ... " : "Submit your pitch"}
        <Send className="size-2 ml-2" />
      </Button>
    </form>
  );
};

export default StartupForm;
