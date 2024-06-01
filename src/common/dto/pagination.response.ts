interface IPaginationRes<T> {
  total: number;
  skip: number;
  take: number;
  hasNext: boolean;
  data: T;
}

export class PaginationRes<T> implements IPaginationRes<T> {
  total: number;
  skip: number;
  take: number;
  hasNext: boolean;
  data: T;

  constructor(
    total: number,
    skip: number,
    take: number,
    hasNext: boolean,
    data: T,
  ) {
    this.total = total;
    this.skip = skip;
    this.take = take;
    this.hasNext = hasNext;
    this.data = data;
  }

  public static from<T>(props: IPaginationRes<T>): PaginationRes<T> {
    return new PaginationRes<T>(
      props.total,
      props.skip,
      props.take,
      props.hasNext,
      props.data,
    );
  }
}
