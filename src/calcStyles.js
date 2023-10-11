//generate vd (viewport diagonal)
//represent 1% of the viewport diagonals
//usefull for exact dimensions across every screen size
//formula sqrt(height ** 2 + width ** 2)
var vd = Math.sqrt(screen.height **2 + screen.width ** 2) / 100;
document.body.style.setProperty('--vd', vd + 'px')