import { Column, Entity, PrimaryGeneratedColumn, JoinTable, ManyToMany, OneToOne, JoinColumn, OneToMany } from "typeorm";
@Entity()
export class Test {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
}
