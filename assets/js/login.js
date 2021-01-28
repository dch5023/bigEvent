$(function() {
    // 从layui中提取form表单模块
    // var form = layui.form;
    //用上面的也行  这里复习一下结构赋值 定义的变量名等于对象里的属性名
    const { form, layer } = layui




    // 1.点击链接进行表单切换
    $('.link a').click(function() {
        $('.layui-form').toggle()
    });
    // 2.校验表单项  使用form之前要从layui中提取form表单模块
    form.verify({
        pass: [
            /^\w{6,12}$/, '密码必须6到12位'
        ],
        samePass: function(value) {
            if (value !== $('#pwd').val()) {
                return '两次密码输入不一致'
            }
        }
    });

    // 3.实现注册功能
    $('.reg—form').submit(function(e) {
        // console.log($(this).serialize());
        // 阻止默认提交行为
        e.preventDefault();
        // 发送ajax请求   $(this).serialize()获取提交的表单域里的内容 返回的是键值对字符串 所以直接当data用 不需要用对象了
        axios.post('/api/reguser', $(this).serialize())
            .then(res => {
                // 这里使用了响应拦截器 设定好了返回.data
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('注册失败')
                } else {
                    $('.reg—form a').click()
                }
            })
    });
    // 4.实现登录功能
    $('.login—form').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault();
        // 发送ajax请求 
        axios.post('/api/login', $(this).serialize())
            .then(res => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                } else {
                    localStorage.setItem('token', res.token);
                    layer.msg('登录成功', {
                        time: 1000
                    }, function() {
                        location.href = './index.html'
                    });

                }
            })
    })



















})