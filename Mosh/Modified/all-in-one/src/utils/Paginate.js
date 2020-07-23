import Lodash from "lodash";

export function paginate(items, currentPage, pageNo) {
  const startMovie = (currentPage - 1) * pageNo;

  return Lodash(items).slice(startMovie).take(pageNo).value();
}
