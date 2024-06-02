import { Module } from '@nestjs/common';

import { QuizFacade } from '@/module/quiz/application/facade/quiz.facade';
import { QuizLogSerivce } from '@/module/quiz/application/service/quiz-log.service';
import { QuizService } from '@/module/quiz/application/service/quiz.service';
import { QuizController } from '@/module/quiz/infra/quiz.controller';

@Module({
  controllers: [QuizController],
  providers: [QuizFacade, QuizService, QuizLogSerivce],
})
export class QuizModule {}
