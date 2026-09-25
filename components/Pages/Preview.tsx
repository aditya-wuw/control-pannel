"use client";
import Image from "next/image";
import MarkdownReader from "../MarkdownReader";
import BackBtn from "../ui/BackBtn";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

interface PreviewPageProps {
  title: string;
  content: string;
  banner?: string;
}

export default function PreviewPage({
  title,
  content,
  banner,
}: PreviewPageProps) {
  return (
    <div className="xl:p-10 p-5">
      <div className="sticky top-4 mb-2 z-10">
        <BackBtn />
      </div>
      <h1 className={`mt-5 text-3xl font-bold ${banner ? "mb-5" : "mb-10"}`}>
        {title}
      </h1>
      {banner && (
        <div className="mb-5 h-55 max-sm:h-25 w-full overflow-hidden rounded-2xl relative">
          <Image
            draggable={false}
            src={banner}
            width={1920}
            height={1080}
            loading="eager"
            alt="project cover Image"
            className="aspect-auto absolute xl:-top-8"
          />
        </div>
      )}
      <MarkdownReader content={content} />
    </div>
  );
}
