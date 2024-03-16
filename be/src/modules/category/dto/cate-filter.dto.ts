import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CateFilter{
  @ApiPropertyOptional()
  categoryId: number;

  @ApiPropertyOptional()
  name: string;
}