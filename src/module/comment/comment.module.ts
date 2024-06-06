import { Module } from '@nestjs/common';

import { CommentController } from './infra/rest/comment.controller';
import { CommentFacade } from './application/facade/comment.facade';
import { CommentService } from './application/service/comment.service';

@Module({
  controllers: [CommentController],
  providers: [CommentFacade, CommentService],
})
export class CommentModule {}
