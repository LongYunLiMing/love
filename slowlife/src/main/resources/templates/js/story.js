var id=$.cookie("userID");
var pictureUrl='http://127.0.0.1:9000/';
//id=1;
var page=0;
var commentPage=0;
var replyPage=0;
$(function () {
    //alert("初始化");
    var data={id:String(id),page:page};
    $.ajax({
        type:'get',
        url:pictureUrl+'story/getstory',
        data:{data:JSON.stringify(data)},
        dataType:'text',
        async:true,
        success:function (data) {
            data=JSON.parse(data);
            var msg=data.msg;
            if(msg=='success'){
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
                            '                <img onclick="openPerson('+story.userId+')" class="storyUserPicture" src="'+pictureUrl+story.userPicture+'" alt="用户头像">\n' +
                            '            </div>\n' +
                            '        </div>\n' +//用户头像结尾div
                            '       <div class="name-time-status-type">' +//昵称、时间、状态、类型的总体div
                            '        <div onclick="openPerson('+story.userId+')" class="name">'+story.userName+'</div>\n' +
                            '        <div class="time">'+story.time+'</div>\n' +
                            '    <div class="type-status">\n' +
                            '        <span id="typeID" class="type">'+story.type+'</span>\n' +
                            '        <span id="statusID" class="status">'+story.status+'</span>\n' +
                            '    </div>\n' +
                            '    </div>' +//昵称、时间、状态、类型结尾div
                            '    </div>' +//头像、昵称、时间、状态、类型、两端空白结尾
                            '    <div class="title" onclick="openStory('+story.id+')">'+story.title+'</div>\n' +//标题
                           // '    <div class="content">'+story.content+'</div>\n' +//内容
                            '    </div>' +//上半部分结尾
                            '       <div class="botton">\n' +//下半部分
                            '        <span>\n' +
                            '            <span>点赞<img id="point'+story.id+'" onclick="point('+story.id+')" class="icon" src="http://127.0.0.1:9000/icon/'+story.pointStatus+'.png"></span>\n' +
                            '            <span id="pointCount'+story.id+'">'+story.point+'</span>\n' +
                            '        </span>\n' +
                            '        <span style="margin-left: 10%;margin-right: 10%">\n' +
                            '            <span>浏览</span>\n' +
                            '            <span id="viewCount">0</span>\n' +
                            '        </span>\n' +
                            '        <span>\n' +
                            '            <span>评论<img id="comment'+story.id+'" onclick="comment('+story.id+')" class="icon" src="http://127.0.0.1:9000/icon/comment.png"></span>\n' +
                            '            <span id="commentCount'+story.id+'">'+story.comment+'</span>\n' +
                            '        </span>\n' +
                            '    </div>\n' +//下半部分结尾
                            //'    <button class="openQuestion" onclick="openQuestion('+story.id+')">+</button>\n' +
                            '    <hr class="loveLine" size="3px">\n' +
                            '    <div id="commentShow'+story.id+'" style="display: none">\n' +
                            //'        <div id="show'+story.id+'">'+story.question+'</div>\n' +
                            '        <div>\n' +
                            '            <input type="text" id="input'+story.id+'"><button onclick="setComment('+story.id+')">评论</button>\n' +
                            '        </div>' +
                            '       <div id="show'+story.id+'"></div>' +
                           // '        <button onclick="historyQuestion('+story.id+')">历史问题</button>' +
                            //'        <div id="history'+story.id+'" class="storyHistoryQuestion"></div>' +
                            '        <hr id="line'+story.id+'" class="loveLine" size="3px">\n' +
                            '    </div>' +
                            '</div>';
                        $("#info").before(str);
                    }
                    $("#info").text("加载更多")
                    page+=1;
                }
            }else {
                alert(msg);
            }
        }
    })
})

