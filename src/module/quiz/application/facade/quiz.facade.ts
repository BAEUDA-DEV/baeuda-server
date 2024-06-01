import { Injectable } from '@nestjs/common';

import { Pagination } from '@/common/domain/pagination';
import { QuizService } from '@/module/quiz/application/service/quiz.service';
import { Quiz } from '@/module/quiz/domain/quiz';

import { FindAllCertificateReq } from '@/module/certificate/infra/rest/dto/request';

@Injectable()
export class QuizFacade {
  constructor(private readonly quizService: QuizService) {}

  async findAll(
    certificateId: string,
    req: FindAllCertificateReq,
  ): Promise<Pagination<Quiz[]>> {
    const count = await this.quizService.countAll({ certificateId });

    return Pagination.from({
      total: count,
      skip: req.skip,
      take: req.take,
      hasNext: count > req.skip + req.take,
      data: await this.quizService
        .findAll(
          { certificateId },
          { certificate: true, answers: true },
          req.skip,
          req.take,
        )
        .then((quizList) => quizList.map((quiz) => Quiz.fromPrisma(quiz))),
    });
  }
}
