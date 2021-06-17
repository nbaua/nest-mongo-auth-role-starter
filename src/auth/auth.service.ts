import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.userModel.findOne({
      username: createUserDto.username,
    });

    if (user) {
      return {
        success: false,
        message: 'Username already exists.',
      };
    } else {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 9);
      this.userModel.create({
        name: createUserDto.name,
        email: createUserDto.email,
        username: createUserDto.username,
        password: hashedPassword,
        role: createUserDto.role || 'User',
      });
      return {
        success: true,
        message: 'User account created.',
      };
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto) {
    const user = await this.userModel.findOne({
      username: authCredentialsDto.username,
    });
    if (!user) {
      return {
        success: false,
        message: 'username does not exists',
      };
    } else {
      const valid = await this.validateUser(
        authCredentialsDto.password,
        user.password,
      );

      if (valid) {
        const existingUser = await this.userModel.findOne({
          username: authCredentialsDto.username,
        });

        const user = existingUser.toObject(); //mutate
        delete user.password;
        delete user.__v;

        const payload = {
          user,
          sub: user._id,
        };
        return {
          success: true,
          accessToken: this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_SECRET'),
          }),
        };
      } else {
        return {
          success: false,
          message: 'Invalid credentials.',
        };
      }
    }
  }

  async validateUser(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
