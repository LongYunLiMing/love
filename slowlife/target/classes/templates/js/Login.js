function isRegisterName() {
    var name=$("#name").val();
    var data={name:name};
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:9000/login/isname',
        data:{data:JSON.stringify(data)},
        dataType:'text',
        async:true,
        success:function (data) {
            data=JSON.parse(data);
            var msg=data.msg;
            if(msg=='用户名未注册'){
                $("#nameinfo").css("display","block");
            }else if(msg=='success'){
                $("#nameinfo").css("display","none");
            }
        }
    })
}
function login() {
    if($("#nameinfo").css("display")!="block"){
        if($("#name").val()!=''&&$("#psw")!=''){
            var name=$("#name").val();
            var psw=$("#psw").val();
            var data={name:name,password:psw};
            $.ajax({
                type:'get',
                url:'http://127.0.0.1:9000/login/login',
                data:{data:JSON.stringify(data)},
                dataType:'text',
                async:true,
                success:function (data) {
                    data=JSON.parse(data);
                    msg=data.msg;
                     if(msg=='success'){
                        result=data.result;
                        $.cookie('userID',result);
                        var url=location.href;
                        var index=url.lastIndexOf('/');
                        var newurl=url.substring(0,index+1);
                        newurl+='userPerson.html';
                        //alert("跳转到"+newurl);
                        location.href=newurl;
                    }else {
                         alert(msg);
                     }
                }
            })
        }else {
            alert("请填写完整信息")
        }
    }else {
        alert("请输入正确的用户名");
    }
}