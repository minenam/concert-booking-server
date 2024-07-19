import { ApiProperty } from '@nestjs/swagger';
import { CommonResponseDto } from './common.dto';

export class GetAvailableSeatsResponseDto extends CommonResponseDto {
  @ApiProperty({ type: Number, isArray: true })
  seats: number[];
}
