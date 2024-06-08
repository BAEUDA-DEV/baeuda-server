import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CommentService } from '@/module/comment/application/service/comment.service';

import { Pagination } from '@/common/domain/pagination';
import { Comment } from '@/module/comment/domain/comment';

import {
  CommentListReq,
  CreateCommentReq,
  UpdateCommentReq,
} from '@/module/comment/infra/rest/dto/request';

@Injectable()
export class CommentFacade {
  constructor(private readonly commentService: CommentService) {}

  async list(req: CommentListReq): Promise<Pagination<Comment[]>> {
    const count = await this.commentService.countAll({});

    return Pagination.from<Comment[]>({
      total: count,
      skip: req.skip,
      take: req.take,
      hasNext: count > req.skip + req.take,
      data: await this.commentService
        .findAll({
          where: { quizId: req.quizId },
          include: { writer: true, quiz: true },
          skip: req.skip,
          take: req.take,
        })
        .then((res) => res.map((it) => Comment.fromPrisma(it))),
    });
  }

  async create(userId: string, req: CreateCommentReq): Promise<Comment> {
    return this.commentService
      .create({
        data: {
          writer: {
            connect: { id: userId },
          },
          quiz: {
            connect: { id: req.quizId },
          },
          content: req.content,
        },
        include: {
          writer: true,
          quiz: true,
        },
      })
      .then((comment) => Comment.fromPrisma(comment));
  }

  async update(
    userId: string,
    commentId: string,
    req: UpdateCommentReq,
  ): Promise<Comment> {
    const comment = await this.commentService.findOne({
      where: {
        id: commentId,
      },
    });
    if (!comment) {
      throw new NotFoundException('댓글을 찾을 수 없습니다.');
    }
    if (comment?.writerId !== userId) {
      throw new ForbiddenException('본인의 댓글만 수정할 수 있습니다.');
    }

    return this.commentService
      .update({
        where: {
          id: commentId,
        },
        data: {
          content: req.content,
        },
        include: {
          writer: true,
          quiz: true,
        },
      })
      .then((comment) => Comment.fromPrisma(comment));
  }

  async delete(userId: string, commentId: string): Promise<Comment> {
    const comment = await this.commentService.findOne({
      where: {
        id: commentId,
      },
    });
    if (!comment) {
      throw new NotFoundException('댓글을 찾을 수 없습니다.');
    }
    if (comment?.writerId !== userId) {
      throw new ForbiddenException('본인의 댓글만 삭제할 수 있습니다.');
    }

    return this.commentService
      .deleteOne({
        where: {
          id: commentId,
        },
      })
      .then((comment) => Comment.fromPrisma(comment));
  }
}
