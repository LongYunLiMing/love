package com.slowlife.service.interfaces;

public interface StoryInterFaces {

    String getStory(String data);

    String point(String data);

    String comment(String data);

    String commentPoint(String data);

    String reply(String data);

    String returnComment(String data);

    String returnReply(String data);

    String getStoryOfId(String data);
}
