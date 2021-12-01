import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { students } from 'src/db';

@Injectable()
export class validStudentMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const studentId = req.params.studentId;

    const studentExist = students.some((student) => student.id === studentId);
    if (!studentExist) {
      throw new HttpException('Student not found', 404);
    }

    next();
  }
}
