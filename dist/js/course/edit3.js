(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * 导航三个功能点：
 * 1.用户信息展示
 * 2. 点击标题子列表显示隐藏
 * 3.根据访问的页面添加对应的焦点
 */

/**
 * 用户信息展示：
 * 1.读取storage的userinfo数据
 * 2.但是数据时字符串，使用不便，使用JSON.parse转为对象使用
 * 3.然后把对象中的名字与头像设置到导航对应的标签中
 */
var userinfoStr = localStorage.getItem('userinfo');
var userinfo = JSON.parse(userinfoStr) || {};
$('.aside img').attr('src', userinfo.tc_avatar || '/public/img/default.png');
$('.aside h4').text(userinfo.tc_name);

/**
 * 点击标题子列表隐藏s
 * 1.获取导航中的a 标签绑定事件
 * 2.事件触发时让它的下一个兄弟元素ul显示隐藏切换
 */

$('.navs a').on('click', function() {
    $(this).next('ul').slideToggle();
});


/**
 * 根据访问的页面给对应的标题添加焦点：
 * 1.首先获取页面location.pathname
 * 2.获取全部的导航a标签，先统一取出active类名
 * 3.然后利用这个值和导航a标签的href去匹配得到对应的a标签，添加active类名的焦点
 */

var path = location.pathname;
$('.navs a').removeClass('active');
$('.navs a[href="' + path + '"]').addClass('active').parents('ul').show();
},{}],2:[function(require,module,exports){
 /**
  * 添加页面进度条：
  * 1、首先调用进度条的start方法
  * 2、然后监听window的load事件，触发时候调用进度条done方法
  * */
 NProgress.start();
 window.onload = function() {
   NProgress.done();
 };
 
 /**

/**
 * 登录权限校验：
 * 1.我先在前端拿到本地的cookie，看看其中有没有PHPSESSID这一项
 * 有就：认为用户已登录
 * 没有：就认为用户为登录
 * 2.通过location.path判断用户是在登录页面，还是其他页面
 * 3.登录页面已登录，转到首页；其他页面未登录，转到登陆页
 */

var isLogin = !!$.cookie('PHPSESSID');//用户是否已登录
var isLoginPage = location.pathname =='/dist/html/user/login.html';//用户是否在登录页面

//如果用户打开登录页面时，已经登录了，那么给它自动转到首页
if(isLoginPage&&isLogin){ 
	location.href='/dist';
}
//如果用户在其他页面时,未登录过,那么给它自动转到登录页面
else if(!isLoginPage&&!isLogin){
	location.href = '/dist/html/user/login.html';
}

},{}],3:[function(require,module,exports){
$('#btn-logout').on('click', function() {
    $.ajax({
        url: '/v6/logout',
        type: 'post',
        success: function(data) {
            if (data.code == 200) {
                alert('退出成功');
                location.href = '/dist/html/user/login.html';
            }
        }
    });
});
},{}],4:[function(require,module,exports){
/**
  * ajax添加loading：
  * 1、我们通过js的方式拼写loading的html片段，把它添加到body里
  * 2、在ajax发送请求时让loading展示
  * 3、ajax请求完毕时让loading隐藏
  * */
 var loadingHTML =
   '<div class="overlay">' +
     '<img src="/public/img/loading.gif" />' +
   '</div>';
 
 $('body').append(loadingHTML);
 
 // 第一个请求发送时展示loading
 $(document).on('ajaxStart', function() {
    $('.overlay').show();
 });
 
 // 最后一个请求结束时隐藏loading
 $(document).on('ajaxStop', function() {
    $('.overlay').hide();
 });
},{}],5:[function(require,module,exports){
/**
 * 解析location.search：
 * 传1个参数返回指定key的值，不传参数返回解析成对象后的值。
 * 1、首先把头部的?去掉
 * 2、通过&符号劈成一组组key=val这样的字符串组成的数组
 * 3、然后在通过=号把一组组字符串劈开获取key与val，存储到一个对象中
 * 4、判断没有传参返回这个对象，传了返回对象中指定key的值
 * */
function getSearch(key) {
    var searchStr = location.search.slice(1);
    var searchArr = searchStr.split('&');
    var searchObj = {},
        tempArr;
    for (var i = 0, len = searchArr.length; i < len; i++) {
        tempArr = searchArr[i].split('=');
        searchObj[tempArr[0]] = tempArr[1];
    }
    return key ? searchObj[key] : searchObj;
}

module.exports.getSearch = getSearch;
},{}],6:[function(require,module,exports){
require('../common/header.js');
require('../common/aside.js');
require('../common/loading.js');
 require('../common/common.js');
var util = require('../common/util.js');
var lessons;
/**
  * 功能点：
  * 1、页面数据回显
  * 2、编辑章节
  * 3、添加章节
  * 	3.1、数据回显   --  按照常理是不需要回显的，但是因为和编辑同用html模版，需要回显空数据
  *     3.2、数据提交
  * */
 var cs_id = util.getSearch('cs_id');
 
/**
 * 页面数据回显：
  * 1、拿到location.search里面的cs_id
 * 2、通过这个id请求接口获取数据
  * 3、得到数据渲染后的模版，插入页面指定的位置
  * */
 
$.get('/v6/course/lesson',{cs_id:cs_id},function(data){
	if(data.code==200){
		lessons = data.result.lessons;
		data.result.editIndex=3;
		$('#course-edit3').append(template('course-edit3-tpl',data.result));
	}
});

/**
  * 编辑章节_数据回显：
  * 1、因为章节列表是动态生成的，所以需要通过委托的方式给编辑按钮绑定click事件
  * 2、事件触发时获取按钮身上自定义属性记录的ct_id，用来请求接口获取数据
  * 3、数据渲染模态框模版，插入到页面中
  * */
 $(document).on('click', '.btn-lesson-edit', function() {
   var data = {
     ct_id: $(this).attr('data-id')
   };
 
   $.get('/v6/course/chapter/edit', data, function(data) {
      if(data.code == 200) {
      	data.result.cs_id = cs_id; // 后端需要这个值来区分修改的章节属于那个课程
        $('#chapterModal').html(template('lesson-tpl', data.result));
     }
   });
 });
 
 /**
  * 编辑章节_表单提交：
  * 1、因为表单要数据回显是动态生成的，所以使用ajaxForm插件方法的委托
  * 2、成功后给个提示
  * */
  /**修改章节与添加章节：
  * 1、因为在同一个页面中，修改与添加使用的是同一个form，这里一起就处理了
  * 2、通过ajaxForm插件方法把表单默认刷新提交转ajax提交，因为form是动态生成的，所以要使用委托
 * 3、请求成功后，通过判断服务器data.result来却分是修改还是添加，给用户不同的提示信息
 * */
 $('#lesson-form').ajaxForm({
 	delegation:true,
 	 // 表单提交之前做点事情
   beforeSubmit: function(arrData, $form, options) {
     arrData.push({
       name: 'ct_is_free',
       value: $('#ct_is_free').prop('checked')? 1: 0
     })
   },
 	success:function(data){
 		if(data.result){
 		alert('添加成功');
 		 upLessons(data.result);
 		$('#lesson-form').get(0).reset();
 	}else{
 		alert('修改成功');
 		upLessons();
 	}
 	}
 });
 
 /**
  * 添加章节：
  * 1、因为表单要数据回显是动态生成的，所以使用委托的方式给添加按钮绑定click事件
  * 2、事件触发时使用一个空对象渲染模态框模版，插入到页面中
  * */
 $(document).on('click', '#btn-lesson-add', function() {
   $('#chapterModal').html(template('lesson-tpl', { cs_id: cs_id }));
  });


/**
  * 更新章节列表：
  * lessons: [ {ct_id:"1", "ct_name":"介绍", "ct_video_duration":"3:12"}
  *                {ct_id:"2", "ct_name":"定位和浮动", "ct_video_duration":"08:14"} ]
  * 1、获取表单中的章节名称、分钟、秒三个字段，还要获取ct_id字段
  * 2、其中ct_id编辑和添加章节获取的方式不一样
  *    2.1、如果是编辑直接从表单中获取即可
  *    2.2、如果是添加则需要用户传入ct_id
  * 3、把得到的数据拼成lessons里面的对象的样子
  * 4、如果是添加章节那么直接把对象push进入即可，如果是编辑找到章节的下标进行splice替换
  * 5、最后按新的lessons数据重新渲染
  * */
	function upLessons(ct_id){
		var formData = getFormData();
		var lessonData = {
			ct_id:formData.ct_id || ct_id,
			ct_name:formData.ct_name,
			ct_video_duration:formData.ct_minutes + ':' + formData.ct_seconds
		};
		// 添加章节，直接push到lessons即可
		if(ct_id){
			lessons.push(lessonData);
		}
		// 编辑章节，先通过ct_id得到这个章节的下标，然后splice替换为新的对象
		else{
			var index = getLessonIndex(formData.ct_id);
			lesson.splice(index,1,lessonData);
		}
		  // 把新的章节列表数据进行渲染
 	  $('#lesson-list').html(template('lesson-list-tpl', lessons));
	}
	
	/**
  	* 返回模态框form数据构成的对象：
 	* 1、先通过JQ的方法获取一个数组
  	* 2、然后遍历数组中的值重新组织成{ key: val, key: val }的数据形式
 	 * */
	
	function getFormData(){
		var formArrData = $('#lesson-form').serializeArray();
		var formData = {};
		for(var i=0,len=formArrData.length;i<len;i++){
			formData[formArrData[i].name] = formArrData[i].value;
		}
		return formData;
	}
	/**
  * 通过ct_id返回它在lessons中的下标：
  * */
	function getLessonIndex(ct_id) {
   for(var i = 0, len = lessons.length; i < len; i++) {
     if(lessons[i].ct_id == ct_id) {
       return i;
     }
   }
 }

},{"../common/aside.js":1,"../common/common.js":2,"../common/header.js":3,"../common/loading.js":4,"../common/util.js":5}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvY29tbW9uL2FzaWRlLmpzIiwic3JjL2pzL2NvbW1vbi9jb21tb24uanMiLCJzcmMvanMvY29tbW9uL2hlYWRlci5qcyIsInNyYy9qcy9jb21tb24vbG9hZGluZy5qcyIsInNyYy9qcy9jb21tb24vdXRpbC5qcyIsInNyYy9qcy9jb3Vyc2UvZWRpdDMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxyXG4gKiDlr7zoiKrkuInkuKrlip/og73ngrnvvJpcclxuICogMS7nlKjmiLfkv6Hmga/lsZXnpLpcclxuICogMi4g54K55Ye75qCH6aKY5a2Q5YiX6KGo5pi+56S66ZqQ6JePXHJcbiAqIDMu5qC55o2u6K6/6Zeu55qE6aG16Z2i5re75Yqg5a+55bqU55qE54Sm54K5XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIOeUqOaIt+S/oeaBr+Wxleekuu+8mlxyXG4gKiAxLuivu+WPlnN0b3JhZ2XnmoR1c2VyaW5mb+aVsOaNrlxyXG4gKiAyLuS9huaYr+aVsOaNruaXtuWtl+espuS4su+8jOS9v+eUqOS4jeS+v++8jOS9v+eUqEpTT04ucGFyc2XovazkuLrlr7nosaHkvb/nlKhcclxuICogMy7nhLblkI7miorlr7nosaHkuK3nmoTlkI3lrZfkuI7lpLTlg4/orr7nva7liLDlr7zoiKrlr7nlupTnmoTmoIfnrb7kuK1cclxuICovXHJcbnZhciB1c2VyaW5mb1N0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyaW5mbycpO1xyXG52YXIgdXNlcmluZm8gPSBKU09OLnBhcnNlKHVzZXJpbmZvU3RyKSB8fCB7fTtcclxuJCgnLmFzaWRlIGltZycpLmF0dHIoJ3NyYycsIHVzZXJpbmZvLnRjX2F2YXRhciB8fCAnL3B1YmxpYy9pbWcvZGVmYXVsdC5wbmcnKTtcclxuJCgnLmFzaWRlIGg0JykudGV4dCh1c2VyaW5mby50Y19uYW1lKTtcclxuXHJcbi8qKlxyXG4gKiDngrnlh7vmoIfpopjlrZDliJfooajpmpDol49zXHJcbiAqIDEu6I635Y+W5a+86Iiq5Lit55qEYSDmoIfnrb7nu5Hlrprkuovku7ZcclxuICogMi7kuovku7bop6blj5Hml7borqnlroPnmoTkuIvkuIDkuKrlhYTlvJ/lhYPntKB1bOaYvuekuumakOiXj+WIh+aNolxyXG4gKi9cclxuXHJcbiQoJy5uYXZzIGEnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICQodGhpcykubmV4dCgndWwnKS5zbGlkZVRvZ2dsZSgpO1xyXG59KTtcclxuXHJcblxyXG4vKipcclxuICog5qC55o2u6K6/6Zeu55qE6aG16Z2i57uZ5a+55bqU55qE5qCH6aKY5re75Yqg54Sm54K577yaXHJcbiAqIDEu6aaW5YWI6I635Y+W6aG16Z2ibG9jYXRpb24ucGF0aG5hbWVcclxuICogMi7ojrflj5blhajpg6jnmoTlr7zoiKph5qCH562+77yM5YWI57uf5LiA5Y+W5Ye6YWN0aXZl57G75ZCNXHJcbiAqIDMu54S25ZCO5Yip55So6L+Z5Liq5YC85ZKM5a+86IiqYeagh+etvueahGhyZWbljrvljLnphY3lvpfliLDlr7nlupTnmoRh5qCH562+77yM5re75YqgYWN0aXZl57G75ZCN55qE54Sm54K5XHJcbiAqL1xyXG5cclxudmFyIHBhdGggPSBsb2NhdGlvbi5wYXRobmFtZTtcclxuJCgnLm5hdnMgYScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuJCgnLm5hdnMgYVtocmVmPVwiJyArIHBhdGggKyAnXCJdJykuYWRkQ2xhc3MoJ2FjdGl2ZScpLnBhcmVudHMoJ3VsJykuc2hvdygpOyIsIiAvKipcclxuICAqIOa3u+WKoOmhtemdoui/m+W6puadoe+8mlxyXG4gICogMeOAgemmluWFiOiwg+eUqOi/m+W6puadoeeahHN0YXJ05pa55rOVXHJcbiAgKiAy44CB54S25ZCO55uR5ZCsd2luZG9355qEbG9hZOS6i+S7tu+8jOinpuWPkeaXtuWAmeiwg+eUqOi/m+W6puadoWRvbmXmlrnms5VcclxuICAqICovXHJcbiBOUHJvZ3Jlc3Muc3RhcnQoKTtcclxuIHdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgTlByb2dyZXNzLmRvbmUoKTtcclxuIH07XHJcbiBcclxuIC8qKlxyXG5cclxuLyoqXHJcbiAqIOeZu+W9leadg+mZkOagoemqjO+8mlxyXG4gKiAxLuaIkeWFiOWcqOWJjeerr+aLv+WIsOacrOWcsOeahGNvb2tpZe+8jOeci+eci+WFtuS4reacieayoeaciVBIUFNFU1NJROi/meS4gOmhuVxyXG4gKiDmnInlsLHvvJrorqTkuLrnlKjmiLflt7LnmbvlvZVcclxuICog5rKh5pyJ77ya5bCx6K6k5Li655So5oi35Li655m75b2VXHJcbiAqIDIu6YCa6L+HbG9jYXRpb24ucGF0aOWIpOaWreeUqOaIt+aYr+WcqOeZu+W9lemhtemdou+8jOi/mOaYr+WFtuS7lumhtemdolxyXG4gKiAzLueZu+W9lemhtemdouW3sueZu+W9le+8jOi9rOWIsOmmlumhte+8m+WFtuS7lumhtemdouacqueZu+W9le+8jOi9rOWIsOeZu+mZhumhtVxyXG4gKi9cclxuXHJcbnZhciBpc0xvZ2luID0gISEkLmNvb2tpZSgnUEhQU0VTU0lEJyk7Ly/nlKjmiLfmmK/lkKblt7LnmbvlvZVcclxudmFyIGlzTG9naW5QYWdlID0gbG9jYXRpb24ucGF0aG5hbWUgPT0nL2Rpc3QvaHRtbC91c2VyL2xvZ2luLmh0bWwnOy8v55So5oi35piv5ZCm5Zyo55m75b2V6aG16Z2iXHJcblxyXG4vL+WmguaenOeUqOaIt+aJk+W8gOeZu+W9lemhtemdouaXtu+8jOW3sue7j+eZu+W9leS6hu+8jOmCo+S5iOe7meWug+iHquWKqOi9rOWIsOmmlumhtVxyXG5pZihpc0xvZ2luUGFnZSYmaXNMb2dpbil7IFxyXG5cdGxvY2F0aW9uLmhyZWY9Jy9kaXN0JztcclxufVxyXG4vL+WmguaenOeUqOaIt+WcqOWFtuS7lumhtemdouaXtizmnKrnmbvlvZXov4cs6YKj5LmI57uZ5a6D6Ieq5Yqo6L2s5Yiw55m75b2V6aG16Z2iXHJcbmVsc2UgaWYoIWlzTG9naW5QYWdlJiYhaXNMb2dpbil7XHJcblx0bG9jYXRpb24uaHJlZiA9ICcvZGlzdC9odG1sL3VzZXIvbG9naW4uaHRtbCc7XHJcbn1cclxuIiwiJCgnI2J0bi1sb2dvdXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL3Y2L2xvZ291dCcsXHJcbiAgICAgICAgdHlwZTogJ3Bvc3QnLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCfpgIDlh7rmiJDlip8nKTtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnL2Rpc3QvaHRtbC91c2VyL2xvZ2luLmh0bWwnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pOyIsIi8qKlxyXG4gICogYWpheOa3u+WKoGxvYWRpbmfvvJpcclxuICAqIDHjgIHmiJHku6zpgJrov4dqc+eahOaWueW8j+aLvOWGmWxvYWRpbmfnmoRodG1s54mH5q6177yM5oqK5a6D5re75Yqg5YiwYm9keemHjFxyXG4gICogMuOAgeWcqGFqYXjlj5HpgIHor7fmsYLml7borqlsb2FkaW5n5bGV56S6XHJcbiAgKiAz44CBYWpheOivt+axguWujOavleaXtuiuqWxvYWRpbmfpmpDol49cclxuICAqICovXHJcbiB2YXIgbG9hZGluZ0hUTUwgPVxyXG4gICAnPGRpdiBjbGFzcz1cIm92ZXJsYXlcIj4nICtcclxuICAgICAnPGltZyBzcmM9XCIvcHVibGljL2ltZy9sb2FkaW5nLmdpZlwiIC8+JyArXHJcbiAgICc8L2Rpdj4nO1xyXG4gXHJcbiAkKCdib2R5JykuYXBwZW5kKGxvYWRpbmdIVE1MKTtcclxuIFxyXG4gLy8g56ys5LiA5Liq6K+35rGC5Y+R6YCB5pe25bGV56S6bG9hZGluZ1xyXG4gJChkb2N1bWVudCkub24oJ2FqYXhTdGFydCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnLm92ZXJsYXknKS5zaG93KCk7XHJcbiB9KTtcclxuIFxyXG4gLy8g5pyA5ZCO5LiA5Liq6K+35rGC57uT5p2f5pe26ZqQ6JePbG9hZGluZ1xyXG4gJChkb2N1bWVudCkub24oJ2FqYXhTdG9wJywgZnVuY3Rpb24oKSB7XHJcbiAgICAkKCcub3ZlcmxheScpLmhpZGUoKTtcclxuIH0pOyIsIi8qKlxyXG4gKiDop6PmnpBsb2NhdGlvbi5zZWFyY2jvvJpcclxuICog5LygMeS4quWPguaVsOi/lOWbnuaMh+WummtleeeahOWAvO+8jOS4jeS8oOWPguaVsOi/lOWbnuino+aekOaIkOWvueixoeWQjueahOWAvOOAglxyXG4gKiAx44CB6aaW5YWI5oqK5aS06YOo55qEP+WOu+aOiVxyXG4gKiAy44CB6YCa6L+HJuespuWPt+WKiOaIkOS4gOe7hOe7hGtleT12YWzov5nmoLfnmoTlrZfnrKbkuLLnu4TmiJDnmoTmlbDnu4RcclxuICogM+OAgeeEtuWQjuWcqOmAmui/hz3lj7fmiorkuIDnu4Tnu4TlrZfnrKbkuLLliojlvIDojrflj5ZrZXnkuI52YWzvvIzlrZjlgqjliLDkuIDkuKrlr7nosaHkuK1cclxuICogNOOAgeWIpOaWreayoeacieS8oOWPgui/lOWbnui/meS4quWvueixoe+8jOS8oOS6hui/lOWbnuWvueixoeS4reaMh+WummtleeeahOWAvFxyXG4gKiAqL1xyXG5mdW5jdGlvbiBnZXRTZWFyY2goa2V5KSB7XHJcbiAgICB2YXIgc2VhcmNoU3RyID0gbG9jYXRpb24uc2VhcmNoLnNsaWNlKDEpO1xyXG4gICAgdmFyIHNlYXJjaEFyciA9IHNlYXJjaFN0ci5zcGxpdCgnJicpO1xyXG4gICAgdmFyIHNlYXJjaE9iaiA9IHt9LFxyXG4gICAgICAgIHRlbXBBcnI7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gc2VhcmNoQXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgdGVtcEFyciA9IHNlYXJjaEFycltpXS5zcGxpdCgnPScpO1xyXG4gICAgICAgIHNlYXJjaE9ialt0ZW1wQXJyWzBdXSA9IHRlbXBBcnJbMV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4ga2V5ID8gc2VhcmNoT2JqW2tleV0gOiBzZWFyY2hPYmo7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzLmdldFNlYXJjaCA9IGdldFNlYXJjaDsiLCJyZXF1aXJlKCcuLi9jb21tb24vaGVhZGVyLmpzJyk7XHJcbnJlcXVpcmUoJy4uL2NvbW1vbi9hc2lkZS5qcycpO1xyXG5yZXF1aXJlKCcuLi9jb21tb24vbG9hZGluZy5qcycpO1xyXG4gcmVxdWlyZSgnLi4vY29tbW9uL2NvbW1vbi5qcycpO1xyXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4uL2NvbW1vbi91dGlsLmpzJyk7XHJcbnZhciBsZXNzb25zO1xyXG4vKipcclxuICAqIOWKn+iDveeCue+8mlxyXG4gICogMeOAgemhtemdouaVsOaNruWbnuaYvlxyXG4gICogMuOAgee8lui+keeroOiKglxyXG4gICogM+OAgea3u+WKoOeroOiKglxyXG4gICogXHQzLjHjgIHmlbDmja7lm57mmL4gICAtLSAg5oyJ54Wn5bi455CG5piv5LiN6ZyA6KaB5Zue5pi+55qE77yM5L2G5piv5Zug5Li65ZKM57yW6L6R5ZCM55SoaHRtbOaooeeJiO+8jOmcgOimgeWbnuaYvuepuuaVsOaNrlxyXG4gICogICAgIDMuMuOAgeaVsOaNruaPkOS6pFxyXG4gICogKi9cclxuIHZhciBjc19pZCA9IHV0aWwuZ2V0U2VhcmNoKCdjc19pZCcpO1xyXG4gXHJcbi8qKlxyXG4gKiDpobXpnaLmlbDmja7lm57mmL7vvJpcclxuICAqIDHjgIHmi7/liLBsb2NhdGlvbi5zZWFyY2jph4zpnaLnmoRjc19pZFxyXG4gKiAy44CB6YCa6L+H6L+Z5LiqaWTor7fmsYLmjqXlj6Pojrflj5bmlbDmja5cclxuICAqIDPjgIHlvpfliLDmlbDmja7muLLmn5PlkI7nmoTmqKHniYjvvIzmj5LlhaXpobXpnaLmjIflrprnmoTkvY3nva5cclxuICAqICovXHJcbiBcclxuJC5nZXQoJy92Ni9jb3Vyc2UvbGVzc29uJyx7Y3NfaWQ6Y3NfaWR9LGZ1bmN0aW9uKGRhdGEpe1xyXG5cdGlmKGRhdGEuY29kZT09MjAwKXtcclxuXHRcdGxlc3NvbnMgPSBkYXRhLnJlc3VsdC5sZXNzb25zO1xyXG5cdFx0ZGF0YS5yZXN1bHQuZWRpdEluZGV4PTM7XHJcblx0XHQkKCcjY291cnNlLWVkaXQzJykuYXBwZW5kKHRlbXBsYXRlKCdjb3Vyc2UtZWRpdDMtdHBsJyxkYXRhLnJlc3VsdCkpO1xyXG5cdH1cclxufSk7XHJcblxyXG4vKipcclxuICAqIOe8lui+keeroOiKgl/mlbDmja7lm57mmL7vvJpcclxuICAqIDHjgIHlm6DkuLrnq6DoioLliJfooajmmK/liqjmgIHnlJ/miJDnmoTvvIzmiYDku6XpnIDopoHpgJrov4flp5TmiZjnmoTmlrnlvI/nu5nnvJbovpHmjInpkq7nu5HlrppjbGlja+S6i+S7tlxyXG4gICogMuOAgeS6i+S7tuinpuWPkeaXtuiOt+WPluaMiemSrui6q+S4iuiHquWumuS5ieWxnuaAp+iusOW9leeahGN0X2lk77yM55So5p2l6K+35rGC5o6l5Y+j6I635Y+W5pWw5o2uXHJcbiAgKiAz44CB5pWw5o2u5riy5p+T5qih5oCB5qGG5qih54mI77yM5o+S5YWl5Yiw6aG16Z2i5LitXHJcbiAgKiAqL1xyXG4gJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5idG4tbGVzc29uLWVkaXQnLCBmdW5jdGlvbigpIHtcclxuICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgY3RfaWQ6ICQodGhpcykuYXR0cignZGF0YS1pZCcpXHJcbiAgIH07XHJcbiBcclxuICAgJC5nZXQoJy92Ni9jb3Vyc2UvY2hhcHRlci9lZGl0JywgZGF0YSwgZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICBpZihkYXRhLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgIFx0ZGF0YS5yZXN1bHQuY3NfaWQgPSBjc19pZDsgLy8g5ZCO56uv6ZyA6KaB6L+Z5Liq5YC85p2l5Yy65YiG5L+u5pS555qE56ug6IqC5bGe5LqO6YKj5Liq6K++56iLXHJcbiAgICAgICAgJCgnI2NoYXB0ZXJNb2RhbCcpLmh0bWwodGVtcGxhdGUoJ2xlc3Nvbi10cGwnLCBkYXRhLnJlc3VsdCkpO1xyXG4gICAgIH1cclxuICAgfSk7XHJcbiB9KTtcclxuIFxyXG4gLyoqXHJcbiAgKiDnvJbovpHnq6DoioJf6KGo5Y2V5o+Q5Lqk77yaXHJcbiAgKiAx44CB5Zug5Li66KGo5Y2V6KaB5pWw5o2u5Zue5pi+5piv5Yqo5oCB55Sf5oiQ55qE77yM5omA5Lul5L2/55SoYWpheEZvcm3mj5Lku7bmlrnms5XnmoTlp5TmiZhcclxuICAqIDLjgIHmiJDlip/lkI7nu5nkuKrmj5DnpLpcclxuICAqICovXHJcbiAgLyoq5L+u5pS556ug6IqC5LiO5re75Yqg56ug6IqC77yaXHJcbiAgKiAx44CB5Zug5Li65Zyo5ZCM5LiA5Liq6aG16Z2i5Lit77yM5L+u5pS55LiO5re75Yqg5L2/55So55qE5piv5ZCM5LiA5LiqZm9ybe+8jOi/memHjOS4gOi1t+WwseWkhOeQhuS6hlxyXG4gICogMuOAgemAmui/h2FqYXhGb3Jt5o+S5Lu25pa55rOV5oqK6KGo5Y2V6buY6K6k5Yi35paw5o+Q5Lqk6L2sYWpheOaPkOS6pO+8jOWboOS4umZvcm3mmK/liqjmgIHnlJ/miJDnmoTvvIzmiYDku6XopoHkvb/nlKjlp5TmiZhcclxuICogM+OAgeivt+axguaIkOWKn+WQju+8jOmAmui/h+WIpOaWreacjeWKoeWZqGRhdGEucmVzdWx05p2l5Y205YiG5piv5L+u5pS56L+Y5piv5re75Yqg77yM57uZ55So5oi35LiN5ZCM55qE5o+Q56S65L+h5oGvXHJcbiAqICovXHJcbiAkKCcjbGVzc29uLWZvcm0nKS5hamF4Rm9ybSh7XHJcbiBcdGRlbGVnYXRpb246dHJ1ZSxcclxuIFx0IC8vIOihqOWNleaPkOS6pOS5i+WJjeWBmueCueS6i+aDhVxyXG4gICBiZWZvcmVTdWJtaXQ6IGZ1bmN0aW9uKGFyckRhdGEsICRmb3JtLCBvcHRpb25zKSB7XHJcbiAgICAgYXJyRGF0YS5wdXNoKHtcclxuICAgICAgIG5hbWU6ICdjdF9pc19mcmVlJyxcclxuICAgICAgIHZhbHVlOiAkKCcjY3RfaXNfZnJlZScpLnByb3AoJ2NoZWNrZWQnKT8gMTogMFxyXG4gICAgIH0pXHJcbiAgIH0sXHJcbiBcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcbiBcdFx0aWYoZGF0YS5yZXN1bHQpe1xyXG4gXHRcdGFsZXJ0KCfmt7vliqDmiJDlip8nKTtcclxuIFx0XHQgdXBMZXNzb25zKGRhdGEucmVzdWx0KTtcclxuIFx0XHQkKCcjbGVzc29uLWZvcm0nKS5nZXQoMCkucmVzZXQoKTtcclxuIFx0fWVsc2V7XHJcbiBcdFx0YWxlcnQoJ+S/ruaUueaIkOWKnycpO1xyXG4gXHRcdHVwTGVzc29ucygpO1xyXG4gXHR9XHJcbiBcdH1cclxuIH0pO1xyXG4gXHJcbiAvKipcclxuICAqIOa3u+WKoOeroOiKgu+8mlxyXG4gICogMeOAgeWboOS4uuihqOWNleimgeaVsOaNruWbnuaYvuaYr+WKqOaAgeeUn+aIkOeahO+8jOaJgOS7peS9v+eUqOWnlOaJmOeahOaWueW8j+e7mea3u+WKoOaMiemSrue7keWummNsaWNr5LqL5Lu2XHJcbiAgKiAy44CB5LqL5Lu26Kem5Y+R5pe25L2/55So5LiA5Liq56m65a+56LGh5riy5p+T5qih5oCB5qGG5qih54mI77yM5o+S5YWl5Yiw6aG16Z2i5LitXHJcbiAgKiAqL1xyXG4gJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyNidG4tbGVzc29uLWFkZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAkKCcjY2hhcHRlck1vZGFsJykuaHRtbCh0ZW1wbGF0ZSgnbGVzc29uLXRwbCcsIHsgY3NfaWQ6IGNzX2lkIH0pKTtcclxuICB9KTtcclxuXHJcblxyXG4vKipcclxuICAqIOabtOaWsOeroOiKguWIl+ihqO+8mlxyXG4gICogbGVzc29uczogWyB7Y3RfaWQ6XCIxXCIsIFwiY3RfbmFtZVwiOlwi5LuL57uNXCIsIFwiY3RfdmlkZW9fZHVyYXRpb25cIjpcIjM6MTJcIn1cclxuICAqICAgICAgICAgICAgICAgIHtjdF9pZDpcIjJcIiwgXCJjdF9uYW1lXCI6XCLlrprkvY3lkozmta7liqhcIiwgXCJjdF92aWRlb19kdXJhdGlvblwiOlwiMDg6MTRcIn0gXVxyXG4gICogMeOAgeiOt+WPluihqOWNleS4reeahOeroOiKguWQjeensOOAgeWIhumSn+OAgeenkuS4ieS4quWtl+aute+8jOi/mOimgeiOt+WPlmN0X2lk5a2X5q61XHJcbiAgKiAy44CB5YW25LitY3RfaWTnvJbovpHlkozmt7vliqDnq6DoioLojrflj5bnmoTmlrnlvI/kuI3kuIDmoLdcclxuICAqICAgIDIuMeOAgeWmguaenOaYr+e8lui+keebtOaOpeS7juihqOWNleS4reiOt+WPluWNs+WPr1xyXG4gICogICAgMi4y44CB5aaC5p6c5piv5re75Yqg5YiZ6ZyA6KaB55So5oi35Lyg5YWlY3RfaWRcclxuICAqIDPjgIHmiorlvpfliLDnmoTmlbDmja7mi7zmiJBsZXNzb25z6YeM6Z2i55qE5a+56LGh55qE5qC35a2QXHJcbiAgKiA044CB5aaC5p6c5piv5re75Yqg56ug6IqC6YKj5LmI55u05o6l5oqK5a+56LGhcHVzaOi/m+WFpeWNs+WPr++8jOWmguaenOaYr+e8lui+keaJvuWIsOeroOiKgueahOS4i+agh+i/m+ihjHNwbGljZeabv+aNolxyXG4gICogNeOAgeacgOWQjuaMieaWsOeahGxlc3NvbnPmlbDmja7ph43mlrDmuLLmn5NcclxuICAqICovXHJcblx0ZnVuY3Rpb24gdXBMZXNzb25zKGN0X2lkKXtcclxuXHRcdHZhciBmb3JtRGF0YSA9IGdldEZvcm1EYXRhKCk7XHJcblx0XHR2YXIgbGVzc29uRGF0YSA9IHtcclxuXHRcdFx0Y3RfaWQ6Zm9ybURhdGEuY3RfaWQgfHwgY3RfaWQsXHJcblx0XHRcdGN0X25hbWU6Zm9ybURhdGEuY3RfbmFtZSxcclxuXHRcdFx0Y3RfdmlkZW9fZHVyYXRpb246Zm9ybURhdGEuY3RfbWludXRlcyArICc6JyArIGZvcm1EYXRhLmN0X3NlY29uZHNcclxuXHRcdH07XHJcblx0XHQvLyDmt7vliqDnq6DoioLvvIznm7TmjqVwdXNo5YiwbGVzc29uc+WNs+WPr1xyXG5cdFx0aWYoY3RfaWQpe1xyXG5cdFx0XHRsZXNzb25zLnB1c2gobGVzc29uRGF0YSk7XHJcblx0XHR9XHJcblx0XHQvLyDnvJbovpHnq6DoioLvvIzlhYjpgJrov4djdF9pZOW+l+WIsOi/meS4queroOiKgueahOS4i+agh++8jOeEtuWQjnNwbGljZeabv+aNouS4uuaWsOeahOWvueixoVxyXG5cdFx0ZWxzZXtcclxuXHRcdFx0dmFyIGluZGV4ID0gZ2V0TGVzc29uSW5kZXgoZm9ybURhdGEuY3RfaWQpO1xyXG5cdFx0XHRsZXNzb24uc3BsaWNlKGluZGV4LDEsbGVzc29uRGF0YSk7XHJcblx0XHR9XHJcblx0XHQgIC8vIOaKiuaWsOeahOeroOiKguWIl+ihqOaVsOaNrui/m+ihjOa4suafk1xyXG4gXHQgICQoJyNsZXNzb24tbGlzdCcpLmh0bWwodGVtcGxhdGUoJ2xlc3Nvbi1saXN0LXRwbCcsIGxlc3NvbnMpKTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcbiAgXHQqIOi/lOWbnuaooeaAgeahhmZvcm3mlbDmja7mnoTmiJDnmoTlr7nosaHvvJpcclxuIFx0KiAx44CB5YWI6YCa6L+HSlHnmoTmlrnms5Xojrflj5bkuIDkuKrmlbDnu4RcclxuICBcdCogMuOAgeeEtuWQjumBjeWOhuaVsOe7hOS4reeahOWAvOmHjeaWsOe7hOe7h+aIkHsga2V5OiB2YWwsIGtleTogdmFsIH3nmoTmlbDmja7lvaLlvI9cclxuIFx0ICogKi9cclxuXHRcclxuXHRmdW5jdGlvbiBnZXRGb3JtRGF0YSgpe1xyXG5cdFx0dmFyIGZvcm1BcnJEYXRhID0gJCgnI2xlc3Nvbi1mb3JtJykuc2VyaWFsaXplQXJyYXkoKTtcclxuXHRcdHZhciBmb3JtRGF0YSA9IHt9O1xyXG5cdFx0Zm9yKHZhciBpPTAsbGVuPWZvcm1BcnJEYXRhLmxlbmd0aDtpPGxlbjtpKyspe1xyXG5cdFx0XHRmb3JtRGF0YVtmb3JtQXJyRGF0YVtpXS5uYW1lXSA9IGZvcm1BcnJEYXRhW2ldLnZhbHVlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZvcm1EYXRhO1xyXG5cdH1cclxuXHQvKipcclxuICAqIOmAmui/h2N0X2lk6L+U5Zue5a6D5ZyobGVzc29uc+S4reeahOS4i+agh++8mlxyXG4gICogKi9cclxuXHRmdW5jdGlvbiBnZXRMZXNzb25JbmRleChjdF9pZCkge1xyXG4gICBmb3IodmFyIGkgPSAwLCBsZW4gPSBsZXNzb25zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgaWYobGVzc29uc1tpXS5jdF9pZCA9PSBjdF9pZCkge1xyXG4gICAgICAgcmV0dXJuIGk7XHJcbiAgICAgfVxyXG4gICB9XHJcbiB9XHJcbiJdfQ==
