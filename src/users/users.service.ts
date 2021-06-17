import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/interfaces/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async findAll(offset = 0, limit = 10) {
    return await this.userModel
      .find({}, { password: 0, __v: 0 }) // return only required properties
      .skip(offset)
      .limit(limit)
      .exec();
  }

  async findOne(id: string) {
    return await this.userModel
      .find({ _id: mongoose.Types.ObjectId(id) }, { password: 0, __v: 0 })
      .exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user from ${updateUserDto}`; //to-do update as per requirement
  }

  async remove(id: string) {
    return await this.userModel.remove({
      _id: mongoose.Types.ObjectId(id),
    });
  }
}
