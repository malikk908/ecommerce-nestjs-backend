import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FindProductsDto } from './dto/find-products.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createProductDto: Prisma.ProductCreateInput) {
    return 'This action adds a new product';
  }

  async findAll(query: FindProductsDto) {
    const { page, limit, category } = query;

    const pageNumber = page || 1;
    const pageSize = limit || 10;
    const offset = (pageNumber - 1) * pageSize;

    const where: Prisma.ProductWhereInput = {};

    if (category) {
      where.category = {
        name: category,
      };
    }

    const prismaQuery = {
      where,
      skip: offset,
      take: pageSize,
      include: {
        category: true,
      },
    };

    const products = await this.databaseService.product.findMany(prismaQuery);
    const totalProducts = await this.databaseService.product.count({
      where,
    });
    const totalPages = Math.ceil(totalProducts / pageSize);
    const currentPage = pageNumber

    return {
      products,
      currentPage,
      totalProducts,
      totalPages,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: Prisma.ProductUpdateInput) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
