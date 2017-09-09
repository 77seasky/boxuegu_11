(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// 当用户点击登陆按钮的时候，这个插件ajaxForm方法会自动监听submit事件
// 然后阻止浏览器默认的刷新提交，然后自动变成ajax的方式发送请求。
$('#login-form').ajaxForm({
    success: function(data) {
        if (data.code == 200) {
            alert('登陆成功');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvdXNlci9sb2dpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8g5b2T55So5oi354K55Ye755m76ZmG5oyJ6ZKu55qE5pe25YCZ77yM6L+Z5Liq5o+S5Lu2YWpheEZvcm3mlrnms5XkvJroh6rliqjnm5HlkKxzdWJtaXTkuovku7ZcclxuLy8g54S25ZCO6Zi75q2i5rWP6KeI5Zmo6buY6K6k55qE5Yi35paw5o+Q5Lqk77yM54S25ZCO6Ieq5Yqo5Y+Y5oiQYWpheOeahOaWueW8j+WPkemAgeivt+axguOAglxyXG4kKCcjbG9naW4tZm9ybScpLmFqYXhGb3JtKHtcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICBpZiAoZGF0YS5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICBhbGVydCgn55m76ZmG5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnL2Rpc3QnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCfnmbvpmYblpLHotKUnKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZXJyb3I6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGFsZXJ0KCfnmbvpmYblpLHotKUnKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5cclxuLy8gJCgnI2xvZ2luLWZvcm0nKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSkge1xyXG5cclxuLy8gICAgICQuYWpheCh7XHJcbi8vICAgICAgICAgdXJsOiAnL3Y2L2xvZ2luJyxcclxuLy8gICAgICAgICB0eXBlOiAncG9zdCcsXHJcbi8vICAgICAgICAgZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSxcclxuLy8gICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbi8vICAgICAgICAgICAgIGlmIChkYXRhLmNvZGUgPT0gMjAwKSB7XHJcbi8vICAgICAgICAgICAgICAgICBhbGVydCgn55m76ZmG5oiQ5YqfJyk7XHJcbi8vICAgICAgICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICBhbGVydCgn55m76ZmG5aSx6LSlJyk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9LFxyXG4vLyAgICAgICAgIGVycm9yOiBmdW5jdGlvbigpIHtcclxuLy8gICAgICAgICAgICAgYWxlcnQoJ+eZu+mZhuWksei0pScpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH0pO1xyXG5cclxuLy8gICAgIC8vIGpxdWVyeeS4remYu+atoua1j+iniOWZqOm7mOiupOS6i+S7tnJldHVybiBmYWxzZeWNs+WPr1xyXG4vLyAgICAgcmV0dXJuIGZhbHNlO1xyXG4vLyB9KTsiXX0=
