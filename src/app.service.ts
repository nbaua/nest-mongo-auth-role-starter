import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppInfo(): string {
    return 'NestJs and MongoDB (Mongoose) Authentication Starter, Version 1, Please access the API endpoints with correct controller routes and valid auth token.';
  }
}
