import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProductsService {
  constructor(private readonly usersService: UsersService) {}

  private products = [
    {
      id: 1,
      title: 'MacBook',
      price: 10,
    },
    {
      id: 2,
      title: 'Iphone',
      price: 10,
    },
    {
      id: 3,
      title: 'AirPods',
      price: 10,
    },
  ];

  create(createProductDto: CreateProductDto) {
    if (!createProductDto.title || !createProductDto.price)
      throw new HttpException('Fileds are required', HttpStatus.BAD_REQUEST);
    const lastId = this.products[this.products.length - 1]?.id || 0;
    const newProduct = {
      id: lastId + 1,
      ...createProductDto,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  findAll(id: number) {
    if (!id) return this.products;
    const user = this.usersService.findOne(id);
    if (+user.subscription.split(' ')[3] === 2024) {
      return this.products.map((item) => {
        return {
          ...item,
          price: item.price - 2,
        };
      });
    }
    return this.products;
  }

  findOne(id: number) {
    const findIndex = this.products.findIndex((product) => product.id === id);
    if (findIndex === -1) throw new NotFoundException();
    return this.products[findIndex];
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const findIndex = this.products.findIndex((product) => product.id === id);
    if (findIndex === -1) throw new NotFoundException();
    this.products[findIndex] = {
      ...this.products[findIndex],
      title: updateProductDto.title,
      price: updateProductDto.price,
    };
    return this.products[findIndex];
  }

  remove(id: number) {
    const findIndex = this.products.findIndex((product) => product.id === id);
    if (findIndex === -1) throw new NotFoundException();
    const deletedProduct = this.products.splice(findIndex, 1);
    return deletedProduct;
  }
}
