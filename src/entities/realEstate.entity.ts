import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Address } from "./address.entity";
import { Category } from "./category.entity";
import { Schedule } from "./schedule.entity";

@Entity("real_estate")
export class RealEstate {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "boolean", default: true })
  sold: boolean = false;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  value: number | string;

  @Column({ type: "integer" })
  size: number;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address | null;

  @ManyToOne(() => Category, (category) => category.realEstate, {
    nullable: true,
  })
  category: Category | null;

  @OneToMany(() => Schedule, (schedule) => schedule.realEstate)
  schedule: Schedule;
}
