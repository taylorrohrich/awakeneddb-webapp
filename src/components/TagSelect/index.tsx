import { Tag } from "@/types/tag";
import { useMemo } from "react";
import { Select } from "../Select";

interface Props {
  tags: Tag[];
  tagId?: number;
  onChange: (newTagId?: number) => void;
  id: string;
  withAll?: boolean;
}
export function TagSelect({
  tags,
  tagId,
  onChange,
  id,
  withAll = false,
}: Props) {
  const tagOptions: {
    id: number | undefined;
    name: string;
    group: string | undefined;
  }[] = useMemo(() => {
    const baseTagOptions = tags.map(({ id, name, categoryName }) => ({
      id,
      name,
      group: categoryName,
    }));
    if (withAll) {
      return (
        [{ id: undefined, name: "All" }] as {
          id: number | undefined;
          name: string;
          group: string | undefined;
        }[]
      ).concat(baseTagOptions);
    }
    return baseTagOptions;
  }, [tags, withAll]);

  return (
    <Select id={id} value={tagId} options={tagOptions} onChange={onChange} />
  );
}
