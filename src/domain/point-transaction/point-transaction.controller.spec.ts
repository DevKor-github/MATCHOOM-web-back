import { Test, TestingModule } from '@nestjs/testing';
import { PointTransactionController } from './point-transaction.controller';

describe('PointTransactionController', () => {
  let controller: PointTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PointTransactionController],
    }).compile();

    controller = module.get<PointTransactionController>(PointTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
