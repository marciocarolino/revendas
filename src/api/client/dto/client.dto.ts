import { ApiProperty } from '@nestjs/swagger';

export class ClientDto {
  @ApiProperty({ description: 'id user', example: 1 })
  user: number;

  @ApiProperty({ description: 'name client', example: 'name client' })
  name: string;

  @ApiProperty({ description: 'email client', example: 'email@client.com.br' })
  email: string;

  @ApiProperty({ description: 'phone client', example: '(00)00000-0000' })
  phone: string;

  @ApiProperty({ description: 'money value', example: '20,00' })
  value: string;

  @ApiProperty({ description: ' start date client', example: new Date() })
  date_start: Date;

  @ApiProperty({ description: ' end date client', example: new Date() })
  date_end: Date;

  @ApiProperty({ description: 'client actived', example: true })
  isActive: boolean;
}
