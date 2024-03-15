import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./category.entity";

@Entity()
export class Product{
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({nullable: false})
  title: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  price: number;

  @Column({default:0})
  giamGia: number;

  @Column({default: false})
  traGop: boolean;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  //====foreing key 
  @ManyToOne(type => Category,{onDelete: 'CASCADE'})
  category: Category;

}