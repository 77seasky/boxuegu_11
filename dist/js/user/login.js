(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){

require('../common/loading.js');
 require('../common/common.js');
/**
 *回显历史登陆用户的头像 
 */
var userinfo = JSON.parse(localStorage.getItem('userinfo')) || {};
var tc_avatar = userinfo.tc_avatar || '/public/img/default.png';
$('.avatar img').attr('src', tc_avatar);


// 当用户点击登陆按钮的时候，这个插件ajaxForm方法会自动监听submit事件
// 然后阻止浏览器默认的刷新提交，然后自动变成ajax的方式发送请求。
$('#login-form').ajaxForm({
    success: function(data) {
        if (data.code == 200) {
            alert('登陆成功');
            localStorage.setItem('userinfo', JSON.stringify(data.result));
            location.href = '/dist';
        } else {
            alert('登陆失败');
        }
    },
    error: function() {
        alert('登陆失败');
    }
});


// $('#login-form').on('submit', function(e) {

//     $.ajax({
//         url: '/v6/login',
//         type: 'post',
//         data: $(this).serialize(),
//         success: function(data) {
//             if (data.code == 200) {
//                 alert('登陆成功');
//             } else {
//                 alert('登陆失败');
//             }
//         },
//         error: function() {
//             alert('登陆失败');
//         }
//     });

//     // jquery中阻止浏览器默认事件return false即可
//     return false;
// });
},{"../common/common.js":1,"../common/loading.js":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvY29tbW9uL2NvbW1vbi5qcyIsInNyYy9qcy9jb21tb24vbG9hZGluZy5qcyIsInNyYy9qcy91c2VyL2xvZ2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIgLyoqXHJcbiAgKiDmt7vliqDpobXpnaLov5vluqbmnaHvvJpcclxuICAqIDHjgIHpppblhYjosIPnlKjov5vluqbmnaHnmoRzdGFydOaWueazlVxyXG4gICogMuOAgeeEtuWQjuebkeWQrHdpbmRvd+eahGxvYWTkuovku7bvvIzop6blj5Hml7blgJnosIPnlKjov5vluqbmnaFkb25l5pa55rOVXHJcbiAgKiAqL1xyXG4gTlByb2dyZXNzLnN0YXJ0KCk7XHJcbiB3aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgIE5Qcm9ncmVzcy5kb25lKCk7XHJcbiB9O1xyXG4gXHJcbiAvKipcclxuXHJcbi8qKlxyXG4gKiDnmbvlvZXmnYPpmZDmoKHpqozvvJpcclxuICogMS7miJHlhYjlnKjliY3nq6/mi7/liLDmnKzlnLDnmoRjb29raWXvvIznnIvnnIvlhbbkuK3mnInmsqHmnIlQSFBTRVNTSUTov5nkuIDpoblcclxuICog5pyJ5bCx77ya6K6k5Li655So5oi35bey55m75b2VXHJcbiAqIOayoeacie+8muWwseiupOS4uueUqOaIt+S4uueZu+W9lVxyXG4gKiAyLumAmui/h2xvY2F0aW9uLnBhdGjliKTmlq3nlKjmiLfmmK/lnKjnmbvlvZXpobXpnaLvvIzov5jmmK/lhbbku5bpobXpnaJcclxuICogMy7nmbvlvZXpobXpnaLlt7LnmbvlvZXvvIzovazliLDpppbpobXvvJvlhbbku5bpobXpnaLmnKrnmbvlvZXvvIzovazliLDnmbvpmYbpobVcclxuICovXHJcblxyXG52YXIgaXNMb2dpbiA9ICEhJC5jb29raWUoJ1BIUFNFU1NJRCcpOy8v55So5oi35piv5ZCm5bey55m75b2VXHJcbnZhciBpc0xvZ2luUGFnZSA9IGxvY2F0aW9uLnBhdGhuYW1lID09Jy9kaXN0L2h0bWwvdXNlci9sb2dpbi5odG1sJzsvL+eUqOaIt+aYr+WQpuWcqOeZu+W9lemhtemdolxyXG5cclxuLy/lpoLmnpznlKjmiLfmiZPlvIDnmbvlvZXpobXpnaLml7bvvIzlt7Lnu4/nmbvlvZXkuobvvIzpgqPkuYjnu5nlroPoh6rliqjovazliLDpppbpobVcclxuaWYoaXNMb2dpblBhZ2UmJmlzTG9naW4peyBcclxuXHRsb2NhdGlvbi5ocmVmPScvZGlzdCc7XHJcbn1cclxuLy/lpoLmnpznlKjmiLflnKjlhbbku5bpobXpnaLml7Ys5pyq55m75b2V6L+HLOmCo+S5iOe7meWug+iHquWKqOi9rOWIsOeZu+W9lemhtemdolxyXG5lbHNlIGlmKCFpc0xvZ2luUGFnZSYmIWlzTG9naW4pe1xyXG5cdGxvY2F0aW9uLmhyZWYgPSAnL2Rpc3QvaHRtbC91c2VyL2xvZ2luLmh0bWwnO1xyXG59XHJcbiIsIi8qKlxyXG4gICogYWpheOa3u+WKoGxvYWRpbmfvvJpcclxuICAqIDHjgIHmiJHku6zpgJrov4dqc+eahOaWueW8j+aLvOWGmWxvYWRpbmfnmoRodG1s54mH5q6177yM5oqK5a6D5re75Yqg5YiwYm9keemHjFxyXG4gICogMuOAgeWcqGFqYXjlj5HpgIHor7fmsYLml7borqlsb2FkaW5n5bGV56S6XHJcbiAgKiAz44CBYWpheOivt+axguWujOavleaXtuiuqWxvYWRpbmfpmpDol49cclxuICAqICovXHJcbiB2YXIgbG9hZGluZ0hUTUwgPVxyXG4gICAnPGRpdiBjbGFzcz1cIm92ZXJsYXlcIj4nICtcclxuICAgICAnPGltZyBzcmM9XCIvcHVibGljL2ltZy9sb2FkaW5nLmdpZlwiIC8+JyArXHJcbiAgICc8L2Rpdj4nO1xyXG4gXHJcbiAkKCdib2R5JykuYXBwZW5kKGxvYWRpbmdIVE1MKTtcclxuIFxyXG4gLy8g56ys5LiA5Liq6K+35rGC5Y+R6YCB5pe25bGV56S6bG9hZGluZ1xyXG4gJChkb2N1bWVudCkub24oJ2FqYXhTdGFydCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnLm92ZXJsYXknKS5zaG93KCk7XHJcbiB9KTtcclxuIFxyXG4gLy8g5pyA5ZCO5LiA5Liq6K+35rGC57uT5p2f5pe26ZqQ6JePbG9hZGluZ1xyXG4gJChkb2N1bWVudCkub24oJ2FqYXhTdG9wJywgZnVuY3Rpb24oKSB7XHJcbiAgICAkKCcub3ZlcmxheScpLmhpZGUoKTtcclxuIH0pOyIsIlxyXG5yZXF1aXJlKCcuLi9jb21tb24vbG9hZGluZy5qcycpO1xyXG4gcmVxdWlyZSgnLi4vY29tbW9uL2NvbW1vbi5qcycpO1xyXG4vKipcclxuICrlm57mmL7ljoblj7LnmbvpmYbnlKjmiLfnmoTlpLTlg48gXHJcbiAqL1xyXG52YXIgdXNlcmluZm8gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyaW5mbycpKSB8fCB7fTtcclxudmFyIHRjX2F2YXRhciA9IHVzZXJpbmZvLnRjX2F2YXRhciB8fCAnL3B1YmxpYy9pbWcvZGVmYXVsdC5wbmcnO1xyXG4kKCcuYXZhdGFyIGltZycpLmF0dHIoJ3NyYycsIHRjX2F2YXRhcik7XHJcblxyXG5cclxuLy8g5b2T55So5oi354K55Ye755m76ZmG5oyJ6ZKu55qE5pe25YCZ77yM6L+Z5Liq5o+S5Lu2YWpheEZvcm3mlrnms5XkvJroh6rliqjnm5HlkKxzdWJtaXTkuovku7ZcclxuLy8g54S25ZCO6Zi75q2i5rWP6KeI5Zmo6buY6K6k55qE5Yi35paw5o+Q5Lqk77yM54S25ZCO6Ieq5Yqo5Y+Y5oiQYWpheOeahOaWueW8j+WPkemAgeivt+axguOAglxyXG4kKCcjbG9naW4tZm9ybScpLmFqYXhGb3JtKHtcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICBpZiAoZGF0YS5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICBhbGVydCgn55m76ZmG5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyaW5mbycsIEpTT04uc3RyaW5naWZ5KGRhdGEucmVzdWx0KSk7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnL2Rpc3QnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCfnmbvpmYblpLHotKUnKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZXJyb3I6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGFsZXJ0KCfnmbvpmYblpLHotKUnKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5cclxuLy8gJCgnI2xvZ2luLWZvcm0nKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSkge1xyXG5cclxuLy8gICAgICQuYWpheCh7XHJcbi8vICAgICAgICAgdXJsOiAnL3Y2L2xvZ2luJyxcclxuLy8gICAgICAgICB0eXBlOiAncG9zdCcsXHJcbi8vICAgICAgICAgZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSxcclxuLy8gICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbi8vICAgICAgICAgICAgIGlmIChkYXRhLmNvZGUgPT0gMjAwKSB7XHJcbi8vICAgICAgICAgICAgICAgICBhbGVydCgn55m76ZmG5oiQ5YqfJyk7XHJcbi8vICAgICAgICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICBhbGVydCgn55m76ZmG5aSx6LSlJyk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9LFxyXG4vLyAgICAgICAgIGVycm9yOiBmdW5jdGlvbigpIHtcclxuLy8gICAgICAgICAgICAgYWxlcnQoJ+eZu+mZhuWksei0pScpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH0pO1xyXG5cclxuLy8gICAgIC8vIGpxdWVyeeS4remYu+atoua1j+iniOWZqOm7mOiupOS6i+S7tnJldHVybiBmYWxzZeWNs+WPr1xyXG4vLyAgICAgcmV0dXJuIGZhbHNlO1xyXG4vLyB9KTsiXX0=
