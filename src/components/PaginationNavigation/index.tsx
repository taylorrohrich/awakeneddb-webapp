"use client";

import { LIMIT_VALUES } from "@/constants/pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useQueryParams } from "@/helpers/useQueryParams";
interface Props {
  page: number;
  limit: number;
  total: number;
}
export function PaginationNavigation({ page, limit, total }: Props) {
  const queryParams = useQueryParams();
  if (total <= LIMIT_VALUES[0]) {
    return null;
  }
  const previousPage = page - 1;
  const nextPage = page + 1;
  const shouldShowPrevious = previousPage > 0;
  const shouldShowNext = page * limit < total;
  const maxPage = Math.ceil(total / limit);

  return (
    <div className="grid grid-cols-3 w-full">
      {shouldShowPrevious ? (
        <button
          className="flex items-center gap-1 place-self-start"
          onClick={() => queryParams.set([["page", previousPage]], true)}
        >
          <FontAwesomeIcon
            className="w-3 text-indigo-500"
            icon={faChevronLeft}
          />
          <div>{`Page ${previousPage}`}</div>
        </button>
      ) : (
        <div />
      )}
      <div className="place-self-center">{`Page ${page} of ${maxPage}`}</div>
      {shouldShowNext ? (
        <button
          className="flex items-center gap-1 place-self-end"
          onClick={() => queryParams.set([["page", nextPage]], true)}
        >
          <div>{`Page ${nextPage}`}</div>
          <FontAwesomeIcon
            className="w-3 text-indigo-500"
            icon={faChevronRight}
          />
        </button>
      ) : (
        <div />
      )}
    </div>
  );
}
