var pictureUrl='http://127.0.0.1:9000/';
var commentStatus=false;
var story=$.cookie('story');
//var id=1;
var page=0;
var commentOne=1;
$(function () {
    //lert("初始化");
    var data={story:String(story)};
    $.ajax({
        type:'get',
        url:pictureUrl+'story/getstoryofid',
        data:{data:JSON.stringify(data)},
        dataType:'text',
        async:true,
        success:function (data) {
            data=JSON.parse(data);
            var msg=data.msg;
            if(msg=='success'){
                var result=data.result;
                $("#name").text(result.userName);
                $("#time").text(result.time);
                $("#title").text(result.title);
                $("#contentShow").append(result.content);
                $("#picture").attr('src',pictureUrl+result.userPicture);
            }else {
                alert(msg);
            }
        }
    })
})
function comment() {
    //alert('评论显示');
    if(commentStatus){
        $("#info").css('margin-left','10%');
        $("#comment").css('margin-left','10%');
        $("#title").css('left','25%');
        $("#contentShow").css('margin-left','25%');
        $("#commentE").css('left','-50%');
        commentStatus=false;
    }else {
        $("#info").css('margin-left','50%');
        $("#comment").css('margin-left','50%');
        $("#title").css('left','65%');
        $("#contentShow").css('margin-left','65%');
        $("#commentE").css('left','0%');
        commentStatus=true;

        if(page==0){
            var data={story:String(story),page:page};
            $.ajax({
                type:'get',
                url:pictureUrl+'story/returncomment',
                data:{data:JSON.stringify(data)},
                dataType:'text',
                async:true,
                success:function (data) {
                    data=JSON.parse(data);
                    var msg=data.msg;
                    if(msg=='success'){
                        page++;
                        var result=data.result;
                        var str='';
                        for(var i=1;i<result.length;i++){
                            var comment=result[i];
                            if(comment.height=='1'){

                                str='<div id="comment'+comment.id+'" class="comment-top">\n' +
                                    '                    <div class="commentLeft-top">\n' +
                                    '                        <div id="floor'+comment.id+'" class="floor-one">\n' +
                                    '                            <div class="commentPictureBox"><img class="commentPicture" src="'+pictureUrl+comment.userPicture+'"></div>\n' +
                                    //'                            <div class="commentHeight">'+comment.height+'</div>\n' +
                                    '                        </div>\n' +
                                    '                    </div>\n' +
                                    '                    <div class="commentRight-top">\n' +
                                    '                        <div class="commentName">'+comment.userName+'</div>\n' +
                                    '                        <div class="commentTime">'+comment.time+'</div>\n' +
                                    '                        <div class="commentContentTop">'+comment.content+'</div>\n' +
                                    '                    </div>\n' +
                                    '                </div>';
                                $("#commentShow").append(str);
                            }else {
                                str='<div id="comment'+comment.id+'" class="comment-left-right" style="width: 100%">\n' +
                                    '                    <div id="left-top'+comment.height+'" class="commentLeft">\n' +
                                    '                        <div id="floor'+comment.height+'" class="floor">\n' +
                                    '                            <div class="commentPictureBox"><img class="commentPicture" src="'+pictureUrl+comment.userPicture+'"></div>\n' +
                                    // '                            <div class="commentHeight">'+comment.height+'</div>\n' +
                                    '                        </div>\n' +
                                    '                    </div>\n' +
                                    '                    <div id="right-top'+comment.height+'" class="commentRight">\n' +
                                    '                        <div class="commentName">'+comment.userName+'</div>\n' +
                                    '                        <div class="commentTime">'+comment.time+'</div>\n' +
                                    '                        <div id="content'+comment.height+'" class="commentContent">'+comment.content+'</div>\n' +
                                    '                    </div>\n' +
                                    '                </div>';
                                $("#commentShow").append(str);
                            }
                        }
                    }
                }
            })
        }
    }
}
function setComment() {//发表评论
    var content=$("#input").val();
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
            if(msg=='success'){
                var comment=data.result;
                $("#floor"+commentOne).attr('class','floor');
                $("#content"+commentOne).attr('class','commentContent');
                $("#right-top"+commentOne).attr('class','commentRight');
                $("#left-top"+commentOne).attr('class','commentLeft');
                $("#comment"+commentOne).attr('class','comment-left-right');
                var str='<div id="comment'+comment.id+'" class="comment-top">\n' +
                    '                    <div class="commentLeft-top">\n' +
                    '                        <div id="floor'+comment.id+'" class="floor-one">\n' +
                    '                            <div class="commentPictureBox"><img class="commentPicture" src="'+pictureUrl+comment.userPicture+'"></div>\n' +
                    //'                            <div class="commentHeight">'+comment.height+'</div>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                    <div class="commentRight-top">\n' +
                    '                        <div class="commentName">'+comment.userName+'</div>\n' +
                    '                        <div class="commentTime">'+comment.time+'</div>\n' +
                    '                        <div class="commentContentTop">'+comment.content+'</div>\n' +
                    '                    </div>\n' +
                    '                </div>';
                commentOne=comment.height;
                $("#commentShow").prepend(str);
            }else {
                alert(msg);
            }
        }
    })
}