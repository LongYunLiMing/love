package com.slowlife.table;


import io.github.biezhi.anima.Model;
import io.github.biezhi.anima.annotation.Table;

@Table(name = "love_comment_table")
public class LoveCommentTable extends Model {
    private String id;
    private String loveId;
    private String userId;
    private String content;
    private int height;
    private String time;
    private int point;
    private int reply;

    public void setReply(int reply) {
        this.reply = reply;
    }

    public int getReply() {
        return reply;
    }

    public void setPoint(int point) {
        this.point = point;
    }

    public int getPoint() {
        return point;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getTime() {
        return time;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getHeight() {
        return height;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }

    public void setLoveId(String loveId) {
        this.loveId = loveId;
    }

    public String getLoveId() {
        return loveId;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }
}
