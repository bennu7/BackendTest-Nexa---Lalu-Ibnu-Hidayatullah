import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm";

@Entity({ name: "karyawan" })
export class Karyawan {
  @Column()
  id: number;

  @PrimaryColumn({ type: "varchar", length: 50, nullable: false })
  nip: string;

  @Column({ type: "varchar", length: 200, nullable: false })
  nama: string;

  @Column({ type: "varchar", length: 200, nullable: true })
  alamat: string;

  @Column({ type: "enum", enum: ["L", "P"], nullable: true })
  gend: string;

  @Column({ type: "text", nullable: true })
  photo: string;

  @Column({ type: "date", nullable: true })
  tgl_lahir: Date;

  @Column({ type: "int", nullable: true, default: 1 })
  status: number;

  @Column({
    type: "timestamp",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  insert_at: Date;

  @Column({ type: "timestamp", nullable: true, onUpdate: "CURRENT_TIMESTAMP" })
  update_at: Date;

  @Column({ type: "varchar", length: 50, nullable: true })
  update_by: string;
}
