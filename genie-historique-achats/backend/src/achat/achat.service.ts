import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Achat } from './achat.entity';

export interface CreateAchatDto {
  nom_produit: string;
  prix: number;
  date_achat?: Date;
}

export interface TopProduitResult {
  nom_produit: string;
  count: number;
}

export interface BilanFinancierResult {
  total: number;
  count: number;
  achats: Achat[];
}

@Injectable()
export class AchatsService {
  constructor(
    @InjectRepository(Achat)
    private readonly achatRepo: Repository<Achat>,
  ) {}

  // Fonctionnalité 1: Ajout d'achat
  async ajouterAchat(nom_produit: string, prix: number, date_achat?: Date): Promise<Achat> {
    const achat = this.achatRepo.create({ 
      nom_produit, 
      prix,
      date_achat: date_achat || new Date()
    });
    return this.achatRepo.save(achat);
  }

  // Fonctionnalité 2: Historique des achats (triés par date du plus récent au plus ancien)
  async getHistorique(): Promise<Achat[]> {
    return this.achatRepo.find({ 
      order: { date_achat: 'DESC' } 
    });
  }

  // Fonctionnalité 3: Top Produit (le plus acheté en nombre d'occurrences)
  async getTopProduit(): Promise<TopProduitResult> {
    const result = await this.achatRepo
      .createQueryBuilder('achat')
      .select('achat.nom_produit', 'nom_produit')
      .addSelect('COUNT(*)', 'count')
      .groupBy('achat.nom_produit')
      .orderBy('COUNT(*)', 'DESC')
      .limit(1)
      .getRawOne();

    return {
      nom_produit: result?.nom_produit || '',
      count: parseInt(result?.count) || 0
    };
  }

  // Fonctionnalité 4: Bilan financier (montant total des dépenses sur la liste affichée)
  async getBilanFinancier(): Promise<BilanFinancierResult> {
    const achats = await this.getHistorique(); // Liste affichée = historique trié
    
    const total = achats.reduce((sum, achat) => sum + achat.prix, 0);
    const count = achats.length;

    return {
      total,
      count,
      achats
    };
  }

  // Méthode générale pour lister tous les achats
  async listerAchats(): Promise<Achat[]> {
    return this.getHistorique();
  }
}