function point(story) {
    var status=$("#point"+story).attr('src');
    if(status=='http://127.0.0.1:9000/icon/no.png'){
        $("#point"+story).attr('src','http://127.0.0.1:9000/icon/yes.png');
        $("#pointCount"+story).text(parseInt($("#pointCount"+story).text())+1);
    }else {
        $("#point"+story).attr('src','http://127.0.0.1:9000/icon/no.png');
        $("#pointCount"+story).text(parseInt($("#pointCount"+story).text())-1);
    }
        var data={id:String(id),story:String(story)};
        $.ajax({
            type:'get',
            url:pictureUrl+'story/point',
            data:{data:JSON.stringify(data)},
            dataType:'text',
            async:true,
            success:function (data) {
                data=JSON.parse(data);
                var msg=data.msg;
                if(msg=='success'){

                }else {alert(msg);}
            }
        })

}

function comment(story) {
    if($("#commentShow"+story).css("display")=='none'){
        $("#commentShow"+story).css("display",'block');
        $("#show"+story).remove();
        var str='<div id="show'+story+'"></div>';
        $("#line"+story).before(str);
        var content=$("#input"+story).val();
        var data={id:String(id),story:String(story),page:commentPage};
        $.ajax({
            type:'get',
            url:pictureUrl+'story/returncomment',
            data:{data:JSON.stringify(data)},
            dataType:'text',
            async:true,
            success:function (data) {
                data=JSON.parse(data);
                var msg=data.msg;
                var str='';
                if(msg=='success'){
                    var result=data.result;
                    for(var i=0;i<result.length;i++){
                        var comment=result[i];
                        str='<div class="picture-name-time">' +
                            '<div class="commentUserPicture">' +
                            '<div class="commentPictureBox">' +
                            '<img onclick="openPerson('+comment.userId+')" class="picture" src="'+pictureUrl+comment.userPicture+'">' +
                            '</div></div>' +
                            '<div class="name-time">' +
                            '<div class="commentContent"><div onclick="openPerson('+comment.userId+')" class="commentName">'+comment.userName+':</div>'+comment.content+'</div>'+
                            '<div class="commentTime">'+comment.time+'</div>' +
                            '<div class="replyText" onclick="showReply('+comment.id+')">回复</div>' +
                            '<div class="commentPoint">' +
                            '<div class="commentPointBox">' +
                            '<img onclick="commentPoint('+comment.id+')" id="commentIcon'+comment.id+'" class="point" src="'+pictureUrl+'icon/'+comment.userStatus+'.png">' +
                            '</div>' +
                            '<div id="commentPoint'+comment.id+'" class="commentPointCount">'+comment.point+'</div>' +
                            '</div>' +
                            '</div> ' +
                            '</div>' ;
                        if(comment.reply!='0'){
                            str+='<div onclick="getReply('+comment.id+')" class="getReply">查看'+comment.reply+'条回复</div>' +
                                '<div id="reply'+comment.id+'" class="reply">' +
                                '<input class="replyInput" id="commentReply'+comment.id+'" type="text">' +
                                '<button class="replyButton" onclick="setCommentReply('+comment.id+')">评论</button> ' +
                                '<div id="replyShow'+comment.id+'"></div>' +
                                '</div>' +
                                '<hr class="commentLine" id="commentLine'+comment.id+'" size="1">';
                        }else {
                            str+='<div id="reply'+comment.id+'" class="reply">' +
                                '<input class="replyInput" id="commentReply'+comment.id+'" type="text">' +
                                '<button class="replyButton" onclick="setCommentReply('+comment.id+')">评论</button> ' +
                                '<div id="replyShow'+comment.id+'"></div>' +
                                '</div>' +
                                '<hr class="commentLine" id="commentLine'+comment.id+'" size="1">';
                        }
                        $("#show"+story).append(str);
                    }
                }
            }
        })
    }else if($("#commentShow"+story).css("display")=='block'){
        $("#commentShow"+story).css("display",'none');
    }

}

