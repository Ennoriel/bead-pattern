# bead weaving pattern making

Lightweight Single Page Application for making bead weaving patterns.

# TOOD :

    - [/] refactoring en composants js
    - [ ] gérer le CTRL+Z sur quelques générations
    - [/] enregistrer / charger un bracelet
    - [/] gérer un pattern duplicable sur le bracelet
    - [/] [ajouter une palette](https://github.com/DavidDurman/FlexiColorPicker)
    - [/] disposer les actions dans une barres d'icones
    - [ ] ajouter un deuxième radio button à côté des patterns pour apppliquer à partir du bas à droite
    - [/] ajouter un bouton pour n'afficher que le bracelet
    - [/] ajouter un mode peyote vertical
    - [ ] freezer la peinture lorsque le colorpicker est ouvert
    - [ ] ajouter un ruban "en cours de dev"
    - [ ] rendre traduisible et traduire les filtres du beadpanel

# BUG :

    - [/] copie de pattern peyote un rang sur deux
    - [/] sélection des perles peyotes, sans doute problématique à cause de la marge
    - [/] le colorPicker ne se réouvre pas en switchant d'un input à l'autre
    - [/] temps de chargement de la prévisualisation
    - [/] pattern sur pattern : plusieurs problèmes
      - [/] échoue lorsqu'appliqué à lui même
      - [/] désélectionné lorsque appliqué à lui même (car regénéré)
      - [/] envoie une erreur lors du rendu (suppression d'un id html ?)
    - [ ] suppression de ligne/colonne en peyote/peyoteV déplace les perles
    - [ ] MaJ des dimensions à l'import
    - [ ] Mise à jour de la bille sélectionné après suppression d'un filtre qui la cache
    - [ ] Corriger les bordures qui apparaissent en double selon certains zoom
    - [ ] Pattern appliqué sur lui même
    - [ ] affichage du nombre de perle décale l'input lorsque trop grand
    - [ ] l'affichage du conteneur des patterns et du bracelet à une marge inférieur
    - [ ] lorsque l'on applique un pattern, la preview ne disparait pas toujours

# CREDITS :

    - [flags](https://github.com/hjnilsson/country-flags/)
    - [color picker](https://github.com/DavidDurman/FlexiColorPicker)
    - [icons](https://feathericons.com/)
