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
$('.aside img').attr('src', userinfo.tc_avatar || '/public/images/default.png');
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

/**
 * 功能点：
 * 1、列表数据展示
 * 2、讲师查看
 * 3、讲师启用与注销
 * */
/**
 * 列表数据展示：
 * 1、请求接口获取数据
 * 2、得到数据渲染后的模版，插入页面指定位置
 * */

$.get('/v6/teacher', function(data) {
    data.code == 200 && $('#teacher_list_table').append(template('teacher_list_tpl', data.result));
});

/**
 * 讲师启用与注销：
 * 1、因为按钮是随着列表动态生成的，所以需要委托的方式绑定click事件
 * 2、点击时通过自定义属性拿到这个按钮身上的tc_id与tc_status请求接口
 * 3、状态修改成功后，要重新设置按钮的文本，按钮的自定义属性
 * */
$(document).on('click', '.btn-teacher-status', function() {
    var $this = $(this); // 这里保存按钮是为了在ajax的回调中再次使用
    var data = {
        tc_id: $(this).attr('data-id'),
        tc_status: $(this).attr('data-status')
    };
    $.post('/v6/teacher/handle', data, function(data) {
        var newStatus = data.result.tc_status;
        $this.text(newStatus == 0 ? '注 销' : '启 用'); // 更新按钮的文本
        $this.attr('data-status', newStatus); // 修改自定位属性为新的status
    });
});
},{"../common/aside.js":1,"../common/header.js":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvY29tbW9uL2FzaWRlLmpzIiwic3JjL2pzL2NvbW1vbi9oZWFkZXIuanMiLCJzcmMvanMvdGVhY2hlci9saXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXHJcbiAqIOWvvOiIquS4ieS4quWKn+iDveeCue+8mlxyXG4gKiAxLueUqOaIt+S/oeaBr+WxleekulxyXG4gKiAyLiDngrnlh7vmoIfpopjlrZDliJfooajmmL7npLrpmpDol49cclxuICogMy7moLnmja7orr/pl67nmoTpobXpnaLmt7vliqDlr7nlupTnmoTnhKbngrlcclxuICovXHJcblxyXG4vKipcclxuICog55So5oi35L+h5oGv5bGV56S677yaXHJcbiAqIDEu6K+75Y+Wc3RvcmFnZeeahHVzZXJpbmZv5pWw5o2uXHJcbiAqIDIu5L2G5piv5pWw5o2u5pe25a2X56ym5Liy77yM5L2/55So5LiN5L6/77yM5L2/55SoSlNPTi5wYXJzZei9rOS4uuWvueixoeS9v+eUqFxyXG4gKiAzLueEtuWQjuaKiuWvueixoeS4reeahOWQjeWtl+S4juWktOWDj+iuvue9ruWIsOWvvOiIquWvueW6lOeahOagh+etvuS4rVxyXG4gKi9cclxudmFyIHVzZXJpbmZvU3RyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJpbmZvJyk7XHJcbnZhciB1c2VyaW5mbyA9IEpTT04ucGFyc2UodXNlcmluZm9TdHIpIHx8IHt9O1xyXG4kKCcuYXNpZGUgaW1nJykuYXR0cignc3JjJywgdXNlcmluZm8udGNfYXZhdGFyIHx8ICcvcHVibGljL2ltYWdlcy9kZWZhdWx0LnBuZycpO1xyXG4kKCcuYXNpZGUgaDQnKS50ZXh0KHVzZXJpbmZvLnRjX25hbWUpO1xyXG5cclxuLyoqXHJcbiAqIOeCueWHu+agh+mimOWtkOWIl+ihqOmakOiXj3NcclxuICogMS7ojrflj5blr7zoiKrkuK3nmoRhIOagh+etvue7keWumuS6i+S7tlxyXG4gKiAyLuS6i+S7tuinpuWPkeaXtuiuqeWug+eahOS4i+S4gOS4quWFhOW8n+WFg+e0oHVs5pi+56S66ZqQ6JeP5YiH5o2iXHJcbiAqL1xyXG5cclxuJCgnLm5hdnMgYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgJCh0aGlzKS5uZXh0KCd1bCcpLnNsaWRlVG9nZ2xlKCk7XHJcbn0pO1xyXG5cclxuXHJcbi8qKlxyXG4gKiDmoLnmja7orr/pl67nmoTpobXpnaLnu5nlr7nlupTnmoTmoIfpopjmt7vliqDnhKbngrnvvJpcclxuICogMS7pppblhYjojrflj5bpobXpnaJsb2NhdGlvbi5wYXRobmFtZVxyXG4gKiAyLuiOt+WPluWFqOmDqOeahOWvvOiIqmHmoIfnrb7vvIzlhYjnu5/kuIDlj5blh7phY3RpdmXnsbvlkI1cclxuICogMy7nhLblkI7liKnnlKjov5nkuKrlgLzlkozlr7zoiKph5qCH562+55qEaHJlZuWOu+WMuemFjeW+l+WIsOWvueW6lOeahGHmoIfnrb7vvIzmt7vliqBhY3RpdmXnsbvlkI3nmoTnhKbngrlcclxuICovXHJcblxyXG52YXIgcGF0aCA9IGxvY2F0aW9uLnBhdGhuYW1lO1xyXG4kKCcubmF2cyBhJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4kKCcubmF2cyBhW2hyZWY9XCInICsgcGF0aCArICdcIl0nKS5hZGRDbGFzcygnYWN0aXZlJykucGFyZW50cygndWwnKS5zaG93KCk7IiwiJCgnI2J0bi1sb2dvdXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL3Y2L2xvZ291dCcsXHJcbiAgICAgICAgdHlwZTogJ3Bvc3QnLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCfpgIDlh7rmiJDlip8nKTtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnL2Rpc3QvaHRtbC91c2VyL2xvZ2luLmh0bWwnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pOyIsInJlcXVpcmUoJy4uL2NvbW1vbi9oZWFkZXIuanMnKTtcclxucmVxdWlyZSgnLi4vY29tbW9uL2FzaWRlLmpzJyk7XHJcblxyXG4vKipcclxuICog5Yqf6IO954K577yaXHJcbiAqIDHjgIHliJfooajmlbDmja7lsZXnpLpcclxuICogMuOAgeiusuW4iOafpeeci1xyXG4gKiAz44CB6K6y5biI5ZCv55So5LiO5rOo6ZSAXHJcbiAqICovXHJcbi8qKlxyXG4gKiDliJfooajmlbDmja7lsZXnpLrvvJpcclxuICogMeOAgeivt+axguaOpeWPo+iOt+WPluaVsOaNrlxyXG4gKiAy44CB5b6X5Yiw5pWw5o2u5riy5p+T5ZCO55qE5qih54mI77yM5o+S5YWl6aG16Z2i5oyH5a6a5L2N572uXHJcbiAqICovXHJcblxyXG4kLmdldCgnL3Y2L3RlYWNoZXInLCBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICBkYXRhLmNvZGUgPT0gMjAwICYmICQoJyN0ZWFjaGVyX2xpc3RfdGFibGUnKS5hcHBlbmQodGVtcGxhdGUoJ3RlYWNoZXJfbGlzdF90cGwnLCBkYXRhLnJlc3VsdCkpO1xyXG59KTtcclxuXHJcbi8qKlxyXG4gKiDorrLluIjlkK/nlKjkuI7ms6jplIDvvJpcclxuICogMeOAgeWboOS4uuaMiemSruaYr+maj+edgOWIl+ihqOWKqOaAgeeUn+aIkOeahO+8jOaJgOS7pemcgOimgeWnlOaJmOeahOaWueW8j+e7keWummNsaWNr5LqL5Lu2XHJcbiAqIDLjgIHngrnlh7vml7bpgJrov4foh6rlrprkuYnlsZ7mgKfmi7/liLDov5nkuKrmjInpkq7ouqvkuIrnmoR0Y19pZOS4jnRjX3N0YXR1c+ivt+axguaOpeWPo1xyXG4gKiAz44CB54q25oCB5L+u5pS55oiQ5Yqf5ZCO77yM6KaB6YeN5paw6K6+572u5oyJ6ZKu55qE5paH5pys77yM5oyJ6ZKu55qE6Ieq5a6a5LmJ5bGe5oCnXHJcbiAqICovXHJcbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuYnRuLXRlYWNoZXItc3RhdHVzJywgZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpOyAvLyDov5nph4zkv53lrZjmjInpkq7mmK/kuLrkuoblnKhhamF455qE5Zue6LCD5Lit5YaN5qyh5L2/55SoXHJcbiAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICB0Y19pZDogJCh0aGlzKS5hdHRyKCdkYXRhLWlkJyksXHJcbiAgICAgICAgdGNfc3RhdHVzOiAkKHRoaXMpLmF0dHIoJ2RhdGEtc3RhdHVzJylcclxuICAgIH07XHJcbiAgICAkLnBvc3QoJy92Ni90ZWFjaGVyL2hhbmRsZScsIGRhdGEsIGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICB2YXIgbmV3U3RhdHVzID0gZGF0YS5yZXN1bHQudGNfc3RhdHVzO1xyXG4gICAgICAgICR0aGlzLnRleHQobmV3U3RhdHVzID09IDAgPyAn5rOoIOmUgCcgOiAn5ZCvIOeUqCcpOyAvLyDmm7TmlrDmjInpkq7nmoTmlofmnKxcclxuICAgICAgICAkdGhpcy5hdHRyKCdkYXRhLXN0YXR1cycsIG5ld1N0YXR1cyk7IC8vIOS/ruaUueiHquWumuS9jeWxnuaAp+S4uuaWsOeahHN0YXR1c1xyXG4gICAgfSk7XHJcbn0pOyJdfQ==
