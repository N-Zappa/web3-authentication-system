import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { Repository } from 'typeorm';
import { ISessionType } from './types/session.type';

export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
  ) {}

  async createSession(sessionDto: ISessionType) {
    return await this.sessionRepository.save(sessionDto);
  }

  async getSessionByUserId(userId: string) {
    return await this.sessionRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }
}
