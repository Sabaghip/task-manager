import { IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class LoginDto {
  @IsString()
  @IsEmail()
  @IsOptional()
  @IsNotEmpty()
  email?: string

  @IsString()
  @IsMobilePhone()
  @IsOptional()
  @IsNotEmpty()
  mobile?: string

  @IsString()
  @IsNotEmpty()
  password: string
}

export class SignUpDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsMobilePhone()
  @IsNotEmpty()
  mobile: string

  @IsString()
  @IsNotEmpty()
  fullName: string

  @IsString()
  @IsNotEmpty()
  password: string
}
