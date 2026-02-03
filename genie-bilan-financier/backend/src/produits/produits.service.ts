import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Achat } from '../achat/achat.entity';
import { Produit } from '../produits/produits.entity';

@Injectable()
export class AchatsService {
  constructor(
    @InjectRepository(Achat)
    private achatRepo: Repository<Achat>,
    @InjectRepository(Produit)
    private produitRepo: Repository<Produit>,
  ) {}

  async topProduits(limit = 5) {
    return this.achatRepo
      .createQueryBuilder('achat')
      .select('achat.produitId', 'produitId')
      .addSelect('COUNT(achat.id)', 'nombreAchats')
      .groupBy('achat.produitId')
      .orderBy('nombreAchats', 'DESC')
      .limit(limit)
      .getRawMany();
  }
}
