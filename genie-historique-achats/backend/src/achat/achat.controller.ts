import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AchatsService, CreateAchatDto, TopProduitResult, BilanFinancierResult } from './achat.service';
import { Achat } from './achat.entity';

@Controller('achats')
export class AchatsController {
  constructor(private readonly achatsService: AchatsService) {}

  // Fonctionnalité 1: Ajout d'achat
  @Post('ajouter')
  async ajouter(@Body() body: CreateAchatDto): Promise<Achat> {
    return this.achatsService.ajouterAchat(
      body.nom_produit, 
      body.prix, 
      body.date_achat
    );
  }

  // Fonctionnalité 2: Historique des achats (triés par date)
  @Get('historique')
  async getHistorique(): Promise<Achat[]> {
    return this.achatsService.getHistorique();
  }

  // Fonctionnalité 3: Top Produit (le plus acheté)
  @Get('top-produit')
  async getTopProduit(): Promise<TopProduitResult> {
    return this.achatsService.getTopProduit();
  }

  // Fonctionnalité 4: Bilan financier (montant total)
  @Get('bilan-financier')
  async getBilanFinancier(): Promise<BilanFinancierResult> {
    return this.achatsService.getBilanFinancier();
  }

  // Route générale pour lister tous les achats
  @Get()
  async listerTous(): Promise<Achat[]> {
    return this.achatsService.listerAchats();
  }
}
