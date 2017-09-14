require('../common/header.js');
require('../common/aside.js');
require('../common/loading.js');
 require('../common/common.js');


$('#teacher_add_form').ajaxForm(function(data) {
    if (data.code == 200) {
        alert('添加讲师成功');
    }
})