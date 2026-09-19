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
import { FormState, ProjectFormAction } from "./ProjectFormAction";
import { toast } from "sonner";

const InitialFormState: FormState = {
  success: false,
  error: false,
  message: "",
};

export default function ProjectForm() {
  const [isOpen, setOpen] = useState(false);
  const [bannerPreview, setbannerPreview] = useState("");
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const [state, formAction, isPending] = useActionState(
    ProjectFormAction,
    InitialFormState,
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

  const handleSubmit = () => {
    handleResetBannerPreview();
    toast.success("Submited new journal");
    setOpen(false);
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
  }, [state.success]);

  if (!isOpen)
    return (
      <Button className="w-fit" onClick={() => setOpen(true)}>
        Create new Project
      </Button>
    );
  return (
    <Card className="absolute top-3 w-full h-fit p-5 pb-6">
      <form
        action={formAction}
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
      >
        <h1 className="font-mono">Add project details</h1>
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
                <Label htmlFor="banner" className="flex gap-2">
                  <ImagePlus />
                  Add an Image
                </Label>
              </div>
            )}
            <Input
              ref={bannerInputRef}
              type="file"
              id="banner"
              name="banner"
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
              Title
              <Input
                id="title"
                name="title"
                required
                placeholder="Title of the project"
                className="mt-2"
              />
            </Label>
            <Label htmlFor="Link">
              page path
              <Input
                id="Link"
                name="Link"
                required
                placeholder="custom path name for the project"
                className="mt-2"
              />
            </Label>
          </div>
        </div>
        <Label htmlFor="Description">
          Description
          <Input
            id="Description"
            name="Description"
            required
            placeholder="custom path name for the project"
            className="mt-2"
          />
        </Label>
        <Label htmlFor="AdditionalDescription">
          Additional description
          <Input
            id="AdditionalDescription"
            name="AdditionalDescription"
            placeholder="add some more details about (optional)"
            className="mt-2"
          />
        </Label>
        <Label htmlFor="AdditionalDescription" className="w-2/4">
          Tags
          <Input
            id="tags"
            name="tags"
            required
            placeholder="add the tags with comma seperation e.g. ( eggs, tomato, chicken)"
            className="mt-2"
          />
        </Label>
        <div className="flex justify-between gap-4">
          <Label htmlFor="projectLiveUrl" className="w-full">
            Live url
            <Input
              id="projectLiveUrl"
              name="projectLiveUrl"
              required
              placeholder="e.g. https://smgcat.site"
              className="mt-2"
            />
          </Label>
          <Label htmlFor="githubLink" className="w-full">
            Github repo
            <Input
              id="githubLink"
              name="githubLink"
              required
              placeholder="e.g. https://github.com/aditya-wuw/"
              className="mt-2"
            />
          </Label>
          <Label htmlFor="videoDemo" className="w-full">
            Video demo
            <Input
              id="videoDemo"
              name="videoDemo"
              placeholder="add url of video demo (optional)"
              className="mt-2"
            />
          </Label>
        </div>
        <Label htmlFor="title" className="flex flex-col gap-3">
          content
          <textarea
            id="content"
            name="content"
            required
            placeholder="write about your journal"
            className="mt-2 h-100 outline-none border p-2 rounded resize-none"
          />
        </Label>
        <div className="flex flex-col gap-4 justify-end items-end h-full mt-5">
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
              <Check /> Submit
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}
