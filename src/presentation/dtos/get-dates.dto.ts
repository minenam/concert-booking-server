import { ApiProperty } from '@nestjs/swagger';
import { CommonResponseDto } from './common.dto';

export class GetAvailableDatesResponseDto extends CommonResponseDto {
  @ApiProperty({ type: String, isArray: true })
  dates: string[];
}
