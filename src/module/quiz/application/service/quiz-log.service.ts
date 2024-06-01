import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/common/injectable/prisma.service';

import { QuizLogType } from '@/module/quiz/domain/quiz-log';

@Injectable()
export class QuizLogSerivce {
  constructor(private readonly prisma: PrismaService) {}

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
