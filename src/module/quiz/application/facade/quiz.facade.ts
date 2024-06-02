import { Injectable } from '@nestjs/common';

import { Pagination } from '@/common/domain/pagination';
import { Quiz } from '@/module/quiz/domain/quiz';
import { QuizLog } from '@/module/quiz/domain/quiz-log';

import { QuizLogSerivce } from '@/module/quiz/application/service/quiz-log.service';
import { QuizService } from '@/module/quiz/application/service/quiz.service';

import {
  FindAllQuizReq,
  SaveQuizLogReq,
} from '@/module/quiz/infra/dto/request';

@Injectable()
export class QuizFacade {
  constructor(
    private readonly quizService: QuizService,
    private readonly quizLogService: QuizLogSerivce,
  ) {}

  async findAll(
    certificateId: string,
    req: FindAllQuizReq,
  ): Promise<Pagination<Quiz[]>> {
    const count = await this.quizService.countAll({ where: { certificateId } });

    return Pagination.from({
      total: count,
      skip: req.skip,
      take: req.take,
      hasNext: count > req.skip + req.take,
      data: await this.quizService
        .findAll({
          where: { certificateId },
          include: { certificate: true, answers: true },
          skip: req.skip,
          take: req.take,
        })
        .then((quizList) => quizList.map((quiz) => Quiz.fromPrisma(quiz))),
    });
  }

  async saveLog(userId: string, req: SaveQuizLogReq): Promise<QuizLog> {
    return this.quizLogService
      .create({
        data: {
          user: {
            connect: { id: userId },
          },
          answer: {
            connect: { id: req.answerId },
          },
        },
        include: {
          user: true,
          answer: true,
        },
      })
      .then((quizLog) => QuizLog.fromPrisma(quizLog));
  }
}
