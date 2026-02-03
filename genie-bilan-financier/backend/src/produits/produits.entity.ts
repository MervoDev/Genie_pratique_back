import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Achat } from '../achat/achat.entity';

@Entity()
export class Produit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @OneToMany(() => Achat, (achat) => achat.produit)
  achats: Achat[];
}
