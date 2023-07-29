import { getEchoList } from "@/services/server/echo";

import { SITE_NAME } from "@/constants/site";
import { EchoSearch } from "@/components/EchoSearch";

export const metadata = {
  title: `Echoes | ${SITE_NAME}`,
};

export default async function Page() {
  const echoes = await getEchoList();

  return (
    <div className="p-6 w-full flex flex-col gap-6">
      <EchoSearch echoes={echoes} />
    </div>
  );
}
