import { Module } from '@nestjs/common';

import { QuizFacade } from '@/module/quiz/application/facade/quiz.facade';
import { QuizService } from '@/module/quiz/application/service/quiz.service';
import { QuizController } from '@/module/quiz/infra/rest/quiz.controller';

@Module({
  controllers: [QuizController],
  providers: [QuizFacade, QuizService],
})
export class QuizModule {}
