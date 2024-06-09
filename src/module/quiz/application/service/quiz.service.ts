import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/common/injectable/prisma.service';
import { QuizType } from '@/module/quiz/domain/quiz';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  async countAll(
    props: {
      where?: Prisma.QuizWhereInput;
    },
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<number> {
    return tx.quiz.count(props);
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

  async findOne(
    props: {
      where?: Prisma.QuizWhereUniqueInput;
      include?: Prisma.QuizInclude;
    },
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<QuizType | null> {
    return tx.quiz.findFirst(props);
  }
}
