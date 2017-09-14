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
},{}],4:[function(require,module,exports){
require('../common/header.js');
require('../common/aside.js');
var util = require('../common/util.js');

/**
 * 功能点：
 * 1、数据回显
 * 2、学科二级联动
 * 3、表单提交
 * */
var cs_id = util.getSearch('cs_id');

/**
 * 数据回显：
 * 1、拿到location.search里面的cs_id
 * 2、通过这个id请求接口获取数据
 * 3、得到数据渲染后的模版，插入页面指定的位置
 * */
$.get('/v6/course/basic', { cs_id: cs_id }, function(data) {
    if (data.code == 200) {
    	data.result.editIndex = 1;
        $('#course-edit1').append(template('course-edit1-tpl', data.result));
    }
});

$(document).on('change', '#category-top-select', function() {
    // select的value就是用户所选的顶级学科cg_id
    var topCgid = $(this).val();
    // 利用顶级学科cg_id获取对应子级学科列表
    $.get('/v6/category/child', { cg_id: topCgid }, function(data) {
        var html = '';
        var childList = data.result;
        if (data.code == 200) {
            // 根据子级列表动态生成对应的option
            for (var i = 0, len = childList.length; i < len; i++) {
                html += ' < option value = "' + childList[i].cg_id + '" > ' + childList[i].cg_name + ' < /option>'
            }
        }
        // 使用新的option进行替换
        $('#category-top-select').html(html);
    });
});

/**
 * 表单提交：
 * 1、使用ajaxForm方法的委托方式表单转ajax
 * 2、编辑成功后给出提示，然后跳转到编辑第二步页面(跳转时需要继续把cs_id传递过去)
 * */
$('#course-edit1-form').ajaxForm({
    delegation: true,
    success: function(data) {
        if (data.code == 200) {
            alert('修改成功');
            location.href = '/dist/html/course/edit2.html?cs_id=' + cs_id;
        }
    }
});
},{"../common/aside.js":1,"../common/header.js":2,"../common/util.js":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvY29tbW9uL2FzaWRlLmpzIiwic3JjL2pzL2NvbW1vbi9oZWFkZXIuanMiLCJzcmMvanMvY29tbW9uL3V0aWwuanMiLCJzcmMvanMvY291cnNlL2VkaXQxLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXHJcbiAqIOWvvOiIquS4ieS4quWKn+iDveeCue+8mlxyXG4gKiAxLueUqOaIt+S/oeaBr+WxleekulxyXG4gKiAyLiDngrnlh7vmoIfpopjlrZDliJfooajmmL7npLrpmpDol49cclxuICogMy7moLnmja7orr/pl67nmoTpobXpnaLmt7vliqDlr7nlupTnmoTnhKbngrlcclxuICovXHJcblxyXG4vKipcclxuICog55So5oi35L+h5oGv5bGV56S677yaXHJcbiAqIDEu6K+75Y+Wc3RvcmFnZeeahHVzZXJpbmZv5pWw5o2uXHJcbiAqIDIu5L2G5piv5pWw5o2u5pe25a2X56ym5Liy77yM5L2/55So5LiN5L6/77yM5L2/55SoSlNPTi5wYXJzZei9rOS4uuWvueixoeS9v+eUqFxyXG4gKiAzLueEtuWQjuaKiuWvueixoeS4reeahOWQjeWtl+S4juWktOWDj+iuvue9ruWIsOWvvOiIquWvueW6lOeahOagh+etvuS4rVxyXG4gKi9cclxudmFyIHVzZXJpbmZvU3RyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJpbmZvJyk7XHJcbnZhciB1c2VyaW5mbyA9IEpTT04ucGFyc2UodXNlcmluZm9TdHIpIHx8IHt9O1xyXG4kKCcuYXNpZGUgaW1nJykuYXR0cignc3JjJywgdXNlcmluZm8udGNfYXZhdGFyIHx8ICcvcHVibGljL2ltYWdlcy9kZWZhdWx0LnBuZycpO1xyXG4kKCcuYXNpZGUgaDQnKS50ZXh0KHVzZXJpbmZvLnRjX25hbWUpO1xyXG5cclxuLyoqXHJcbiAqIOeCueWHu+agh+mimOWtkOWIl+ihqOmakOiXj3NcclxuICogMS7ojrflj5blr7zoiKrkuK3nmoRhIOagh+etvue7keWumuS6i+S7tlxyXG4gKiAyLuS6i+S7tuinpuWPkeaXtuiuqeWug+eahOS4i+S4gOS4quWFhOW8n+WFg+e0oHVs5pi+56S66ZqQ6JeP5YiH5o2iXHJcbiAqL1xyXG5cclxuJCgnLm5hdnMgYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgJCh0aGlzKS5uZXh0KCd1bCcpLnNsaWRlVG9nZ2xlKCk7XHJcbn0pO1xyXG5cclxuXHJcbi8qKlxyXG4gKiDmoLnmja7orr/pl67nmoTpobXpnaLnu5nlr7nlupTnmoTmoIfpopjmt7vliqDnhKbngrnvvJpcclxuICogMS7pppblhYjojrflj5bpobXpnaJsb2NhdGlvbi5wYXRobmFtZVxyXG4gKiAyLuiOt+WPluWFqOmDqOeahOWvvOiIqmHmoIfnrb7vvIzlhYjnu5/kuIDlj5blh7phY3RpdmXnsbvlkI1cclxuICogMy7nhLblkI7liKnnlKjov5nkuKrlgLzlkozlr7zoiKph5qCH562+55qEaHJlZuWOu+WMuemFjeW+l+WIsOWvueW6lOeahGHmoIfnrb7vvIzmt7vliqBhY3RpdmXnsbvlkI3nmoTnhKbngrlcclxuICovXHJcblxyXG52YXIgcGF0aCA9IGxvY2F0aW9uLnBhdGhuYW1lO1xyXG4kKCcubmF2cyBhJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4kKCcubmF2cyBhW2hyZWY9XCInICsgcGF0aCArICdcIl0nKS5hZGRDbGFzcygnYWN0aXZlJykucGFyZW50cygndWwnKS5zaG93KCk7IiwiJCgnI2J0bi1sb2dvdXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL3Y2L2xvZ291dCcsXHJcbiAgICAgICAgdHlwZTogJ3Bvc3QnLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCfpgIDlh7rmiJDlip8nKTtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnL2Rpc3QvaHRtbC91c2VyL2xvZ2luLmh0bWwnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pOyIsIi8qKlxyXG4gKiDop6PmnpBsb2NhdGlvbi5zZWFyY2jvvJpcclxuICog5LygMeS4quWPguaVsOi/lOWbnuaMh+WummtleeeahOWAvO+8jOS4jeS8oOWPguaVsOi/lOWbnuino+aekOaIkOWvueixoeWQjueahOWAvOOAglxyXG4gKiAx44CB6aaW5YWI5oqK5aS06YOo55qEP+WOu+aOiVxyXG4gKiAy44CB6YCa6L+HJuespuWPt+WKiOaIkOS4gOe7hOe7hGtleT12YWzov5nmoLfnmoTlrZfnrKbkuLLnu4TmiJDnmoTmlbDnu4RcclxuICogM+OAgeeEtuWQjuWcqOmAmui/hz3lj7fmiorkuIDnu4Tnu4TlrZfnrKbkuLLliojlvIDojrflj5ZrZXnkuI52YWzvvIzlrZjlgqjliLDkuIDkuKrlr7nosaHkuK1cclxuICogNOOAgeWIpOaWreayoeacieS8oOWPgui/lOWbnui/meS4quWvueixoe+8jOS8oOS6hui/lOWbnuWvueixoeS4reaMh+WummtleeeahOWAvFxyXG4gKiAqL1xyXG5mdW5jdGlvbiBnZXRTZWFyY2goa2V5KSB7XHJcbiAgICB2YXIgc2VhcmNoU3RyID0gbG9jYXRpb24uc2VhcmNoLnNsaWNlKDEpO1xyXG4gICAgdmFyIHNlYXJjaEFyciA9IHNlYXJjaFN0ci5zcGxpdCgnJicpO1xyXG4gICAgdmFyIHNlYXJjaE9iaiA9IHt9LFxyXG4gICAgICAgIHRlbXBBcnI7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gc2VhcmNoQXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgdGVtcEFyciA9IHNlYXJjaEFycltpXS5zcGxpdCgnPScpO1xyXG4gICAgICAgIHNlYXJjaE9ialt0ZW1wQXJyWzBdXSA9IHRlbXBBcnJbMV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4ga2V5ID8gc2VhcmNoT2JqW2tleV0gOiBzZWFyY2hPYmo7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzLmdldFNlYXJjaCA9IGdldFNlYXJjaDsiLCJyZXF1aXJlKCcuLi9jb21tb24vaGVhZGVyLmpzJyk7XHJcbnJlcXVpcmUoJy4uL2NvbW1vbi9hc2lkZS5qcycpO1xyXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4uL2NvbW1vbi91dGlsLmpzJyk7XHJcblxyXG4vKipcclxuICog5Yqf6IO954K577yaXHJcbiAqIDHjgIHmlbDmja7lm57mmL5cclxuICogMuOAgeWtpuenkeS6jOe6p+iBlOWKqFxyXG4gKiAz44CB6KGo5Y2V5o+Q5LqkXHJcbiAqICovXHJcbnZhciBjc19pZCA9IHV0aWwuZ2V0U2VhcmNoKCdjc19pZCcpO1xyXG5cclxuLyoqXHJcbiAqIOaVsOaNruWbnuaYvu+8mlxyXG4gKiAx44CB5ou/5YiwbG9jYXRpb24uc2VhcmNo6YeM6Z2i55qEY3NfaWRcclxuICogMuOAgemAmui/h+i/meS4qmlk6K+35rGC5o6l5Y+j6I635Y+W5pWw5o2uXHJcbiAqIDPjgIHlvpfliLDmlbDmja7muLLmn5PlkI7nmoTmqKHniYjvvIzmj5LlhaXpobXpnaLmjIflrprnmoTkvY3nva5cclxuICogKi9cclxuJC5nZXQoJy92Ni9jb3Vyc2UvYmFzaWMnLCB7IGNzX2lkOiBjc19pZCB9LCBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICBpZiAoZGF0YS5jb2RlID09IDIwMCkge1xyXG4gICAgXHRkYXRhLnJlc3VsdC5lZGl0SW5kZXggPSAxO1xyXG4gICAgICAgICQoJyNjb3Vyc2UtZWRpdDEnKS5hcHBlbmQodGVtcGxhdGUoJ2NvdXJzZS1lZGl0MS10cGwnLCBkYXRhLnJlc3VsdCkpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbiQoZG9jdW1lbnQpLm9uKCdjaGFuZ2UnLCAnI2NhdGVnb3J5LXRvcC1zZWxlY3QnLCBmdW5jdGlvbigpIHtcclxuICAgIC8vIHNlbGVjdOeahHZhbHVl5bCx5piv55So5oi35omA6YCJ55qE6aG257qn5a2m56eRY2dfaWRcclxuICAgIHZhciB0b3BDZ2lkID0gJCh0aGlzKS52YWwoKTtcclxuICAgIC8vIOWIqeeUqOmhtue6p+WtpuenkWNnX2lk6I635Y+W5a+55bqU5a2Q57qn5a2m56eR5YiX6KGoXHJcbiAgICAkLmdldCgnL3Y2L2NhdGVnb3J5L2NoaWxkJywgeyBjZ19pZDogdG9wQ2dpZCB9LCBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgdmFyIGh0bWwgPSAnJztcclxuICAgICAgICB2YXIgY2hpbGRMaXN0ID0gZGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgaWYgKGRhdGEuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgICAgLy8g5qC55o2u5a2Q57qn5YiX6KGo5Yqo5oCB55Sf5oiQ5a+55bqU55qEb3B0aW9uXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjaGlsZExpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGh0bWwgKz0gJyA8IG9wdGlvbiB2YWx1ZSA9IFwiJyArIGNoaWxkTGlzdFtpXS5jZ19pZCArICdcIiA+ICcgKyBjaGlsZExpc3RbaV0uY2dfbmFtZSArICcgPCAvb3B0aW9uPidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDkvb/nlKjmlrDnmoRvcHRpb27ov5vooYzmm7/mjaJcclxuICAgICAgICAkKCcjY2F0ZWdvcnktdG9wLXNlbGVjdCcpLmh0bWwoaHRtbCk7XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG4vKipcclxuICog6KGo5Y2V5o+Q5Lqk77yaXHJcbiAqIDHjgIHkvb/nlKhhamF4Rm9ybeaWueazleeahOWnlOaJmOaWueW8j+ihqOWNlei9rGFqYXhcclxuICogMuOAgee8lui+keaIkOWKn+WQjue7meWHuuaPkOekuu+8jOeEtuWQjui3s+i9rOWIsOe8lui+keesrOS6jOatpemhtemdoijot7Povazml7bpnIDopoHnu6fnu63miopjc19pZOS8oOmAkui/h+WOuylcclxuICogKi9cclxuJCgnI2NvdXJzZS1lZGl0MS1mb3JtJykuYWpheEZvcm0oe1xyXG4gICAgZGVsZWdhdGlvbjogdHJ1ZSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICBpZiAoZGF0YS5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICBhbGVydCgn5L+u5pS55oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnL2Rpc3QvaHRtbC9jb3Vyc2UvZWRpdDIuaHRtbD9jc19pZD0nICsgY3NfaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTsiXX0=
