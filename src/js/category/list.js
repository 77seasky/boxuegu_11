require('../common/header.js');
require('../common/aside.js');
require('../common/loading.js');
 require('../common/common.js');

$.get('/v6/category', function(data) {
    $('.table-bordered').append(template('category_list_tpl', data.result));
})