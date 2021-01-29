// 基本资料
$(function() {
    const { layer, form } = layui;



    // 1.页面一加载就获取用户信息
    function initUserInfo() {
        axios.get('/my/userinfo')
            .then(res => {
                // 判断是否获取失败
                if (res.status != 0) {
                    return layer.msg('用户信息获取失败！')
                };
                const { data } = res;
                // 给表单赋值
                // edit-userinfo是给表单的lay-filter属性赋的值
                // data中的属性名和表单里面的表单元素的name值一一兑现
                form.val('edit-userinfo', data)

            })
    };
    initUserInfo();
    // 2.表单验证
    form.verify({
        nick: [
            /^\S{1,6}$/,
            '昵称长度必须在 1 ~ 6 个字符之间！'
        ]
    });
    // 3.提交修改
    $('.base-info-form').submit(function(e) {
        // 阻止默认行为
        e.preventDefault();
        // 发送ajax请求
        axios.post('/my/userinfo', $(this).serialize())
            .then(res => {
                // console.log(res);
                // 判断是否修改失败
                if (res.status != 0) {
                    return layer.msg('修改用户信息失败')
                };
                layer.msg('修改用户信息成功')
                    // 更新页面上的用户信息
                    // window.parent 获取外层窗口的dom元素或者方法，在index.js里面把getUserInfo()从入口函数里提取出来 因为全局下的函数方法才能被window调用
                window.parent.getUserInfo()
            })
    });
    // 4.重置按钮
    $('#reset-btn').click(function(e) {
        // 先禁用layui里重置按钮默认的清空行为
        e.preventDefault();
        // 在重新调用渲染方法
        initUserInfo();

    })






























})