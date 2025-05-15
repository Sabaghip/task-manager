import { Injectable } from '@nestjs/common'

@Injectable()
export class PaginationProvider {
  size: number
  constructor() {
    this.size = 20
  }

  skip(page: number): number {
    return (page - 1) * this.size
  }

  builder<T>(currentPage: number, totalCount: number, data: T[]): {
    totalPage: number,
    currentPage: number,
    totalCount: number,
    data: T[]
  } {
    return {
      totalPage: Math.ceil(totalCount / this.size),
      currentPage: currentPage || null,
      totalCount,
      data
    };
  }


}