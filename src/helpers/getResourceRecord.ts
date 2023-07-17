import { CardMetadata } from "@/types/cardMetadata";
import { EchoMetadata } from "@/types/echoMetadata";
import { getCardAggregateType } from "./getCardAggregateType";
import { CardType } from "@/types/cardType";
import { ResourceRecord } from "@/types/resourceRecord";

export function getResourceRecord(
  cards: CardMetadata[],
  echoes: EchoMetadata[]
) {
  const magicCards: CardMetadata[] = [];
  const companionCards: CardMetadata[] = [];
  cards.forEach((card) => {
    if (
      getCardAggregateType(card.types.map(({ name }) => name)) ===
      CardType.MAGIC
    ) {
      magicCards.push(card);
    } else {
      companionCards.push(card);
    }
  });
  const record: ResourceRecord = {
    [CardType.MAGIC]: {},
    [CardType.COMPANION]: {},
    echo: {},
  };
  echoes.forEach(({ id, name }) => {
    record.echo[id] = name;
  });
  magicCards.forEach(({ id, name }) => {
    record[CardType.MAGIC][id] = name;
  });
  companionCards.forEach(({ id, name }) => {
    record[CardType.COMPANION][id] = name;
  });
  return record;
}
