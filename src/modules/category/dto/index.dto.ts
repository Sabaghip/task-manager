import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class IndexCategoryDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    title?: string

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    userId?: string
}