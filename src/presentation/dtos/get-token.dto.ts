import { ApiProperty } from '@nestjs/swagger';

export class GetTokenBodyDto {
  @ApiProperty()
  userId: string;
}
