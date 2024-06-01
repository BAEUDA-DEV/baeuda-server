import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/common/injectable/prisma.service';
import { QuizType } from '@/module/quiz/domain/quiz';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  async countAll(
    where?: Prisma.QuizWhereInput,
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<number> {
    return tx.quiz.count({ where });
  }

  async findAll(
    props: {
      where?: Prisma.QuizWhereInput;
      include?: Prisma.QuizInclude;
      skip?: number;
      take?: number;
    },
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<QuizType[]> {
    return tx.quiz.findMany(props);
  }
}
