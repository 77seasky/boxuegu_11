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
             initPlugin();
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

/**
  * 所有的插件初始化都放在这里
  * */
 function initPlugin() {
// 	日期插件
   $('input[name=tc_birthday]').datepicker({
     language: 'zh-CN',
    format: 'yyyy-mm-dd',
     endDate: new Date('2010-01-01')
   });
   $('input[name=tc_join_date]').datepicker({
     language: 'zh-CN',
     format: 'yyyy-mm-dd',
     endDate: new Date('2010-01-01')
   });
    // 三级联动插件
   $('#region-container').region({
     url: '/lib/jquery-region/region.json'
   });
 
   // 富文本编辑器
   window.edit = CKEDITOR.replace('introduce', {
     width: 600,
     skin: 'moono-lisa'
   });
 }
 
},{"../common/aside.js":1,"../common/header.js":2,"../common/loading.js":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvY29tbW9uL2FzaWRlLmpzIiwic3JjL2pzL2NvbW1vbi9oZWFkZXIuanMiLCJzcmMvanMvY29tbW9uL2xvYWRpbmcuanMiLCJzcmMvanMvdXNlci9wcm9maWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcclxuICog5a+86Iiq5LiJ5Liq5Yqf6IO954K577yaXHJcbiAqIDEu55So5oi35L+h5oGv5bGV56S6XHJcbiAqIDIuIOeCueWHu+agh+mimOWtkOWIl+ihqOaYvuekuumakOiXj1xyXG4gKiAzLuagueaNruiuv+mXrueahOmhtemdoua3u+WKoOWvueW6lOeahOeEpueCuVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiDnlKjmiLfkv6Hmga/lsZXnpLrvvJpcclxuICogMS7or7vlj5ZzdG9yYWdl55qEdXNlcmluZm/mlbDmja5cclxuICogMi7kvYbmmK/mlbDmja7ml7blrZfnrKbkuLLvvIzkvb/nlKjkuI3kvr/vvIzkvb/nlKhKU09OLnBhcnNl6L2s5Li65a+56LGh5L2/55SoXHJcbiAqIDMu54S25ZCO5oqK5a+56LGh5Lit55qE5ZCN5a2X5LiO5aS05YOP6K6+572u5Yiw5a+86Iiq5a+55bqU55qE5qCH562+5LitXHJcbiAqL1xyXG52YXIgdXNlcmluZm9TdHIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcmluZm8nKTtcclxudmFyIHVzZXJpbmZvID0gSlNPTi5wYXJzZSh1c2VyaW5mb1N0cikgfHwge307XHJcbiQoJy5hc2lkZSBpbWcnKS5hdHRyKCdzcmMnLCB1c2VyaW5mby50Y19hdmF0YXIgfHwgJy9wdWJsaWMvaW1nL2RlZmF1bHQucG5nJyk7XHJcbiQoJy5hc2lkZSBoNCcpLnRleHQodXNlcmluZm8udGNfbmFtZSk7XHJcblxyXG4vKipcclxuICog54K55Ye75qCH6aKY5a2Q5YiX6KGo6ZqQ6JePc1xyXG4gKiAxLuiOt+WPluWvvOiIquS4reeahGEg5qCH562+57uR5a6a5LqL5Lu2XHJcbiAqIDIu5LqL5Lu26Kem5Y+R5pe26K6p5a6D55qE5LiL5LiA5Liq5YWE5byf5YWD57SgdWzmmL7npLrpmpDol4/liIfmjaJcclxuICovXHJcblxyXG4kKCcubmF2cyBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAkKHRoaXMpLm5leHQoJ3VsJykuc2xpZGVUb2dnbGUoKTtcclxufSk7XHJcblxyXG5cclxuLyoqXHJcbiAqIOagueaNruiuv+mXrueahOmhtemdoue7meWvueW6lOeahOagh+mimOa3u+WKoOeEpueCue+8mlxyXG4gKiAxLummluWFiOiOt+WPlumhtemdomxvY2F0aW9uLnBhdGhuYW1lXHJcbiAqIDIu6I635Y+W5YWo6YOo55qE5a+86IiqYeagh+etvu+8jOWFiOe7n+S4gOWPluWHumFjdGl2Zeexu+WQjVxyXG4gKiAzLueEtuWQjuWIqeeUqOi/meS4quWAvOWSjOWvvOiIqmHmoIfnrb7nmoRocmVm5Y675Yy56YWN5b6X5Yiw5a+55bqU55qEYeagh+etvu+8jOa3u+WKoGFjdGl2Zeexu+WQjeeahOeEpueCuVxyXG4gKi9cclxuXHJcbnZhciBwYXRoID0gbG9jYXRpb24ucGF0aG5hbWU7XHJcbiQoJy5uYXZzIGEnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiQoJy5uYXZzIGFbaHJlZj1cIicgKyBwYXRoICsgJ1wiXScpLmFkZENsYXNzKCdhY3RpdmUnKS5wYXJlbnRzKCd1bCcpLnNob3coKTsiLCIkKCcjYnRuLWxvZ291dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvdjYvbG9nb3V0JyxcclxuICAgICAgICB0eXBlOiAncG9zdCcsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ+mAgOWHuuaIkOWKnycpO1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcvZGlzdC9odG1sL3VzZXIvbG9naW4uaHRtbCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7IiwiLyoqXHJcbiAgKiBhamF45re75YqgbG9hZGluZ++8mlxyXG4gICogMeOAgeaIkeS7rOmAmui/h2pz55qE5pa55byP5ou85YaZbG9hZGluZ+eahGh0bWzniYfmrrXvvIzmiorlroPmt7vliqDliLBib2R56YeMXHJcbiAgKiAy44CB5ZyoYWpheOWPkemAgeivt+axguaXtuiuqWxvYWRpbmflsZXnpLpcclxuICAqIDPjgIFhamF46K+35rGC5a6M5q+V5pe26K6pbG9hZGluZ+makOiXj1xyXG4gICogKi9cclxuIHZhciBsb2FkaW5nSFRNTCA9XHJcbiAgICc8ZGl2IGNsYXNzPVwib3ZlcmxheVwiPicgK1xyXG4gICAgICc8aW1nIHNyYz1cIi9wdWJsaWMvaW1nL2xvYWRpbmcuZ2lmXCIgLz4nICtcclxuICAgJzwvZGl2Pic7XHJcbiBcclxuICQoJ2JvZHknKS5hcHBlbmQobG9hZGluZ0hUTUwpO1xyXG4gXHJcbiAvLyDnrKzkuIDkuKror7fmsYLlj5HpgIHml7blsZXnpLpsb2FkaW5nXHJcbiAkKGRvY3VtZW50KS5vbignYWpheFN0YXJ0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAkKCcub3ZlcmxheScpLnNob3coKTtcclxuIH0pO1xyXG4gXHJcbiAvLyDmnIDlkI7kuIDkuKror7fmsYLnu5PmnZ/ml7bpmpDol49sb2FkaW5nXHJcbiAkKGRvY3VtZW50KS5vbignYWpheFN0b3AnLCBmdW5jdGlvbigpIHtcclxuICAgICQoJy5vdmVybGF5JykuaGlkZSgpO1xyXG4gfSk7IiwicmVxdWlyZSgnLi4vY29tbW9uL2hlYWRlci5qcycpO1xyXG5yZXF1aXJlKCcuLi9jb21tb24vYXNpZGUuanMnKTtcclxucmVxdWlyZSgnLi4vY29tbW9uL2xvYWRpbmcuanMnKTtcclxuXHJcblxyXG4vKipcclxuICog6K+l6aG16Z2i5Yqf6IO954K577yaXHJcbiAqIDEu5pWw5o2u5Zue5pi+XHJcbiAqIDIu6KGo5Y2V5o+Q5LqkXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIOaVsOaNruWbnuaYvlxyXG4gKiAxLuivt+axguaOpeWPo+iOt+WPluW9k+WJjeeUqOaIt+eahOS/oeaBr1xyXG4gKiAyLuS9v+eUqOaooeadv+W8leaTjuaKiuaVsOaNruW1jOWll+WIsOaooeadv+W9k+S4re+8jOW+l+WIsOaVsOaNrua4suafk+WQjueahOaooeadv1xyXG4gKiDln7rmnKzor63ms5XvvJogdmFyIGh0bWw9IHRlbXBsYXRl77yIJ2lkJyxkYXRh77yJXHJcbiAqIDMu5oqK5riy5p+T5ZCO55qE5qih5p2/5o+S5YWl5Yiw6aG16Z2i5oyH5a6a5L2N572uXHJcbiAqL1xyXG5cclxuJC5hamF4KHtcclxuICAgIHVybDogJy92Ni90ZWFjaGVyL3Byb2ZpbGUnLFxyXG4gICAgdHlwZTogJ2dldCcsXHJcbiAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgaWYgKGRhdGEuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgICAgJCgnLnRlYWNoZXItcHJvZmlsZScpLmh0bWwodGVtcGxhdGUoJ3RlYWNoZXItcHJvZmlsZS10cGwnLCBkYXRhLnJlc3VsdCkpO1xyXG4gICAgICAgICAgICAgaW5pdFBsdWdpbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG4vKipcclxuICog6KGo5Y2V5o+Q5Lqk77yaXHJcbiAqIDEu5Zug5Li66KGo5Y2V6KaB6L+b6KGM5pWw5o2u5Zue5pi+77yM5omA5Lul5piv5Yqo5oCB5byC5q2l5Yib5bu65Ye65p2l55qE44CCXHJcbiAqIOi/memHjOimgemAmui/h+aPkuS7tueahGFqYXhGb3Jt55uR5ZCs6KGo5Y2V5Lit5o+Q5Lqk5LqL5Lu25b+F6aG75L2/55So5aeU5omY55qE5pa55byP77yM5o+S5Lu25o+Q5L6b5LqGIGRlbGVnYXRpb246IHRydWXjgIJcclxuICogMi7kv67mlLnmiJDlip/lkI7nu5nkuKrnlKjmiLfmj5DnpLpcclxuICovXHJcbiQoJyN0ZWFjaGVyX3Byb2ZpbGVfZm9ybScpLmFqYXhGb3JtKHtcclxuICAgIGRlbGVnYXRpb246IHRydWUsXHJcbiAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgaWYgKGRhdGEuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgICAgYWxlcnQoJ+S/ruaUueaIkOWKnycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG4vKipcclxuICAqIOaJgOacieeahOaPkuS7tuWIneWni+WMlumDveaUvuWcqOi/memHjFxyXG4gICogKi9cclxuIGZ1bmN0aW9uIGluaXRQbHVnaW4oKSB7XHJcbi8vIFx05pel5pyf5o+S5Lu2XHJcbiAgICQoJ2lucHV0W25hbWU9dGNfYmlydGhkYXldJykuZGF0ZXBpY2tlcih7XHJcbiAgICAgbGFuZ3VhZ2U6ICd6aC1DTicsXHJcbiAgICBmb3JtYXQ6ICd5eXl5LW1tLWRkJyxcclxuICAgICBlbmREYXRlOiBuZXcgRGF0ZSgnMjAxMC0wMS0wMScpXHJcbiAgIH0pO1xyXG4gICAkKCdpbnB1dFtuYW1lPXRjX2pvaW5fZGF0ZV0nKS5kYXRlcGlja2VyKHtcclxuICAgICBsYW5ndWFnZTogJ3poLUNOJyxcclxuICAgICBmb3JtYXQ6ICd5eXl5LW1tLWRkJyxcclxuICAgICBlbmREYXRlOiBuZXcgRGF0ZSgnMjAxMC0wMS0wMScpXHJcbiAgIH0pO1xyXG4gICAgLy8g5LiJ57qn6IGU5Yqo5o+S5Lu2XHJcbiAgICQoJyNyZWdpb24tY29udGFpbmVyJykucmVnaW9uKHtcclxuICAgICB1cmw6ICcvbGliL2pxdWVyeS1yZWdpb24vcmVnaW9uLmpzb24nXHJcbiAgIH0pO1xyXG4gXHJcbiAgIC8vIOWvjOaWh+acrOe8lui+keWZqFxyXG4gICB3aW5kb3cuZWRpdCA9IENLRURJVE9SLnJlcGxhY2UoJ2ludHJvZHVjZScsIHtcclxuICAgICB3aWR0aDogNjAwLFxyXG4gICAgIHNraW46ICdtb29uby1saXNhJ1xyXG4gICB9KTtcclxuIH1cclxuICJdfQ==
