import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async getOrCreateUser(oauthId: string) {
    let user = await this.userRepository.findOne({ where: { oauthId } });
    if (!user) {
      user = this.userRepository.create({ oauthId });
      await this.userRepository.save(user);
    }

    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException("존재하지 않는 사용자 입니다.");

    const { name, phone, bank, account } = updateUserDto;

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.bank = bank || user.bank;
    user.account = account || user.account;

    await this.userRepository.save(user);

    return { message: "유저 정보 수정 성공" };
  }
}