"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Check, ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import {
  SubmitEvent,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { ProjectFormState, ProjectFormAction } from "./ProjectFormAction";
import { toast } from "sonner";
import { ProjectSchemaError } from "@/types/SchemaErrorTypes";
import { ProjectUpdateAction } from "./ProjectFormUpdateAction";
import { LazyReload, updateImageinForm } from "@/lib/utils/Helpers";

interface props {
  buttonTitle?: string;
  id?: string;
  FormState?: ProjectFormState;
}

const InitialFormState: ProjectFormState = {
  success: false,
  error: false,
  message: "",
};

export default function ProjectForm({ buttonTitle, id, FormState }: props) {
  const [isOpen, setOpen] = useState(false);
  const [bannerPreview, setbannerPreview] = useState("");
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const [SubmitState, formAction, SubmitPending] = useActionState(
    ProjectFormAction,
    FormState ?? InitialFormState,
  );
  const [UpdateState, updateAction, UpdatePending] = useActionState(
    ProjectUpdateAction,
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
  const state = id ? UpdateState : SubmitState;

  //reset the form
  useEffect(() => {

    const image = state.values?.image as string;
    if (image) {
      const extractPath = image.split("store")[1];
      if (extractPath) {
        const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/assets${extractPath}`;
        setbannerPreview(url);
      }
    }

    if (state.success) {
      toast.success(state.message as string);
      setbannerPreview("");
      if (bannerInputRef.current) {
        bannerInputRef.current.value = "";
      }
      LazyReload(3000);
      setOpen(false);
    }
  }, [state]);

  if (!isOpen)
    return (
      <Button className="w-fit" onClick={() => setOpen(true)}>
        {id ? buttonTitle : "Create new Project"}
      </Button>
    );
  return (
    <div className="fixed z-100 inset-0 dark:bg-black/50 backdrop-blur-[2px] ">
      <Card className="fixed inset-0 mx-auto mt-20 w-1/2 overflow-y-auto h-8/9 p-5 pb-6">
        <form
          action={(formdata) => {
            const fd = updateImageinForm(
              formdata,
              "image",
              state.values?.image as string,
            );
            id ? updateAction(fd) : formAction(fd);
          }}
          className="flex flex-col gap-5"
        >
          <h1 className="font-mono">{id ? "Update" : "Add"} project details</h1>
          {state.error && typeof state.message === "string" && (
            <Card className="bg-red-400 p-3">{state.message}</Card>
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
              {id && (
                <Label htmlFor="id" className="hidden">
                  <Input id="id" name="id" defaultValue={id} className="mt-2" />
                </Label>
              )}
              <Label htmlFor="title">
                Title{" "}
                {state.error && (
                  <span className="text-red-400 ml-2">
                    {(state.message as ProjectSchemaError).title?.errors}
                  </span>
                )}
                <Input
                  id="title"
                  name="title"
                  required
                  placeholder="Title of the project"
                  className="mt-2"
                  defaultValue={state.values?.title}
                />
              </Label>
              <Label htmlFor="Link">
                page path{" "}
                {state.error && (
                  <span className="text-red-400 ml-2">
                    {(state.message as ProjectSchemaError).Link?.errors}
                  </span>
                )}
                <Input
                  id="Link"
                  name="Link"
                  required
                  defaultValue={state.values?.Link}
                  placeholder="custom path name for the project"
                  className="mt-2"
                />
              </Label>
            </div>
          </div>
          <Label htmlFor="Description">
            Description{" "}
            {state.error && (
              <span className="text-red-400 ml-2">
                {(state.message as ProjectSchemaError).Description?.errors}
              </span>
            )}
            <Input
              id="Description"
              name="Description"
              required
              defaultValue={state.values?.Description}
              placeholder="custom path name for the project"
              className="mt-2"
            />
          </Label>
          <Label htmlFor="AdditionalDescription">
            Additional description{" "}
            {state.error && (
              <span className="text-red-400 ml-2">
                {
                  (state.message as ProjectSchemaError).AdditionalDescription
                    ?.errors
                }
              </span>
            )}
            <Input
              id="AdditionalDescription"
              name="AdditionalDescription"
              defaultValue={state.values?.AdditionalDescription}
              placeholder="add some more details about (optional)"
              className="mt-2"
            />
          </Label>
          <Label htmlFor="AdditionalDescription" className="lg:w-2/4">
            Tags{" "}
            {state.error && (
              <span className="text-red-400 ml-2">
                {(state.message as ProjectSchemaError).tags?.errors}
              </span>
            )}
            <Input
              id="tags"
              name="tags"
              required
              defaultValue={state.values?.tags}
              placeholder="add the tags with comma seperation e.g. ( eggs, tomato, chicken)"
              className="mt-2"
            />
          </Label>
          <div className="flex lg:flex-row flex-col justify-between gap-4">
            <Label htmlFor="projectLiveUrl" className="w-full">
              Live url{" "}
              {state.error && (
                <span className="text-red-400 ml-2">
                  {(state.message as ProjectSchemaError).projectLiveUrl?.errors}
                </span>
              )}
              <Input
                id="projectLiveUrl"
                name="projectLiveUrl"
                defaultValue={state.values?.projectLiveUrl}
                placeholder="e.g. https://smgcat.site (optional)"
                className="mt-2"
              />
            </Label>
            <Label htmlFor="githubLink" className="w-full">
              Github repo{" "}
              {state.error && (
                <span className="text-red-400 ml-2">
                  {(state.message as ProjectSchemaError).githubLink?.errors}
                </span>
              )}
              <Input
                id="githubLink"
                name="githubLink"
                defaultValue={state.values?.githubLink}
                placeholder="e.g. https://github.com/.... (optional)"
                className="mt-2"
              />
            </Label>
            <Label htmlFor="videoDemo" className="w-full">
              Video demo{" "}
              {state.error && (
                <span className="text-red-400 ml-2">
                  {(state.message as ProjectSchemaError).videoDemo?.errors}
                </span>
              )}
              <Input
                id="videoDemo"
                name="videoDemo"
                defaultValue={state.values?.videoDemo}
                placeholder="add url of video demo (optional)"
                className="mt-2"
              />
            </Label>
          </div>
          <Label htmlFor="title" className="flex flex-col gap-3">
            content{" "}
            {state.error && (
              <span className="text-red-400 ml-2">
                {(state.message as ProjectSchemaError).content?.errors}
              </span>
            )}
            <textarea
              id="content"
              name="content"
              required
              defaultValue={state.values?.content}
              placeholder="write about your journal"
              className="mt-2 h-100 outline-none border p-2 rounded resize-none"
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
                disabled={id ? UpdatePending : SubmitPending}
                className="hover:opacity-100 opacity-80"
              >
                <Check /> Submit
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
