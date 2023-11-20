export const $nav = document.getElementById('site_nav');

export function closeMenu(){
	$nav.classList.remove('active')
	overlay.classList.remove('active')
}

const overlay = document.querySelector('.overlay');
document.querySelector('.mobile-menu-btn').addEventListener('click', e => {
	$nav.classList.add('active')
	overlay.classList.add('active')
})

overlay.addEventListener('click', e => {
	closeMenu()
})

document.querySelector('.close-mobile-menu').addEventListener('click', e => {
	closeMenu()
})

document.addEventListener('keydown', e => {
	if(e.key === 'Escape'){
		closeMenu()
	}
})