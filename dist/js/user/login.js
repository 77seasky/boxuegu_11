(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvdXNlci9sb2dpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXHJcbiAq5Zue5pi+5Y6G5Y+y55m76ZmG55So5oi355qE5aS05YOPIFxyXG4gKi9cclxudmFyIHVzZXJpbmZvID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcmluZm8nKSkgfHwge307XHJcbnZhciB0Y19hdmF0YXIgPSB1c2VyaW5mby50Y19hdmF0YXIgfHwgJy9wdWJsaWMvaW1nL2RlZmF1bHQucG5nJztcclxuJCgnLmF2YXRhciBpbWcnKS5hdHRyKCdzcmMnLCB0Y19hdmF0YXIpO1xyXG5cclxuXHJcbi8vIOW9k+eUqOaIt+eCueWHu+eZu+mZhuaMiemSrueahOaXtuWAme+8jOi/meS4quaPkuS7tmFqYXhGb3Jt5pa55rOV5Lya6Ieq5Yqo55uR5ZCsc3VibWl05LqL5Lu2XHJcbi8vIOeEtuWQjumYu+atoua1j+iniOWZqOm7mOiupOeahOWIt+aWsOaPkOS6pO+8jOeEtuWQjuiHquWKqOWPmOaIkGFqYXjnmoTmlrnlvI/lj5HpgIHor7fmsYLjgIJcclxuJCgnI2xvZ2luLWZvcm0nKS5hamF4Rm9ybSh7XHJcbiAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgaWYgKGRhdGEuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgICAgYWxlcnQoJ+eZu+mZhuaIkOWKnycpO1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcmluZm8nLCBKU09OLnN0cmluZ2lmeShkYXRhLnJlc3VsdCkpO1xyXG4gICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gJy9kaXN0JztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydCgn55m76ZmG5aSx6LSlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGVycm9yOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBhbGVydCgn55m76ZmG5aSx6LSlJyk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuXHJcbi8vICQoJyNsb2dpbi1mb3JtJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbi8vICAgICAkLmFqYXgoe1xyXG4vLyAgICAgICAgIHVybDogJy92Ni9sb2dpbicsXHJcbi8vICAgICAgICAgdHlwZTogJ3Bvc3QnLFxyXG4vLyAgICAgICAgIGRhdGE6ICQodGhpcykuc2VyaWFsaXplKCksXHJcbi8vICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4vLyAgICAgICAgICAgICBpZiAoZGF0YS5jb2RlID09IDIwMCkge1xyXG4vLyAgICAgICAgICAgICAgICAgYWxlcnQoJ+eZu+mZhuaIkOWKnycpO1xyXG4vLyAgICAgICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgYWxlcnQoJ+eZu+mZhuWksei0pScpO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfSxcclxuLy8gICAgICAgICBlcnJvcjogZnVuY3Rpb24oKSB7XHJcbi8vICAgICAgICAgICAgIGFsZXJ0KCfnmbvpmYblpLHotKUnKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9KTtcclxuXHJcbi8vICAgICAvLyBqcXVlcnnkuK3pmLvmraLmtY/op4jlmajpu5jorqTkuovku7ZyZXR1cm4gZmFsc2XljbPlj69cclxuLy8gICAgIHJldHVybiBmYWxzZTtcclxuLy8gfSk7Il19
