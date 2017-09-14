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


$('#teacher_add_form').ajaxForm(function(data) {
    if (data.code == 200) {
        alert('添加讲师成功');
    }
})
},{"../common/aside.js":1,"../common/common.js":2,"../common/header.js":3,"../common/loading.js":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvY29tbW9uL2FzaWRlLmpzIiwic3JjL2pzL2NvbW1vbi9jb21tb24uanMiLCJzcmMvanMvY29tbW9uL2hlYWRlci5qcyIsInNyYy9qcy9jb21tb24vbG9hZGluZy5qcyIsInNyYy9qcy90ZWFjaGVyL2FkZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXHJcbiAqIOWvvOiIquS4ieS4quWKn+iDveeCue+8mlxyXG4gKiAxLueUqOaIt+S/oeaBr+WxleekulxyXG4gKiAyLiDngrnlh7vmoIfpopjlrZDliJfooajmmL7npLrpmpDol49cclxuICogMy7moLnmja7orr/pl67nmoTpobXpnaLmt7vliqDlr7nlupTnmoTnhKbngrlcclxuICovXHJcblxyXG4vKipcclxuICog55So5oi35L+h5oGv5bGV56S677yaXHJcbiAqIDEu6K+75Y+Wc3RvcmFnZeeahHVzZXJpbmZv5pWw5o2uXHJcbiAqIDIu5L2G5piv5pWw5o2u5pe25a2X56ym5Liy77yM5L2/55So5LiN5L6/77yM5L2/55SoSlNPTi5wYXJzZei9rOS4uuWvueixoeS9v+eUqFxyXG4gKiAzLueEtuWQjuaKiuWvueixoeS4reeahOWQjeWtl+S4juWktOWDj+iuvue9ruWIsOWvvOiIquWvueW6lOeahOagh+etvuS4rVxyXG4gKi9cclxudmFyIHVzZXJpbmZvU3RyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJpbmZvJyk7XHJcbnZhciB1c2VyaW5mbyA9IEpTT04ucGFyc2UodXNlcmluZm9TdHIpIHx8IHt9O1xyXG4kKCcuYXNpZGUgaW1nJykuYXR0cignc3JjJywgdXNlcmluZm8udGNfYXZhdGFyIHx8ICcvcHVibGljL2ltZy9kZWZhdWx0LnBuZycpO1xyXG4kKCcuYXNpZGUgaDQnKS50ZXh0KHVzZXJpbmZvLnRjX25hbWUpO1xyXG5cclxuLyoqXHJcbiAqIOeCueWHu+agh+mimOWtkOWIl+ihqOmakOiXj3NcclxuICogMS7ojrflj5blr7zoiKrkuK3nmoRhIOagh+etvue7keWumuS6i+S7tlxyXG4gKiAyLuS6i+S7tuinpuWPkeaXtuiuqeWug+eahOS4i+S4gOS4quWFhOW8n+WFg+e0oHVs5pi+56S66ZqQ6JeP5YiH5o2iXHJcbiAqL1xyXG5cclxuJCgnLm5hdnMgYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgJCh0aGlzKS5uZXh0KCd1bCcpLnNsaWRlVG9nZ2xlKCk7XHJcbn0pO1xyXG5cclxuXHJcbi8qKlxyXG4gKiDmoLnmja7orr/pl67nmoTpobXpnaLnu5nlr7nlupTnmoTmoIfpopjmt7vliqDnhKbngrnvvJpcclxuICogMS7pppblhYjojrflj5bpobXpnaJsb2NhdGlvbi5wYXRobmFtZVxyXG4gKiAyLuiOt+WPluWFqOmDqOeahOWvvOiIqmHmoIfnrb7vvIzlhYjnu5/kuIDlj5blh7phY3RpdmXnsbvlkI1cclxuICogMy7nhLblkI7liKnnlKjov5nkuKrlgLzlkozlr7zoiKph5qCH562+55qEaHJlZuWOu+WMuemFjeW+l+WIsOWvueW6lOeahGHmoIfnrb7vvIzmt7vliqBhY3RpdmXnsbvlkI3nmoTnhKbngrlcclxuICovXHJcblxyXG52YXIgcGF0aCA9IGxvY2F0aW9uLnBhdGhuYW1lO1xyXG4kKCcubmF2cyBhJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4kKCcubmF2cyBhW2hyZWY9XCInICsgcGF0aCArICdcIl0nKS5hZGRDbGFzcygnYWN0aXZlJykucGFyZW50cygndWwnKS5zaG93KCk7IiwiIC8qKlxyXG4gICog5re75Yqg6aG16Z2i6L+b5bqm5p2h77yaXHJcbiAgKiAx44CB6aaW5YWI6LCD55So6L+b5bqm5p2h55qEc3RhcnTmlrnms5VcclxuICAqIDLjgIHnhLblkI7nm5HlkKx3aW5kb3fnmoRsb2Fk5LqL5Lu277yM6Kem5Y+R5pe25YCZ6LCD55So6L+b5bqm5p2hZG9uZeaWueazlVxyXG4gICogKi9cclxuIE5Qcm9ncmVzcy5zdGFydCgpO1xyXG4gd2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICBOUHJvZ3Jlc3MuZG9uZSgpO1xyXG4gfTtcclxuIFxyXG4gLyoqXHJcblxyXG4vKipcclxuICog55m75b2V5p2D6ZmQ5qCh6aqM77yaXHJcbiAqIDEu5oiR5YWI5Zyo5YmN56uv5ou/5Yiw5pys5Zyw55qEY29va2ll77yM55yL55yL5YW25Lit5pyJ5rKh5pyJUEhQU0VTU0lE6L+Z5LiA6aG5XHJcbiAqIOacieWwse+8muiupOS4uueUqOaIt+W3sueZu+W9lVxyXG4gKiDmsqHmnInvvJrlsLHorqTkuLrnlKjmiLfkuLrnmbvlvZVcclxuICogMi7pgJrov4dsb2NhdGlvbi5wYXRo5Yik5pat55So5oi35piv5Zyo55m75b2V6aG16Z2i77yM6L+Y5piv5YW25LuW6aG16Z2iXHJcbiAqIDMu55m75b2V6aG16Z2i5bey55m75b2V77yM6L2s5Yiw6aaW6aG177yb5YW25LuW6aG16Z2i5pyq55m75b2V77yM6L2s5Yiw55m76ZmG6aG1XHJcbiAqL1xyXG5cclxudmFyIGlzTG9naW4gPSAhISQuY29va2llKCdQSFBTRVNTSUQnKTsvL+eUqOaIt+aYr+WQpuW3sueZu+W9lVxyXG52YXIgaXNMb2dpblBhZ2UgPSBsb2NhdGlvbi5wYXRobmFtZSA9PScvZGlzdC9odG1sL3VzZXIvbG9naW4uaHRtbCc7Ly/nlKjmiLfmmK/lkKblnKjnmbvlvZXpobXpnaJcclxuXHJcbi8v5aaC5p6c55So5oi35omT5byA55m75b2V6aG16Z2i5pe277yM5bey57uP55m75b2V5LqG77yM6YKj5LmI57uZ5a6D6Ieq5Yqo6L2s5Yiw6aaW6aG1XHJcbmlmKGlzTG9naW5QYWdlJiZpc0xvZ2luKXsgXHJcblx0bG9jYXRpb24uaHJlZj0nL2Rpc3QnO1xyXG59XHJcbi8v5aaC5p6c55So5oi35Zyo5YW25LuW6aG16Z2i5pe2LOacqueZu+W9lei/hyzpgqPkuYjnu5nlroPoh6rliqjovazliLDnmbvlvZXpobXpnaJcclxuZWxzZSBpZighaXNMb2dpblBhZ2UmJiFpc0xvZ2luKXtcclxuXHRsb2NhdGlvbi5ocmVmID0gJy9kaXN0L2h0bWwvdXNlci9sb2dpbi5odG1sJztcclxufVxyXG4iLCIkKCcjYnRuLWxvZ291dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvdjYvbG9nb3V0JyxcclxuICAgICAgICB0eXBlOiAncG9zdCcsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ+mAgOWHuuaIkOWKnycpO1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcvZGlzdC9odG1sL3VzZXIvbG9naW4uaHRtbCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7IiwiLyoqXHJcbiAgKiBhamF45re75YqgbG9hZGluZ++8mlxyXG4gICogMeOAgeaIkeS7rOmAmui/h2pz55qE5pa55byP5ou85YaZbG9hZGluZ+eahGh0bWzniYfmrrXvvIzmiorlroPmt7vliqDliLBib2R56YeMXHJcbiAgKiAy44CB5ZyoYWpheOWPkemAgeivt+axguaXtuiuqWxvYWRpbmflsZXnpLpcclxuICAqIDPjgIFhamF46K+35rGC5a6M5q+V5pe26K6pbG9hZGluZ+makOiXj1xyXG4gICogKi9cclxuIHZhciBsb2FkaW5nSFRNTCA9XHJcbiAgICc8ZGl2IGNsYXNzPVwib3ZlcmxheVwiPicgK1xyXG4gICAgICc8aW1nIHNyYz1cIi9wdWJsaWMvaW1nL2xvYWRpbmcuZ2lmXCIgLz4nICtcclxuICAgJzwvZGl2Pic7XHJcbiBcclxuICQoJ2JvZHknKS5hcHBlbmQobG9hZGluZ0hUTUwpO1xyXG4gXHJcbiAvLyDnrKzkuIDkuKror7fmsYLlj5HpgIHml7blsZXnpLpsb2FkaW5nXHJcbiAkKGRvY3VtZW50KS5vbignYWpheFN0YXJ0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAkKCcub3ZlcmxheScpLnNob3coKTtcclxuIH0pO1xyXG4gXHJcbiAvLyDmnIDlkI7kuIDkuKror7fmsYLnu5PmnZ/ml7bpmpDol49sb2FkaW5nXHJcbiAkKGRvY3VtZW50KS5vbignYWpheFN0b3AnLCBmdW5jdGlvbigpIHtcclxuICAgICQoJy5vdmVybGF5JykuaGlkZSgpO1xyXG4gfSk7IiwicmVxdWlyZSgnLi4vY29tbW9uL2hlYWRlci5qcycpO1xyXG5yZXF1aXJlKCcuLi9jb21tb24vYXNpZGUuanMnKTtcclxucmVxdWlyZSgnLi4vY29tbW9uL2xvYWRpbmcuanMnKTtcclxuIHJlcXVpcmUoJy4uL2NvbW1vbi9jb21tb24uanMnKTtcclxuXHJcblxyXG4kKCcjdGVhY2hlcl9hZGRfZm9ybScpLmFqYXhGb3JtKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgIGlmIChkYXRhLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgYWxlcnQoJ+a3u+WKoOiusuW4iOaIkOWKnycpO1xyXG4gICAgfVxyXG59KSJdfQ==
