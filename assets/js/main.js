var iUp = (function () {
	var time = 0,
		duration = 150,
		clean = function () {
			time = 0;
		},
		up = function (element) {
			setTimeout(function () {
				element.classList.add("up");
			}, time);
			time += duration;
		},
		down = function (element) {
			element.classList.remove("up");
		},
		toggle = function (element) {
			setTimeout(function () {
				element.classList.toggle("up");
			}, time);
			time += duration;
		};
	return {
		clean: clean,
		up: up,
		down: down,
		toggle: toggle
	};
})();

function getBingImages(imgUrls) {
	/**
	 * 获取Bing壁纸
	 * 先使用 GitHub Action 每天获取 Bing 壁纸 URL 并更新 images.json 文件
	 * 然后读取 images.json 文件中的数据
	 */
	var indexName = "bing-image-index";
	var index = parseInt(sessionStorage.getItem(indexName), 10);
	var panel = document.querySelector('#panel');
	if (isNaN(index) || index === 7) index = 0;
	else index++;
	var imgUrl = imgUrls[index];
	var url = "https://www.cn.bing.com" + imgUrl;
	panel.style.background = "url('" + url + "') center center no-repeat #666";
	panel.style.backgroundSize = "cover";
	sessionStorage.setItem(indexName, index);
}

function decryptEmail(encoded) {
	var address = atob(encoded);
	window.location.href = "mailto:" + address;
}

document.addEventListener('DOMContentLoaded', function () {
	// 获取一言数据
	fetch("https://v1.hitokoto.cn")
		.then(function(response) {
			return response.json();
		})
		.then(function(res) {
			document.getElementById('description').innerHTML = res.hitokoto + "<br/> -「<strong>" + res.from + "</strong>」";
		})
		.catch(function(error) {
			console.error('Error fetching hitokoto:', error);
		});

	var iUpElements = document.querySelectorAll(".iUp");
	for (var i = 0; i < iUpElements.length; i++) {
		iUp.up(iUpElements[i]);
	}

	var avatarElement = document.querySelector(".js-avatar");
	avatarElement.addEventListener('load', function () {
		avatarElement.classList.add("show");
	});
});

var btnMobileMenu = document.querySelector('.btn-mobile-menu__icon');
var navigationWrapper = document.querySelector('.navigation-wrapper');

btnMobileMenu.addEventListener('click', function () {
	var isVisible = navigationWrapper.classList.contains('visible');
	
	function handleAnimationEnd() {
		navigationWrapper.classList.remove('visible', 'animated', 'bounceOutUp');
		navigationWrapper.removeEventListener('animationend', handleAnimationEnd);
	}
	
	if (isVisible) {
		navigationWrapper.addEventListener('animationend', handleAnimationEnd);
		navigationWrapper.classList.remove('bounceInDown');
		navigationWrapper.classList.add('animated', 'bounceOutUp');
	} else {
		navigationWrapper.classList.add('visible', 'animated', 'bounceInDown');
	}
	
	btnMobileMenu.classList.toggle('icon-list');
	btnMobileMenu.classList.toggle('icon-angleup');
});

function showWeChatModal() {
	const modal = document.getElementById('wechatModal');
	modal.style.display = 'flex';
	setTimeout(() => {
		modal.style.opacity = '1';
		modal.style.visibility = 'visible';
	}, 10);
}

function closeWeChatModal() {
	const modal = document.getElementById('wechatModal');
	modal.style.opacity = '0';
	modal.style.visibility = 'hidden';
	setTimeout(() => {
		modal.style.display = 'none';
	}, 300);
}
