import { BadRequestException, Injectable } from '@nestjs/common';

import { CommentService } from '@/module/comment/application/service/comment.service';

import { Pagination } from '@/common/domain/pagination';
import { Comment } from '@/module/comment/domain/comment';

import {
  CommentListReq,
  CreateCommentReq,
  DeleteCommentReq,
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

  async update(userId: string, req: UpdateCommentReq): Promise<Comment> {
    if (
      !(await this.commentService.findOne({
        where: {
          writerId: userId,
          id: req.id,
        },
      }))
    ) {
      throw new BadRequestException('정상적이지 않은 접근입니다.');
    }

    return this.commentService
      .update({
        where: {
          id: req.id,
        },
        data: {
          content: req.content,
        },
      })
      .then((comment) => Comment.fromPrisma(comment));
  }

  async delete(userId: string, req: DeleteCommentReq): Promise<Comment> {
    if (
      !(await this.commentService.findOne({
        where: {
          writerId: userId,
          id: req.id,
        },
        include: {
          writer: true,
        },
      }))
    ) {
      throw new BadRequestException('정상적이지 않은 접근입니다.');
    }

    return this.commentService
      .deleteOne({
        where: {
          id: req.id,
        },
      })
      .then((comment) => Comment.fromPrisma(comment));
  }
}
