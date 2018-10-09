package com.slowlife.bean;

import io.github.biezhi.anima.Model;
import io.github.biezhi.anima.annotation.Ignore;
import io.github.biezhi.anima.annotation.Table;

@Table(name = "friend_table")
public class FriendBean extends Model {
    private String id;
    private String friendId;
    private String name;
    @Ignore
    private String friendPicture;
    @Ignore
    private String introduce;

    public void setIntroduce(String introduce) {
        this.introduce = introduce;
    }

    public String getIntroduce() {
        return introduce;
    }

    public String getFriendPicture() {
        return friendPicture;
    }

    public void setFriendPicture(String friendPicture) {
        this.friendPicture = friendPicture;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFriendId() {
        return friendId;
    }

    public void setFriendId(String friendId) {
        this.friendId = friendId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
