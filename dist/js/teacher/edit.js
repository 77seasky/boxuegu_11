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
var userinfo = JSON.parse(userinfoStr);
$('.aside img').attr('src', userinfo.tc_avatar);
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
require('../common/header.js');
require('../common/aside.js');
},{"../common/aside.js":1,"../common/header.js":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvY29tbW9uL2FzaWRlLmpzIiwic3JjL2pzL2NvbW1vbi9oZWFkZXIuanMiLCJzcmMvanMvdGVhY2hlci9lZGl0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcclxuICog5a+86Iiq5LiJ5Liq5Yqf6IO954K577yaXHJcbiAqIDEu55So5oi35L+h5oGv5bGV56S6XHJcbiAqIDIuIOeCueWHu+agh+mimOWtkOWIl+ihqOaYvuekuumakOiXj1xyXG4gKiAzLuagueaNruiuv+mXrueahOmhtemdoua3u+WKoOWvueW6lOeahOeEpueCuVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiDnlKjmiLfkv6Hmga/lsZXnpLrvvJpcclxuICogMS7or7vlj5ZzdG9yYWdl55qEdXNlcmluZm/mlbDmja5cclxuICogMi7kvYbmmK/mlbDmja7ml7blrZfnrKbkuLLvvIzkvb/nlKjkuI3kvr/vvIzkvb/nlKhKU09OLnBhcnNl6L2s5Li65a+56LGh5L2/55SoXHJcbiAqIDMu54S25ZCO5oqK5a+56LGh5Lit55qE5ZCN5a2X5LiO5aS05YOP6K6+572u5Yiw5a+86Iiq5a+55bqU55qE5qCH562+5LitXHJcbiAqL1xyXG52YXIgdXNlcmluZm9TdHIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcmluZm8nKTtcclxudmFyIHVzZXJpbmZvID0gSlNPTi5wYXJzZSh1c2VyaW5mb1N0cik7XHJcbiQoJy5hc2lkZSBpbWcnKS5hdHRyKCdzcmMnLCB1c2VyaW5mby50Y19hdmF0YXIpO1xyXG4kKCcuYXNpZGUgaDQnKS50ZXh0KHVzZXJpbmZvLnRjX25hbWUpO1xyXG5cclxuLyoqXHJcbiAqIOeCueWHu+agh+mimOWtkOWIl+ihqOmakOiXj3NcclxuICogMS7ojrflj5blr7zoiKrkuK3nmoRhIOagh+etvue7keWumuS6i+S7tlxyXG4gKiAyLuS6i+S7tuinpuWPkeaXtuiuqeWug+eahOS4i+S4gOS4quWFhOW8n+WFg+e0oHVs5pi+56S66ZqQ6JeP5YiH5o2iXHJcbiAqL1xyXG5cclxuJCgnLm5hdnMgYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgJCh0aGlzKS5uZXh0KCd1bCcpLnNsaWRlVG9nZ2xlKCk7XHJcbn0pO1xyXG5cclxuXHJcbi8qKlxyXG4gKiDmoLnmja7orr/pl67nmoTpobXpnaLnu5nlr7nlupTnmoTmoIfpopjmt7vliqDnhKbngrnvvJpcclxuICogMS7pppblhYjojrflj5bpobXpnaJsb2NhdGlvbi5wYXRobmFtZVxyXG4gKiAyLuiOt+WPluWFqOmDqOeahOWvvOiIqmHmoIfnrb7vvIzlhYjnu5/kuIDlj5blh7phY3RpdmXnsbvlkI1cclxuICogMy7nhLblkI7liKnnlKjov5nkuKrlgLzlkozlr7zoiKph5qCH562+55qEaHJlZuWOu+WMuemFjeW+l+WIsOWvueW6lOeahGHmoIfnrb7vvIzmt7vliqBhY3RpdmXnsbvlkI3nmoTnhKbngrlcclxuICovXHJcblxyXG52YXIgcGF0aCA9IGxvY2F0aW9uLnBhdGhuYW1lO1xyXG4kKCcubmF2cyBhJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4kKCcubmF2cyBhW2hyZWY9XCInICsgcGF0aCArICdcIl0nKS5hZGRDbGFzcygnYWN0aXZlJykucGFyZW50cygndWwnKS5zaG93KCk7IiwiJCgnI2J0bi1sb2dvdXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL3Y2L2xvZ291dCcsXHJcbiAgICAgICAgdHlwZTogJ3Bvc3QnLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCfpgIDlh7rmiJDlip8nKTtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnL2Rpc3QvaHRtbC91c2VyL2xvZ2luLmh0bWwnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pOyIsInJlcXVpcmUoJy4uL2NvbW1vbi9oZWFkZXIuanMnKTtcclxucmVxdWlyZSgnLi4vY29tbW9uL2FzaWRlLmpzJyk7Il19
