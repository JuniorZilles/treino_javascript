import { Controller, Get, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import {
  FindStudentsResponseDto,
  StudentsResponseDto,
} from 'src/student/dto/student.dto';
import { StudentService } from 'src/student/student.service';

@Controller('teachers/:teacherId/students')
export class StudentTeacherController {
  constructor(private readonly studentService: StudentService) {}
  @Get()
  getStudentsFromTeacherId(
    @Param('teacherId', new ParseUUIDPipe()) teacherId: string,
  ): FindStudentsResponseDto[] {
    return this.studentService.getStudentsFromTeacherId(teacherId);
  }

  @Put('/:studentId')
  updateTeacherStudent(
    @Param('studentId', new ParseUUIDPipe()) studentId: string,
    @Param('teacherId', new ParseUUIDPipe()) teacherId: string,
  ): StudentsResponseDto {
    return this.studentService.updateTeacherStudent(studentId, teacherId);
  }
}
