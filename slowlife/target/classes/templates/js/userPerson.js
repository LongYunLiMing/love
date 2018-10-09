var pictureUrl='http://127.0.0.1:9000/';
var page=0;
$(function () {
    var id=$.cookie("userID");
    //id='1';
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
            if(msg=='未登录'){
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
        url:pictureUrl+'person/getlove',
        data:{data:JSON.stringify(data)},
        dataType:'text',
        async:true,
        success:function (data) {
            //alert(data);
            data=JSON.parse(data);
            var result=data.result;
            if(result==''||result==null){
                $("#info").text("你还没有发布任何表白内容哦~！");
            }else{
                var str='';
                for (var i=0;i<result.length;i++){
                    var love=result[i];
                    str='';
                    str+='<div style="text-align: center;margin: auto">\n' +
                        '    <div>\n' +
                        '        <a style="margin-right: 20%">\n' +
                        '            <span>\n' +
                        '                <img id="pictureID" class="picture" src="'+pictureUrl+love.userPicture+'" alt="用户头像">\n' +
                        '            </span>\n' +
                        '            <span id="nameID" class="name">'+love.userName+'</span>\n' +
                        '        </a>\n' +
                        '        <span>---'+love.time+'---</span>\n'  ;
                                    if(love.toUserId!='0'||love.toUserId!=0){
                                        str+='        <a href="'+pictureUrl+'otherPerson.html?id='+love.toUserId+'">\n'+
                                            '<span>\n' +
                                        '                <img id="topictureID" class="topicture" src="'+pictureUrl+love.toUserPicture+'" alt="对象用户头像">\n' +
                                        '            </span>\n' +
                                        '            <span id="tonameID" class="name">'+love.toUserName+'</span>\n'+
                                            '        </a>\n';
                                    }
                         str+='    </div>\n' +
                        '    <div style="margin-top: 20px">\n' +
                        '        <span id="typeID" class="type">'+love.type+'</span>\n' +
                        '        <span id="statusID" class="status">'+love.status+'</span>\n' +
                        '    </div>\n' +
                       // '    <div style="text-align: center" >'+
                        '    <div id="titleID" class="title" onclick="getLoveInfo('+love.id+')">'+love.title+'</div>\n' +
                        '    <div id="contentID" class="content">'+love.content+'</div>\n' +
                       //      '</div>' +
                        '    <div style="text-align: center;margin-top: 80px">\n' +
                        '        <span>\n' +
                        '            <span>点赞<img class="icon" src="http://127.0.0.1:9000/icon/no.png"></span>\n' +
                        '            <span id="pointID">'+love.point+'</span>\n' +
                        '        </span>\n' +
                        '        <span style="margin-left: 10%;margin-right: 10%">\n' +
                        '            <span>浏览</span>\n' +
                        '            <span id="viewID">0</span>\n' +
                        '        </span>\n' +
                        '        <span>\n' +
                        '            <span>评论<a href="" id="commentURLID"><img class="icon" src="http://127.0.0.1:9000/icon/comment.png"></a></span>\n' +
                        '            <span id="commentID">'+love.comment+'</span>\n' +
                        '        </span>\n' +
                        '    </div>\n' +
                        '    <hr class="loveLine" size="3px">\n' +
                        '</div>';
                    $("#info").before(str);
                }
                $("#info").text("加载更多")
                page+=1;
            }
        }
    })
})
function getLoveInfo(id) {
    alert("进入详情界面");
}
function more() {
    var id=$.cookie("userID");
    var data={id:id,page:page};
    $.ajax({
        type:'get',
        url:pictureUrl+'person/getlove',
        data:{data:JSON.stringify(data)},
        dataType:'text',
        async:true,
        success:function (data) {
            data=JSON.parse(data);
            var result=data.result;
            if(result==''||result==null){
                $("#info").text("没有更多了哦！");
            }else{
                var str='';
                for (var i=0;i<result.length;i++){
                    var love=result[i];
                    str='';
                    str+='<div style="text-align: center;margin: auto">\n' +
                        '    <div>\n' +
                        '        <a style="margin-right: 20%">\n' +
                        '            <span>\n' +
                        '                <img id="pictureID" class="picture" src="'+pictureUrl+love.userPicture+'" alt="用户头像">\n' +
                        '            </span>\n' +
                        '            <span id="nameID" class="name">'+love.userName+'</span>\n' +
                        '        </a>\n' +
                        '        <span>---'+love.time+'---</span>\n'  ;
                    if(love.toUserId!='0'||love.toUserId!=0){
                        str+='        <a href="'+pictureUrl+'otherPerson.html?id='+love.toUserId+'">\n'+
                            '<span>\n' +
                            '                <img id="topictureID" class="topicture" src="'+pictureUrl+love.toUserPicture+'" alt="对象用户头像">\n' +
                            '            </span>\n' +
                            '            <span id="tonameID" class="name">'+love.toUserName+'</span>\n'+
                            '        </a>\n';
                    }
                    str+='    </div>\n' +
                        '    <div style="margin-top: 20px">\n' +
                        '        <span id="typeID" class="type">'+love.type+'</span>\n' +
                        '        <span id="statusID" class="status">'+love.status+'</span>\n' +
                        '    </div>\n' +
                        // '    <div style="text-align: center" >'+
                        '    <div id="titleID" class="title" onclick="getLoveInfo('+love.id+')">'+love.title+'</div>\n' +
                        '    <div id="contentID" class="content">'+love.content+'</div>\n' +
                        //      '</div>' +
                        '    <div style="text-align: center;margin-top: 80px">\n' +
                        '        <span>\n' +
                        '            <span>点赞<img class="icon" src="http://127.0.0.1:9000/icon/no.png"></span>\n' +
                        '            <span id="pointID">'+love.point+'</span>\n' +
                        '        </span>\n' +
                        '        <span style="margin-left: 10%;margin-right: 10%">\n' +
                        '            <span>浏览</span>\n' +
                        '            <span id="viewID">0</span>\n' +
                        '        </span>\n' +
                        '        <span>\n' +
                        '            <span>评论<a href="" id="commentURLID"><img class="icon" src="http://127.0.0.1:9000/icon/comment.png"></a></span>\n' +
                        '            <span id="commentID">'+love.comment+'</span>\n' +
                        '        </span>\n' +
                        '    </div>\n' +
                        '    <hr class="loveLine" size="3px">\n' +
                        '</div>';
                    $("#info").before(str);
                }
                $("#info").text("加载更多")
                page+=1;
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
