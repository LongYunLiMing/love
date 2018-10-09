var pictureUrl='http://127.0.0.1:9000/';
var page=0;
$(function () {
    var id=$.cookie("userID");
    //id="1";
    var data={id:id};
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:9000/person/getinfo',
        data:{data:JSON.stringify(data)},
        dataType:'text',
        async:true,
        success:function (data) {
            //alert(data);
            data=JSON.parse(data);
            var msg=data.msg;
            if(msg=='error'){
                var url=location.href;
                var index=url.lastIndexOf('/');
                var newurl=url.substring(0,index+1);
                newurl+='Login.html';
                alert("跳转到"+newurl);
                location.href=newurl;
            }else if(msg=='success'){
                var result=data.result;
                $("#name").text(result.name);
                $("#userPicture").attr('src',pictureUrl+result.picture);
                $("#userText").text(result.introduce);
                $("#love").text("("+result.love+")");
                $("#story").text("("+result.story+")");
                $("#mood").text("("+result.mood+")");
                $("#friend").text("("+result.friend+")");
                $("#question").text("("+result.question+")");
                $("#message").text(result.message);
            }
        }
    })
    var data={id:id,page:page};
    $.ajax({
        type:'get',
        url:pictureUrl+'person/getfriend',
        data:{data:JSON.stringify(data)},
        dataType:'text',
        async:true,
        success:function (data) {
            data=JSON.parse(data);
            var result=data.result;
            if(result==''||result==null){
                $("#info").text("你还没有发布任何心情内容哦~！");
            }else{
                for(var i=0;i<result.length;i++){
                    var friend=result[i];
                    var str='<div id="friend'+friend.friendId+'" style="width: 100%">' +
                        '<div class="pictureNameIntroduce">\n' +
                        '<div class="userSession" onclick="openSession('+friend.friendId+')"><div style="margin-top: 25%">session</div></div>' +
                        '    <div class="userPictureE">' +
                        '    <div class="userPictureBox">\n' +
                        '        <img src="'+pictureUrl+friend.friendPicture+'" alt="该用户还没有上传头像呢！" class="picture">\n' +
                        '    </div>' +
                        '</div>\n' +
                        '    <div class="userInfoE">\n' +
                        '        <div class="name">'+friend.name+'</div>\n' +
                        '        <div class="introduce">'+friend.introduce+'</div>\n' +
                        '    </div>\n' +
                        '<div class="friendDelete" onclick="deleteFriend('+friend.friendId+')"><div style="margin-top: 25%">delete</div></div>' +
                        '</div>\n' +
                        '<hr size="5">' +
                        '</div>';
                    $("#info").before(str);
                }
                $("#info").text("加载更多")
                page+=1;
            }
        }
    })
})

function more() {
    var id=$.cookie("userID");
    var data={id:id,page:page};
    $.ajax({
        type:'get',
        url:pictureUrl+'person/getfriend',
        data:{data:JSON.stringify(data)},
        dataType:'text',
        async:true,
        success:function (data) {
            data=JSON.parse(data);
            var result=data.result;
            if(result==''||result==null){
                $("#info").text("没有更多了哦！");
            }else{
                for(var i=0;i<result.length;i++){
                    var friend=result[i];
                    var str='<div style="text-align: left;background-color: darkmagenta" onclick="openSession('+friend.friendId+')"><!--单个心情内容-->\n' +
                        '    <div style="display: inline-block">\n' +
                        '        <img src="'+pictureUrl+friend.friendPicture+'" alt="该用户还没有上传头像呢！" class="picture">\n' +
                        '    </div>\n' +
                        '    <div style="display: inline-block;margin-left: 30%">\n' +
                        '        <div class="name">'+friend.name+'</div>\n' +
                        '        <div class="introduce">'+friend.introduce+'</div>\n' +
                        '    </div>\n' +
                        '</div>\n' +
                        '<hr size="5">';
                    $("#info").before(str);
                }
                $("#info").text("加载更多")
                page+=1;
            }
        }
    })
}
function openSession(friend) {//打开会话
    alert("打开会话"+friend);
}
function deleteFriend(friend) {//解除好友关系 friendID
    var id=$.cookie("userID");
    //id="1";
    var data={id:id,friend:String(friend)};
    $.ajax({
        type:'get',
        url:pictureUrl+'person/deletefriend',
        data:{data:JSON.stringify(data)},
        dataType:'text',
        async:true,
        success:function (data) {
            data=JSON.parse(data);
            var msg=data.msg;
            if(msg=='success'){
                $("#friend"+friend).remove();
            }else {

            }
        }
    })
}
function openRelease() {//发布界面开关releaseE\openRelease
    var status=$("#releaseE").css("display");
    if(status=='none'){
        $("#releaseE").css("display","block");
        $("#openRelease").attr("class","openReleaseafter")
    }else{
        $("#releaseE").css("display","none");
        $("#openRelease").attr("class","openRelease")
    }
}