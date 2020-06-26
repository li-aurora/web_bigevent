$(function(){
    $('#link_login').on('click',function(){
        $('.reg-box').hide()
        $('.login-box').show()
    })
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
})

var form = layui.form 
form.verify({
    pwd:[
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ],
    repwd:function(value){
        var pwd = $('#form-reg [name=password]').val()
        if(pwd!==value){
            return '密码输入不一致'
        }
    }
})

// 发送ajax请求
$('#form-reg').on('submit',function(e){
    console.log(e)
    e.preventDefault()
    var data = {
        username : $('#form-reg [name=username]').val(),
        password : $('#form-reg [name=password]').val()
    }
    console.log(data)
    $.post('/api/reguser',data,function(res){
        console.log(res)
        if(res.status!==0){
            return layer.msg(res.message)
        }
        layer.msg('注册成功,请登录')
        $('#link_login').click()
    })
})

//监听登录表单事件
$('#form_login').on('submit',function(e){
    e.preventDefault()
    $.ajax({
        type:'post',
        url:'/api/login',
        data:$(this).serialize(),
        success:function(res){
            console.log(res)
            if(res.status!==0){
                return layer.msg('登录失败')
            }
            layer.msg('登录成功!')
            localStorage.setItem('token',res.token)
            location.href = 'http://127.0.0.1:5500/index.html'
        }
    })
})
