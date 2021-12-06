import { Module } from '@nestjs/common';
import { StudentModule } from 'src/student/student.module';
import { StudentTeacherController } from './student.controller';
import { TeacherController } from './teachers.controller';
import { TeachersService } from './teachers.service';

@Module({
  imports: [StudentModule],
  controllers: [TeacherController, StudentTeacherController],
  providers: [TeachersService],
})
export class TeachersModule {}
