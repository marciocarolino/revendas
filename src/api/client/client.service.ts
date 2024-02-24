import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/db/entity/client.entity';
import { NotFound } from 'src/error/notFound';
import { Repository } from 'typeorm';
import { ClientDto } from './dto/client.dto';
import { User } from 'src/db/entity/user.entity';

export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientEntity: Repository<Client>,

    @InjectRepository(User)
    private readonly userEntity: Repository<User>,
  ) {}

  async findAll(): Promise<Client[]> {
    return await this.clientEntity.find({
      relations: { user: true },
      where: { isActive: true },
    });
  }

  async findOneClient(id: number): Promise<Client> {
    const findClient = await this.clientEntity.findOne({
      relations: { user: true },
      where: { id: id, isActive: true },
    });

    if (!findClient) {
      throw new NotFound(`Client not Found`);
    }

    return findClient;
  }

  async createClient(idUser: number, clientDto: ClientDto): Promise<Client> {
    const findUser = await this.userEntity.findOne({
      where: { id: idUser, isActive: true },
      select: ['id', 'name', 'email'],
    });

    if (!findUser) {
      throw new NotFound('Client not Found');
    }
    const createUser = this.clientEntity.create({
      user: findUser,
      name: clientDto.name,
      email: clientDto.email,
      phone: clientDto.phone,
      value: clientDto.value,
      date_start: new Date(),
      date_end: new Date(),
      isActive: clientDto.isActive,
    });

    return this.clientEntity.save(createUser);
  }
}
