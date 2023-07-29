import { CardType } from "@/types/cardType";
import { ResourceRecord } from "@/types/resourceRecord";
import { useMemo, useState } from "react";
import { Echo } from "../Echo";
import { Card } from "../Card";
import { Input } from "../Input";
import { orderBy } from "lodash";

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
  const [searchText, setSearchText] = useState("");
  const resourceItems = useMemo(() => {
    const searchTextLower = searchText.toLowerCase();
    let resourceInfo = Object.entries(resourceRecord[type]).map(
      ([id, rest]) => ({
        id: Number(id),
        ...rest,
      })
    );
    if (searchText) {
      resourceInfo = resourceInfo.filter(({ name }) =>
        name.toLowerCase().includes(searchTextLower)
      );
    }
    if (type === "echo") {
      return resourceInfo.map((echo) => {
        const disabled = disabledIds.includes(echo.id);
        return (
          <button
            aria-label={echo.name}
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
    return orderBy(
      resourceInfo as { id: number; name: string; cost: number }[],
      "cost"
    ).map((card) => {
      const disabled = disabledIds.includes(card.id);
      return (
        <button
          aria-label={card.name}
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
  }, [disabledIds, onClick, resourceRecord, searchText, type]);

  return (
    <div>
      <h2 className="font-bold text-2xl text-quill capitalize mb-3">
        Select {type}
      </h2>
      <Input
        className="w-48"
        aria-label={`Search for ${type}`}
        placeholder={`Search for ${type}`}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className="p-6 grid gap-2 grid-cols-[repeat(auto-fill,80px)] w-full justify-center">
        {resourceItems}
      </div>
    </div>
  );
}
