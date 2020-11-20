/*
 * ==> one can write a bead id (DB0213) in the color input
 * ==> when clicking in the color input, a panel is open on the left side of the screen
 * where a filter exists and the beads are display as small image
 * ==> when clicking a small image, a bigger one is displayed
 * ==> when clicking again on the image, it is selected as the color
 *
 * ==> Py : récupérer le nom des perles
 * ==> Py : calculer la couleur moyenne d'une perle
 * https://stackoverflow.com/questions/43111029/how-to-find-the-average-colour-of-an-image-in-python-with-opencv#answer-43111221
 * ==> cut pictures in small pieces
 *
 * linear-gradient(0.25turn, #999, #999 10%, #ddd 25%, #ddd 35%, #222 45%, #222 55%, #ddd 60%, #ddd 75%, #999 90%, #999)
 */

/*
a = [
  {id: 1, color: 'bleu', finish: 'g'},
  {id: 2, color: 'bleu', finish: 'ng'},
  {id: 3, color: 'rouge', finish: 'ng'},
  {id: 4, color: 'rouge', finish: 'g'},
]

colorFilter = colorFilter => e => {console.log('c'); return e.color === colorFilter}
finishFilter = finishFilter => e => {console.log('f'); return e.finish === finishFilter}

console.log(a.filter(e => e.color === 'bleu'))
console.log(a.filter(colorFilter('bleu')).filter(finishFilter('g')))

filters = [finishFilter('g'), colorFilter('bleu')]
console.log(Array.prototype.filter.apply(a, filters))
*/
