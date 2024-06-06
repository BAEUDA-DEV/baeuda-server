import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UseAuth } from '@/module/auth/infra/rest/guard/use-auth.decorator';

import { CommentFacade } from '@/module/comment/application/facade/comment.facade';

import { AuthUser } from '@/module/auth/infra/rest/guard/auth-user.decorator';
import { AuthUserType } from '@/module/auth/infra/rest/guard';

import {
  ApiPaginationResponse,
  PaginationRes,
} from '@/common/dto/pagination.response';
import { CommentRes } from '@/module/comment/infra/rest/dto/response';
import {
  CommentListReq,
  CreateCommentReq,
  DeleteCommentReq,
  UpdateCommentReq,
} from '@/module/comment/infra/rest/dto/request';

@Controller('/api/comment')
@ApiTags('Comment')
@UseAuth()
export class CommentController {
  constructor(private readonly commentFacade: CommentFacade) {}

  @Get('/')
  @ApiOperation({ summary: '댓글 목록 조회' })
  @ApiPaginationResponse(CommentRes)
  async list(
    @Query() req: CommentListReq,
  ): Promise<PaginationRes<CommentRes[]>> {
    return this.commentFacade
      .list(req)
      .then((it) =>
        it.toRes<CommentRes[]>((data) => data.map((child) => child.toRes())),
      );
  }

  @Post('/new')
  @ApiOperation({ summary: '댓글 등록' })
  @ApiResponse({ type: CommentRes })
  async create(
    @AuthUser() { userId }: AuthUserType,
    @Body() req: CreateCommentReq,
  ): Promise<CommentRes> {
    return this.commentFacade.create(userId, req).then((it) => it.toRes());
  }

  @Post('/update')
  @ApiOperation({ summary: '댓글 수정' })
  @ApiResponse({ type: CommentRes })
  async update(
    @AuthUser() { userId }: AuthUserType,
    @Body() req: UpdateCommentReq,
  ): Promise<CommentRes> {
    return this.commentFacade.update(userId, req).then((it) => it.toRes());
  }

  @Post('/delete')
  @ApiOperation({ summary: '댓글 삭제' })
  @ApiResponse({ type: CommentRes })
  async delete(
    @AuthUser() { userId }: AuthUserType,
    @Body() req: DeleteCommentReq,
  ): Promise<CommentRes> {
    return this.commentFacade.delete(userId, req).then((it) => it.toRes());
  }
}
