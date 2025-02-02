import { Test, TestingModule } from '@nestjs/testing';
import { PointTransactionService } from './point-transaction.service';

describe('PointTransactionService', () => {
  let service: PointTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PointTransactionService],
    }).compile();

    service = module.get<PointTransactionService>(PointTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
