window.onload = function() {
	search();
	secondKill();
	scrollBanner();
}

//窗口下拉搜索框动画
var search = function() {
	var secrchBgc = document.getElementsByClassName('jd_headerbgc')[0];
	var bannerHeight = document.getElementsByClassName('jd_banner')[0].offsetHeight;

	window.onscroll = function() {
		var top = document.body.scrollTop;
		//console.log(top);
		if(top > bannerHeight) {
			secrchBgc.style.opacity = '0.8';
		} else {
			secrchBgc.style.opacity = top / bannerHeight * 0.8;
		}
	}
}

//秒杀倒计时
function secondKill() {
	setInterval(daojishi, 1000);

	function daojishi() {
		var timeBox = document.getElementsByClassName('product_top')[0];
		var timelist = timeBox.getElementsByClassName('jd_num');
		//console.log(timelist.length);

		var endDate = new Date('September 8,2016 0:00:0')
		var startData = new Date();
		var t = endDate - startData;
		var h = 0,
			m = 0,
			s = 0;

		if(t > 0) {
			h = Math.floor(t / 1000 / 60 / 60);
			m = Math.floor(t / 1000 / 60 % 60);
			s = Math.floor(t / 1000 % 60);
		}

		timelist[0].innerHTML = h > 9 ? Math.floor(h / 10) : 0;
		timelist[1].innerHTML = h % 10;

		timelist[2].innerHTML = m > 9 ? Math.floor(m / 10) : 0;
		timelist[3].innerHTML = m % 10;

		//console.log();
		timelist[4].innerHTML = s > 9 ? Math.floor(s / 10) : 0;
		timelist[5].innerHTML = s % 10;

	}
}

//banner区域动画
var scrollBanner = function() {
	//获取dom对象
	var bannerBox = document.getElementsByClassName('jd_banner')[0];

	var imgWidth = bannerBox.offsetWidth;

	var imgBox = bannerBox.getElementsByTagName('ul')[0]; //图片盒子
	console.log(imgBox);
	var pointBox = bannerBox.getElementsByTagName('ul')[1] //圆点盒子
	var pointlist = pointBox.getElementsByTagName('li'); //圆点

	var index = 1;
	var timer = null;

	//添加过渡效果函数
	function addTransition() {
		imgBox.style.transition = 'all 0.3s ease';
	}
	//移除过渡效果函数
	function removeTransition() {
		imgBox.style.transition = 'none';
	}
	//动画执行
	function setTransform(t) {
		imgBox.style.transform = 'translateX(' + t + 'px)';
	}

	timer = setInterval(autoPlay, 3000);

	function autoPlay() {
		index++;
		addTransition();
		
		setTransform(-index * imgWidth);

	}

	imgBox.addEventListener('transitionend', function() {
		isLast();
	})

	function isLast() {
		index > 8 ? index = 1 : index;
		index < 1 ? index = 8 : index;

		removeTransition();
		setTransform(-index * imgWidth);

		for(var i = 0; i < pointlist.length; i++) {
			pointlist[i].style.backgroundColor = 'transparent';
		}
		pointlist[index - 1].style.backgroundColor = '#fff';

	}

	var startX = 0,
		endX = 0;
	bannerBox.addEventListener('touchstart', function(e) {
		startX = e.changedTouches[0].clientX;
		//timer = null;
	})
	bannerBox.addEventListener('touchmove', function(e) {
		//startX = e.changedTouches[0].clientX;
		e.preventDefault();
		
		endX = e.changedTouches[0].clientX;
		moveX = endX - startX;
		removeTransition();
		setTransform(-index * imgWidth + moveX);

	})
	bannerBox.addEventListener('touchend', function(e) {

		if(Math.abs(endX - startX) > 50) {
			if(endX > startX) {
				index--;
			} else {
				index++;
			}

		}
		
		addTransition();
		setTransform(-index * imgWidth);
		
		
		//初始化位置
		 endX = 0;
		clearInterval(timer);
		timer = setInterval(autoPlay, 3000);
	})

}