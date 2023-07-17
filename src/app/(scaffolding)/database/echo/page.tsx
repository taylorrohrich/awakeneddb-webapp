import { Echo } from "@/components/Echo";
import { getEchoList } from "@/services/server/echo";

export default async function Page() {
  const echoes = await getEchoList();

  return (
    <div className="p-6 grid gap-4 grid-cols-[repeat(auto-fill,80px)] w-full justify-center">
      {echoes.map((echo) => (
        <Echo key={echo.id} {...echo} withLink withTooltip withAnimation />
      ))}
    </div>
  );
}
