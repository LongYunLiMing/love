package com.slowlife.bean;

import io.github.biezhi.anima.Model;
import io.github.biezhi.anima.annotation.Ignore;
import io.github.biezhi.anima.annotation.Table;

@Table(name = "story_table")
public class StoryOtherBean extends Model {
    private String id;
    private String userId;
    private String time;
    private String title;
    //private String content;
    private String type;
    private int point;
    private int comment;
   /* @Ignore
    private String questionID;
    private String question;*/
    @Ignore
    private String userName;
    @Ignore
    private String userPicture;
    @Ignore
    private String pointStatus="no";
    @Ignore
    private String collectStatus="collectNo";

    public void setPointStatus(String pointStatus) {
        this.pointStatus = pointStatus;
    }

    public String getPointStatus() {
        return pointStatus;
    }

    public void setCollectStatus(String collectStatus) {
        this.collectStatus = collectStatus;
    }

    public String getCollectStatus() {
        return collectStatus;
    }
    /*public void setQuestionID(String questionID) {
        this.questionID = questionID;
    }

    public String getQuestionID() {
        return questionID;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getQuestion() {
        return question;
    }*/

    public String getUserPicture() {
        return userPicture;
    }

    public void setUserPicture(String userPicture) {
        this.userPicture = userPicture;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setComment(int comment) {
        this.comment = comment;
    }

    public int getComment() {
        return comment;
    }

    public void setPoint(int point) {
        this.point = point;
    }

    public int getPoint() {
        return point;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

    /*public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
*/
    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }


    public void setTime(String time) {
        this.time = time;
    }

    public String getTime() {
        return time;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
