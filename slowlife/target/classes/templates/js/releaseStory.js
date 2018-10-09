var pictureUrl='http://127.0.0.1:9000/';
var pUrl=new Array();
var text=1;
var picture=0;
var widthText=80;//记录文本宽度的值0便于文本在显示区时使用，避免不断读值
var leftText=10;//记录文本左边距的值便于文本在显示区时使用，避免不断读值
var edit=true;//是否处于编辑状态，当处于编辑状态时，失去焦点和重新获取焦点是不会增加文本节点的
var isInline=false;//是否出现并行问题，当文本输入框失去焦点且没有值时，宽度选择和高度选择作用于上一个Div,因此当出现上两个Div处于并行状态时要及时调整，宽度和左边距的范围
var isTwoLine=false;//当出现有至少两个Div并行时，需计算最后这个Div的width和left范围
var totalWidth=0;//出现并行时统计该行的宽度
var thisWidth=0;//在显示区内的最后一个Div宽度
var uploadStatus=false;
$(function () {


})
function releaseStory() {//发布故事按钮
    var id=$.cookie("userID");
    //id=1;
    var content=$("#storyShow").html();
    var type=$('input:radio:checked').val();
    var title=$("#title").val();
    var s='';
    //alert(picture);
    for (var i=0;i<picture;i++){
        //alert(pUrl[i]);
        if(i==0){
            s='[{url:"'+pUrl[i]+'"},{url:"';
        }else if (i==picture-1){
            s+=pUrl[i]+'"}]';
        }else {
            s+=pUrl[i]+'"},{url:"';
        }
    }
    //alert(s);
    var data={id:String(id),type:type,title:title,content:content,url:s};
    //alert(data.url);
    $.ajax({
        type:'get',
        url:pictureUrl+'release/story',
        data:{data:JSON.stringify(data)},
        dataType:'text',
        async:true,
        success:function (data) {
            data=JSON.parse(data);
            if (data.msg=='success'){
                alert('发布成功');
            } else {
                alert(data.msg);
            }
        }
    })
}
function textWidth() {
    if(isTwoLine){
        if($("#content").val()==''||$("#content").val()==null){
            $("#text-width-show").text('宽度'+$("#text-width-select").val());
            widthText=parseFloat($("#text-width-select").val());
            var textQ=text-1;
            $("#textDiv"+textQ).css('width',widthText+'%');
            var max=100-totalWidth-widthText+thisWidth;
            // alert('max=100-'+totalWidth+'-'+widthText+'+'+thisWidth+'='+max);
            $("#text-left-select").attr('max',max);
            $("#textDiv"+textQ).css('left',$("#text-left-select").val()+'%');
            $("#text-left-show").text('边距'+$("#text-left-select").val());
            // alert(totalWidth+':'+thisWidth+':'+widthText);
            totalWidth=totalWidth-thisWidth+parseFloat(widthText);
            //alert(totalWidth+'totoal');
            thisWidth=widthText;
        }else {
            $("#text-width-show").text('宽度'+$("#text-width-select").val());
            widthText=$("#text-width-select").val();
            var textQ=text-1;
            $("#textDiv"+textQ).css('width',widthText+'%');
            var max=100-widthText;
            $("#text-left-select").attr('max',max);
            $("#textDiv"+textQ).css('left',$("#text-left-select").val()+'%');
            $("#text-left-show").text('边距'+$("#text-left-select").val());
        }
    }else {
        $("#text-width-show").text('宽度'+$("#text-width-select").val());
        widthText=$("#text-width-select").val();
        var textQ=text-1;
        $("#textDiv"+textQ).css('width',widthText+'%');
        var max=100-widthText;
        $("#text-left-select").attr('max',max);
        $("#textDiv"+textQ).css('left',$("#text-left-select").val()+'%');
        $("#text-left-show").text('边距'+$("#text-left-select").val());
    }

}
function contentInput() {//文本输入事件
    //alert('ceshi');
    var content=$("#content").val();
    content=content.replace(/(\r)*\n/g,"<br/>").replace(/\s/g,"&nbsp;");
    var textQ=text-1;
    $("#textDiv"+textQ).remove();
    var str='<div id="textDiv'+textQ+'" style="position: relative;width: '+widthText+'%;left:'+leftText+'%;background-color: darkred"><p id="textP'+textQ+'">'+content+'</p></div>';
    $("#storyShow").append(str);
}
function contentBlur() {//文本款失去焦点事件，是否删除获取焦点时增加的文本节点
    //alert("文本款失去焦点事件，是否删除获取焦点时增加的文本节点");
    var textQ=text-1;
    var content=$("#textP"+textQ).text();
    if(content==''||content==null){
        var textQ=text-1;
        $("#textDiv"+textQ).remove();
        text--;
        if(isTwoLine){
            var h=90-totalWidth;
            if (h>=0){
                $("#text-left-select").attr('max',90-totalWidth);
            } else {
                $("#text-left-select").attr('max',0);
            }
            $("#text-width-select").attr('max',100-totalWidth+thisWidth);
        }
    }
}
function contentFocus() {//文本框获得焦点事件，文档增加节点
    //alert('获取焦点'+$("#content").val());
    if($("#content").val()==''||$("#content").val()==null){
        //alert('编辑状态');
        var str='<div id="textDiv'+text+'" style="position: relative;width: '+widthText+'%;left:'+leftText+'%;background-color: darkred"><p id="textP'+text+'"></p></div>';
        $("#storyShow").append(str);
        $("#textDiv"+text).css('width','80%');
        $("#textDiv"+text).css('left','10%');
        $("#text-left-select").attr('max',20);
        $("#text-width-select").attr('max',100);
        $("#text-width-select").val(80);
        $("#text-left-select").val(10);
        $("#text-left-show").text('边距'+$("#text-left-select").val());
        $("#text-width-show").text('宽度'+$("#text-width-select").val());
        $("#textDiv"+text).css('width','80%');
        $("#textDiv"+text).css('left','10%');
        widthText=80;
        leftText=10;
        text++;
    }
}
function textLeft() {//文本左边距
    $("#text-left-show").text('边距'+$("#text-left-select").val());
    leftText=$("#text-left-select").val();
    var textQ=text-1;
    $("#textDiv"+textQ).css('left',leftText+'%');
}
function textLine() {//文本独占一行设置
    $("#textLine").attr('class','textLineSelected');
    $("#textInline").attr('class','textInline');
    $("#content").val('');
    var textQ=text-1;
    $("#textDiv"+textQ).css('display','block');
    $("#textDiv"+textQ).css('background-color','chocolate');
    isInline=false;
    isTwoLine=false;
    totalWidth=0;
}
function textInline() {//文本并行设置
    if(text>2){
        var textQQ=text-2;
        if ($("#textDiv"+textQQ).css('display')=='inline-block'){
            var textQ=text-1;
            var thiWidth=parseFloat($("#text-width-select").val())+parseFloat($("#text-left-select").val());
            if(thiWidth>100-totalWidth){
                alert("恕在下难从命，请重新调解合适的宽度和边距吧");
            }else {
                $("#textInline").attr('class','textInlineSelected');0
                $("#textLine").attr('class','textLine');
                edit=true;
                $("#content").val('');
                var textQ=text-1;
                $("#textDiv"+textQ).css('display','inline-block');
                $("#textDiv"+textQ).css('background-color','chocolate');
                $("#text-left-select").val(0);
                $("#textDiv"+textQ).css('left','0%');
                $("#text-left-show").text('边距0');
                $("#text-width-select").attr('max',100-totalWidth);
                //alert('宽度最大值100-'+totalWidth);
                totalWidth+=parseFloat($("#text-left-select").val())+parseFloat($("#text-width-select").val());
                var j=100-totalWidth;
                if(j>=0){
                    $("#text-left-select").attr('max',j);
                }else {
                    $("#text-left-select").attr('max',0);
                }
                isTwoLine=true;
                thisWidth=parseFloat($("#text-width-select").val())+parseFloat($("#text-left-select").val());
            }
        } else {
            $("#textInline").attr('class','textInlineSelected');
            $("#textLine").attr('class','textLine');
            edit=true;
            $("#content").val('');
            var textQ=text-1;
            $("#textDiv"+textQ).css('display','inline-block');
            $("#textDiv"+textQ).css('background-color','chocolate');
            isInline=true;
            isTwoLine=false;
            totalWidth+=parseFloat($("#text-left-select").val())+parseFloat($("#text-width-select").val());
            //alert(totalWidth);
        }
    }else {
        $("#textInline").attr('class','textInlineSelected');
        $("#textLine").attr('class','textLine');
        edit=true;
        $("#content").val('');
        var textQ=text-1;
        $("#textDiv"+textQ).css('display','inline-block');
        $("#textDiv"+textQ).css('background-color','chocolate');
        isInline=true;
        isTwoLine=false;
        totalWidth+=parseFloat($("#text-left-select").val())+parseFloat($("#text-width-select").val());
        //alert(totalWidth);
    }
}
function upload() {
    $.ajax({
        url:'http://127.0.0.1:9000/v1/upload',
        type:'post',
        cache:false,
        data:new FormData($("#upload")[0]),
        processData:false,
        contentType:false,
        async:false
    }).done(function (res) {
        if(res.msg=='success'){
            var result=res.result;
            pUrl[picture]=result;
            //alert('第'+picture+'张图片保存：'+pUrl[picture]);
            uploadStatus=true;
        }else {
            alert("上传失败");
            uploadStatus=false;
        }
    }).fail(function (res) {

    });
}
function uploadPictureP() {//图片普通边框
    upload();
    if(uploadStatus){
        uploadStatus=false;
        if($("#content").val()==''||$("#content").val()==null){
            var str='<div id="textDiv'+text+'" style="position: relative;width: '+widthText+'%;left:'+leftText+'%;background-color: darkred">' +
                '<div id="pictureBox'+picture+'" text="'+text+'" class="pictureBoxP">' +
                '<img id="picture'+picture+'" class="storyPicture" src="'+pictureUrl+pUrl[picture]+'" alt="抱歉图图走丢了！">' +
                '</div></div>';
            $("#storyShow").append(str);
            $("#textDiv"+text).css('width','80%');
            $("#textDiv"+text).css('left','10%');
            $("#text-left-select").attr('max',20);
            $("#text-width-select").attr('max',100);
            $("#text-width-select").val(80);
            $("#text-left-select").val(10);
            $("#text-left-show").text('边距'+$("#text-left-select").val());
            $("#text-width-show").text('宽度'+$("#text-width-select").val());
            $("#textDiv"+text).css('width','80%');
            $("#textDiv"+text).css('left','10%');
            widthText=80;
            leftText=10;
            picture++;
            text++;
        }else {
            alert('请编辑好文字再配图吧！');
        }
    }

}
function uploadPictureZ() {//图片正方形边框
    upload();
    if(uploadStatus){
        if($("#content").val()==''||$("#content").val()==null){
            var str='<div id="textDiv'+text+'" style="position: relative;width: '+widthText+'%;left:'+leftText+'%;background-color: darkred"><div id="pictureBox'+picture+'" text="'+text+'" class="pictureBoxZ"><img id="picture'+picture+'" class="storyPicture" src="'+pictureUrl+pUrl[picture]+'" alt="抱歉图图走丢了！"></div></div>';
            $("#storyShow").append(str);
            $("#textDiv"+text).css('width','80%');
            $("#textDiv"+text).css('left','10%');
            $("#text-left-select").attr('max',20);
            $("#text-width-select").attr('max',100);
            $("#text-width-select").val(80);
            $("#text-left-select").val(10);
            $("#text-left-show").text('边距'+$("#text-left-select").val());
            $("#text-width-show").text('宽度'+$("#text-width-select").val());
            $("#textDiv"+text).css('width','80%');
            $("#textDiv"+text).css('left','10%');
            widthText=80;
            leftText=10;
            picture++;
            text++;
        }else {
            alert('请编辑好文字再配图吧！');
        }
    }
}
function uploadPictureY() {//圆形边框
    upload();
    if(uploadStatus){
        if($("#content").val()==''||$("#content").val()==null){
            var str='<div id="textDiv'+text+'" style="position: relative;width: '+widthText+'%;left:'+leftText+'%;background-color: darkred"><div id="pictureBox'+picture+'" text="'+text+'" class="pictureBoxY"><img id="picture'+picture+'" class="storyPicture" src="'+pictureUrl+pUrl[picture]+'" alt="抱歉图图走丢了！"></div></div>';
            $("#storyShow").append(str);
            $("#textDiv"+text).css('width','80%');
            $("#textDiv"+text).css('left','10%');
            $("#text-left-select").attr('max',20);
            $("#text-width-select").attr('max',100);
            $("#text-width-select").val(80);
            $("#text-left-select").val(10);
            $("#text-left-show").text('边距'+$("#text-left-select").val());
            $("#text-width-show").text('宽度'+$("#text-width-select").val());
            $("#textDiv"+text).css('width','80%');
            $("#textDiv"+text).css('left','10%');
            widthText=80;
            leftText=10;
            picture++;
            text++;
        }else {
            alert('请编辑好文字再配图吧！');
        }
    }
}



