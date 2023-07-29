import { CardType } from "@/types/cardType";
import { useReducer } from "react";

export interface DeckState {
  inProgress: boolean;
  magicCardIds: (number | undefined)[];
  companionCardIds: (number | undefined)[];
  echoId?: number;
  tagId?: number;
  name: string;
  description: string;
  activeIndex?: number;
  activeType: CardType.MAGIC | CardType.COMPANION | "echo";
}
const defaultDeckState: DeckState = {
  inProgress: true,
  magicCardIds: new Array(8).fill(undefined),
  companionCardIds: new Array(3).fill(undefined),
  echoId: undefined,
  name: "",
  tagId: undefined,
  description: "",
  activeIndex: undefined,
  activeType: "echo",
};

function withIsCardSelectionComplete(state: DeckState): DeckState {
  let isComplete = true;
  if (state.magicCardIds.some((id) => id == null)) {
    isComplete = false;
  }
  if (state.companionCardIds.some((id) => id == null)) {
    isComplete = false;
  }
  if (state.echoId == null) {
    isComplete = false;
  }
  return { ...state, inProgress: !isComplete };
}

interface UpdateMagicCardAction {
  type: "update-magic-card";
  cardId: number;
}
interface UpdateCompanionCardAction {
  type: "update-companion-card";
  cardId: number;
}

interface UpdateEchoAction {
  type: "update-echo";
  echoId: number;
}

interface UpdateNameAction {
  type: "update-name";
  name: string;
}
interface UpdateDescriptionAction {
  type: "update-description";
  description: string;
}

interface UpdateTagAction {
  type: "update-tag";
  tagId: number;
}

interface UpdateSelectedAction {
  type: "update-selected";
  activeIndex?: number;
  activeType: DeckState["activeType"];
}

function setIndexValue(
  arr: (number | undefined)[],
  index: number,
  newValue: number
) {
  return arr.map((value, i) => (i === index ? newValue : value));
}

type Action =
  | UpdateMagicCardAction
  | UpdateCompanionCardAction
  | UpdateEchoAction
  | UpdateNameAction
  | UpdateDescriptionAction
  | UpdateSelectedAction
  | UpdateTagAction;

export function reducer(state: DeckState, action: Action): DeckState {
  switch (action.type) {
    case "update-magic-card": {
      const magicAlreadySelected = state.magicCardIds.indexOf(action.cardId);
      if (magicAlreadySelected >= 0 || state.activeIndex == null) {
        return state;
      }
      return withIsCardSelectionComplete({
        ...state,
        magicCardIds: setIndexValue(
          state.magicCardIds,
          state.activeIndex,
          action.cardId
        ),
        ...(state.activeIndex < 7
          ? { activeIndex: state.activeIndex + 1 }
          : { activeIndex: 0, activeType: CardType.COMPANION }),
      });
    }
    case "update-companion-card": {
      const companionAlreadySelected = state.companionCardIds.indexOf(
        action.cardId
      );
      if (companionAlreadySelected >= 0 || state.activeIndex == null) {
        return state;
      }
      return withIsCardSelectionComplete({
        ...state,
        companionCardIds: setIndexValue(
          state.companionCardIds,
          state.activeIndex,
          action.cardId
        ),
        ...(state.activeIndex < 2
          ? { activeIndex: state.activeIndex + 1 }
          : {}),
      });
    }
    case "update-echo":
      return withIsCardSelectionComplete({
        ...state,
        echoId: action.echoId,
        activeIndex: 0,
        activeType: CardType.MAGIC,
      });
    case "update-tag": {
      return { ...state, tagId: action.tagId };
    }
    case "update-description": {
      return { ...state, description: action.description };
    }
    case "update-name": {
      return { ...state, name: action.name };
    }
    case "update-selected": {
      const toggling =
        action.activeIndex === state.activeIndex &&
        action.activeType === state.activeType;
      return {
        ...state,
        inProgress: toggling ? !state.inProgress : true,
        activeType: action.activeType,
        activeIndex: action.activeIndex,
      };
    }
  }
}
export function useDeckbuilderReducer(initialState?: Partial<DeckState>) {
  return useReducer(
    reducer,
    initialState
      ? { ...defaultDeckState, ...initialState, inProgress: false }
      : defaultDeckState
  );
}

export function getDeckStateIds(state: DeckState) {
  const { echoId, magicCardIds, companionCardIds } = state as DeckState;
  return {
    echoId: echoId,
    magicCardOneId: magicCardIds[0],
    magicCardTwoId: magicCardIds[1],
    magicCardThreeId: magicCardIds[2],
    magicCardFourId: magicCardIds[3],
    magicCardFiveId: magicCardIds[4],
    magicCardSixId: magicCardIds[5],
    magicCardSevenId: magicCardIds[6],
    magicCardEightId: magicCardIds[7],
    companionCardOneId: companionCardIds[0],
    companionCardTwoId: companionCardIds[1],
    companionCardThreeId: companionCardIds[2],
  };
}
