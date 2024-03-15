import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Connection, Repository } from 'typeorm';
import { Product } from 'src/entities/product.entity';
import { Category } from 'src/entities/category.entity';
import { TaskRes } from 'src/common/Classess';
import { PublicModules } from 'src/common/PublicModules';
import * as Dics from 'src/common/MyDictionary.json';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ProductService {
  //declare a private variable to hold the repository for Product entities
  private prodRepo: Repository<Product> = null;
  //declare a private variable to hold the repository for Category entities
  private cateRepo: Repository<Category> = null;

  //Define the constructor of the service class
  constructor(
    private readonly connection: Connection,
  ){
    //Initialize the prodRepo variable with Product repository from database connection.
    this.prodRepo = this.connection.getRepository(Product);
    //Initialize the cateRepo variable with Category repository from database connection.
    this.cateRepo = this.connection.getRepository(Category);
  }
  // method find by name
  async findByName(title: string){
    return await this.prodRepo.findOne({where: {title: title}});
  }
  async create(dto: CreateProductDto) {
    //declare a variable to hold response
    let task: TaskRes = null;

    // Check if a product with the same title already exists.
    const find = await this.findByName(dto.title);
    //if name already exist exit func
    if(find){
      // If a product with the same title is found, create an error response and return it.
      task = PublicModules.fun_makeResError(null, Dics.NAME_FOUND)
      return task;
    }

    // Find the category with the id specified in the dto.
    const cate = await this.cateRepo.findOne({where: {id: dto.categoryId}});
    if(!cate){
      // If no such category is found, create an error response and return it.
      task = PublicModules.fun_makeResError(null,'Category not found');
      return task;
    }
    // Convert the dto into a Product entity.
    const newProd = plainToClass(Product,dto);
    // Set the category of the new product.
     newProd.category = cate
    //Save the new product to database.
    const result  = await this.prodRepo.save(newProd);
    //Create a success response with the saved product and return it
    task = PublicModules.fun_makeResCreateSucc(result);
    //return response
    return task;
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
