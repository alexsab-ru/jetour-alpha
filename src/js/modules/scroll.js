import { closeMenu, $nav } from "./mobile.menu";

const hashURL = window.location.hash.substring(1);
window.location.hash = '';

if(hashURL){
	window.scrollTo(0, 0);
	setTimeout(() => {window.scrollTo(0, 0)}, 1);
	setTimeout(() => {
		scroll(hashURL)
	}, 300)
	window.location.hash = hashURL;	
}

let prevScrollpos = window.scrollY;
let $header = document.querySelector("header");
let hideHeaderPos = $header.offsetHeight;
let hideNavPos = $nav ? $nav.offsetHeight : 0;
let ww = window.innerWidth;

$nav ? $nav.style.top = hideHeaderPos + "px" : null;

window.addEventListener("resize", () => {
	hideHeaderPos = $header.clientHeight;
	ww = window.innerWidth;
});

document.querySelectorAll('a[href^="#"]:not(.popup-link)').forEach((link) => {
	link.addEventListener("click", function (e) {
		e.preventDefault();
		let hash = this.getAttribute("href").substring(1);
		scroll(hash);		
	});
});

function scroll(hash){
	const scrollTarget = document.getElementById(hash);
	if(scrollTarget){
		const topOffset = $nav && ww >= 1024 ? hideNavPos : 0;
		// const topOffset = 0; // если не нужен отступ сверху
		const elementPosition = scrollTarget.getBoundingClientRect().top;
		const offsetPosition = elementPosition - topOffset;
		window.scrollBy({
			top: offsetPosition,
			behavior: "smooth",
		});
	}
}

window.addEventListener("scroll", () => {
	var currentScrollPos = window.scrollY;
	if (currentScrollPos > hideHeaderPos) {
		if (prevScrollpos > currentScrollPos) {
			$nav.classList.remove('bg-white/90')
			$nav.classList.add('bg-white', 'shadow-2xl')
			$header.classList.remove('bg-white/90')
			$header.classList.add('bg-white')
			$header.style.top = 0;
			$nav ? $nav.style.top = hideHeaderPos + "px" : null;
		} else {
			$nav.classList.remove('bg-white/90')
			$nav.classList.add('bg-white', 'shadow-2xl')
			$header.style.top = -hideHeaderPos + "px";
            $nav ? $nav.style.top = 0 : null;
		}
		prevScrollpos = currentScrollPos;
	} else {
		$nav.classList.add('bg-white/90')
		$nav.classList.remove('bg-white', 'shadow-2xl')
		$header.classList.add('bg-white/90')
		$header.classList.remove('bg-white')
		$header.style.top = 0;
        $nav ? $nav.style.top = hideHeaderPos + "px" : null;
	}
	
	let distance = ww >= 1024 ? $nav.offsetHeight * 2.5 : 0;
	let scrollDistance = window.scrollY;
	document.querySelectorAll('.section').forEach((el, i) => {
		if (el.offsetTop - distance <= scrollDistance) {
			document.querySelectorAll('.scroll-link').forEach((elem) => {
				if (elem.classList.contains('active')) {
					elem.classList.remove('active');
				}
			});

			document.querySelectorAll('.scroll-link')[i].classList.add('active');
		}
		if(scrollDistance < 700){
			document.querySelectorAll('.scroll-link').forEach((elem) => {
				elem.classList.remove('active');
			});
		}
	});
	closeMenu()
});