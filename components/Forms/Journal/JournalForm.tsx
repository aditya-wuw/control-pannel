"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Check, ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import { FormState, JournalFormAction } from "./JournalFormAction";
import { toast } from "sonner";
import { JournalSchemaError } from "@/types/SchemaErrorTypes";
import Toast from "@/components/Toast";
import { JournalType } from "@/types/database";

interface props {
  buttonTitle?: string;
  id?: string;
  FormState?: FormState;
}

const InitialFormState: FormState = {
  success: false,
  error: false,
  values: undefined,
  message: "",
};

export default function JournalForm({ buttonTitle, FormState, id }: props) {
  const [isOpen, setOpen] = useState(false);
  const [bannerPreview, setbannerPreview] = useState("");
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const [state, formAction, isPending] = useActionState(
    JournalFormAction,
    FormState ?? InitialFormState,
  );

  const handleCancel = () => {
    setOpen(false);
  };

  const handleResetBannerPreview = () => {
    setbannerPreview("");
    if (bannerInputRef.current) {
      bannerInputRef.current.value = "";
    }
  };

  //reset the form
  useEffect(() => {
    if (state.success) {
      toast.success("Submited new journal");
      setbannerPreview("");
      if (bannerInputRef.current) {
        bannerInputRef.current.value = "";
      }
      setOpen(false);
    }
  }, [state]);

  if (!isOpen)
    return (
      <Button className="w-fit" onClick={() => setOpen(true)}>
        {buttonTitle ?? "Create new Journal"}
      </Button>
    );

  return (
    <Card className="absolute top-3 w-full h-fit p-5 pb-6">
      <Toast />
      <form action={formAction} className="flex flex-col gap-5">
        <h1 className="font-mono">Add journal details</h1>
        {state.error && typeof state.message === "string" && (
          <Card className="bg-red-400 p-2">{state.message}</Card>
        )}
        <div className="lg:flex flex-row-reverse gap-5">
          <div>
            {bannerPreview ? (
              <div className="relative lg:w-80 lg:h-full h-30 overflow-hidden rounded-2xl">
                <Image
                  src={bannerPreview ?? ""}
                  alt="preview banner"
                  width={400}
                  height={400}
                  className="object-center"
                />
                <Button
                  type="button"
                  className="absolute top-3 right-3 opacity-50 hover:opacity-100"
                  onClick={handleResetBannerPreview}
                >
                  <Trash size={16} />
                </Button>
              </div>
            ) : (
              <div className="border-4 p-2 border-dotted lg:w-80 h-full rounded-2xl flex-center">
                <Label htmlFor="image" className="flex gap-2">
                  <ImagePlus />
                  Add an Image
                </Label>
              </div>
            )}
            <Input
              ref={bannerInputRef}
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={(e) => {
                const file = e.currentTarget.files?.[0];
                if (file) {
                  setbannerPreview(URL.createObjectURL(file));
                }
              }}
              className="hidden"
            />
          </div>
          <div className="flex flex-col gap-4 lg:w-3/4 mt-4">
            <Label htmlFor="title">
              Title{" "}
              {state.error && (
                <span className="text-red-400 ml-2">
                  {(state.message as JournalSchemaError).title?.errors}
                </span>
              )}
              <Input
                id="title"
                name="title"
                required
                defaultValue={state.values?.title}
                placeholder="Today I created this ...."
                className="mt-2"
              />
            </Label>
            {id && (
              <Label htmlFor="id" className="hidden">
                <Input
                  id="id"
                  name="id"
                  defaultValue={id}
                  placeholder="Today I created this ...."
                  className="mt-2"
                />
              </Label>
            )}
            <Label htmlFor="shortDescription">
              Abouts{" "}
              {state.error && (
                <span className="text-red-400 ml-2">
                  {
                    (state.message as JournalSchemaError).shortDescription
                      ?.errors
                  }
                </span>
              )}
              <Input
                id="shortDescription"
                name="shortDescription"
                required
                defaultValue={state.values?.shortDescription}
                placeholder="A short brief about the journal"
                className="mt-2"
              />
            </Label>
          </div>
        </div>

        <Label htmlFor="title" className="flex flex-col gap-3">
          <h1>
            content{" "}
            {state.error && (
              <span className="text-red-400 ml-2">
                {(state.message as JournalSchemaError).content?.errors}
              </span>
            )}
          </h1>
          <textarea
            id="content"
            name="content"
            required
            defaultValue={state.values?.content}
            placeholder="write about your journal"
            className="mt-2 h-90 outline-none border p-2 rounded resize-none"
          />
        </Label>
        <div className="flex flex-col gap-4 justify-end items-end h-full">
          <Label htmlFor="isdraft">
            <select
              name="isdraft"
              id="isdraft"
              defaultValue={"Draft"}
              className="outline-none p-3 pr-2 border rounded-xl"
            >
              <option>Public</option>
              <option>Draft</option>
            </select>
          </Label>
          <div className="flex gap-2">
            <Button
              type="reset"
              onClick={handleCancel}
              className="hover:opacity-100 opacity-80"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="hover:opacity-100 opacity-80"
            >
              <Check /> Save
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}
