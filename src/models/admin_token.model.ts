import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "admin_token" })
export class AdminToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: true })
  id_admin: number;

  @Column({ type: "text", nullable: true })
  token: string;

  @Column({ type: "timestamp", nullable: true })
  expired_at: Date;
}
