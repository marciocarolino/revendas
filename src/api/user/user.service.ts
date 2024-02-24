import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { BcryptPaswword } from 'src/util/bcrypt.password';
import { NotFound } from 'src/error/notFound';

export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userEntity: Repository<User>,
  ) {}

  async findAll(
    page: number,
    perPage: number,
  ): Promise<{ users: User[]; total: number }> {
    const skip = Math.max((page - 1) * perPage, 0);
    const users = await this.userEntity.find({
      where: { isActive: true },
      skip: skip,
      take: perPage,
    });
    const total = await this.userEntity.count({
      where: { isActive: true },
    });

    return { users, total };
  }

  async findOne(id: number): Promise<User | null> {
    const findUser = await this.userEntity.findOne({
      where: { id: id, isActive: true },
    });

    if (!findUser) {
      throw new NotFound('User Not Found');
    }

    return findUser;
  }

  async saveUser(userDto: CreateUserDto): Promise<User> {
    const passwordCrypt = new BcryptPaswword();

    const createUSer = this.userEntity.create({
      name: userDto.name,
      email: userDto.email,
      password: await passwordCrypt.crypt(userDto.password),
      isActive: true,
      isAdmin: userDto.isAdmin,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return this.userEntity.save(createUSer);
  }

  async disableUser(id: number): Promise<User | null> {
    const findUser = await this.findOne(id);

    if (!findUser) {
      throw new NotFound('User Not Found');
    }

    if (!findUser.isAdmin) {
      throw new Error('User not Admin');
    }

    findUser.isActive = false;
    findUser.updated_at = new Date();

    return this.userEntity.save(findUser);
  }
}
