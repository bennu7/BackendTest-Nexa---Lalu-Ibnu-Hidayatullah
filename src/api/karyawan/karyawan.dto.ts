import {
  IsOptional,
  IsString,
  IsInt,
  IsEnum,
  IsDateString,
} from "class-validator";
import { Transform } from "class-transformer";

export class KaryawanQueryParams {
  @IsOptional()
  @IsString({ message: "Keyword harus berupa string" })
  keyword?: string;

  @IsOptional()
  @IsInt({ message: "Start harus berupa angka" })
  start?: number;

  @IsOptional()
  @IsInt({ message: "Count harus berupa angka" })
  count?: number;

  @IsOptional()
  @IsEnum(["ASC", "DESC"], {
    message: "Sort by harus berupa enum ASC atau DESC",
  })
  sort_by?: "ASC" | "DESC";
}

export class KaryawanRegisterDto {
  @IsString()
  nama: string;

  @IsOptional()
  @IsString()
  alamat?: string;

  @IsOptional()
  @IsEnum(["L", "P"], { message: "gend harus berupa enum L atau P" })
  gend?: string;

  @IsOptional()
  @IsDateString()
  tgl_lahir?: Date;
}

export class KaryawanUpdateDto {
  @IsOptional()
  @IsString()
  nama?: string;

  @IsOptional()
  @IsString()
  alamat?: string;

  @IsOptional()
  @IsEnum(["L", "P"], { message: "gend harus berupa enum L atau P" })
  gend?: string;

  @IsOptional()
  @IsDateString()
  tgl_lahir?: Date;
}

export class KaryawanParamDto {
  @IsString()
  @Transform(({ value }) => String(value))
  nip: string;
}

export class KaryawanNonActifBodyDto {
  @IsInt({ always: true })
  @IsEnum([1, 2, 3, 4, 5, 6, 7, 8, 9], {
    message: "Status harus berupa satu nilai 1 hingga 9",
  })
  status: number;
}
