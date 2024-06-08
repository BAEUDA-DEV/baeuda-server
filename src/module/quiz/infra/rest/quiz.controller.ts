import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UseAuth } from '@/module/auth/infra/rest/guard/use-auth.decorator';

import { QuizFacade } from '@/module/quiz/application/facade/quiz.facade';

import { PaginationRes } from '@/common/dto/pagination.response';
import { FindAllQuizReq } from '@/module/quiz/infra/rest/dto/request';
import { QuizRes } from '@/module/quiz/infra/rest/dto/response';

@Controller('/api/quiz')
@ApiTags('Quiz')
@UseAuth()
export class QuizController {
  constructor(private readonly quizFacade: QuizFacade) {}

  @Get('/:certificateId')
  @ApiOperation({ summary: '퀴즈 목록 조회' })
  @ApiParam({ name: 'certificateId', description: '자격증 ID' })
  @ApiResponse({ type: PaginationRes<QuizRes[]> })
  async list(
    @Param('certificateId') certificateId: string,
    @Query() req: FindAllQuizReq,
  ): Promise<PaginationRes<QuizRes[]>> {
    return this.quizFacade
      .findAll(certificateId, req)
      .then((it) =>
        it.toRes<QuizRes[]>((data) => data.map((child) => child.toRes())),
      );
  }
}
