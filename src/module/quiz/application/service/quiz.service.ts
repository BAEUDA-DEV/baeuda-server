import { Injectable } from '@nestjs/common';
import { Answer, Certificate, Prisma, Quiz } from '@prisma/client';

import { PrismaService } from '@/common/injectable/prisma.service';

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
    where?: Prisma.QuizWhereInput,
    include?: Prisma.QuizInclude,
    skip?: number,
    take?: number,
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<(Quiz & { certificate?: Certificate; answers?: Answer[] })[]> {
    return tx.quiz.findMany({
      where,
      include,
      skip,
      take,
    });
  }
}
