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
require('../common/header.js');
require('../common/aside.js');
require('../common/loading.js');
 require('../common/common.js');

/**
 * 渲染课程列表：
 * 1.请求接口获取列表数据
 * 2.得到数据渲染后的模板。插入页面指定位置
 */

$.get('/v6/course', function(data) {
    if (data.code == 200) {
        $('#course-list').html(template('course-list-tpl', data.result));
    }
});
},{"../common/aside.js":1,"../common/common.js":2,"../common/header.js":3,"../common/loading.js":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvY29tbW9uL2FzaWRlLmpzIiwic3JjL2pzL2NvbW1vbi9jb21tb24uanMiLCJzcmMvanMvY29tbW9uL2hlYWRlci5qcyIsInNyYy9qcy9jb21tb24vbG9hZGluZy5qcyIsInNyYy9qcy9jb3Vyc2UvbGlzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxyXG4gKiDlr7zoiKrkuInkuKrlip/og73ngrnvvJpcclxuICogMS7nlKjmiLfkv6Hmga/lsZXnpLpcclxuICogMi4g54K55Ye75qCH6aKY5a2Q5YiX6KGo5pi+56S66ZqQ6JePXHJcbiAqIDMu5qC55o2u6K6/6Zeu55qE6aG16Z2i5re75Yqg5a+55bqU55qE54Sm54K5XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIOeUqOaIt+S/oeaBr+Wxleekuu+8mlxyXG4gKiAxLuivu+WPlnN0b3JhZ2XnmoR1c2VyaW5mb+aVsOaNrlxyXG4gKiAyLuS9huaYr+aVsOaNruaXtuWtl+espuS4su+8jOS9v+eUqOS4jeS+v++8jOS9v+eUqEpTT04ucGFyc2XovazkuLrlr7nosaHkvb/nlKhcclxuICogMy7nhLblkI7miorlr7nosaHkuK3nmoTlkI3lrZfkuI7lpLTlg4/orr7nva7liLDlr7zoiKrlr7nlupTnmoTmoIfnrb7kuK1cclxuICovXHJcbnZhciB1c2VyaW5mb1N0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyaW5mbycpO1xyXG52YXIgdXNlcmluZm8gPSBKU09OLnBhcnNlKHVzZXJpbmZvU3RyKSB8fCB7fTtcclxuJCgnLmFzaWRlIGltZycpLmF0dHIoJ3NyYycsIHVzZXJpbmZvLnRjX2F2YXRhciB8fCAnL3B1YmxpYy9pbWcvZGVmYXVsdC5wbmcnKTtcclxuJCgnLmFzaWRlIGg0JykudGV4dCh1c2VyaW5mby50Y19uYW1lKTtcclxuXHJcbi8qKlxyXG4gKiDngrnlh7vmoIfpopjlrZDliJfooajpmpDol49zXHJcbiAqIDEu6I635Y+W5a+86Iiq5Lit55qEYSDmoIfnrb7nu5Hlrprkuovku7ZcclxuICogMi7kuovku7bop6blj5Hml7borqnlroPnmoTkuIvkuIDkuKrlhYTlvJ/lhYPntKB1bOaYvuekuumakOiXj+WIh+aNolxyXG4gKi9cclxuXHJcbiQoJy5uYXZzIGEnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICQodGhpcykubmV4dCgndWwnKS5zbGlkZVRvZ2dsZSgpO1xyXG59KTtcclxuXHJcblxyXG4vKipcclxuICog5qC55o2u6K6/6Zeu55qE6aG16Z2i57uZ5a+55bqU55qE5qCH6aKY5re75Yqg54Sm54K577yaXHJcbiAqIDEu6aaW5YWI6I635Y+W6aG16Z2ibG9jYXRpb24ucGF0aG5hbWVcclxuICogMi7ojrflj5blhajpg6jnmoTlr7zoiKph5qCH562+77yM5YWI57uf5LiA5Y+W5Ye6YWN0aXZl57G75ZCNXHJcbiAqIDMu54S25ZCO5Yip55So6L+Z5Liq5YC85ZKM5a+86IiqYeagh+etvueahGhyZWbljrvljLnphY3lvpfliLDlr7nlupTnmoRh5qCH562+77yM5re75YqgYWN0aXZl57G75ZCN55qE54Sm54K5XHJcbiAqL1xyXG5cclxudmFyIHBhdGggPSBsb2NhdGlvbi5wYXRobmFtZTtcclxuJCgnLm5hdnMgYScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuJCgnLm5hdnMgYVtocmVmPVwiJyArIHBhdGggKyAnXCJdJykuYWRkQ2xhc3MoJ2FjdGl2ZScpLnBhcmVudHMoJ3VsJykuc2hvdygpOyIsIiAvKipcclxuICAqIOa3u+WKoOmhtemdoui/m+W6puadoe+8mlxyXG4gICogMeOAgemmluWFiOiwg+eUqOi/m+W6puadoeeahHN0YXJ05pa55rOVXHJcbiAgKiAy44CB54S25ZCO55uR5ZCsd2luZG9355qEbG9hZOS6i+S7tu+8jOinpuWPkeaXtuWAmeiwg+eUqOi/m+W6puadoWRvbmXmlrnms5VcclxuICAqICovXHJcbiBOUHJvZ3Jlc3Muc3RhcnQoKTtcclxuIHdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgTlByb2dyZXNzLmRvbmUoKTtcclxuIH07XHJcbiBcclxuIC8qKlxyXG5cclxuLyoqXHJcbiAqIOeZu+W9leadg+mZkOagoemqjO+8mlxyXG4gKiAxLuaIkeWFiOWcqOWJjeerr+aLv+WIsOacrOWcsOeahGNvb2tpZe+8jOeci+eci+WFtuS4reacieayoeaciVBIUFNFU1NJROi/meS4gOmhuVxyXG4gKiDmnInlsLHvvJrorqTkuLrnlKjmiLflt7LnmbvlvZVcclxuICog5rKh5pyJ77ya5bCx6K6k5Li655So5oi35Li655m75b2VXHJcbiAqIDIu6YCa6L+HbG9jYXRpb24ucGF0aOWIpOaWreeUqOaIt+aYr+WcqOeZu+W9lemhtemdou+8jOi/mOaYr+WFtuS7lumhtemdolxyXG4gKiAzLueZu+W9lemhtemdouW3sueZu+W9le+8jOi9rOWIsOmmlumhte+8m+WFtuS7lumhtemdouacqueZu+W9le+8jOi9rOWIsOeZu+mZhumhtVxyXG4gKi9cclxuXHJcbnZhciBpc0xvZ2luID0gISEkLmNvb2tpZSgnUEhQU0VTU0lEJyk7Ly/nlKjmiLfmmK/lkKblt7LnmbvlvZVcclxudmFyIGlzTG9naW5QYWdlID0gbG9jYXRpb24ucGF0aG5hbWUgPT0nL2Rpc3QvaHRtbC91c2VyL2xvZ2luLmh0bWwnOy8v55So5oi35piv5ZCm5Zyo55m75b2V6aG16Z2iXHJcblxyXG4vL+WmguaenOeUqOaIt+aJk+W8gOeZu+W9lemhtemdouaXtu+8jOW3sue7j+eZu+W9leS6hu+8jOmCo+S5iOe7meWug+iHquWKqOi9rOWIsOmmlumhtVxyXG5pZihpc0xvZ2luUGFnZSYmaXNMb2dpbil7IFxyXG5cdGxvY2F0aW9uLmhyZWY9Jy9kaXN0JztcclxufVxyXG4vL+WmguaenOeUqOaIt+WcqOWFtuS7lumhtemdouaXtizmnKrnmbvlvZXov4cs6YKj5LmI57uZ5a6D6Ieq5Yqo6L2s5Yiw55m75b2V6aG16Z2iXHJcbmVsc2UgaWYoIWlzTG9naW5QYWdlJiYhaXNMb2dpbil7XHJcblx0bG9jYXRpb24uaHJlZiA9ICcvZGlzdC9odG1sL3VzZXIvbG9naW4uaHRtbCc7XHJcbn1cclxuIiwiJCgnI2J0bi1sb2dvdXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL3Y2L2xvZ291dCcsXHJcbiAgICAgICAgdHlwZTogJ3Bvc3QnLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCfpgIDlh7rmiJDlip8nKTtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnL2Rpc3QvaHRtbC91c2VyL2xvZ2luLmh0bWwnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pOyIsIi8qKlxyXG4gICogYWpheOa3u+WKoGxvYWRpbmfvvJpcclxuICAqIDHjgIHmiJHku6zpgJrov4dqc+eahOaWueW8j+aLvOWGmWxvYWRpbmfnmoRodG1s54mH5q6177yM5oqK5a6D5re75Yqg5YiwYm9keemHjFxyXG4gICogMuOAgeWcqGFqYXjlj5HpgIHor7fmsYLml7borqlsb2FkaW5n5bGV56S6XHJcbiAgKiAz44CBYWpheOivt+axguWujOavleaXtuiuqWxvYWRpbmfpmpDol49cclxuICAqICovXHJcbiB2YXIgbG9hZGluZ0hUTUwgPVxyXG4gICAnPGRpdiBjbGFzcz1cIm92ZXJsYXlcIj4nICtcclxuICAgICAnPGltZyBzcmM9XCIvcHVibGljL2ltZy9sb2FkaW5nLmdpZlwiIC8+JyArXHJcbiAgICc8L2Rpdj4nO1xyXG4gXHJcbiAkKCdib2R5JykuYXBwZW5kKGxvYWRpbmdIVE1MKTtcclxuIFxyXG4gLy8g56ys5LiA5Liq6K+35rGC5Y+R6YCB5pe25bGV56S6bG9hZGluZ1xyXG4gJChkb2N1bWVudCkub24oJ2FqYXhTdGFydCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnLm92ZXJsYXknKS5zaG93KCk7XHJcbiB9KTtcclxuIFxyXG4gLy8g5pyA5ZCO5LiA5Liq6K+35rGC57uT5p2f5pe26ZqQ6JePbG9hZGluZ1xyXG4gJChkb2N1bWVudCkub24oJ2FqYXhTdG9wJywgZnVuY3Rpb24oKSB7XHJcbiAgICAkKCcub3ZlcmxheScpLmhpZGUoKTtcclxuIH0pOyIsInJlcXVpcmUoJy4uL2NvbW1vbi9oZWFkZXIuanMnKTtcclxucmVxdWlyZSgnLi4vY29tbW9uL2FzaWRlLmpzJyk7XHJcbnJlcXVpcmUoJy4uL2NvbW1vbi9sb2FkaW5nLmpzJyk7XHJcbiByZXF1aXJlKCcuLi9jb21tb24vY29tbW9uLmpzJyk7XHJcblxyXG4vKipcclxuICog5riy5p+T6K++56iL5YiX6KGo77yaXHJcbiAqIDEu6K+35rGC5o6l5Y+j6I635Y+W5YiX6KGo5pWw5o2uXHJcbiAqIDIu5b6X5Yiw5pWw5o2u5riy5p+T5ZCO55qE5qih5p2/44CC5o+S5YWl6aG16Z2i5oyH5a6a5L2N572uXHJcbiAqL1xyXG5cclxuJC5nZXQoJy92Ni9jb3Vyc2UnLCBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICBpZiAoZGF0YS5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICQoJyNjb3Vyc2UtbGlzdCcpLmh0bWwodGVtcGxhdGUoJ2NvdXJzZS1saXN0LXRwbCcsIGRhdGEucmVzdWx0KSk7XHJcbiAgICB9XHJcbn0pOyJdfQ==
