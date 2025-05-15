import { IsEmail, IsMobilePhone, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator"

export class UpdateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  fullName?: string

  @IsNumberString()
  @IsMobilePhone()
  @IsOptional()
  @IsNotEmpty()
  mobile?: string

  @IsOptional()
  @IsString()
  password?: string

  @IsOptional()
  @IsString()
  lastPassword?: string
}

export class UpdateUserbyAdminDto {
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  fullName?: string

  @IsNumberString()
  @IsMobilePhone()
  @IsOptional()
  @IsNotEmpty()
  mobile?: string

  @IsOptional()
  @IsString()
  password?: string
}
