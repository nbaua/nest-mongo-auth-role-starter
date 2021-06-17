import { MaxLength, MinLength } from 'class-validator';
export class AuthCredentialsDto {
  @MinLength(4, { message: 'Username needs to be 4 characters minimum.' })
  @MaxLength(20, { message: 'Username can not exceed 20 characters limit.' })
  username: string;

  @MinLength(8, { message: 'Password needs to be 8 characters minimum.' })
  @MaxLength(20, { message: 'Password can not exceed 20 characters limit.' })
  password: string;
}
