import { Echo } from "@/components/Echo";
import { getEchoList } from "@/services/server/echo";

import { SITE_NAME } from "@/constants/site";

export const metadata = {
  title: `Echoes | ${SITE_NAME}`,
};

export default async function Page() {
  const echoes = await getEchoList();

  return (
    <div className="p-6 pt-12 grid gap-4 grid-cols-[repeat(auto-fill,80px)] w-full justify-center">
      {echoes.map((echo) => (
        <Echo key={echo.id} {...echo} withLink withTooltip withAnimation />
      ))}
    </div>
  );
}
