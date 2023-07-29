"use client";

import { useMemo, useState } from "react";
import { Input } from "../Input";
import { EchoMetadata } from "@/types/echoMetadata";
import { Echo } from "../Echo";

interface Props {
  echoes: EchoMetadata[];
}

export function EchoSearch({ echoes }: Props) {
  const [searchText, setSearchText] = useState("");
  const filteredEchoes = useMemo(() => {
    const searchTextLower = searchText.toLowerCase();
    const echoSubset = searchText
      ? echoes.filter(({ name }) =>
          name.toLowerCase().includes(searchTextLower)
        )
      : echoes;

    return echoSubset;
  }, [echoes, searchText]);
  return (
    <>
      <div>
        <h2 className="font-bold text-2xl text-quill capitalize mb-1">
          Echoes
        </h2>
        <Input
          className="w-48"
          aria-label={`Search for echo`}
          placeholder={`Search for echo`}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,80px)] justify-center">
        {filteredEchoes.map((echo) => (
          <Echo key={echo.id} {...echo} withLink withTooltip withAnimation />
        ))}
      </div>
    </>
  );
}
