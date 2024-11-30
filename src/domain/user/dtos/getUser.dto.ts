import { ApiProperty } from "@nestjs/swagger";
import { User } from "../entities/user.entity";

class GetUserResDto {
  constructor(user: User) {
    this.name = user.name;
    this.phone = user.phone;
    this.bank = user.bank;
    this.account = user.account;
  }

  @ApiProperty({ example: "이름" })
  name: string;

  @ApiProperty({ example: "0100000000" })
  phone: string;

  @ApiProperty({ example: "하나은행" })
  bank: string;

  @ApiProperty({ example: "33333333333" })
  account: string;
}

export { GetUserResDto }
