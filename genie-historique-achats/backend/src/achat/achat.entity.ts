import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Achat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom_produit: string;

  @Column('float')
  prix: number;

  @CreateDateColumn({ type: 'timestamptz' })
  date_achat: Date;
}
