import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { FindTeacherResponseDto } from './dto/teacher.dto';
import { TeachersService } from './teachers.service';

@Controller('teachers')
export class TeacherController {
  constructor(private readonly teachersService: TeachersService) {}
  @Get()
  getTeachers(): FindTeacherResponseDto[] {
    return this.teachersService.getAllTeachers();
  }

  @Get('/:teacherId')
  getTeacherById(
    @Param('teacherId', new ParseUUIDPipe()) teacherId: string,
  ): FindTeacherResponseDto {
    return this.getTeacherById(teacherId);
  }
}
