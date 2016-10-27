window.onload = function() {
	tabTouch();
}

//拖动tab栏的动画
var tabTouch = function() {
	var tabControl = document.getElementsByClassName('tab_control')[0];
	var tabControlHeight = tabControl.offsetHeight;
	//console.log(tabControlHeight);
	var tabBox = tabControl.getElementsByTagName('ul')[0];
	var tabLis = tabBox.getElementsByTagName('li');
	var tabHeight = tabBox.offsetHeight; //子元素的高度
	//alert(tabHeight);

	function addTransiton() { //添加过渡
		tabControl.style.transition = 'all 100s ease 0s';
	}

	function removeTransiton() { //移除过渡
		tabControl.style.transition = 'none';
	}

	function setTransform(t) { //设置动画距离
		tabBox.style.transform = 'translateY(' + t + 'px)';

	}

	var startY = 0,
		endY = 0,
		moveY = 0,
		curry = 0,
		upDown = 150; //上下滑动允许的范围
	var startTime = 0,
		endTime = 0;

	tabControl.addEventListener('touchstart', function(e) {
		startY = e.touches[0].clientY;
		startTime = new Date().getTime();
	})

	tabControl.addEventListener('touchmove', function(e) {

		e.preventDefault();
		endY = e.touches[0].clientY;
		moveY = startY - endY;
		setTransform(curry - moveY);

	})
	tabControl.addEventListener('touchend', function(e) {
		curry = curry - moveY;
		console.log(curry);
		if(curry > 0) {
			curry = 0;
			addTransiton();
			setTransform(curry);
		} else if(curry < (tabControlHeight - tabHeight - 45)) {
			curry = tabControlHeight - tabHeight - 45;
			addTransiton();
			setTransform(curry);
		}

		endTime = new Date().getTime();

		if(endTime - startTime < 150) { //设置触摸事件
			var selLi = e.target.parentNode;
			for(var i = 0; i < tabLis.length; i++) {
				tabLis[i].className = '';
				tabLis[i].index = i;
			}
			selLi.className = 'now';
			
			var top = -50 * selLi.index;;
			if(top  >  (tabControlHeight - tabHeight-45)) {
				curry = top;
				setTransform(curry);
			}else{
				curry = tabControlHeight - tabHeight - 45;
				setTransform(curry);
			}

		}
	})
}