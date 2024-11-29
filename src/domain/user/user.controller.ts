import { Body, Controller, Delete, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserReqDto } from './dtos/updateUser.dto';
import { User } from 'src/common/decorators/user.decorator';
import { UserPayload } from 'src/common/interfaces/user.interface';
import { Docs } from './docs/user.decorator';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Get()
  @UseGuards(AuthGuard('jwt-access'))
  @Docs('getMyInfo')
  async getMyInfo(@User() user: UserPayload) {
    const id = user.id;
    return await this.userService.getMyInfo(id);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt-access'))
  @Docs('update')
  async updateUser(@Body() updateUserDto: UpdateUserReqDto, @User() user: UserPayload) {
    const id = user.id;
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Delete()
  @UseGuards(AuthGuard('jwt-refresh'))
  @Docs('delete')
  async deleteUser(@User() user: UserPayload) {
    const id = user.id;
    return await this.userService.deleteUser(id);
  }
}
