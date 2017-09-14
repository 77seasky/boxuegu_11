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
 	success:function(data){
 		if(data.result){
 		alert('添加成功');
 		$('#lesson-form').get(0).reset();
 	}else{
 		alert('修改成功');
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



},{"../common/aside.js":1,"../common/header.js":2,"../common/util.js":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvY29tbW9uL2FzaWRlLmpzIiwic3JjL2pzL2NvbW1vbi9oZWFkZXIuanMiLCJzcmMvanMvY29tbW9uL3V0aWwuanMiLCJzcmMvanMvY291cnNlL2VkaXQzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxyXG4gKiDlr7zoiKrkuInkuKrlip/og73ngrnvvJpcclxuICogMS7nlKjmiLfkv6Hmga/lsZXnpLpcclxuICogMi4g54K55Ye75qCH6aKY5a2Q5YiX6KGo5pi+56S66ZqQ6JePXHJcbiAqIDMu5qC55o2u6K6/6Zeu55qE6aG16Z2i5re75Yqg5a+55bqU55qE54Sm54K5XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIOeUqOaIt+S/oeaBr+Wxleekuu+8mlxyXG4gKiAxLuivu+WPlnN0b3JhZ2XnmoR1c2VyaW5mb+aVsOaNrlxyXG4gKiAyLuS9huaYr+aVsOaNruaXtuWtl+espuS4su+8jOS9v+eUqOS4jeS+v++8jOS9v+eUqEpTT04ucGFyc2XovazkuLrlr7nosaHkvb/nlKhcclxuICogMy7nhLblkI7miorlr7nosaHkuK3nmoTlkI3lrZfkuI7lpLTlg4/orr7nva7liLDlr7zoiKrlr7nlupTnmoTmoIfnrb7kuK1cclxuICovXHJcbnZhciB1c2VyaW5mb1N0ciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyaW5mbycpO1xyXG52YXIgdXNlcmluZm8gPSBKU09OLnBhcnNlKHVzZXJpbmZvU3RyKSB8fCB7fTtcclxuJCgnLmFzaWRlIGltZycpLmF0dHIoJ3NyYycsIHVzZXJpbmZvLnRjX2F2YXRhciB8fCAnL3B1YmxpYy9pbWFnZXMvZGVmYXVsdC5wbmcnKTtcclxuJCgnLmFzaWRlIGg0JykudGV4dCh1c2VyaW5mby50Y19uYW1lKTtcclxuXHJcbi8qKlxyXG4gKiDngrnlh7vmoIfpopjlrZDliJfooajpmpDol49zXHJcbiAqIDEu6I635Y+W5a+86Iiq5Lit55qEYSDmoIfnrb7nu5Hlrprkuovku7ZcclxuICogMi7kuovku7bop6blj5Hml7borqnlroPnmoTkuIvkuIDkuKrlhYTlvJ/lhYPntKB1bOaYvuekuumakOiXj+WIh+aNolxyXG4gKi9cclxuXHJcbiQoJy5uYXZzIGEnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICQodGhpcykubmV4dCgndWwnKS5zbGlkZVRvZ2dsZSgpO1xyXG59KTtcclxuXHJcblxyXG4vKipcclxuICog5qC55o2u6K6/6Zeu55qE6aG16Z2i57uZ5a+55bqU55qE5qCH6aKY5re75Yqg54Sm54K577yaXHJcbiAqIDEu6aaW5YWI6I635Y+W6aG16Z2ibG9jYXRpb24ucGF0aG5hbWVcclxuICogMi7ojrflj5blhajpg6jnmoTlr7zoiKph5qCH562+77yM5YWI57uf5LiA5Y+W5Ye6YWN0aXZl57G75ZCNXHJcbiAqIDMu54S25ZCO5Yip55So6L+Z5Liq5YC85ZKM5a+86IiqYeagh+etvueahGhyZWbljrvljLnphY3lvpfliLDlr7nlupTnmoRh5qCH562+77yM5re75YqgYWN0aXZl57G75ZCN55qE54Sm54K5XHJcbiAqL1xyXG5cclxudmFyIHBhdGggPSBsb2NhdGlvbi5wYXRobmFtZTtcclxuJCgnLm5hdnMgYScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuJCgnLm5hdnMgYVtocmVmPVwiJyArIHBhdGggKyAnXCJdJykuYWRkQ2xhc3MoJ2FjdGl2ZScpLnBhcmVudHMoJ3VsJykuc2hvdygpOyIsIiQoJyNidG4tbG9nb3V0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy92Ni9sb2dvdXQnLFxyXG4gICAgICAgIHR5cGU6ICdwb3N0JyxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgn6YCA5Ye65oiQ5YqfJyk7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gJy9kaXN0L2h0bWwvdXNlci9sb2dpbi5odG1sJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTsiLCIvKipcclxuICog6Kej5p6QbG9jYXRpb24uc2VhcmNo77yaXHJcbiAqIOS8oDHkuKrlj4LmlbDov5Tlm57mjIflrpprZXnnmoTlgLzvvIzkuI3kvKDlj4LmlbDov5Tlm57op6PmnpDmiJDlr7nosaHlkI7nmoTlgLzjgIJcclxuICogMeOAgemmluWFiOaKiuWktOmDqOeahD/ljrvmjolcclxuICogMuOAgemAmui/hybnrKblj7fliojmiJDkuIDnu4Tnu4RrZXk9dmFs6L+Z5qC355qE5a2X56ym5Liy57uE5oiQ55qE5pWw57uEXHJcbiAqIDPjgIHnhLblkI7lnKjpgJrov4c95Y+35oqK5LiA57uE57uE5a2X56ym5Liy5YqI5byA6I635Y+Wa2V55LiOdmFs77yM5a2Y5YKo5Yiw5LiA5Liq5a+56LGh5LitXHJcbiAqIDTjgIHliKTmlq3msqHmnInkvKDlj4Lov5Tlm57ov5nkuKrlr7nosaHvvIzkvKDkuobov5Tlm57lr7nosaHkuK3mjIflrpprZXnnmoTlgLxcclxuICogKi9cclxuZnVuY3Rpb24gZ2V0U2VhcmNoKGtleSkge1xyXG4gICAgdmFyIHNlYXJjaFN0ciA9IGxvY2F0aW9uLnNlYXJjaC5zbGljZSgxKTtcclxuICAgIHZhciBzZWFyY2hBcnIgPSBzZWFyY2hTdHIuc3BsaXQoJyYnKTtcclxuICAgIHZhciBzZWFyY2hPYmogPSB7fSxcclxuICAgICAgICB0ZW1wQXJyO1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHNlYXJjaEFyci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIHRlbXBBcnIgPSBzZWFyY2hBcnJbaV0uc3BsaXQoJz0nKTtcclxuICAgICAgICBzZWFyY2hPYmpbdGVtcEFyclswXV0gPSB0ZW1wQXJyWzFdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGtleSA/IHNlYXJjaE9ialtrZXldIDogc2VhcmNoT2JqO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5nZXRTZWFyY2ggPSBnZXRTZWFyY2g7IiwicmVxdWlyZSgnLi4vY29tbW9uL2hlYWRlci5qcycpO1xyXG5yZXF1aXJlKCcuLi9jb21tb24vYXNpZGUuanMnKTtcclxudmFyIHV0aWwgPSByZXF1aXJlKCcuLi9jb21tb24vdXRpbC5qcycpO1xyXG5cclxuLyoqXHJcbiAgKiDlip/og73ngrnvvJpcclxuICAqIDHjgIHpobXpnaLmlbDmja7lm57mmL5cclxuICAqIDLjgIHnvJbovpHnq6DoioJcclxuICAqIDPjgIHmt7vliqDnq6DoioJcclxuICAqIFx0My4x44CB5pWw5o2u5Zue5pi+ICAgLS0gIOaMieeFp+W4uOeQhuaYr+S4jemcgOimgeWbnuaYvueahO+8jOS9huaYr+WboOS4uuWSjOe8lui+keWQjOeUqGh0bWzmqKHniYjvvIzpnIDopoHlm57mmL7nqbrmlbDmja5cclxuICAqICAgICAzLjLjgIHmlbDmja7mj5DkuqRcclxuICAqICovXHJcbiB2YXIgY3NfaWQgPSB1dGlsLmdldFNlYXJjaCgnY3NfaWQnKTtcclxuIFxyXG4vKipcclxuICog6aG16Z2i5pWw5o2u5Zue5pi+77yaXHJcbiAgKiAx44CB5ou/5YiwbG9jYXRpb24uc2VhcmNo6YeM6Z2i55qEY3NfaWRcclxuICogMuOAgemAmui/h+i/meS4qmlk6K+35rGC5o6l5Y+j6I635Y+W5pWw5o2uXHJcbiAgKiAz44CB5b6X5Yiw5pWw5o2u5riy5p+T5ZCO55qE5qih54mI77yM5o+S5YWl6aG16Z2i5oyH5a6a55qE5L2N572uXHJcbiAgKiAqL1xyXG4gXHJcbiQuZ2V0KCcvdjYvY291cnNlL2xlc3Nvbicse2NzX2lkOmNzX2lkfSxmdW5jdGlvbihkYXRhKXtcclxuXHRpZihkYXRhLmNvZGU9PTIwMCl7XHJcblx0XHRkYXRhLnJlc3VsdC5lZGl0SW5kZXg9MztcclxuXHRcdCQoJyNjb3Vyc2UtZWRpdDMnKS5hcHBlbmQodGVtcGxhdGUoJ2NvdXJzZS1lZGl0My10cGwnLGRhdGEucmVzdWx0KSk7XHJcblx0fVxyXG59KTtcclxuXHJcbi8qKlxyXG4gICog57yW6L6R56ug6IqCX+aVsOaNruWbnuaYvu+8mlxyXG4gICogMeOAgeWboOS4uueroOiKguWIl+ihqOaYr+WKqOaAgeeUn+aIkOeahO+8jOaJgOS7pemcgOimgemAmui/h+WnlOaJmOeahOaWueW8j+e7mee8lui+keaMiemSrue7keWummNsaWNr5LqL5Lu2XHJcbiAgKiAy44CB5LqL5Lu26Kem5Y+R5pe26I635Y+W5oyJ6ZKu6Lqr5LiK6Ieq5a6a5LmJ5bGe5oCn6K6w5b2V55qEY3RfaWTvvIznlKjmnaXor7fmsYLmjqXlj6Pojrflj5bmlbDmja5cclxuICAqIDPjgIHmlbDmja7muLLmn5PmqKHmgIHmoYbmqKHniYjvvIzmj5LlhaXliLDpobXpnaLkuK1cclxuICAqICovXHJcbiAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmJ0bi1sZXNzb24tZWRpdCcsIGZ1bmN0aW9uKCkge1xyXG4gICB2YXIgZGF0YSA9IHtcclxuICAgICBjdF9pZDogJCh0aGlzKS5hdHRyKCdkYXRhLWlkJylcclxuICAgfTtcclxuIFxyXG4gICAkLmdldCgnL3Y2L2NvdXJzZS9jaGFwdGVyL2VkaXQnLCBkYXRhLCBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgIGlmKGRhdGEuY29kZSA9PSAyMDApIHtcclxuICAgICAgXHRkYXRhLnJlc3VsdC5jc19pZCA9IGNzX2lkOyAvLyDlkI7nq6/pnIDopoHov5nkuKrlgLzmnaXljLrliIbkv67mlLnnmoTnq6DoioLlsZ7kuo7pgqPkuKror77nqItcclxuICAgICAgICAkKCcjY2hhcHRlck1vZGFsJykuaHRtbCh0ZW1wbGF0ZSgnbGVzc29uLXRwbCcsIGRhdGEucmVzdWx0KSk7XHJcbiAgICAgfVxyXG4gICB9KTtcclxuIH0pO1xyXG4gXHJcbiAvKipcclxuICAqIOe8lui+keeroOiKgl/ooajljZXmj5DkuqTvvJpcclxuICAqIDHjgIHlm6DkuLrooajljZXopoHmlbDmja7lm57mmL7mmK/liqjmgIHnlJ/miJDnmoTvvIzmiYDku6Xkvb/nlKhhamF4Rm9ybeaPkuS7tuaWueazleeahOWnlOaJmFxyXG4gICogMuOAgeaIkOWKn+WQjue7meS4quaPkOekulxyXG4gICogKi9cclxuICAvKirkv67mlLnnq6DoioLkuI7mt7vliqDnq6DoioLvvJpcclxuICAqIDHjgIHlm6DkuLrlnKjlkIzkuIDkuKrpobXpnaLkuK3vvIzkv67mlLnkuI7mt7vliqDkvb/nlKjnmoTmmK/lkIzkuIDkuKpmb3Jt77yM6L+Z6YeM5LiA6LW35bCx5aSE55CG5LqGXHJcbiAgKiAy44CB6YCa6L+HYWpheEZvcm3mj5Lku7bmlrnms5XmiorooajljZXpu5jorqTliLfmlrDmj5DkuqTovaxhamF45o+Q5Lqk77yM5Zug5Li6Zm9ybeaYr+WKqOaAgeeUn+aIkOeahO+8jOaJgOS7peimgeS9v+eUqOWnlOaJmFxyXG4gKiAz44CB6K+35rGC5oiQ5Yqf5ZCO77yM6YCa6L+H5Yik5pat5pyN5Yqh5ZmoZGF0YS5yZXN1bHTmnaXljbTliIbmmK/kv67mlLnov5jmmK/mt7vliqDvvIznu5nnlKjmiLfkuI3lkIznmoTmj5DnpLrkv6Hmga9cclxuICogKi9cclxuICQoJyNsZXNzb24tZm9ybScpLmFqYXhGb3JtKHtcclxuIFx0ZGVsZWdhdGlvbjp0cnVlLFxyXG4gXHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG4gXHRcdGlmKGRhdGEucmVzdWx0KXtcclxuIFx0XHRhbGVydCgn5re75Yqg5oiQ5YqfJyk7XHJcbiBcdFx0JCgnI2xlc3Nvbi1mb3JtJykuZ2V0KDApLnJlc2V0KCk7XHJcbiBcdH1lbHNle1xyXG4gXHRcdGFsZXJ0KCfkv67mlLnmiJDlip8nKTtcclxuIFx0fVxyXG4gXHR9XHJcbiB9KTtcclxuIFxyXG4gLyoqXHJcbiAgKiDmt7vliqDnq6DoioLvvJpcclxuICAqIDHjgIHlm6DkuLrooajljZXopoHmlbDmja7lm57mmL7mmK/liqjmgIHnlJ/miJDnmoTvvIzmiYDku6Xkvb/nlKjlp5TmiZjnmoTmlrnlvI/nu5nmt7vliqDmjInpkq7nu5HlrppjbGlja+S6i+S7tlxyXG4gICogMuOAgeS6i+S7tuinpuWPkeaXtuS9v+eUqOS4gOS4quepuuWvueixoea4suafk+aooeaAgeahhuaooeeJiO+8jOaPkuWFpeWIsOmhtemdouS4rVxyXG4gICogKi9cclxuICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjYnRuLWxlc3Nvbi1hZGQnLCBmdW5jdGlvbigpIHtcclxuICAgJCgnI2NoYXB0ZXJNb2RhbCcpLmh0bWwodGVtcGxhdGUoJ2xlc3Nvbi10cGwnLCB7IGNzX2lkOiBjc19pZCB9KSk7XHJcbiAgfSk7XHJcblxyXG5cclxuIl19
