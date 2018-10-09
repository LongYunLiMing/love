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
        url:pictureUrl+'person/getmood',
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
                    var mood=result[i];
                    var str='<div style="text-align: center" id="mood'+mood.id+'">\n' +
                        '    <div style="position: relative; width: 100%;background-color: brown">\n' +
                        '        <div class="moodUserPictureE">\n' +
                        '           <div class="moodUserPictureBox">' +
                        '            <img src="'+pictureUrl+mood.userPicture+'" class="picture">\n' +
                        '           </div>' +
                        '        </div>\n' +
                        '     <div class="moodInfoContenE">' +
                        '      <div class="moodInfoE">' +
                        '       <div>' +
                        '        <span class="name">'+mood.userName+'</span>\n' +
                        '        <span class="time">'+mood.time+'</span>\n' +
                        '       </div>\n' +
                        '      <div style="margin-top: 2%">\n' +
                        '        <span class="x">'+mood.coordinatesX+'</span>\n' +
                        '        <span class="y">'+mood.coordinatesY+'</span>\n' +
                        '      </div>\n' +
                        '   </div>' +
                        '    <div class="content">'+mood.content+'</div>\n' +
                        '  </div>' +
                        '  <div class="deleteE" onclick="deleteMood('+mood.id+')">' +
                        '<div style="margin-top: 25%">delete</div>' +
                        '</div>' +
                        '</div>' +
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

function more() {
    var id=$.cookie("userID");
    var data={id:id,page:page};
    $.ajax({
        type:'get',
        url:pictureUrl+'person/getmood',
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
                    var mood=result[i];
                    var str='<div style="text-align: center">\n' +
                        '    <div style="position: relative; width: 100%;background-color: brown">\n' +
                        '        <div class="moodUserPictureE">\n' +
                        '           <div class="moodUserPictureBox">' +
                        '            <img src="'+pictureUrl+mood.userPicture+'" class="picture">\n' +
                        '           </div>' +
                        '        </div>\n' +
                        '     <div class="moodInfoContenE">' +
                        '      <div class="moodInfoE">' +
                        '       <div>' +
                        '        <span class="name">'+mood.userName+'</span>\n' +
                        '        <span class="time">'+mood.time+'</span>\n' +
                        '       </div>\n' +
                        '      <div style="margin-top: 2%">\n' +
                        '        <span class="x">'+mood.coordinatesX+'</span>\n' +
                        '        <span class="y">'+mood.coordinatesY+'</span>\n' +
                        '      </div>\n' +
                        '   </div>' +
                        '    <div class="content">'+mood.content+'</div>\n' +
                        '  </div>' +
                        '  <div class="deleteE" onclick="deleteMood('+mood.id+')">' +
                        '<div style="margin-top: 25%">delete</div>' +
                        '</div>' +
                        '</div>' +
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
function deleteMood(mood) {//删除心情记录
    var data={mood:String(mood)};
    $.ajax({
        type:'get',
        url:pictureUrl+'person/deletemood',
        data:{data:JSON.stringify(data)},
        dataType:'text',
        async:true,
        success:function (data) {
            data=JSON.parse(data);
            var msg=data.msg;
            if(msg=='success'){
                $("#mood"+mood).remove();
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