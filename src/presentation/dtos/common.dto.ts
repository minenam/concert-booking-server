import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CommonResponseDto {
  @ApiProperty({ type: HttpStatus })
  statusCode: HttpStatus;

  @ApiProperty()
  message: string;

  @ApiProperty()
  @IsOptional()
  error?: any;
}
