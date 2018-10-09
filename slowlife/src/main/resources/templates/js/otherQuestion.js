var id=$.cookie("userID");
var otherUserId=$.cookie("otherUserID");
var pictureUrl='http://127.0.0.1:9000/';
$(function () {
    $.ajax({
        type:'get',
        url:pictureUrl+'other/getpicturename',
        data:{data:JSON.stringify({id:String(otherUserId)})},
        dataType:'text',
        async:true,
        success:function (data) {
            data=JSON.parse(data);
            var msg=data.msg;
            if(msg=='success'){
                var result=data.result;
                $("#picture").attr('src',pictureUrl+result.picture);
                $("#name").text(result.name);
            }else {
                alert(msg);
            }
        }
    })
    var data={id:String(otherUserId)};
    $.ajax({
        type:'get',
        url:pictureUrl+'person/getquestion',
        data:{data:JSON.stringify(data)},
        dataType:'text',
        async:true,
        success:function (data) {
            data=JSON.parse(data);
            var msg=data.msg;
            if(msg=='success'){
                var result=data.result;
                for(var i=0;i<result.length;i++){
                    var question=result[i];
                    var str='<div id="question'+question.id+'" class="question">\n' +
                        '        <div class="pictureBox">\n' +
                        '            <img class="picture" src="'+pictureUrl+question.userPicture+'">\n' +
                        '        </div>\n' +
                        '        <div class="name">'+question.userName+'</div>\n' ;
                    if(question.fromStory!=null&&question.fromStory!=''){
                        str+='        <div class="info">来自</div>\n' +
                            '        <div class="storyButton" onclick="openStory('+question.fromStory+')"></div>\n' ;
                    }
                    str+=' <div class="questionContent">'+question.question+'</div>\n' +
                        '        <div class="questionAnswer">\n' +
                        '            <textarea id="answer'+question.id+'" cols="59" rows="3" placeholder="赶快来确认下眼神吧！"></textarea>\n' +
                        '        </div>\n' +
                        '        <button onclick="answer('+question.id+')">提交</button>\n' +
                        '    </div>';
                    $("#questionShow").append(str);
                }
            }else {
                alert(msg);
            }
        }
    })
})
function answer(question) {//answerID
    var content=$("#answer"+question).val();
    if(content==null||content==''){
        alert("很抱歉眼神不能为空哦！");
    }else {
        var data={id:String(id),question:String(question),content:content};
        $.ajax({
            type:'get',
            url:pictureUrl+'other/saveanswer',
            data:{data:JSON.stringify(data)},
            dataType:'text',
            async:true,
            success:function (data) {
                data=JSON.parse(data);
                var msg=data.msg;
                if(msg=='success'){
                    $("#question"+question).remove();
                }else {
                    alert(msg);
                }
            }
        })
    }

}
function openStory(story) {
    $.cookie('story',story);
    var url=location.href;
    var index=url.lastIndexOf('/');
    var newurl=url.substring(0,index+1);
    newurl+='storyInfo.html';
    window.open(newurl,'_blank');
}