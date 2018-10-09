var pictureUrl='http://127.0.0.1:9000/';
function blurX() {
    var x = $("#x").val();
    var y = $("#y").val();
    if (x != '' && x != null) {
        if (y != '' && y != null) {
            var data = {x: x, y: y};
            $.ajax({
                type: 'get',
                url: pictureUrl + 'release/coordinates',
                data: {data: JSON.stringify(data)},
                dataType: 'text',
                async: true,
                success: function (data) {
                    data = JSON.parse(data);
                    var msg = data.msg;
                    if (msg == 'success') {
                        $("#info").css('display', 'none');
                    } else {
                        $("#info").css('display', 'block');
                    }
                }
            })
        }
    }
}
function blurY() {
    var x = $("#x").val();
    var y = $("#y").val();
    if (x != '' && x != null) {
        if (y != '' && y != null) {
            var data = {x: x, y: y};
            //alert('y失去焦点'+x+':'+y);
            $.ajax({
                type: 'get',
                url: pictureUrl + 'release/coordinates',
                data: {data: JSON.stringify(data)},
                dataType: 'text',
                async: true,
                success: function (data) {
                    //alert(data);
                    data = JSON.parse(data);
                    var msg = data.msg;
                    if (msg == 'success') {
                        $("#info").css('display', 'none');
                    } else {
                        $("#info").css('display', 'block');
                    }
                }
            })
        }
    }
}
function buttonClick() {
    //alert('点击了button');
    var id = $.cookie("userID");
    //id = 1;
    var x = $("#x").val();
    var y = $("#y").val();
    var status = $("#info").css('display');
    //alert(status);
    var content = $("#content").val();
    var data = {id: String(id), x: x, y: y, content: content};
    if (status != 'none') {
        if (x != '' && x != null || y != '' && y != null) {
            if (content != '' && content != null) {
                $.ajax({
                    type: 'get',
                    url: pictureUrl + 'release/mood',
                    data: {data: JSON.stringify(data)},
                    dataType: 'text',
                    async: true,
                    success: function (data) {
                        data = JSON.parse(data);
                        var msg = data.msg;
                        if (msg == 'success') {
                            alert('发布成功');
                        } else {
                            alert('发布失败');
                        }
                    }
                })
            } else {
                alert('小主还没有告诉我你的秘密呢！');
            }
        } else {
            alert('坐标不能为空哦！');
        }
    } else {
        alert('请选择合适的坐标后再biu吧！');
    }
}
