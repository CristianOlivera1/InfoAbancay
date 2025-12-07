import { useEffect, useState, type Ref } from "react";
import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  CodeToggle,
  headingsPlugin,
  listsPlugin,
  linkPlugin,
  quotePlugin,
  markdownShortcutPlugin,
  ListsToggle,
  linkDialogPlugin,
  CreateLink,
  tablePlugin,
  imagePlugin,
  ConditionalContents,
  Separator,
  diffSourcePlugin,
  type MDXEditorMethods,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

interface Props {
  value: string;
  editorRef?: Ref<MDXEditorMethods> | null;
  fieldChange: (value: string) => void;
}

const MarkdownEditor = ({ value, editorRef, fieldChange }: Props) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsDark(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return (
    <>
      <style>
        {`
      ul {
        list-style-type: disc;
        padding-left: 1.5rem;
      }

      ol {
        list-style-type: decimal;
        padding-left: 1.5rem;
      }
      .mdxeditor-popup-container {
        position: absolute !important;
        top: 0;
        left: 0;
        width: 100%;
        height: 0 !important; /* evita que genere espacio */
      }
    `}
      </style>
      <MDXEditor
        key={isDark ? "dark" : "light"}
        markdown={value}
        ref={editorRef}
        onChange={fieldChange}
        className="background-light800_dark200 markdown-editor w-full h-60 overflow-y-auto"
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          quotePlugin(),
          markdownShortcutPlugin(),
          tablePlugin(),
          imagePlugin(),
          diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "" }),
          toolbarPlugin({
            toolbarContents: () => (
              <ConditionalContents
                options={[
                  {
                    fallback: () => (
                      <>
                        <UndoRedo />
                        <Separator />
                        <BoldItalicUnderlineToggles />
                        <CodeToggle />
                        <Separator />
                        <ListsToggle />
                        <Separator />
                        <CreateLink />
                        <Separator />
                        <Separator />
                      </>
                    ),
                  },
                ]}
              />
            ),
          }),
        ]}
      />
    </>
  );
};

export default MarkdownEditor;