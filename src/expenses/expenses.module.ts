import { Module } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { ExpenseService } from './expenses.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [ExpensesController],
  providers: [ExpenseService, UsersService],
})
export class ExpensesModule {}
