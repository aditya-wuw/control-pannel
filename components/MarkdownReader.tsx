import Image from "next/image";
import { Clipboard } from "lucide-react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

const MarkdownReader = ({ content }: { content: string }) => {
  return (
    <div className="mx-1">
      <Markdown
        components={{
          h1: ({ ...props }) => (
            <h1 className="xl:text-3xl text-2xl font-bold my-4" {...props} />
          ),
          h2: ({ ...props }) => (
            <h2 className="xl:text-2xl text-xl font-semibold my-2" {...props} />
          ),
          h3: ({ ...props }) => (
            <h3 className="xl:text-xl text-lg font-semibold my-5" {...props} />
          ),
          p: ({ ...props }) => (
            <p
              className="xl:text-base text-sm leading-relaxed opacity-75"
              {...props}
            />
          ),
          ul: ({ ...props }) => (
            <ul
              className="list-disc list-inside my-2 px-4 opacity-90"
              {...props}
            />
          ),
          li: ({ ...props }) => (
            <li
              className="xl:text-base text-sm text-left list-inside space-y-2"
              {...props}
            />
          ),
          em: ({ ...props }) => <em className="italic" {...props} />,
          strong: ({ ...props }) => <strong className="font-bold" {...props} />,
          a: ({ ...props }) => (
            <a className="text-blue-500" {...props} target="_blank" />
          ),
          mark: ({ ...props }) => <span className="bg-blue-500" {...props} />,
          blockquote: ({ ...props }) => (
            <blockquote
              className="border-l-5 border-blue-500 px-2"
              {...props}
            />
          ),
          img: ({ height, width, src, alt, ...props }) => {
            if (!src || typeof src !== "string" || src.trim() === "") {
              return null;
            }
            return (
              <Image
                src={src?.toString() as string}
                width={1920}
                height={1080}
                alt={`${alt}+image${height ?? "smug"}x${width ?? "cat"}`}
                className="w-full h-auto object-contain rounded-md"
                {...props}
              />
            );
          },
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const copyContent = async () => {
              const content = String(children).replace(/\n$/, "");
              await navigator.clipboard.writeText(content);
            };
            if (match) {
              return (
                <code className="relative">
                  <button onClick={() => copyContent()}>
                    <Clipboard
                      className="absolute p-2 m-2 top-7 right-0 bg-white/80 hover:bg-white dark:bg-black/40 dark:hover:bg-black/90 rounded-sm pop-in cursor-pointer"
                      size={30}
                    />
                  </button>
                  <SyntaxHighlighter
                    PreTag="div"
                    language={match[1]}
                    style={dracula}
                    customStyle={{ backgroundColor: "var(--code-bg)" }}
                    className="dark:bg-gray-600/30"
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </code>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
};

export default MarkdownReader;
