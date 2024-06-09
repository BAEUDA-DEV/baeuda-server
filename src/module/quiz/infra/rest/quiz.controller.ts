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
  FindAllQuizLogsReq,
  FindAllQuizReq,
  SaveQuizLogReq,
} from '@/module/quiz/infra/rest/dto/request';
import { QuizLogRes, QuizRes } from '@/module/quiz/infra/rest/dto/response';

@Controller('/api/quiz')
@ApiTags('Quiz')
@UseAuth()
export class QuizController {
  constructor(private readonly quizFacade: QuizFacade) {}

  @Get('/')
  @ApiOperation({ summary: '퀴즈 목록 조회' })
  @ApiPaginationResponse(QuizRes)
  async list(@Query() req: FindAllQuizReq): Promise<PaginationRes<QuizRes[]>> {
    return this.quizFacade
      .findAll(req)
      .then((it) =>
        it.toRes<QuizRes[]>((data) => data.map((child) => child.toRes())),
      );
  }

  @Get('/:quizId')
  @ApiOperation({ summary: '퀴즈 조회' })
  @ApiParam({ name: 'quizId', type: String })
  @ApiResponse({ type: QuizRes })
  async one(@Param('quizId') quizId: string): Promise<QuizRes> {
    return this.quizFacade.findOne(quizId).then((it) => it.toRes());
  }

  @Get('/log')
  @ApiOperation({ summary: '퀴즈 기록 목록 조회' })
  @ApiPaginationResponse(QuizLogRes)
  async logList(
    @AuthUser() { userId }: AuthUserType,
    @Query() req: FindAllQuizLogsReq,
  ): Promise<PaginationRes<QuizLogRes[]>> {
    return this.quizFacade
      .findAllLogs(userId, req)
      .then((it) =>
        it.toRes<QuizLogRes[]>((data) => data.map((child) => child.toRes())),
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
