import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/common/injectable/prisma.service';

import { QuizLogType } from '@/module/quiz/domain/quiz-log';

@Injectable()
export class QuizLogSerivce {
  constructor(private readonly prisma: PrismaService) {}

  async countAll(
    props: {
      where?: Prisma.QuizLogWhereInput;
    },
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<number> {
    return tx.quizLog.count(props);
  }

  async findAll(
    props: {
      where?: Prisma.QuizLogWhereInput;
      include?: Prisma.QuizLogInclude;
      skip?: number;
      take?: number;
    },
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<QuizLogType[]> {
    return tx.quizLog.findMany(props);
  }

  async create(
    props: {
      data: Omit<Prisma.QuizLogCreateInput, 'id' | 'createAt' | 'updatedAt'>;
      include?: Prisma.QuizLogInclude;
    },
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<QuizLogType> {
    return tx.quizLog.create(props);
  }
}
