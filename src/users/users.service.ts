import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Luka',
      email: 'luka@gmail.com',
      subscription: 'Sat Sep 21 2022 / 16:11:28',
    },
    {
      id: 2,
      name: 'Oli',
      email: 'oli@gmail.com',
      subscription: 'Sat Sep 21 2024 / 16:11:48',
    },
    {
      id: 3,
      name: 'Guja',
      email: 'guja@gmail.com',
      subscription: 'Sat Sep 21 2023 / 16:11:0',
    },
  ];

  createdAt() {
    const date = new Date();
    const [day, month, number, year] = date.toDateString().split(' ');
    const currentDate = `${day} ${month} ${number} ${Number(year) - Math.round(Math.random() * 4)}`;
    const currentTime = date.toTimeString().split(' ')[0];
    console.log(`${currentDate} / ${currentTime}`);
    return `${currentDate} / ${currentTime}`;
  }

  create(createUsersDto: CreateUserDto) {
    if (!createUsersDto.name || !createUsersDto.email)
      throw new HttpException('Fileds are required', HttpStatus.BAD_REQUEST);
    const lastId = this.users[this.users.length - 1]?.id || 0;
    const newUsers = {
      id: lastId + 1,
      ...createUsersDto,
      subscription: this.createdAt(),
    };
    this.users.push(newUsers);
    return newUsers;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const findIndex = this.users.findIndex((user) => user.id === id);
    if (findIndex === -1) throw new NotFoundException();
    return this.users[findIndex];
  }

  update(id: number, updateUsersDto: UpdateUserDto) {
    const findIndex = this.users.findIndex((user) => user.id === id);
    if (findIndex === -1) throw new NotFoundException();
    this.users[findIndex] = {
      ...this.users[findIndex],
      name: updateUsersDto.name,
      email: updateUsersDto.email,
    };
    return this.users[findIndex];
  }

  remove(id: number) {
    const findIndex = this.users.findIndex((user) => user.id === id);
    if (findIndex === -1) throw new NotFoundException();
    const deletedUser = this.users.splice(findIndex, 1);
    return deletedUser;
  }
}
