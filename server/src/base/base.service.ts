import { SelectQueryBuilder, ObjectLiteral } from 'typeorm';

export class BaseService<T extends ObjectLiteral> {
  async getManyAndCount(
    queryBuilder: SelectQueryBuilder<T>,
    offset: number = 0,
    limit: number = 0,
  ): Promise<[T[], number]> {
    if (offset !== 0 || limit !== 0) {
      queryBuilder = queryBuilder.skip(offset).take(limit);
    }

    const [data, totalRows] = await queryBuilder.getManyAndCount();
    return [data, totalRows];
  }
}
