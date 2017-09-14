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
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
require('../common/header.js');
require('../common/aside.js');
require('../common/loading.js');


/**
 * 该页面功能点：
 * 1.数据回显
 * 2.表单提交
 */

/**
 * 数据回显
 * 1.请求接口获取当前用户的信息
 * 2.使用模板引擎把数据嵌套到模板当中，得到数据渲染后的模板
 * 基本语法： var html= template（'id',data）
 * 3.把渲染后的模板插入到页面指定位置
 */

$.ajax({
    url: '/v6/teacher/profile',
    type: 'get',
    success: function(data) {
        if (data.code == 200) {
            $('.teacher-profile').html(template('teacher-profile-tpl', data.result));
        }
    }
});

/**
 * 表单提交：
 * 1.因为表单要进行数据回显，所以是动态异步创建出来的。
 * 这里要通过插件的ajaxForm监听表单中提交事件必须使用委托的方式，插件提供了 delegation: true。
 * 2.修改成功后给个用户提示
 */
$('#teacher_profile_form').ajaxForm({
    delegation: true,
    success: function(data) {
        if (data.code == 200) {
            alert('修改成功');
        }
    }
});
},{"../common/aside.js":1,"../common/header.js":2,"../common/loading.js":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvY29tbW9uL2FzaWRlLmpzIiwic3JjL2pzL2NvbW1vbi9oZWFkZXIuanMiLCJzcmMvanMvY29tbW9uL2xvYWRpbmcuanMiLCJzcmMvanMvdXNlci9wcm9maWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxyXG4gKiDlr7zoiKrkuInkuKrlip/og73ngrnvvJpcclxuICogMS7nlKjmiLfkv6Hmga/lsZXnpLpcclxuICogMi4g54K55Ye75qCH6aKY5a2Q5YiX6KGo5pi+56S66ZqQ6JePXHJcbiAqIDMu5qC55o2u6K6/6Zeu55qE6aG16Z2i5re75Yqg5a+55bqU55qE54Sm54K5XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIOeUqOaIt+S/oeaBr+Wxleekuu+8mlxyXG4gKiAxLuivu+WPlnN0b3JhZ2XnmoR1c2VyaW5mb+aVsOaNrlxyXG4gKiAyLuS9huaYr+aVsOaNruaXtuWtl+espuS4su+8jOS9v+eUqOS4jeS+v++8jOS9v+eUqEpTT04ucGFyc2XovazkuLrlr7nosaHkvb/nlKhcclxuICogMy7nhLblkI7miorlr7nosaHkuK3nmoTlkI3lrZfkuI7lpLTlg4/orr7nva7liLDlr7zoiKrlr7nlupTnmoTmoIfnrb7kuK1cclxuICovXHJcbnZhciB1c2VyaW5mb1N0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyaW5mbycpO1xyXG52YXIgdXNlcmluZm8gPSBKU09OLnBhcnNlKHVzZXJpbmZvU3RyKSB8fCB7fTtcclxuJCgnLmFzaWRlIGltZycpLmF0dHIoJ3NyYycsIHVzZXJpbmZvLnRjX2F2YXRhciB8fCAnL3B1YmxpYy9pbWcvZGVmYXVsdC5wbmcnKTtcclxuJCgnLmFzaWRlIGg0JykudGV4dCh1c2VyaW5mby50Y19uYW1lKTtcclxuXHJcbi8qKlxyXG4gKiDngrnlh7vmoIfpopjlrZDliJfooajpmpDol49zXHJcbiAqIDEu6I635Y+W5a+86Iiq5Lit55qEYSDmoIfnrb7nu5Hlrprkuovku7ZcclxuICogMi7kuovku7bop6blj5Hml7borqnlroPnmoTkuIvkuIDkuKrlhYTlvJ/lhYPntKB1bOaYvuekuumakOiXj+WIh+aNolxyXG4gKi9cclxuXHJcbiQoJy5uYXZzIGEnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICQodGhpcykubmV4dCgndWwnKS5zbGlkZVRvZ2dsZSgpO1xyXG59KTtcclxuXHJcblxyXG4vKipcclxuICog5qC55o2u6K6/6Zeu55qE6aG16Z2i57uZ5a+55bqU55qE5qCH6aKY5re75Yqg54Sm54K577yaXHJcbiAqIDEu6aaW5YWI6I635Y+W6aG16Z2ibG9jYXRpb24ucGF0aG5hbWVcclxuICogMi7ojrflj5blhajpg6jnmoTlr7zoiKph5qCH562+77yM5YWI57uf5LiA5Y+W5Ye6YWN0aXZl57G75ZCNXHJcbiAqIDMu54S25ZCO5Yip55So6L+Z5Liq5YC85ZKM5a+86IiqYeagh+etvueahGhyZWbljrvljLnphY3lvpfliLDlr7nlupTnmoRh5qCH562+77yM5re75YqgYWN0aXZl57G75ZCN55qE54Sm54K5XHJcbiAqL1xyXG5cclxudmFyIHBhdGggPSBsb2NhdGlvbi5wYXRobmFtZTtcclxuJCgnLm5hdnMgYScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuJCgnLm5hdnMgYVtocmVmPVwiJyArIHBhdGggKyAnXCJdJykuYWRkQ2xhc3MoJ2FjdGl2ZScpLnBhcmVudHMoJ3VsJykuc2hvdygpOyIsIiQoJyNidG4tbG9nb3V0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy92Ni9sb2dvdXQnLFxyXG4gICAgICAgIHR5cGU6ICdwb3N0JyxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgn6YCA5Ye65oiQ5YqfJyk7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gJy9kaXN0L2h0bWwvdXNlci9sb2dpbi5odG1sJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTsiLCIvKipcclxuICAqIGFqYXjmt7vliqBsb2FkaW5n77yaXHJcbiAgKiAx44CB5oiR5Lus6YCa6L+HanPnmoTmlrnlvI/mi7zlhplsb2FkaW5n55qEaHRtbOeJh+aute+8jOaKiuWug+a3u+WKoOWIsGJvZHnph4xcclxuICAqIDLjgIHlnKhhamF45Y+R6YCB6K+35rGC5pe26K6pbG9hZGluZ+WxleekulxyXG4gICogM+OAgWFqYXjor7fmsYLlrozmr5Xml7borqlsb2FkaW5n6ZqQ6JePXHJcbiAgKiAqL1xyXG4gdmFyIGxvYWRpbmdIVE1MID1cclxuICAgJzxkaXYgY2xhc3M9XCJvdmVybGF5XCI+JyArXHJcbiAgICAgJzxpbWcgc3JjPVwiL3B1YmxpYy9pbWcvbG9hZGluZy5naWZcIiAvPicgK1xyXG4gICAnPC9kaXY+JztcclxuIFxyXG4gJCgnYm9keScpLmFwcGVuZChsb2FkaW5nSFRNTCk7XHJcbiBcclxuIC8vIOesrOS4gOS4quivt+axguWPkemAgeaXtuWxleekumxvYWRpbmdcclxuICQoZG9jdW1lbnQpLm9uKCdhamF4U3RhcnQnLCBmdW5jdGlvbigpIHtcclxuICAgICQoJy5vdmVybGF5Jykuc2hvdygpO1xyXG4gfSk7XHJcbiBcclxuIC8vIOacgOWQjuS4gOS4quivt+axgue7k+adn+aXtumakOiXj2xvYWRpbmdcclxuICQoZG9jdW1lbnQpLm9uKCdhamF4U3RvcCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnLm92ZXJsYXknKS5oaWRlKCk7XHJcbiB9KTsiLCJyZXF1aXJlKCcuLi9jb21tb24vaGVhZGVyLmpzJyk7XHJcbnJlcXVpcmUoJy4uL2NvbW1vbi9hc2lkZS5qcycpO1xyXG5yZXF1aXJlKCcuLi9jb21tb24vbG9hZGluZy5qcycpO1xyXG5cclxuXHJcbi8qKlxyXG4gKiDor6XpobXpnaLlip/og73ngrnvvJpcclxuICogMS7mlbDmja7lm57mmL5cclxuICogMi7ooajljZXmj5DkuqRcclxuICovXHJcblxyXG4vKipcclxuICog5pWw5o2u5Zue5pi+XHJcbiAqIDEu6K+35rGC5o6l5Y+j6I635Y+W5b2T5YmN55So5oi355qE5L+h5oGvXHJcbiAqIDIu5L2/55So5qih5p2/5byV5pOO5oqK5pWw5o2u5bWM5aWX5Yiw5qih5p2/5b2T5Lit77yM5b6X5Yiw5pWw5o2u5riy5p+T5ZCO55qE5qih5p2/XHJcbiAqIOWfuuacrOivreazle+8miB2YXIgaHRtbD0gdGVtcGxhdGXvvIgnaWQnLGRhdGHvvIlcclxuICogMy7miormuLLmn5PlkI7nmoTmqKHmnb/mj5LlhaXliLDpobXpnaLmjIflrprkvY3nva5cclxuICovXHJcblxyXG4kLmFqYXgoe1xyXG4gICAgdXJsOiAnL3Y2L3RlYWNoZXIvcHJvZmlsZScsXHJcbiAgICB0eXBlOiAnZ2V0JyxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICBpZiAoZGF0YS5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICAkKCcudGVhY2hlci1wcm9maWxlJykuaHRtbCh0ZW1wbGF0ZSgndGVhY2hlci1wcm9maWxlLXRwbCcsIGRhdGEucmVzdWx0KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiDooajljZXmj5DkuqTvvJpcclxuICogMS7lm6DkuLrooajljZXopoHov5vooYzmlbDmja7lm57mmL7vvIzmiYDku6XmmK/liqjmgIHlvILmraXliJvlu7rlh7rmnaXnmoTjgIJcclxuICog6L+Z6YeM6KaB6YCa6L+H5o+S5Lu255qEYWpheEZvcm3nm5HlkKzooajljZXkuK3mj5DkuqTkuovku7blv4Xpobvkvb/nlKjlp5TmiZjnmoTmlrnlvI/vvIzmj5Lku7bmj5DkvpvkuoYgZGVsZWdhdGlvbjogdHJ1ZeOAglxyXG4gKiAyLuS/ruaUueaIkOWKn+WQjue7meS4queUqOaIt+aPkOekulxyXG4gKi9cclxuJCgnI3RlYWNoZXJfcHJvZmlsZV9mb3JtJykuYWpheEZvcm0oe1xyXG4gICAgZGVsZWdhdGlvbjogdHJ1ZSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICBpZiAoZGF0YS5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICBhbGVydCgn5L+u5pS55oiQ5YqfJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTsiXX0=
