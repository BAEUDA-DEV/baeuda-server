import { Module } from '@nestjs/common';

import { CommentController } from '@/module/comment/infra/rest/comment.controller';
import { CommentService } from '@/module/comment/application/service/comment.service';
import { CommentFacade } from '@/module/comment/application/facade/comment.facade';

@Module({
  controllers: [CommentController],
  providers: [CommentFacade, CommentService],
})
export class CommentModule {}
