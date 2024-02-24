import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'name', example: 'name user' })
  name: string;

  @ApiProperty({ description: 'email', example: 'email@email.com' })
  email: string;

  @ApiProperty({ description: 'password', example: '123456' })
  password: string;

  @ApiProperty({ description: 'isActive', default: true, example: true })
  isActive: boolean;

  @ApiProperty({ description: 'isAdmin', example: true })
  isAdmin: boolean;

  @ApiProperty({ description: 'created_at', example: new Date() })
  created_at: Date;

  @ApiProperty({ description: 'updated_at', example: new Date() })
  updated_at: Date;
}
