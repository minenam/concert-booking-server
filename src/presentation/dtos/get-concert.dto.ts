import { Concert } from '@domain/entities/concert.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CommonResponseDto } from './common.dto';

export class GetConcertsResponseDto extends CommonResponseDto {
  @ApiProperty()
  concerts: Concert[];
}