function setComment(story) {
    if(id==''||id==null){
        alert("你还没有登录哦！");
    }else {
        var content=$("#input"+story).val();
        var data={id:String(id),story:String(story),content:content};
        $.ajax({
            type:'get',
            url:pictureUrl+'story/comment',
            data:{data:JSON.stringify(data)},
            dataType:'text',
            async:true,
            success:function (data) {
                data=JSON.parse(data);
                var msg=data.msg;
                var str='';
                if(msg=='success'){
                    var comment=data.result;
                    str='<div class="picture-name-time">' +
                        '<div class="commentUserPicture">' +
                        '<div class="commentPictureBox">' +
                        '<img onclick="openPerson('+comment.userId+')" class="picture" src="'+pictureUrl+comment.userPicture+'">' +
                        '</div></div>' +
                        '<div class="name-time">' +
                        '<div class="commentContent"><div onclick="openPerson('+comment.userId+')" class="commentName">'+comment.userName+':</div>'+comment.content+'</div>'+
                        '<div class="commentTime">'+comment.time+'</div>' +
                        '<div class="replyText" onclick="showReply('+comment.id+')">回复</div>' +
                        '<div class="commentPoint">' +
                        '<div class="commentPointBox">' +
                        '<img onclick="commentPoint('+comment.id+')" id="commentIcon'+comment.id+'" class="point" src="'+pictureUrl+'icon/'+comment.userStatus+'.png">' +
                        '</div>' +
                        '<div id="commentPoint'+comment.id+'" class="commentPointCount">'+comment.point+'</div>' +
                        '</div>' +
                        '</div> ' +
                        '</div>' ;
                    if(comment.reply!='0'){
                        str+='<div onclick="getReply('+comment.id+')" class="getReply">查看'+comment.reply+'条回复</div>' +
                            '<div id="reply'+comment.id+'" class="reply">' +
                            '<input class="replyInput" id="commentReply'+comment.id+'" type="text">' +
                            '<button class="replyButton" onclick="setCommentReply('+comment.id+')">评论</button> ' +
                            '<div id="replyShow'+comment.id+'"></div>' +
                            '</div>' +
                            '<hr class="commentLine" id="commentLine'+comment.id+'" size="1">';
                    }else {
                        str+='<div id="reply'+comment.id+'" class="reply">' +
                            '<input class="replyInput" id="commentReply'+comment.id+'" type="text">' +
                            '<button class="replyButton" onclick="setCommentReply('+comment.id+')">评论</button> ' +
                            '<div id="replyShow'+comment.id+'"></div>' +
                            '</div>' +
                            '<hr class="commentLine" id="commentLine'+comment.id+'" size="1">';
                    }
                   // alert(str);
                    $("#show"+story).prepend(str);
                    $("#input"+story).val('');
                    $("#commentCount"+story).text(parseInt($("#commentCount"+story).text())+1);
                }
            }
        })
    }
}

