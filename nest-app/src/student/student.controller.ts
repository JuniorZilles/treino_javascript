import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

@Controller('students')
export class StudentController {
  @Get()
  getStudents() {
    return 'Hello Students!';
  }

  @Get('/:studentId')
  getStudentById(@Param('studentId') studentId: string) {
    return `Get Student with Id: ${studentId}!`;
  }

  @Post()
  createStudent(@Body() body: any) {
    return `Create Student with data ${JSON.stringify(body)}!`;
  }

  @Put('/:studentId')
  updateStudent(@Param('studentId') studentId: string, @Body() body: any) {
    return `Update Student with Id: ${studentId} and data ${JSON.stringify(
      body,
    )}!`;
  }
}
