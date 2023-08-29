"use client";

import { useCallback, useMemo } from "react";
import { DeckState, getDeckStateIds, useDeckbuilderReducer } from "./helpers";
import { ResourceRecord } from "@/types/resourceRecord";
import { DeckBody } from "../Deck/DeckBody";
import { CardType } from "@/types/cardType";
import { ResourceSelect } from "./ResourceSelect";
import { Echo } from "../Echo";
import { twMerge } from "tailwind-merge";
import { Input } from "../Input";
import { Tag } from "@/types/tag";
import { TextArea } from "../TextArea";
import { Button } from "../Button";
import {
  useAddDeck,
  useDeleteDeck,
  useGetDeckCode,
  useUpdateDeck,
} from "@/services/client/deck";
import { DeckCodeGetRequest, DeckPostRequest } from "@/types/api/deck";
import { TagSelect } from "../TagSelect";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { Cost } from "../Cost";
import { LinkButton } from "../LinkButton";
interface Props {
  resourceRecord: ResourceRecord;
  tags: Tag[];
  initialState?: Partial<DeckState>;
  deckId?: number;
  mode: "deckbuilder" | "user";
}

export function Deckbuilder({
  resourceRecord,
  tags,
  initialState,
  deckId,
  mode,
}: Props) {
  const [state, dispatch] = useDeckbuilderReducer(initialState);
  const router = useRouter();
  const deckBodyProps = useMemo(() => {
    const magicCards = state.magicCardIds.map((id) =>
      id
        ? {
            id,
            name: resourceRecord.Magic[id].name,
          }
        : undefined
    );
    const companionCards = state.companionCardIds.map((id) =>
      id
        ? {
            id,
            name: resourceRecord.Companion[id].name,
          }
        : undefined
    );
    return { magicCards, companionCards };
  }, [
    resourceRecord.Companion,
    resourceRecord.Magic,
    state.companionCardIds,
    state.magicCardIds,
  ]);

  const selectedEchoInfo = state.echoId
    ? { id: state.echoId, name: resourceRecord.echo[state.echoId].name }
    : undefined;

  const onClickCard = useCallback(
    (index: number, type: CardType.MAGIC | CardType.COMPANION) =>
      dispatch({
        type: "update-selected",
        activeIndex: index,
        activeType: type,
      }),
    [dispatch]
  );
  const onChooseCard = useCallback(
    (type: CardType.MAGIC | CardType.COMPANION | "echo", id: number) => {
      switch (type) {
        case CardType.MAGIC:
        case CardType.COMPANION:
          dispatch({
            type:
              type === CardType.MAGIC
                ? "update-magic-card"
                : "update-companion-card",

            cardId: id,
          });
          break;
        case "echo":
          dispatch({ type: "update-echo", echoId: id });
      }
    },
    [dispatch]
  );

  const disabledIds = useMemo(() => {
    switch (state.activeType) {
      case CardType.MAGIC:
        return state.magicCardIds.filter((id) => id != null) as number[];
      case CardType.COMPANION:
        return state.companionCardIds.filter((id) => id != null) as number[];
      case "echo":
        return state.echoId ? [state.echoId] : [];
    }
  }, [
    state.activeType,
    state.companionCardIds,
    state.echoId,
    state.magicCardIds,
  ]);

  const addDeck = useAddDeck();
  const updateDeck = useUpdateDeck();
  const deleteDeck = useDeleteDeck();

  const isValidDeck = useMemo(() => {
    const magicComplete =
      state.magicCardIds.filter((c) => c != null).length === 8;
    const companionComplete =
      state.companionCardIds.filter((c) => c != null).length === 3;
    const echoComplete = state.echoId != null;
    return magicComplete && companionComplete && echoComplete;
  }, [state.companionCardIds, state.echoId, state.magicCardIds]);

  const isValidSubmission = useMemo(() => {
    return (
      isValidDeck && state.tagId != null && state.name && state.description
    );
  }, [isValidDeck, state.description, state.name, state.tagId]);

  const submitDeck = useCallback(async () => {
    const isUpdate = deckId != null;
    try {
      const { name, description, tagId } = state as DeckState;
      const body = {
        name: name,
        description: description,
        tagId: tagId,
        ...getDeckStateIds(state),
      } as DeckPostRequest;
      let result: Response | undefined;
      if (deckId) {
        result = await updateDeck(deckId, body);
      } else {
        result = await addDeck(body);
      }
      if (result.ok) {
        toast.success(`Deck ${isUpdate ? "updated" : "added"}`);
        router.push(ROUTES.profileDeck);
        router.refresh();
      } else {
        const body = await result.json();
        if (body?.errors?.length === 1) {
          toast.error(body.errors[0]);
        } else {
          toast.error(`Error ${isUpdate ? "updating" : "adding"} deck`);
        }
      }
    } catch {
      toast.error(`Error ${isUpdate ? "updating" : "adding"} deck`);
    }
  }, [deckId, state, updateDeck, addDeck, router]);

  const onDelete = useCallback(async () => {
    if (!deckId) return;
    const result = await deleteDeck(deckId);
    if (result.ok) {
      toast.success("Deck deleted");
      router.push(ROUTES.profileDeck);
      router.refresh();
    } else {
      toast.error("Error deleting deck");
    }
  }, [deckId, deleteDeck, router]);

  const avgCost = useMemo(() => {
    const currentIds = state.magicCardIds.filter(
      (id) => id != null
    ) as number[];
    if (!currentIds.length) return 0;

    const cost = currentIds.reduce(
      (acc, id) => acc + resourceRecord.Magic[String(id)].cost,
      0
    );
    return cost / currentIds.length;
  }, [resourceRecord.Magic, state.magicCardIds]);

  const saveDeckRoute = useMemo(() => {
    if (state.inProgress) return "";
    const queryString = new URLSearchParams({
      companionIds: state.companionCardIds.join(","),
      magicIds: state.magicCardIds.join(","),
      echoId: String(state.echoId),
    });
    return `${ROUTES.profileDeckAdd}?${queryString}`;
  }, [
    state.companionCardIds,
    state.echoId,
    state.inProgress,
    state.magicCardIds,
  ]);

  const getDeckCode = useGetDeckCode();

  const onCopy = useCallback(async () => {
    try {
      // Safari
      if (typeof ClipboardItem && navigator.clipboard.write) {
        const text = new ClipboardItem({
          "text/plain": getDeckCode(
            getDeckStateIds(state) as DeckCodeGetRequest
          ).then(({ code }) => new Blob([code], { type: "text/plain" })),
        });
        await navigator.clipboard.write([text]);
        toast.success("Deck copied to clipboard!");
      } else {
        const result = await getDeckCode(
          getDeckStateIds(state) as DeckCodeGetRequest
        );
        navigator.clipboard.writeText(result.code);
        toast.success("Deck copied to clipboard!");
      }
    } catch {
      toast.error("Error copying deck to clipbooard");
    }
  }, [getDeckCode, state]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <button
            aria-label={selectedEchoInfo?.name ?? "Empty Echo"}
            className={twMerge(
              state.inProgress && state.activeType === "echo"
                ? "animate-grow"
                : undefined
            )}
            onClick={() =>
              dispatch({
                type: "update-selected",
                activeType: "echo",
              })
            }
          >
            <Echo {...selectedEchoInfo} />
          </button>
          <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-slate-700 text-white">
            <div className="font-bold">{avgCost.toFixed(1)}</div>
            <Cost size="sm" />
          </div>

          <DeckBody
            {...deckBodyProps}
            onClick={onClickCard}
            activeIndex={state.inProgress ? state.activeIndex : undefined}
            activeType={state.inProgress ? state.activeType : undefined}
          />
        </div>
        {state.inProgress && (
          <ResourceSelect
            disabledIds={disabledIds}
            onClick={onChooseCard}
            resourceRecord={resourceRecord}
            type={state.activeType}
          />
        )}
      </div>
      {!state.inProgress && mode === "user" && (
        <>
          <div className="flex gap-6 items-center items-between">
            <div>
              <label className="font-semibold text-lg" htmlFor="deck-name">
                Deck Name
              </label>
              <Input
                id="deck-name"
                value={state.name}
                onChange={(e) => {
                  dispatch({
                    type: "update-name",
                    name: e.target.value,
                  });
                }}
                placeholder="Deck Name"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-lg" htmlFor="tag-select">
                Tag
              </label>
              <TagSelect
                id="tag-select"
                tagId={state.tagId}
                tags={tags}
                onChange={(id) => {
                  dispatch({ type: "update-tag", tagId: id as number });
                }}
              />
            </div>
          </div>
          <div>
            <label className="font-semibold text-lg" htmlFor="deck-description">
              Description
            </label>
            <TextArea
              id="deck-description"
              placeholder="Deck Description (Supports Markdown!)"
              rows={10}
              value={state.description}
              onChange={(e) => {
                dispatch({
                  type: "update-description",
                  description: e.target.value,
                });
              }}
            />
          </div>
          <div className="flex justify-end gap-3">
            {deckId && (
              <Button
                className="bg-red-600 hover:bg-red-300"
                onClick={onDelete}
              >
                Delete
              </Button>
            )}
            <Button onClick={submitDeck} disabled={!isValidSubmission}>
              {deckId ? "Update" : "Submit"}
            </Button>
          </div>
        </>
      )}
      {/* {!state.inProgress && mode === "deckbuilder" && (
        <div className="flex gap-3">
          <LinkButton href={saveDeckRoute}>Save Deck</LinkButton>
          <Button
            className="flex gap-1 items-center"
            onClick={onCopy}
            disabled={!isValidDeck}
          >
            <FontAwesomeIcon className="font-md" icon={faCopy} /> Copy
          </Button>
        </div>
      )} */}
    </div>
  );
}
