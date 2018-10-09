var pictureUrl='http://127.0.0.1:9000/';
var page=0;

$(function () {
    var id=$.cookie("userID");
   // id=1;
    var data={id:id};
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:9000/person/getinfo',
        data:{data:JSON.stringify(data)},
        dataType:'text',
        async:true,
        success:function (data) {
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
        url:pictureUrl+'person/getstory',
        data:{data:JSON.stringify(data)},
        dataType:'text',
        async:true,
        success:function (data) {
            data=JSON.parse(data);
            var result=data.result;
            if(result==''||result==null){
                $("#info").text("你还没有发布任何故事内容哦~！");
            }else{
                for(var i=0;i<result.length;i++){
                    var story=result[i];
                    var str='<div id="story'+story.id+'" class="story">\n' +
                        '    <div class="up">\n' +//上半部分div
                        '      <div style="position: relative;width: 100%">' +//头像、昵称、时间、状态、类型、两端空白
                        '       <div class="storyUserPictureE">\n' +//用户头像div
                        '            <div class="storyUserPictureBox">\n' +
                        '                <img class="storyUserPicture" src="'+pictureUrl+story.userPicture+'" alt="用户头像">\n' +
                        '            </div>\n' +
                        '        </div>\n' +//用户头像结尾div
                        '       <div class="name-time-status-type">' +//昵称、时间、状态、类型的总体div
                        '        <div class="name">'+story.userName+'</div>\n' +
                        '        <div class="time">'+story.time+'</div>\n' +
                        '    <div class="type-status">\n' +
                        '        <span id="typeID" class="type">'+story.type+'</span>\n' +
                        '        <span id="statusID" class="status">'+story.status+'</span>\n' +
                        '    </div>\n' +
                        '    </div>' +//昵称、时间、状态、类型结尾div
                        '    <div class="deleteStory" onclick="deleteStory('+story.id+')">' +
                        '    <div style="margin-top: 23%">delete</div>' +
                        '    </div>' +
                        '    </div>' +//头像、昵称、时间、状态、类型、两端空白结尾
                        '    <div class="title">'+story.title+'</div>\n' +//标题
                        '    <div class="content">'+story.content+'</div>\n' +//内容
                        '    </div>' +//上半部分结尾
                        '       <div class="botton">\n' +//下半部分
                        '        <span>\n' +
                        '            <span>点赞<img class="icon" src="http://127.0.0.1:9000/icon/no.png"></span>\n' +
                        '            <span id="pointCount">'+story.point+'</span>\n' +
                        '        </span>\n' +
                        '        <span style="margin-left: 10%;margin-right: 10%">\n' +
                        '            <span>浏览</span>\n' +
                        '            <span id="viewCount">0</span>\n' +
                        '        </span>\n' +
                        '        <span>\n' +
                        '            <span>评论<img class="icon" src="http://127.0.0.1:9000/icon/comment.png"></span>\n' +
                        '            <span id="setCount">'+story.comment+'</span>\n' +
                        '        </span>\n' +
                        '    </div>\n' +//下半部分结尾
                        '    <button class="openQuestion" onclick="openQuestion('+story.id+')">+</button>\n' +
                        '    <hr class="loveLine" size="3px">\n' +
                        '    <div id="question'+story.id+'" style="display: none">\n' +
                        '        <div id="show'+story.id+'">'+story.question+'</div>\n' +
                        '        <div>\n' +
                        '            <input type="text" id="input'+story.id+'"><button onclick="setQuestion('+story.id+')">设置</button>\n' +
                        '        </div>\n' +
                        '        <button onclick="historyQuestion('+story.id+')">历史问题</button>' +
                        '        <div id="history'+story.id+'" class="storyHistoryQuestion"></div>' +
                        '        <hr class="loveLine" size="3px">\n' +
                        '    </div>' +
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
        url:pictureUrl+'person/getstory',
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
                    var story=result[i];
                    var str='<div id="story'+story.id+'" class="story">\n' +
                        '    <div class="up">\n' +//上半部分div
                        '        <div class="storyUserPictureE">\n' +//用户头像div
                        '            <div class="storyUserPictureBox">\n' +
                        '                <img class="picture" src="'+pictureUrl+story.userPicture+'" alt="用户头像">\n' +
                        '            </div>\n' +
                        '        </div>\n' +//用户头像结尾div
                        '       <div class="name-time-status-type">' +//昵称、时间、状态、类型的总体div
                        '        <div class="name">'+story.userName+'</div>\n' +
                        '        <div class="time">'+story.time+'</div>\n' +
                        '    <div class="type-status">\n' +
                        '        <span id="typeID" class="type">'+story.type+'</span>\n' +
                        '        <span id="statusID" class="status">'+story.status+'</span>\n' +
                        '    </div>\n' +
                        '</div>' +//昵称、时间、状态、类型结尾div
                        '    <div class="title">'+story.title+'</div>\n' +//标题
                        '    <div class="content">'+story.content+'</div>\n' +//内容
                        '    </div>' +//上半部分结尾
                        '       <div class="botton">\n' +//下半部分
                        '        <span>\n' +
                        '            <span>点赞<img class="icon" src="http://127.0.0.1:9000/icon/no.png"></span>\n' +
                        '            <span id="pointCount">'+story.point+'</span>\n' +
                        '        </span>\n' +
                        '        <span style="margin-left: 10%;margin-right: 10%">\n' +
                        '            <span>浏览</span>\n' +
                        '            <span id="viewCount">0</span>\n' +
                        '        </span>\n' +
                        '        <span>\n' +
                        '            <span>评论<img class="icon" src="http://127.0.0.1:9000/icon/comment.png"></span>\n' +
                        '            <span id="setCount">'+story.comment+'</span>\n' +
                        '        </span>\n' +
                        '    </div>\n' +//下半部分结尾
                        '    <button class="openQuestion" onclick="openQuestion('+story.id+')">+</button>\n' +
                        '    <hr class="loveLine" size="3px">\n' +
                        '    <div id="question'+story.id+'" style="display: none">\n' +
                        '        <div id="show'+story.id+'">'+story.question+'</div>\n' +
                        '        <div>\n' +
                        '            <input type="text" id="input'+story.id+'"><button onclick="setQuestion('+story.id+')">设置</button>\n' +
                        '        </div>\n' +
                        '        <button onclick="historyQuestion('+story.id+')">历史问题</button>' +
                        '        <div id="history'+story.id+'" style="display: none;text-align: left;background-color: cornsilk;margin-left: 15%;width: 70%"></div>' +
                        '        <hr class="loveLine" size="3px">\n' +
                        '    </div>' +
                        '</div>';
                    $("#info").before(str);
                }
                $("#info").text("加载更多")
                page+=1;
            }
        }
    })
}
function openQuestion(id) {//打开问题
    if($("#question"+id).css("display")=='none'){
        $("#question"+id).css("display",'block');
    }else if($("#question"+id).css("display")=='block'){
        $("#question"+id).css("display",'none');
    }
}
function setQuestion(story) {//设置问题
    var question=$("#input"+story).val();
    var id=$.cookie("userID");
    id="1";
    var data={id:id,story:String(story),question:question};
    $.ajax({
        type:'get',
        url:pictureUrl+'person/setquestion',
        data:{data:JSON.stringify(data)},
        dataType:'text',
        async:true,
        success:function (data) {
            data=JSON.parse(data);
            var msg=data.msg;
            if(msg=='success'){
                $("#show"+story).text(question);
                $("#input"+story).val('');
            }else if(msg=='error'){
                alert(msg);
            }else if(msg=='未登录'){
                alert(msg);
            }
        }
    })
}
function historyQuestion(id) {//加载故事的历史问题
    if($("#history"+id).css("display")=="none"){
        $("#history"+id).css("display","block");
        if($("#history"+id).html()==''||$("#history"+id).html()==null){
            id=String(id);
            var data={story:id};
            $.ajax({
                type:'get',
                url:pictureUrl+'person/historyquestionfromstory',
                data:{data:JSON.stringify(data)},
                dataType:'text',
                async:true,
                success:function (data) {
                    data=JSON.parse(data);
                    var result=data.result;
                    if(result==''||result==null){
                        var str='<div class="historyQuestion" style="margin-left: 15%;margin-top: 3%">你没有设置历史问题哦！！</div>';
                    }else {
                        var str='';
                        for (var i=0;i<result.length;i++){
                            var question=result[i];
                            str='<div style="margin-left: 10%;margin-top: 3%;width: 80%;">' +
                                '<span>' +
                                '<button class="historyQuestionButton" onclick="historyAnswer('+question.id+')">历史回答</button>' +
                                '</span>' +
                                '<span class="historyQuestion">'+question.question+'</span>' +
                                '</div>' +
                                '<div class="Answer" id="answer'+question.id+'"></div>';
                            $("#history"+id).append(str);
                        }
                    }
                }
            })
        }else {

        }
    }else{
        $("#history"+id).css("display","none");
    }
}
function historyAnswer(id) {//历史回答,id是问题的编号不是故事的编号 把回复加载进answerID标签内
    var st=$("#answer"+id).css("display");
    if(st=='none'){
        $("#answer"+id).css("display","block");
        if($("#answer"+id).html()==''||$("#answer"+id).html()==null){
            var data={question:String(id)};
            $.ajax({
                type:'get',
                url:pictureUrl+'person/historyquestionofanswer',
                data:{data:JSON.stringify(data)},
                dataType:'text',
                async:true,
                success:function (data) {
                    data=JSON.parse(data);
                    var msg=data.msg;
                    if(msg=='success'){
                        var result=data.result;
                        var str='';
                        if(result==''||result==null){
                            str='<div style="margin-top: 2%">你的问题还没有任何回复哦！</div>';
                            $("#answer"+id).append(str);
                        }else {
                            for (var i=0;i<result.length;i++){
                                var answer=result[i];
                                str='<div style="margin-top: 2%;">' +
                                    '<div class="picture-status-time-name">' +//头像、状态、时间、昵称
                                    '<div class="answerPictureE">' +//头像区域
                                    '<div class="answer-user-picture-box">' +//回复用户头像盒子
                                    '<img src="'+pictureUrl+answer.userPicture+'" class="answerUserPicture">' +
                                    '</div>' +//回复用户头像盒子结尾
                                    '</div>' +//头像区域结尾
                                    '<div class="status-time-name">' +//状态、时间、昵称
                                    '<div class="answerUserName">'+answer.userName+'</div>' +//昵称
                                    '<div class="status-time">' +//状态、时间
                                    '<span class="answerStatus">'+answer.status+'</span>' +
                                    '<span class="answerTime">'+answer.time+'</span>' +
                                    '</div>' +//状态、时间结尾
                                    '</div>' +//状态、时间、昵称结尾
                                    '</div>' +//头像、状态、时间、昵称
                                    '<div class="answer">'+answer.answer+'</div>' +
                                    '<hr size="2" width="80%" style="margin-left: 10%">' +
                                    '</div>';
                                $("#answer"+id).append(str);
                            }
                        }
                    }
                }
            })
        }
    }else {
        $("#answer"+id).css("display","none");
    }

}

function deleteStory(story) {//storyID
    var data={story:String(story)};
    $.ajax({
        type:'get',
        url:pictureUrl+'person/deletestory',
        data:{data:JSON.stringify(data)},
        dataType:'text',
        asycn:true,
        success:function (data) {
            data=JSON.parse(data);
            var msg=data.msg;
            if(msg=='success'){
                $("#story"+story).remove();
            }else {
                alert(msg);
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