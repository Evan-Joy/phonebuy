import { Injectable } from '@nestjs/common';
import { TaskRes } from 'src/common/Classess';
import { PublicModules } from 'src/common/PublicModules';
import { Category } from 'src/entities/category.entity';
import { Connection, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import * as Dics from 'src/common/MyDictionary.json';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CategoryService {
  //declare privvate cateRepo variable to hold the repository for Category entities
  private cateRepo: Repository<Category> = null;
  //Define the constructor of the service class
  constructor(
    private readonly connection: Connection,
  ) {
    //Initialize the cateRepo variable with Category from database connection.
    this.cateRepo = this.connection.getRepository(Category);
  }

  getRepo() {
    return this.cateRepo;
  }

  async findByName(name: string){
    return await this.cateRepo.findOne({where: {name: name}});
  }

  async create(dto: CreateCategoryDto) {
    //declare a variable to hold response.
    let task: TaskRes = null;
    //Check if a category with the same name already exists.
    const find = await this.findByName(dto.name);
    //if name already exists exit func
    if (find){
      //if a category with the same name is found,create an error response and return it.
      task = PublicModules.fun_makeResError(null, Dics.NAME_FOUND);
      return task;
    }

    // Convert the dto into a Category entity.
    const newCate = plainToClass(Category, dto);
    //Save the new category to database.
    const result = await this.cateRepo.save(newCate);
    //Create a success response with the saved category and return it
    task = PublicModules.fun_makeResCreateSucc(result);
    //return response.
    return task;
  }

  async findAll() {
    //declare a variable to hold response .
    let task:TaskRes = null;
    //find and make a success respone 
    task = PublicModules.fun_makeResListSucc(await this.cateRepo.find());
    //return response
    return task;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
