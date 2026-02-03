# Script pour commit et push toutes les branches
$branches = @(
    @{name="genie-historique-achats"; branch="fonctionnalité/historique-achats"; message="Implémentation historique des achats avec Supabase + TypeORM"},
    @{name="genie-top-statistiques"; branch="fonctionnalité/top-statistiques"; message="Implémentation top produit le plus acheté"},
    @{name="genie-bilan-financier"; branch="fonctionnalité/bilan-financier"; message="Implémentation bilan financier avec montant total"},
    @{name="Genie_pratique_back"; branch="fonctionnalité/ajout-produit"; message="Configuration Supabase + TypeORM et toutes les fonctionnalités"}
)

foreach ($item in $branches) {
    Write-Host "=== Traitement de $($item.name) ===" -ForegroundColor Green
    
    $path = if ($item.name -eq "Genie_pratique_back") { "." } else { "../$($item.name)" }
    
    Set-Location $path
    
    # Vérifier la branche actuelle
    $currentBranch = git branch --show-current
    Write-Host "Branche actuelle: $currentBranch" -ForegroundColor Yellow
    
    # Ajouter tous les fichiers
    git add .
    
    # Commit
    git commit -m "$($item.message)"
    
    # Push
    git push origin $($item.branch)
    
    Write-Host "✅ $($item.name) terminé!" -ForegroundColor Green
    Write-Host ""
    
    # Retourner au répertoire de base
    if ($item.name -ne "Genie_pratique_back") {
        Set-Location "../Genie_pratique_back"
    }
}

Write-Host "🎉 Tous les worktrees ont été mis à jour et pushés!" -ForegroundColor Cyan