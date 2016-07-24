/*
* @Author: Administrator
* @Date:   2016-07-24 03:44:35
* @Last Modified by:   Administrator
* @Last Modified time: 2016-07-24 17:34:46
*/

'use strict';
;(function(w,d){
	var x1, y1, x2, y2,d,tl,_self;
	function PageSwitch(options){
		var options = $.extend({},options,PageSwitch.defaults);
		this.dire = options.dire;
		this.wrap = options.wrap;
		this.page = options.page;
		this.animate = options.animate;
		this.follow = options.follow;
	}
	$.extend(PageSwitch.prototype,(function(){
		function init(){
			_self = this,
			this.bind();
		}
		function bind(){
			$(document).on('touchstart',_self.page,down);
		}
		function down(e){
			tl = 0;
			var ev = e.changedTouches[0];
			x1 = ev.pageX;
			y1 = ev.pageY;
			$(document).on('touchmove',_self.page,move);
			$(document).on('touchend',_self.page,up);
		}
		function move(e){
			var ev = e.changedTouches[0];
			x2 = ev.pageY;
			y2 = ev.pageY;
			if(/x/i.test(_self.dire)&&!/y/i.test(_self.dire)){
				d = x2-x1;
				x1 = x2;
			}else if(/y/i.test(_self.dire)&&!/x/i.test(_self.dire)){
				d = y2 - y1;
				y1 = y2;
			}else{
				return false;
			}
			tl += d;
			if(_self.follow){
				this.style.webkitTransition = 'none';
				if(/x/i.test(_self.dire)&&!/y/i.test(_self.dire)){
					this.style.webkitTransform = 'translate3d('+tl+'px + 0,0)';
				}else if(/y/i.test(_self.dire)&&!/x/i.test(_self.dire)){
					this.style.webkitTransform = 'translate3d(0,' + tl + 'px,0)';
				}else{
					return false;
				}
			}
		}
		function up(e){
			$(document).off('touchmove');
			$(document).off('touchend');
			var ev = e.changedTouches[0];
			x2 = ev.pageX;
			y2 = ev.pageY;
			this.style.webkitTransition = ' transform 300ms';
			if(/x/i.test(_self.dire)&&!/y/i.test(_self.dire)){
				if (Math.abs(tl) < this.offsetWidth / 4) {
					if (!!!this.previousElementSibling) {
						this.style.webkitTransform = 'translate3d(0,0,0)';
						return false
					}
				} else {
					//下滑
					if (tl > 0) {
						this.previousElementSibling.style.webkitTransform = 'translate3d(0,0,0)';
					} else {
						this.style.webkitTransform = 'translate3d('+(-this.offsetWidth)+'px + 0,0)';
					}
				}
			}else if(/y/i.test(_self.dire)&&!/x/i.test(_self.dire)){
				if (Math.abs(tl) < this.offsetHeight / 4) {
					this.style.webkitTransform = 'translate3d(0,' + 0 + 'px,0)';
				} else {
					//下滑
					if (tl > 0) {
						this.previousElementSibling.style.webkitTransform = 'translate3d(0,0,0)';
					} else {
						this.style.webkitTransform = 'translate3d(0,' + (-this.offsetHeight) + 'px,0)';
					}
				}
			}
			$(document).on('webkitTransitionEnd',_self.page,function(){
				this.classList.remove(_self.animate);
			})
		}
		function tlEnd(fn){
			fn()
		}
		return {
			init:init,
			bind,bind,
			tlEnd:tlEnd
		}
	}()));
	PageSwitch.defaults = {
		dire:'y',
		wrap:'body',
		page:'.page',
		animate:'.pageOpen',
		follow:true
	}
	w.PageSwitch = PageSwitch;
})(typeof window !== "undefined" ? window : this,document)