function openStory(story){
    //alert("故事详情");
    $.cookie('story',story);
    var url=location.href;
    var index=url.lastIndexOf('/');
    var newurl=url.substring(0,index+1);
    newurl+='storyInfo.html';
    //alert("跳转到"+newurl);
    //location.href=newurl;
    window.open(newurl,'_blank');
}
function getReply(comment) {
    var status=$("#reply"+comment).css('display');
    if(status=='none'){
        $("#reply"+comment).css('display','block');
        var data={page:replyPage,comment:String(comment)};
        $.ajax({
            type:'get',
            url:pictureUrl+'story/returnreply',
            data:{data:JSON.stringify(data)},
            dataType:'text',
            async:true,
            success:function (data) {
                data=JSON.parse(data);
                var msg=data.msg;
                if(msg=='success'){
                    var str='';
                    var result=data.result;
                    for(var i=0;i<result.length;i++){
                        var reply=result[i];
                        str='<div class="replyone">' +
                            '<div class="replyPictureBox">' +
                            '<img onclick="openPerson('+reply.userId+')" class="replyPicture" src="'+pictureUrl+reply.userPicture+'"></div>' +
                            '<div class="name-content">' ;
                        if(reply.toUserId!='0'){
                            str+='<div onclick="openPerson('+reply.userId+')" class="replyUserName">'+reply.userName+'</div>' +
                                '<div class="huifu">回复</div>' +
                                '<div onclick="openPerson('+reply.toUserId+')" class="replyUserName">'+reply.toUserName+':</div>' +
                                ''+reply.content+'';
                        }else {
                            str+='<div onclick="openPerson('+reply.userId+')" class="replyUserName">'+reply.userName+':</div>'+reply.content+'';
                        }
                        str+='</div>' +
                            '<div class="replyTime">'+reply.time+'</div> ' +
                            '<div class="replyHuifu" onclick="replyReplyShow('+reply.id+')">回复</div>' +
                            '<div class="replyReplyShow" id="replyReplyShow'+reply.id+'">' +
                            '<input type="text" id="replyReply'+reply.id+'" class="replyReply" placeholder="回复'+reply.userName+'">' +
                            '<button class="replyReplyButton" onclick="replyReply('+reply.id+','+reply.userId+','+comment+')">评论</button>' +
                            '</div>' +
                            '<hr size="1" class="commentLine">' +
                            '</div>';
                        $("#replyShow"+comment).append(str);

                    }
                }
            }
        })
    }else {
        $("#reply"+comment).css('display','none');
        $("#replyShow"+comment).remove();
        var str='<div id="replyShow'+comment+'"></div>';
        $("#reply"+comment).append(str);
    }

}
function showReply(comment) {
    var status=$("#reply"+comment).css('display');
    if(status=='none'){
        $("#reply"+comment).css('display','block');
    }else {
        $("#reply"+comment).css('display','none');
        $("#replyShow"+comment).remove();
        var str='<div id="replyShow'+comment+'"></div>';
        $("#reply"+comment).append(str);
    }
}
function setCommentReply(comment) {
    //alert('回复');
    var content=$("#commentReply"+comment).val();
   // alert(content);
    var data={id:String(id),comment:String(comment),content:content};
    $.ajax({
        type:'get',
        url:pictureUrl+'story/reply',
        data:{data:JSON.stringify(data)},
        dataType:'text',
        async:true,
        success:function (data) {
            data=JSON.parse(data);
            var msg=data.msg;
            if(msg=='success'){
                var reply=data.result;
                str='<div class="replyone">' +
                    '<div class="replyPictureBox">' +
                    '<img onclick="openPerson('+reply.userId+')" class="replyPicture" src="'+pictureUrl+reply.userPicture+'"></div>' +
                    '<div class="name-content">' ;
                if(reply.toUserId!='0'){
                    str+='<div onclick="openPerson('+reply.userId+')" class="replyUserName">'+reply.userName+'</div>' +
                        '<div class="huifu">回复</div>' +
                        '<div onclick="openPerson('+reply.toUserId+')" class="replyUserName">'+reply.toUserName+':</div>' +
                        ''+reply.content+'';
                }else {
                    str+='<div onclick="openPerson('+reply.userId+')" class="replyUserName">'+reply.userName+':</div>'+reply.content+'';
                }
                str+='</div>' +
                    '<div class="replyTime">'+reply.time+'</div> ' +
                    '<div class="replyHuifu" onclick="replyReplyShow('+reply.id+')">回复</div>' +
                    '<div class="replyReplyShow" id="replyReplyShow'+reply.id+'">' +
                    '<input type="text" id="replyReply'+reply.id+'" class="replyReply" placeholder="回复'+reply.userName+'">' +
                    '<button class="replyReplyButton" onclick="replyReply('+reply.id+','+reply.userId+','+comment+')">评论</button>' +
                    '</div>' +
                    '<hr size="1" class="commentLine">' +
                    '</div>';
                $("#replyShow"+comment).prepend(str);
                $("#commentReply"+comment).val('');
            }else {
                alert(msg);
            }
        }
    })
}
function replyReply(input,userId,comment) {//回复评论中的评论
    var content=$("#replyReply"+input).val();
    var data={id:String(id),comment:String(comment),userId:String(userId),content:content};
    $.ajax({
        type:'get',
        url:pictureUrl+'story/reply',
        data:{data:JSON.stringify(data)},
        dataType:'text',
        async:true,
        success:function (data) {
            data=JSON.parse(data);
            var msg=data.msg;
            if(msg=='success'){
                var reply=data.result;
                str='<div class="replyone">' +
                    '<div class="replyPictureBox">' +
                    '<img onclick="openPerson('+reply.userId+')" class="replyPicture" src="'+pictureUrl+reply.userPicture+'"></div>' +
                    '<div class="name-content">' ;
                if(reply.toUserId!='0'){
                    str+='<div onclick="openPerson('+reply.userId+')" class="replyUserName">'+reply.userName+'</div>' +
                        '<div class="huifu">回复</div>' +
                        '<div onclick="openPerson('+reply.toUserId+')" class="replyUserName">'+reply.toUserName+':</div>' +
                        ''+reply.content+'';
                }else {
                    str+='<div onclick="openPerson('+reply.userId+')" class="replyUserName">'+reply.userName+':</div>'+reply.content+'';
                }
                str+='</div>' +
                    '<div class="replyTime">'+reply.time+'</div> ' +
                    '<div class="replyHuifu" onclick="replyReplyShow('+reply.id+')">回复</div>' +
                    '<div class="replyReplyShow" id="replyReplyShow'+reply.id+'">' +
                    '<input type="text" id="replyReply'+reply.id+'" class="replyReply" placeholder="回复'+reply.userName+'">' +
                    '<button class="replyReplyButton" onclick="replyReply('+reply.id+','+reply.userId+','+comment+')">评论</button>' +
                    '</div>' +
                    '<hr size="1" class="commentLine">' +
                    '</div>';
                $("#replyShow"+comment).prepend(str);
                $("#replyReply"+input).val('');
                $("#replyReplyShow"+input).css('display','none');
            }else {
                alert(msg);
            }
        }
    })
}
function replyReplyShow(reply) {
    var status=$("#replyReplyShow"+reply).css('display');
    if(status=='none'){
        $("#replyReplyShow"+reply).css('display','block');
    }else {
        $("#replyReplyShow"+reply).css('display','none');
    }
}
function commentPoint(comment) {
    var data={id:String(id),comment:String(comment)};
    $.ajax({
        type:'get',
        url:pictureUrl+'story/commentpoint',
        data:{data:JSON.stringify(data)},
        dataType:'text',
        async:true,
        success:function (data) {
            data=JSON.parse(data);
            var msg=data.msg;
            if(msg=='success'){
                if($("#commentIcon"+comment).attr('src')==pictureUrl+'icon/no.png'){
                    $("#commentIcon"+comment).attr('src',pictureUrl+'icon/yes.png');
                    var count=$("#commentPoint"+comment).text();
                    count=parseInt(count)+1;
                    $("#commentPoint"+comment).text(count);
                }else {
                    $("#commentIcon"+comment).attr('src',pictureUrl+'icon/no.png');
                    var count=$("#commentPoint"+comment).text();
                    count=parseInt(count)-1;
                    $("#commentPoint"+comment).text(count);
                }

            }
        }
    })
}
function openPerson(userId) {
    var url=location.href;
    var index=url.lastIndexOf('/');
    var newurl=url.substring(0,index+1);
    if(id==null||id==''){
        newurl+='Login.html';
        alert("你还没有登录哦！");
        window.open(newurl,'_blank');
    }else {
        if(id==userId){
            newurl+='userPerson.html';
            window.open(newurl,'_blank');
            return true;
        }
        var data={id:String(id),userId:String(userId)};
        $.ajax({
            type:'get',
            url:pictureUrl+'other/isfriend',
            data:{data:JSON.stringify(data)},
            dataType:'text',
            async:true,
            success:function (data) {
                data=JSON.parse(data);
                var msg=data.msg;
                if(msg=='success'){
                    var result=data.result;
                    if(result=='yes'){
                        $.cookie('otherUserID',userId);
                        newurl+='otherPerson.html';
                        window.open(newurl,'_blank');
                    }else {
                        $.cookie('otherUserID',userId);
                        newurl+='otherQuestion.html';
                        window.open(newurl,'_blank');
                    }
                }else {
                    alert(msg);
                }
            }
        })

    }

}
