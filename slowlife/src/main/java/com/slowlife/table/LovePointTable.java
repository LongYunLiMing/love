package com.slowlife.table;


import io.github.biezhi.anima.Model;
import io.github.biezhi.anima.annotation.Table;

@Table(name = "love_point_table")
public class LovePointTable extends Model {
    private String id;
    private String loveId;
    private String userId;

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
