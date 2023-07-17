import { notFound } from "next/navigation";
import { Markdown } from "@/components/Markdown";
import { getServerFile } from "@/helpers/getServerFile";
import { getFileName } from "@/helpers/getFileName";
import { ROUTES } from "@/constants/routes";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getEcho } from "@/services/server/echo";
import { Echo } from "@/components/Echo";
import { getResourcePath } from "@/helpers/getResourcePath";

interface Props {
  params: { echoId: string };
}

export default async function Page({ params: { echoId } }: Props) {
  const echo = await getEcho({ echoId: Number(echoId) });

  if (!echo) {
    notFound();
  }

  const { id, name } = echo;
  const fileName = getFileName(name);
  const markdown = await getServerFile(
    `public/${getResourcePath(fileName, "echo", "markdown")}`
  );
  return (
    <div className="p-6 w-full">
      <Breadcrumbs
        crumbs={[{ href: ROUTES.echoes, title: "Echoes" }]}
        title={name}
      />
      <div className="flex gap-4 mt-6">
        <div className="shrink-0 hidden sm:block">
          <Echo id={id} name={name} />
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3  border-b-quill pb-3 border-b-2 items-center">
            <div className="shrink-0 sm:hidden">
              <Echo id={id} name={name} size="sm" />
            </div>
            <div className="font-bold text-4xl text-quill">{name}</div>
          </div>
          <Markdown markdown={markdown} className="p-4 prose-xl" />
        </div>
      </div>
    </div>
  );
}
