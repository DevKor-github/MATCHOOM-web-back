import { Controller, Delete, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Get()
  @UseGuards(AuthGuard('jwt-access'))
  async getMyInfo() {

  }

  @Patch()
  @UseGuards(AuthGuard('jwt-access'))
  async updateUser() {

  }

  @Delete()
  @UseGuards(AuthGuard('jwt-refresh'))
  async deleteUser() {
    
  }
}
