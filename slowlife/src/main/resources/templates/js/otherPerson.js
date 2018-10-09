var id=$.cookie("userID");
var otherUserId=$.cookie("otherUserID");
var pictureUrl='http://127.0.0.1:9000/';
var storyPage=0;
var commentPage=0;
var replyPage=0;
$(function () {
   // alert("初始化");
    var data={id:String(id),userId:String(otherUserId)};
    $.ajax({
        type:'get',
        url:pictureUrl+'other/getotherinfo',
        data:{data:JSON.stringify(data)},
        dataType:'text',
        async:true,
        success:function (data) {
            data=JSON.parse(data);
            var msg=data.msg;
            if(msg=='success'){
                var result=data.result;
                $("#picture").attr('src',pictureUrl+result.picture);
                $("#name").text(result.name);
                $("#introduce").text(result.introduce);
                //$("#attention").attr('class',);
                getStory();
            }else {
                alert(msg);
            }
        }
    })
})

function getStory() {
    var data={id:String(id),userId:String(otherUserId),page:storyPage};
    $.ajax({
        type:'get',
        url:pictureUrl+'other/getotherstory',
        data:{data:JSON.stringify(data)},
        dataType:'text',
        async:true,
        success:function (data) {
            data=JSON.parse(data);
            var msg=data.msg;
            if(msg=='success'){
                var result=data.result;
                for(var i=0;i<result.length;i++){
                    var story=result[i];
                    var str='<div id="story'+story.id+'" class="story">\n' +
                        '            <div class="storyUserPictureBox">\n' +
                        '                <img class="storyUserPicture" src="'+pictureUrl+story.userPicture+'">\n' +
                        '            </div>\n' +
                        '            <div class="name-timeE">\n' +
                        '                <div class="storyUserName">\n' +
                        '                    '+story.userName+'\n' +
                        '                </div>\n' +
                        '                <div class="storyTime">\n' +
                        '                    '+story.title+'\n' +
                        '                </div>\n' +
                        '            </div>\n' +
                        '            <div class="storyTitle">'+story.title+'</div>\n' +
                        '            <div class="storyIntroduce">'+story.introduce+'</div>\n' +
                        '            <div class="iconMenu">\n' +
                        '                <div class="iconItem"><!--收藏-->\n' +
                        '                    <div class="iconBox">\n' +
                        '                        <img id="collect'+story.id+'" onclick="collect('+story.id+')" class="icon" src="'+pictureUrl+'icon/'+story.collectStatus+'.png">\n' +
                        '                    </div>\n' +
                        '                    <div id="collectCount'+story.id+'" class="count">'+story.point+'</div>\n' +
                        '                </div>\n' +
                        '                <div class="iconItem iconLine"><!--点赞-->\n' +
                        '                    <div class="iconBox">\n' +
                        '                        <img id="point'+story.id+'" onclick="point('+story.id+')" class="icon" src="'+pictureUrl+'icon/'+story.pointStatus+'.png">\n' +
                        '                    </div>\n' +
                        '                    <div id="pointCount'+story.id+'" class="count">'+story.point+'</div>\n' +
                        '                </div>\n' +
                        '                <div class="iconItem iconLine"><!--转发-->\n' +
                        '                    <div class="iconBox">\n' +
                        '                        <img class="icon" src="http://127.0.0.1:9000/icon/republish.png">\n' +
                        '                    </div>\n' +
                        '                    <div id="forwordCount'+story.id+'" class="count">666</div>\n' +
                        '                </div>\n' +
                        '                <div class="iconItem iconLine"><!--评论-->\n' +
                        '                    <div class="iconBox">\n' +
                        '                        <img onclick="getComment('+story.id+')" class="icon" src="'+pictureUrl+'icon/comment.png">\n' +
                        '                    </div>\n' +
                        '                    <div id="commentCount'+story.id+'" class="count">'+story.comment+'</div>\n' +
                        '                </div>\n' +
                        '            </div>\n' +
                        '            <div id="storyCommentShow'+story.id+'" class="storyCommentShow">\n' +
                        '                <div class="storyCommentEdit">\n' +
                        '                    <input type="text" id="storyCommentInput'+story.id+'" class="commentInput" placeholder="说点什么吧！">\n' +
                        '                    <button onclick="setStoryComment('+story.id+')" class="commentButton">评论</button>\n' +
                        '                </div>\n' +
                        '                <div id="storyComment'+story.id+'" class="storyComment"></div>\n' +
                        '            </div>\n' +
                        '        </div>';
                    $("#up").append(str);
                }
                storyPage++;
            }else {
                alert(msg);
            }
        }
    })
}
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
function collect(story) {//故事收藏功能

}
function getComment(story) {
    if($("#storyCommentShow"+story).css("display")=='none'){
        $("#storyCommentShow"+story).css("display",'block');
        $("#storyComment"+story).remove();
        var str='<div id="storyComment'+story+'"></div>';
        $("#story"+story).append(str);
        var content=$("#storyCommentInput"+story).val();
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
                        $("#storyComment"+story).append(str);
                    }
                }
            }
        })
    }else if($("#storyCommentShow"+story).css("display")=='block'){
        $("#storyCommentShow"+story).css("display",'none');
    }

}

//copy
function setStoryComment(story) {
    if(id==''||id==null){
        alert("你还没有登录哦！");
    }else {
        var content=$("#storyCommentInput"+story).val();
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