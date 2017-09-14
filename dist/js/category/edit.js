(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('../common/header.js');
require('../common/aside.js');
require('../common/loading.js');
 require('../common/common.js');
var util = require('../common/util.js');


/**
 * 功能点：
 * 1.数据回显，需要确定你编辑的是哪个学科
 * 2.表单提交
 * 
 * 
 * 
 * 数据回显：
 * 1.先获取location.search中的cg_id值
 * 2.利用这个cg_id请求接口获取数据
 * 3.得到数据渲染后的模板，插入到页面指定位置
 */

var cg_id = util.getSearch('cg_id');
$.get('/v6/category/edit', { cg_id: cg_id }, function(data) {
    $('.category-edit').html(template('category_edit_tpl', data.result));
});

/**
 * 表单提交
 */

$('#catetory_edit_form').ajaxForm({
    delegation: true,
    success: function(data) {
        if (data.code == 200) {
            alert('学科修改成功');
        }
    }
});
},{"../common/aside.js":2,"../common/common.js":3,"../common/header.js":4,"../common/loading.js":5,"../common/util.js":6}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
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
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvY2F0ZWdvcnkvZWRpdC5qcyIsInNyYy9qcy9jb21tb24vYXNpZGUuanMiLCJzcmMvanMvY29tbW9uL2NvbW1vbi5qcyIsInNyYy9qcy9jb21tb24vaGVhZGVyLmpzIiwic3JjL2pzL2NvbW1vbi9sb2FkaW5nLmpzIiwic3JjL2pzL2NvbW1vbi91dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJyZXF1aXJlKCcuLi9jb21tb24vaGVhZGVyLmpzJyk7XHJcbnJlcXVpcmUoJy4uL2NvbW1vbi9hc2lkZS5qcycpO1xyXG5yZXF1aXJlKCcuLi9jb21tb24vbG9hZGluZy5qcycpO1xyXG4gcmVxdWlyZSgnLi4vY29tbW9uL2NvbW1vbi5qcycpO1xyXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4uL2NvbW1vbi91dGlsLmpzJyk7XHJcblxyXG5cclxuLyoqXHJcbiAqIOWKn+iDveeCue+8mlxyXG4gKiAxLuaVsOaNruWbnuaYvu+8jOmcgOimgeehruWumuS9oOe8lui+keeahOaYr+WTquS4quWtpuenkVxyXG4gKiAyLuihqOWNleaPkOS6pFxyXG4gKiBcclxuICogXHJcbiAqIFxyXG4gKiDmlbDmja7lm57mmL7vvJpcclxuICogMS7lhYjojrflj5Zsb2NhdGlvbi5zZWFyY2jkuK3nmoRjZ19pZOWAvFxyXG4gKiAyLuWIqeeUqOi/meS4qmNnX2lk6K+35rGC5o6l5Y+j6I635Y+W5pWw5o2uXHJcbiAqIDMu5b6X5Yiw5pWw5o2u5riy5p+T5ZCO55qE5qih5p2/77yM5o+S5YWl5Yiw6aG16Z2i5oyH5a6a5L2N572uXHJcbiAqL1xyXG5cclxudmFyIGNnX2lkID0gdXRpbC5nZXRTZWFyY2goJ2NnX2lkJyk7XHJcbiQuZ2V0KCcvdjYvY2F0ZWdvcnkvZWRpdCcsIHsgY2dfaWQ6IGNnX2lkIH0sIGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICQoJy5jYXRlZ29yeS1lZGl0JykuaHRtbCh0ZW1wbGF0ZSgnY2F0ZWdvcnlfZWRpdF90cGwnLCBkYXRhLnJlc3VsdCkpO1xyXG59KTtcclxuXHJcbi8qKlxyXG4gKiDooajljZXmj5DkuqRcclxuICovXHJcblxyXG4kKCcjY2F0ZXRvcnlfZWRpdF9mb3JtJykuYWpheEZvcm0oe1xyXG4gICAgZGVsZWdhdGlvbjogdHJ1ZSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICBpZiAoZGF0YS5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICBhbGVydCgn5a2m56eR5L+u5pS55oiQ5YqfJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTsiLCIvKipcclxuICog5a+86Iiq5LiJ5Liq5Yqf6IO954K577yaXHJcbiAqIDEu55So5oi35L+h5oGv5bGV56S6XHJcbiAqIDIuIOeCueWHu+agh+mimOWtkOWIl+ihqOaYvuekuumakOiXj1xyXG4gKiAzLuagueaNruiuv+mXrueahOmhtemdoua3u+WKoOWvueW6lOeahOeEpueCuVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiDnlKjmiLfkv6Hmga/lsZXnpLrvvJpcclxuICogMS7or7vlj5ZzdG9yYWdl55qEdXNlcmluZm/mlbDmja5cclxuICogMi7kvYbmmK/mlbDmja7ml7blrZfnrKbkuLLvvIzkvb/nlKjkuI3kvr/vvIzkvb/nlKhKU09OLnBhcnNl6L2s5Li65a+56LGh5L2/55SoXHJcbiAqIDMu54S25ZCO5oqK5a+56LGh5Lit55qE5ZCN5a2X5LiO5aS05YOP6K6+572u5Yiw5a+86Iiq5a+55bqU55qE5qCH562+5LitXHJcbiAqL1xyXG52YXIgdXNlcmluZm9TdHIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcmluZm8nKTtcclxudmFyIHVzZXJpbmZvID0gSlNPTi5wYXJzZSh1c2VyaW5mb1N0cikgfHwge307XHJcbiQoJy5hc2lkZSBpbWcnKS5hdHRyKCdzcmMnLCB1c2VyaW5mby50Y19hdmF0YXIgfHwgJy9wdWJsaWMvaW1nL2RlZmF1bHQucG5nJyk7XHJcbiQoJy5hc2lkZSBoNCcpLnRleHQodXNlcmluZm8udGNfbmFtZSk7XHJcblxyXG4vKipcclxuICog54K55Ye75qCH6aKY5a2Q5YiX6KGo6ZqQ6JePc1xyXG4gKiAxLuiOt+WPluWvvOiIquS4reeahGEg5qCH562+57uR5a6a5LqL5Lu2XHJcbiAqIDIu5LqL5Lu26Kem5Y+R5pe26K6p5a6D55qE5LiL5LiA5Liq5YWE5byf5YWD57SgdWzmmL7npLrpmpDol4/liIfmjaJcclxuICovXHJcblxyXG4kKCcubmF2cyBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAkKHRoaXMpLm5leHQoJ3VsJykuc2xpZGVUb2dnbGUoKTtcclxufSk7XHJcblxyXG5cclxuLyoqXHJcbiAqIOagueaNruiuv+mXrueahOmhtemdoue7meWvueW6lOeahOagh+mimOa3u+WKoOeEpueCue+8mlxyXG4gKiAxLummluWFiOiOt+WPlumhtemdomxvY2F0aW9uLnBhdGhuYW1lXHJcbiAqIDIu6I635Y+W5YWo6YOo55qE5a+86IiqYeagh+etvu+8jOWFiOe7n+S4gOWPluWHumFjdGl2Zeexu+WQjVxyXG4gKiAzLueEtuWQjuWIqeeUqOi/meS4quWAvOWSjOWvvOiIqmHmoIfnrb7nmoRocmVm5Y675Yy56YWN5b6X5Yiw5a+55bqU55qEYeagh+etvu+8jOa3u+WKoGFjdGl2Zeexu+WQjeeahOeEpueCuVxyXG4gKi9cclxuXHJcbnZhciBwYXRoID0gbG9jYXRpb24ucGF0aG5hbWU7XHJcbiQoJy5uYXZzIGEnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiQoJy5uYXZzIGFbaHJlZj1cIicgKyBwYXRoICsgJ1wiXScpLmFkZENsYXNzKCdhY3RpdmUnKS5wYXJlbnRzKCd1bCcpLnNob3coKTsiLCIgLyoqXHJcbiAgKiDmt7vliqDpobXpnaLov5vluqbmnaHvvJpcclxuICAqIDHjgIHpppblhYjosIPnlKjov5vluqbmnaHnmoRzdGFydOaWueazlVxyXG4gICogMuOAgeeEtuWQjuebkeWQrHdpbmRvd+eahGxvYWTkuovku7bvvIzop6blj5Hml7blgJnosIPnlKjov5vluqbmnaFkb25l5pa55rOVXHJcbiAgKiAqL1xyXG4gTlByb2dyZXNzLnN0YXJ0KCk7XHJcbiB3aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgIE5Qcm9ncmVzcy5kb25lKCk7XHJcbiB9O1xyXG4gXHJcbiAvKipcclxuXHJcbi8qKlxyXG4gKiDnmbvlvZXmnYPpmZDmoKHpqozvvJpcclxuICogMS7miJHlhYjlnKjliY3nq6/mi7/liLDmnKzlnLDnmoRjb29raWXvvIznnIvnnIvlhbbkuK3mnInmsqHmnIlQSFBTRVNTSUTov5nkuIDpoblcclxuICog5pyJ5bCx77ya6K6k5Li655So5oi35bey55m75b2VXHJcbiAqIOayoeacie+8muWwseiupOS4uueUqOaIt+S4uueZu+W9lVxyXG4gKiAyLumAmui/h2xvY2F0aW9uLnBhdGjliKTmlq3nlKjmiLfmmK/lnKjnmbvlvZXpobXpnaLvvIzov5jmmK/lhbbku5bpobXpnaJcclxuICogMy7nmbvlvZXpobXpnaLlt7LnmbvlvZXvvIzovazliLDpppbpobXvvJvlhbbku5bpobXpnaLmnKrnmbvlvZXvvIzovazliLDnmbvpmYbpobVcclxuICovXHJcblxyXG52YXIgaXNMb2dpbiA9ICEhJC5jb29raWUoJ1BIUFNFU1NJRCcpOy8v55So5oi35piv5ZCm5bey55m75b2VXHJcbnZhciBpc0xvZ2luUGFnZSA9IGxvY2F0aW9uLnBhdGhuYW1lID09Jy9kaXN0L2h0bWwvdXNlci9sb2dpbi5odG1sJzsvL+eUqOaIt+aYr+WQpuWcqOeZu+W9lemhtemdolxyXG5cclxuLy/lpoLmnpznlKjmiLfmiZPlvIDnmbvlvZXpobXpnaLml7bvvIzlt7Lnu4/nmbvlvZXkuobvvIzpgqPkuYjnu5nlroPoh6rliqjovazliLDpppbpobVcclxuaWYoaXNMb2dpblBhZ2UmJmlzTG9naW4peyBcclxuXHRsb2NhdGlvbi5ocmVmPScvZGlzdCc7XHJcbn1cclxuLy/lpoLmnpznlKjmiLflnKjlhbbku5bpobXpnaLml7Ys5pyq55m75b2V6L+HLOmCo+S5iOe7meWug+iHquWKqOi9rOWIsOeZu+W9lemhtemdolxyXG5lbHNlIGlmKCFpc0xvZ2luUGFnZSYmIWlzTG9naW4pe1xyXG5cdGxvY2F0aW9uLmhyZWYgPSAnL2Rpc3QvaHRtbC91c2VyL2xvZ2luLmh0bWwnO1xyXG59XHJcbiIsIiQoJyNidG4tbG9nb3V0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy92Ni9sb2dvdXQnLFxyXG4gICAgICAgIHR5cGU6ICdwb3N0JyxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgn6YCA5Ye65oiQ5YqfJyk7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gJy9kaXN0L2h0bWwvdXNlci9sb2dpbi5odG1sJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTsiLCIvKipcclxuICAqIGFqYXjmt7vliqBsb2FkaW5n77yaXHJcbiAgKiAx44CB5oiR5Lus6YCa6L+HanPnmoTmlrnlvI/mi7zlhplsb2FkaW5n55qEaHRtbOeJh+aute+8jOaKiuWug+a3u+WKoOWIsGJvZHnph4xcclxuICAqIDLjgIHlnKhhamF45Y+R6YCB6K+35rGC5pe26K6pbG9hZGluZ+WxleekulxyXG4gICogM+OAgWFqYXjor7fmsYLlrozmr5Xml7borqlsb2FkaW5n6ZqQ6JePXHJcbiAgKiAqL1xyXG4gdmFyIGxvYWRpbmdIVE1MID1cclxuICAgJzxkaXYgY2xhc3M9XCJvdmVybGF5XCI+JyArXHJcbiAgICAgJzxpbWcgc3JjPVwiL3B1YmxpYy9pbWcvbG9hZGluZy5naWZcIiAvPicgK1xyXG4gICAnPC9kaXY+JztcclxuIFxyXG4gJCgnYm9keScpLmFwcGVuZChsb2FkaW5nSFRNTCk7XHJcbiBcclxuIC8vIOesrOS4gOS4quivt+axguWPkemAgeaXtuWxleekumxvYWRpbmdcclxuICQoZG9jdW1lbnQpLm9uKCdhamF4U3RhcnQnLCBmdW5jdGlvbigpIHtcclxuICAgICQoJy5vdmVybGF5Jykuc2hvdygpO1xyXG4gfSk7XHJcbiBcclxuIC8vIOacgOWQjuS4gOS4quivt+axgue7k+adn+aXtumakOiXj2xvYWRpbmdcclxuICQoZG9jdW1lbnQpLm9uKCdhamF4U3RvcCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnLm92ZXJsYXknKS5oaWRlKCk7XHJcbiB9KTsiLCIvKipcclxuICog6Kej5p6QbG9jYXRpb24uc2VhcmNo77yaXHJcbiAqIOS8oDHkuKrlj4LmlbDov5Tlm57mjIflrpprZXnnmoTlgLzvvIzkuI3kvKDlj4LmlbDov5Tlm57op6PmnpDmiJDlr7nosaHlkI7nmoTlgLzjgIJcclxuICogMeOAgemmluWFiOaKiuWktOmDqOeahD/ljrvmjolcclxuICogMuOAgemAmui/hybnrKblj7fliojmiJDkuIDnu4Tnu4RrZXk9dmFs6L+Z5qC355qE5a2X56ym5Liy57uE5oiQ55qE5pWw57uEXHJcbiAqIDPjgIHnhLblkI7lnKjpgJrov4c95Y+35oqK5LiA57uE57uE5a2X56ym5Liy5YqI5byA6I635Y+Wa2V55LiOdmFs77yM5a2Y5YKo5Yiw5LiA5Liq5a+56LGh5LitXHJcbiAqIDTjgIHliKTmlq3msqHmnInkvKDlj4Lov5Tlm57ov5nkuKrlr7nosaHvvIzkvKDkuobov5Tlm57lr7nosaHkuK3mjIflrpprZXnnmoTlgLxcclxuICogKi9cclxuZnVuY3Rpb24gZ2V0U2VhcmNoKGtleSkge1xyXG4gICAgdmFyIHNlYXJjaFN0ciA9IGxvY2F0aW9uLnNlYXJjaC5zbGljZSgxKTtcclxuICAgIHZhciBzZWFyY2hBcnIgPSBzZWFyY2hTdHIuc3BsaXQoJyYnKTtcclxuICAgIHZhciBzZWFyY2hPYmogPSB7fSxcclxuICAgICAgICB0ZW1wQXJyO1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHNlYXJjaEFyci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIHRlbXBBcnIgPSBzZWFyY2hBcnJbaV0uc3BsaXQoJz0nKTtcclxuICAgICAgICBzZWFyY2hPYmpbdGVtcEFyclswXV0gPSB0ZW1wQXJyWzFdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGtleSA/IHNlYXJjaE9ialtrZXldIDogc2VhcmNoT2JqO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5nZXRTZWFyY2ggPSBnZXRTZWFyY2g7Il19
