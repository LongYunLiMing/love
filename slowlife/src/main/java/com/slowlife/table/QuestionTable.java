package com.slowlife.table;

import io.github.biezhi.anima.Model;
import io.github.biezhi.anima.annotation.Table;

@Table(name = "question_table")
public class QuestionTable extends Model {
    private String id;
    private String userId;
    private String question;
    private String fromStory;

    public String getFromStory() {
        return fromStory;
    }

    public void setFromStory(String fromStory) {
        this.fromStory = fromStory;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }
}
