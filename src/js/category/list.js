require('../common/header.js');
require('../common/aside.js');

$.get('/v6/category', function(data) {
    $('.table-bordered').append(template('category_list_tpl', data.result));
})