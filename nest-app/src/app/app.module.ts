import { Module } from '@nestjs/common';
import { StudentController } from 'src/student/student.controller';
import { StudentTeacherController } from 'src/teachers/student.controller';
import { TeacherController } from 'src/teachers/teachers.controller';

@Module({
  imports: [],
  controllers: [StudentController, TeacherController, StudentTeacherController],
})
export class AppModule {}
