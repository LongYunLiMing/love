$(function(){
    //alert("注册界面初始化");
})
function checkname() {
    //alert("检查用户名是否存在");
    var name=$("#name").val();
    var data={name:name};
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:9000/register/setname',
        data:{data:JSON.stringify(data)},
        dataType:'text',
        async:true,
        success:function (data) {
            data=JSON.parse(data);
            if(data.msg=='用户名已存在'){
                $("#info").css("display","block");
            }else if (data.msg=='success'){
                $("#info").css("display","none");
            }
        }
    })
}
function checkpsw(){
   // alert("确认密码检查");
    var psw=$("#psw").val();
    var repsw=$("#repsw").val();
    if(psw!=repsw){
        $("#pswinfo").css("display","block");
    }else{
        $("#pswinfo").css("display","none");
        $("button").attr("disabled",false);
    }
}
function register() {
    //alert("注册");
    if($("#info").css("display")=="none"&&$("#pswinfo").css("display")=="none"){
        if($("#name").val()!=''&&$("#psw").val()!=''&&$("#repsw").val()!=''){
            $("button").attr("disabled",false);
            var name=$("#name").val();
            var password=$("#psw").val();
            var data={name:name,password:password};
            $.ajax({
                type:'get',
                url:'http://127.0.0.1:9000/register/register',
                data:{data:JSON.stringify(data)},
                dataType:'text',
                async:true,
                success:function (data) {
                    data=JSON.parse(data);
                    if(data.msg=='success'){
                        var id=data.result;
                        $.cookie('userID',id);
                       // alert("cookie测试:"+$.cookie('userID'));
                        var url=location.href;
                        var index=url.lastIndexOf('/');
                        var newurl=url.substring(0,index+1);
                        newurl+='story.html';
                        alert("跳转到"+newurl);
                        location.href=newurl;
                    }else if(data.msg=='error'){

                    }
                }
            })
        }else {
            alert("请填写完整");
        }
    }else {
        alert("请正确填写");
    }
}