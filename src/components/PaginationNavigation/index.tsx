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
  const prevPageText = `Page ${previousPage}`;
  const nextPageText = `Page ${nextPage}`;
  return (
    <div className="grid grid-cols-3 w-full">
      {shouldShowPrevious ? (
        <button
          className="flex items-center gap-1 place-self-start"
          onClick={() => queryParams.set([["page", previousPage]], true)}
        >
          <FontAwesomeIcon
            className="text-base text-indigo-500"
            icon={faChevronLeft}
          />
          <div>{prevPageText}</div>
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
          <div>{nextPageText}</div>
          <FontAwesomeIcon
            className="text-base text-indigo-500"
            icon={faChevronRight}
          />
        </button>
      ) : (
        <div />
      )}
    </div>
  );
}
