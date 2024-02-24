import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from 'src/db/entity/client.entity';
import { ClientDto } from './dto/client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async getAllClient(): Promise<Client[]> {
    return await this.clientService.findAll();
  }

  @Get(':id')
  async getFindById(@Param('id') id: number): Promise<Client> {
    return await this.clientService.findOneClient(id);
  }

  @Post(':id')
  async createClient(
    @Param('id') id: number,
    @Body() createClient: ClientDto,
  ): Promise<Client> {
    return await this.clientService.createClient(id, createClient);
  }
}
