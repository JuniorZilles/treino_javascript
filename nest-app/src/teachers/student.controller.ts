import { Body, Controller, Get, Param, Put } from '@nestjs/common';

@Controller('teachers/:teacherId/students')
export class StudentTeacherController {
  @Get()
  getStudentsFromTeacherId(@Param('teacherId') teacherId: string) {
    return 'Hello Student!';
  }

  @Put('/:studentId')
  updateTeacherStudent(
    @Param('studentId') studentId: string,
    @Param('teacherId') teacherId: string,
    @Body() body: any,
  ) {
    return 'Update Student!';
  }
}
