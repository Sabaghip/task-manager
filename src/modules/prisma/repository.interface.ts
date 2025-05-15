export interface IRepository<T> {
  create(data: any): Promise<T>
  update?(id: any, data: Partial<T>): Promise<T>
  findById?(id: any): Promise<T>
  findMany?(filters?: any, page?: number): Promise<T[]>
  findOneWhere?(filters?: any): Promise<T>
  destroy?(id: any): Promise<T>
}