import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthUserType } from '@/module/auth/infra/rest/guard';
import { AuthUser } from '@/module/auth/infra/rest/guard/auth-user.decorator';
import { UseAuth } from '@/module/auth/infra/rest/guard/use-auth.decorator';

import { QuizFacade } from '@/module/quiz/application/facade/quiz.facade';

import {
  ApiPaginationResponse,
  PaginationRes,
} from '@/common/dto/pagination.response';
import {
  FindAllQuizReq,
  SaveQuizLogReq,
} from '@/module/quiz/infra/dto/request';
import { QuizLogRes, QuizRes } from '@/module/quiz/infra/dto/response';

@Controller('/api/quiz')
@ApiTags('Quiz')
@UseAuth()
export class QuizController {
  constructor(private readonly quizFacade: QuizFacade) {}

  @Get('/:certificateId')
  @ApiOperation({ summary: '퀴즈 목록 조회' })
  @ApiParam({ name: 'certificateId', description: '자격증 ID' })
  @ApiPaginationResponse(QuizRes)
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

  @Post('/log/new')
  @ApiOperation({ summary: '퀴즈 기록 생성' })
  @ApiResponse({ type: QuizLogRes })
  async saveLog(
    @AuthUser() { userId }: AuthUserType,
    @Body() req: SaveQuizLogReq,
  ): Promise<QuizLogRes> {
    return this.quizFacade.saveLog(userId, req).then((it) => it.toRes());
  }
}
