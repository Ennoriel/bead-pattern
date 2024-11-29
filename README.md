Application pour concevoir des motifs de bracelet ou broche en perle ([lien de l'app](https://ennoriel.github.io/bead-pattern/)).

Une 2ème version a été commencé mais non terminée ([repo](https://github.com/Ennoriel/miyuki2) et [app](http://miyuki2.vercel.app/))

Ce projet est réalisé en Js, Html et Css pur en tant que challenge.

## TODO :

- [x] refactoring en composants js
- [ ] gérer le CTRL+Z sur quelques générations
- [x] enregistrer x charger un bracelet
- [x] gérer un pattern duplicable sur le bracelet
- [x] [ajouter une palette](https://github.com/DavidDurman/FlexiColorPicker)
- [x] disposer les actions dans une barres d'icones
- [x] ajouter un deuxième radio button à côté des patterns pour apppliquer à partir du bas à droite
- [x] ajouter un bouton pour n'afficher que le bracelet
- [x] ajouter un mode peyote vertical
- [x] freezer la peinture lorsque le colorpicker est ouvert
- [x] ajouter un ruban "en cours de dev"
- [ ] rendre traduisible et traduire les filtres du beadpanel

## BUGS :

- [x] copie de pattern peyote un rang sur deux
- [x] sélection des perles peyotes, sans doute problématique à cause de la marge
- [x] le colorPicker ne se réouvre pas en switchant d'un input à l'autre
- [x] temps de chargement de la prévisualisation
- [x] pattern sur pattern :
  - [x] échoue lorsqu'appliqué à lui même
  - [x] désélectionné lorsque appliqué à lui même (car regénéré)
  - [x] envoie une erreur lors du rendu (suppression d'un id html ?)
- [ ] suppression de ligne/colonne en peyote/peyoteV déplace les perles
- [x] MaJ des dimensions à l'import
- [x] Mise à jour de la bille sélectionné après suppression d'un filtre qui la cache
- [x] Corriger les bordures qui apparaissent en double selon certains zoom
- [x] Pattern appliqué sur lui même
- [x] affichage du nombre de perle décale l'input lorsque trop grand
- [x] l'affichage du conteneur des patterns et du bracelet à une marge inférieur
- [x] lorsque l'on applique un pattern, la preview ne disparait pas toujours

## CREDITS :

- [flags](https://github.com/hjnilsson/country-flags/)
- [color picker](https://github.com/DavidDurman/FlexiColorPicker)
- [icons](https://feathericons.com/)
