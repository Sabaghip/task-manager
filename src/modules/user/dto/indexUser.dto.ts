import { IsNumberString, IsOptional, IsString } from "class-validator"

export class IndexUserFilter {
  @IsOptional()
  @IsString()
  email?: string

  @IsString()
  @IsOptional()
  fullName?: string

  @IsNumberString()
  @IsOptional()
  mobile?: string

  @IsNumberString()
  @IsOptional()
  page?: number
}