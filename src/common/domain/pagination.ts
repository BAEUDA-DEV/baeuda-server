import { PaginationRes } from '@/common/dto/pagination.response';

interface IPagination<T> {
  total: number;
  skip: number;
  take: number;
  hasNext: boolean;
  data: T;
}

export class Pagination<T> implements IPagination<T> {
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

  public static from<T>(props: IPagination<T>): Pagination<T> {
    return new Pagination(
      props.total,
      props.skip,
      props.take,
      props.hasNext,
      props.data,
    );
  }

  public toRes<R>(dataToResCallback: (data: T) => R): PaginationRes<R> {
    return PaginationRes.from<R>({
      total: this.total,
      skip: this.skip,
      take: this.take,
      hasNext: this.hasNext,
      data: dataToResCallback(this.data),
    });
  }
}
