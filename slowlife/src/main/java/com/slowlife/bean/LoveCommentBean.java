package com.slowlife.bean;

import io.github.biezhi.anima.Model;
import io.github.biezhi.anima.annotation.Ignore;
import io.github.biezhi.anima.annotation.Table;

@Table(name = "love_table")
public class LoveCommentBean extends Model {
    private String id;
    private String userId;
    private String content;
    private int height;
    private String time;
    private int point;
    private int reply;
    @Ignore
    private String userPicture;
    @Ignore
    private String userName;
    @Ignore
    private String userStatus="no";

    public void setUserStatus(String userStatus) {
        this.userStatus = userStatus;
    }

    public String getUserStatus() {
        return userStatus;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getPoint() {
        return point;
    }

    public String getUserId() {
        return userId;
    }

    public void setPoint(int point) {
        this.point = point;
    }

    public int getReply() {
        return reply;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public void setReply(int reply) {
        this.reply = reply;
    }

    public int getHeight() {
        return height;
    }

    public String getUserName() {
        return userName;
    }

    public String getUserPicture() {
        return userPicture;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setUserPicture(String userPicture) {
        this.userPicture = userPicture;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
