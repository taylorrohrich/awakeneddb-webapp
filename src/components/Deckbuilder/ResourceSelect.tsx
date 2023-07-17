import { CardType } from "@/types/cardType";
import { ResourceRecord } from "@/types/resourceRecord";
import { useMemo } from "react";
import { Echo } from "../Echo";
import { Card } from "../Card";

interface Props {
  resourceRecord: ResourceRecord;
  disabledIds: number[];
  type: CardType.MAGIC | CardType.COMPANION | "echo";
  onClick: (
    type: CardType.MAGIC | CardType.COMPANION | "echo",
    id: number
  ) => void;
}

export function ResourceSelect({
  resourceRecord,
  type,
  onClick,
  disabledIds,
}: Props) {
  const resourceItems = useMemo(() => {
    const resourceInfo = Object.entries(resourceRecord[type]).map(
      ([id, name]) => ({
        id: Number(id),
        name,
      })
    );
    if (type === "echo") {
      return resourceInfo.map((echo) => {
        const disabled = disabledIds.includes(echo.id);
        return (
          <button
            key={echo.id}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onClick("echo", echo.id)}
            disabled={disabled}
          >
            <Echo {...echo} withTooltip={!disabled} withAnimation={!disabled} />
          </button>
        );
      });
    }
    return resourceInfo.map((card) => {
      const disabled = disabledIds.includes(card.id);
      return (
        <button
          key={card.id}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => onClick(type, card.id)}
          disabled={disabled}
        >
          <Card
            {...card}
            type={type}
            withAnimation={!disabled}
            withTooltip={!disabled}
          />
        </button>
      );
    });
  }, [disabledIds, onClick, resourceRecord, type]);

  return (
    <>
      <h2 className="font-bold text-2xl text-quill capitalize">
        Select {type}
      </h2>
      <div className="p-6 grid gap-2 grid-cols-[repeat(auto-fill,80px)] w-full justify-center">
        {resourceItems}
      </div>
    </>
  );
}
