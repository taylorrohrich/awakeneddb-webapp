"use client";

import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";
import { toast } from "react-toastify";

interface Props {
  code: string;
}
export function CodeButton({ code }: Props) {
  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(code);
    toast.success("Deck copied to clipboard!");
  }, [code]);

  return (
    <Button className="flex gap-1 items-center" onClick={copyToClipboard}>
      <FontAwesomeIcon className="font-md" icon={faCopy} /> Copy
    </Button>
  );
}
