import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ExpenseService {
  constructor(private readonly userService: UsersService) {}
  private expenses = [
    {
      id: 1,
      user: 'oli@gmail.com',
      title: 'Iphone',
      price: 1000,
    },
    {
      id: 2,
      user: 'luka@gmail.com',
      title: 'Car',
      price: 132984,
    },
    {
      id: 3,
      user: 'guja@gmail.com',
      title: 'MacBook',
      price: 100,
    },
  ];

  create(userId: number, createExpenseDto: CreateExpenseDto) {
    if (!createExpenseDto.title || !createExpenseDto.price)
      throw new BadRequestException();
    const user = this.userService.findOne(userId);
    if (!user) throw new NotFoundException();
    const lastId = this.expenses[this.expenses.length - 1]?.id || 0;
    const newExpense = {
      id: lastId + 1,
      user: user.email,
      ...createExpenseDto,
    };
    this.expenses.push(newExpense);
    return newExpense;
  }

  findAll() {
    return this.expenses;
  }

  findOne(id: number) {
    const findIndex = this.expenses.findIndex((expens) => expens.id === id);
    if (findIndex === -1) throw new NotFoundException();
    return this.expenses[findIndex];
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const findIndex = this.expenses.findIndex((expens) => expens.id === id);
    if (findIndex === -1) throw new NotFoundException();
    this.expenses[findIndex] = {
      ...this.expenses[findIndex],
      title: updateExpenseDto.title,
      price: updateExpenseDto.price,
    };
    return this.expenses[findIndex];
  }

  remove(id: number) {
    const findIndex = this.expenses.findIndex((expens) => expens.id === id);
    if (findIndex === -1) throw new NotFoundException();
    const deletedExpense = this.expenses.splice(findIndex, 1);
    return deletedExpense;
  }
}
