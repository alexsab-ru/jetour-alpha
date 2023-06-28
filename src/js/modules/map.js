const mapId = "map1";

function initYandexMap() {
	if (document.getElementById(mapId) != null) {
		ymaps.ready(function () {
			var _ball_bg = "./img/map.balloon.png";
			var _ball_Offset = [-21, -58];
			var _ball_Size = [43, 62];
			var myMap = new ymaps.Map(
				mapId,
				{
					center: [53.184186, 50.152134],
					zoom: 16,
					controls: ["zoomControl"],
				},
				{
					searchControlProvider: "yandex#search",
				}
			);
			myMap.behaviors.disable("scrollZoom");
			var myPlacemark1 = new ymaps.Placemark(
				[53.184186, 50.152134],
				{
					balloonContent: "г. Самара, ул. Ново-Урицкая, д. 22",
					hintContent: "г. Самара, ул. Ново-Урицкая, д. 22",
				},
				{
					iconLayout: "default#image",
					// Своё изображение иконки метки.
					iconImageHref: _ball_bg,
					// Размеры метки.
					iconImageSize: _ball_Size,
					// Смещение левого верхнего угла иконки относительно
					// её "ножки" (точки привязки).
					iconImageOffset: _ball_Offset,
				}
			);
			myMap.geoObjects.add(myPlacemark1);
		});
	}
}

function initYandexMapWaitOnHover() {
	function loadScript(url, callback) {
		var script = document.createElement("script");

		if (script.readyState) {
			// IE
			script.onreadystatechange = function () {
				if (script.readyState == "loaded" || script.readyState == "complete") {
					script.onreadystatechange = null;
					callback();
				}
			};
		} else {
			script.onload = function () {
				callback();
			};
		}

		script.src = url;
		document.getElementsByTagName("head")[0].appendChild(script);
	}

	var check_if_load = 0;
	function __load_yandex() {
		if (check_if_load == 0) {
			check_if_load = 1;
			loadScript(
				"https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1",
				function () {
					ymaps.load(initYandexMap);
				}
			);
		}
	}

	if (document.getElementById(mapId) != null) {
		const mapBlock = document.getElementById(mapId);
		mapBlock.addEventListener("touchstart", function () {
			__load_yandex();
		});
		mapBlock.addEventListener("mouseenter", function () {
			__load_yandex();
		});
		mapBlock.click(function () {
			__load_yandex();
		});
	}
}

initYandexMapWaitOnHover();
