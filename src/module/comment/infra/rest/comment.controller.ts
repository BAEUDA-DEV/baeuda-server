import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
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

  @Patch('/:commentId')
  @ApiOperation({ summary: '댓글 수정' })
  @ApiResponse({ type: CommentRes })
  async update(
    @AuthUser() { userId }: AuthUserType,
    @Param('commentId') commentId: string,
    @Body() req: UpdateCommentReq,
  ): Promise<CommentRes> {
    return this.commentFacade
      .update(userId, commentId, req)
      .then((it) => it.toRes());
  }

  @Delete('/:commentId')
  @ApiOperation({ summary: '댓글 삭제' })
  @ApiResponse({ type: CommentRes })
  async delete(
    @AuthUser() { userId }: AuthUserType,
    @Param('commentId') commentId: string,
  ): Promise<CommentRes> {
    return this.commentFacade
      .delete(userId, commentId)
      .then((it) => it.toRes());
  }
}
