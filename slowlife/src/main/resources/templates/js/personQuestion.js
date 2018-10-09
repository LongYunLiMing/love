var pictureUrl='http://127.0.0.1:9000/';
var page=0;
var id=$.cookie("userID");
$(function () {
    var id=$.cookie("userID");
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
        url:pictureUrl+'person/getquestion',
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
                    var question=result[i];
                    var str='<div class="question" id="question'+question.id+'">' +
                        '<div style="background-color: brown;width: 100%;height: auto;position: relative">' +
                        '<div id="answerQuestion'+question.id+'" class="answer" onclick="answerQuestion('+question.id+')" onmouseover="answerQuestionOver('+question.id+')" onmouseout="answerQuestionOut('+question.id+')">' +
                        '<div style="margin-top: 23%;position: relative;">历史回复</div>' +
                        '</div>' +
                        //'<div class="middle">' +
                        '<div class="questionUserPictureE">' +
                        '    <div class="questionUserPictureBox">\n' +
                        '        <img src="'+pictureUrl+question.userPicture+'" class="picture">\n' +
                        '    </div>\n' +
                        '</div>\n' +
                        '<div class="questionUserInfo">   ' +
                        '<div style="position: absolute;width: 100%;">' +
                        ' <span class="name">'+question.userName+'</span>\n' +
                        '    <span class="text">来自</span>\n' ;
                    if(question.fromStory==''||question.fromStory==null){
                        str+='    <span class="tishi">人生观</span>\n' ;
                    }else {
                        str+='    <span class="tishi">\n' +
                            '        <button onclick="openStory('+question.fromStory+')" class="button">提示</button>\n' +
                            '    </span>\n' ;
                    }

                        str+='</div>' +
                            '<br><br><div class="content">'+question.question+'</div>\n' +
                            '</div>' +
                           // '</div>' +
                            '   <div class="delete" id="deleteQuestion'+question.id+'" onclick="deleteQuestion('+question.id+')" onmouseover="deleteOver('+question.id+')" onmouseout="deleteOut('+question.id+')">' +
                            '       <div style="margin-top: 23%">delete</div>' +
                            '   </div>' +
                            '</div>' +
                            '<div id="answerShow'+question.id+'" class="answerShow"></div>' +
                        '<hr size="5"></div>';
                    $("#info").before(str);
                }
                $("#info").text("加载更多")
                page+=1;
            }
        }
    })
})
function getAnswerCount() {
    var data={id:String(id)};
    $.ajax({
        type:'get',
        url:pictureUrl+''
    })
}
function more() {
    var id=$.cookie("userID");
    var data={id:id,page:page};
    $.ajax({
        type:'get',
        url:pictureUrl+'person/getquestion',
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
                    var str='<div style="text-align: left;background-color: darkmagenta">\n' +
                        '    <span>\n' +
                        '        <img src="'+pictureUrl+question.userPicture+'" class="picture">\n' +
                        '    </span>\n' +
                        '    <span class="name">'+question.userName+'</span>\n' +
                        '    <span class="text">来自</span>\n' ;
                    if(question.fromStory==''||question.fromStory==null){
                        str+='    <span class="button">人生观</span>\n' ;
                    }else {
                        str+='    <span>\n' +
                            '        <button onclick="openStory('+question.fromStory+')" class="button">提示</button>\n' +
                            '    </span>\n' ;
                    }

                    str+='    <div class="content">'+question.question+'</div>\n' +
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
function openAddQuestion() {//打开添加问题
    if($("#addQuestionOfFree").css("display")=="none"){
        $("#addQuestionOfFree").css("display","block");
    }else {
        $("#addQuestionOfFree").css("display","none");
    }
}
function openStory() {//打开提示的故事内容

}
function addQuestion() {//添加问题
    var question=$("#addQuestionInput").val();
    var id=$.cookie("userID");
    //id="1";
    var data={id:id,question:question};
    $.ajax({
        type:'get',
        url:pictureUrl+'person/addquestion',
        data:{data:JSON.stringify(data)},
        dataType:'text',
        async:true,
        success:function (data) {
            data=JSON.parse(data);
            var msg=data.msg;
            if(msg=='success'){
                var str='<div style="text-align: left;background-color: darkmagenta">\n' +
                    '    <span>\n' +
                    '        <img src="'+$("#userPicture").attr('src')+'" class="picture">\n' +
                    '    </span>\n' +
                    '    <span class="name">'+$("#name").text()+'</span>\n' +
                    '    <span class="text">来自</span>\n' +
                    '    <span class="button">人生观</span>\n' +
                    '    <div class="content">'+question+'</div>\n' +
                    '</div>\n' +
                    '<hr size="5">';
                $("#info").before(str);
            }else if(msg=='error'){

            }
        }
    })
}
function deleteQuestion(question) {//删除问题
    var id=$.cookie("userID");
    //id="1";
    var data={id:id,question:String(question)};
    $.ajax({
        type:'get',
        url:pictureUrl+'person/deletequestion',
        data:{data:JSON.stringify(data)},
        dataType:'text',
        async:true,
        success:function (data) {
            data=JSON.parse(data);
            var msg=data.msg;
            if(msg=='success'){
                $("#question"+question).remove();
            }else if(msg=='error'){

            }
        }
    })
}

function deleteOver(question) {//删除问题模块的鼠标进入事件
    $("#deleteQuestion"+question).css("background-color","red");
    //$("#deleteQuestion"+question).text("delete");
}

function deleteOut(question) {//删除问题模块的鼠标移除事件
    $("#deleteQuestion"+question).css("background-color","brown");
    //$("#deleteQuestion"+question).text("");
}
function answerQuestion(question) {//加载问题历史回复
    var st=$("#answerShow"+question).css("display");
    if(st=='none'){
        $("#answerShow"+question).css("display","block");
        if($("#answerShow"+question).html()==''||$("#answerShow"+question).html()==null){
            var data={question:String(question)};
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
                            str='<div style="margin-top: 2%;text-align: center">你的问题还没有任何回复哦！</div>';
                            $("#answerShow"+question).append(str);
                        }else {
                            for (var i=0;i<result.length;i++){
                                var answer=result[i];
                                str='<div style="margin-top: 2%;background-color: lightsteelblue;position: relative">' +
                                    '<div class="answerUp">' +
                                    '<div class="left">' +
                                    '<div class="answerUserPictureBox">' +
                                    '<img src="'+pictureUrl+answer.userPicture+'" class="answerUserPicture">' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="middleAnswer">' +
                                    '<div class="answerUserName">'+answer.userName+'</div>' +
                                    '<div style="width: 210%">' +
                                    '<span class="answerStatus">'+answer.status+'</span>' +
                                    '<span class="answerTime">'+answer.time+'</span>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="answerText">'+answer.answer+'</div>' +
                                    '<hr size="2" width="60%">' +
                                    '</div>';
                                $("#answerShow"+question).append(str);
                            }
                        }
                    }
                }
            })
        }
    }else {
        $("#answerShow"+question).css("display","none");
    }
}
function answerQuestionOver(question) {//历史回复模块显示
    $("#answerQuestion"+question).css("background-color","chocolate");
}
function answerQuestionOut(question) {//历史回复模块隐藏
    $("#answerQuestion"+question).css("background-color","brown");
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