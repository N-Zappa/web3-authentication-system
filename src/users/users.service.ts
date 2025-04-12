import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { IUserType } from './types/users.type';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async existsByWallet(wallet: string): Promise<boolean> {
    return await this.usersRepository.exists({
      where: { wallet: wallet.toLowerCase() },
    });
  }

  async saveUser(userDto: IUserType): Promise<IUserType & User> {
    return await this.usersRepository.save(userDto);
  }

  async getUserByWallet(wallet: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: { wallet: wallet.toLowerCase() },
    });
  }
}
