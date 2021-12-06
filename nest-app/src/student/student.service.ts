import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { students } from 'src/db';
import {
  CreateStudentDto,
  FindStudentsResponseDto,
  StudentsResponseDto,
  UpdateStudentDto,
} from './dto/student.dto';

@Injectable()
export class StudentService {
  students = students;
  getStudents(): FindStudentsResponseDto[] {
    return this.students;
  }

  getStudentById(studentId: string) {
    return this.students.find((student) => student.id === studentId);
  }

  createStudent(payload: CreateStudentDto): StudentsResponseDto {
    const newStudent: StudentsResponseDto = {
      id: uuid(),
      ...payload,
    };
    this.students.push(newStudent);
    return newStudent;
  }

  updateStudent(
    studentId: string,
    payload: UpdateStudentDto,
  ): StudentsResponseDto {
    const index = this.students.findIndex(
      (student) => student.id === studentId,
    );
    if (index != -1) {
      this.students[index] = {
        id: studentId,
        ...payload,
      };
      return this.students[index];
    }
    return null;
  }

  getStudentsFromTeacherId(teacherId: string): FindStudentsResponseDto[] {
    return this.students.filter((student) => student.teacher === teacherId);
  }

  updateTeacherStudent(
    studentId: string,
    teacherId: string,
  ): StudentsResponseDto {
    const index = this.students.findIndex(
      (student) => student.id === studentId,
    );
    if (index != -1) {
      this.students[index].teacher = teacherId;
      return this.students[index];
    }
    return null;
  }
}
