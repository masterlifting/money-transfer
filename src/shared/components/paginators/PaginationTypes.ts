/** @format */

export type PaginationPageItemsCountType = 10 | 20 | 30 | 40 | 50;

export interface IPagination {
  itemsTotalCount: number;
  pageNumber: number;
  pageItemsCount: PaginationPageItemsCountType;
}
