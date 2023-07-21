"use client";
import { DURATION_OPTIONS } from "@/constants/durationOptions";
import { Duration } from "@/types/duration";
import { Tag } from "@/types/tag";
import { useCallback, useMemo, useState } from "react";
import { Select } from "../Select";
import { COST_OPTIONS } from "@/constants/costOptions";
import { Button } from "@/components/Button";
import { useQueryParams } from "@/helpers/useQueryParams";
import { TagSelect } from "../TagSelect";

interface Props {
  duration: Duration;
  costLow: number;
  costHigh: number;
  tagId?: number;
  tags: Tag[];
}
export function DeckSearch({
  duration,
  costLow,
  costHigh,
  tagId,
  tags,
}: Props) {
  const [localCostRange, setLocalCostRange] = useState<[number, number]>([
    costLow,
    costHigh,
  ]);
  const [localTagId, setLocalTagId] = useState(tagId ?? undefined);
  const [localDuration, setLocalDuration] = useState(duration);

  const searchEnabled = useMemo(
    () =>
      localTagId != tagId ||
      localDuration !== duration ||
      costLow !== localCostRange[0] ||
      costHigh !== localCostRange[1],
    [
      costHigh,
      costLow,
      duration,
      localCostRange,
      localDuration,
      localTagId,
      tagId,
    ]
  );

  const updateCostRange = useCallback(
    (cost: number, type: "high" | "low") => {
      let currentLow = type === "low" ? cost : localCostRange[0];
      let currentHigh = type === "high" ? cost : localCostRange[1];
      if (type === "low" && currentLow > currentHigh) currentHigh = currentLow;
      else if (type === "high" && currentLow > currentHigh)
        currentLow = currentHigh;

      setLocalCostRange([currentLow, currentHigh]);
    },
    [localCostRange]
  );
  const queryParams = useQueryParams();

  const submitSearch = useCallback(() => {
    queryParams.set([
      ["duration", localDuration],
      ["costLow", localCostRange[0]],
      ["costHigh", localCostRange[1]],
      ["tagId", localTagId],
    ]);
  }, [localCostRange, localDuration, queryParams, localTagId]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-row items-end justify-center gap-y-2 gap-x-8 px-3 py-1 flex-wrap">
        <div className="flex flex-col">
          <label className="font-semibold text-lg" htmlFor="time-select">
            Time
          </label>
          <Select
            id="time-select"
            options={DURATION_OPTIONS}
            onChange={(id) => setLocalDuration(id)}
            value={localDuration}
          />
        </div>
        <div className="flex flex-col">
          <div className="font-semibold text-lg">Avg. Cost</div>
          <div className="flex items-center gap-1">
            <Select
              label="Avg. Cost Low"
              id="avg-cost-low-select"
              options={COST_OPTIONS}
              value={localCostRange[0]}
              onChange={(cost) => updateCostRange(cost, "low")}
            />
            <div className="w-2 border-black self-center border" />
            <Select
              label="Avg. Cost High"
              id="avg-cost-high-select"
              options={COST_OPTIONS}
              value={localCostRange[1]}
              onChange={(cost) => updateCostRange(cost, "high")}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-lg" htmlFor="tag-select">
            Tag
          </label>
          <TagSelect
            withAll
            id="tag-select"
            tagId={localTagId}
            tags={tags}
            onChange={(id) => {
              setLocalTagId(id);
            }}
          />
        </div>
      </div>
      <Button
        className="text-lg self-center"
        disabled={!searchEnabled}
        onClick={submitSearch}
      >
        Search Decks
      </Button>
    </div>
  );
}
