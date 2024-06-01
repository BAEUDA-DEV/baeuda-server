import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';

export const ApiPaginationResponse = <T extends Type<unknown>>(data: T) =>
  applyDecorators(
    ApiExtraModels(PaginationRes, data),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginationRes) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(data) },
              },
            },
          },
        ],
      },
    }),
  );

interface IPaginationRes<T> {
  total: number;
  skip: number;
  take: number;
  hasNext: boolean;
  data: T;
}

export class PaginationRes<T> implements IPaginationRes<T> {
  @ApiProperty()
  @IsNumber()
  total: number;

  @ApiProperty()
  @IsNumber()
  skip: number;

  @ApiProperty()
  @IsNumber()
  take: number;

  @ApiProperty()
  @IsBoolean()
  hasNext: boolean;

  @ApiProperty()
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
