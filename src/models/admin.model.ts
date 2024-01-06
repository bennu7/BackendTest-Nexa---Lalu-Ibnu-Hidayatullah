import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "admin" })
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, nullable: true })
  username: string;

  @Column({ type: "varbinary", length: 100, nullable: true })
  password: string;
}
