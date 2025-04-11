import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { Repository } from 'typeorm';
import { ISessionType } from './types/session.type';
import axios from 'axios';
import { IP_API } from 'src/config/config';

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

  async getSessionById(id: string) {
    return await this.sessionRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async findExistingSession(
    userId: string,
    fingerprint: string,
    userAgent: string,
    ip: string,
  ) {
    const response = await axios.get(`${IP_API}/${ip}/json/`);
    const country = response.data;

    return this.sessionRepository.findOne({
      where: {
        user: { id: userId },
        fingerprint,
        user_agent: userAgent,
        is_active: true,
        countryCode: country.country_code,
      },
    });
  }
}
