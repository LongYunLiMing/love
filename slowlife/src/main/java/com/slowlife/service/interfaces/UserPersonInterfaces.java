package com.slowlife.service.interfaces;

public interface UserPersonInterfaces {

    String getInfo(String data);

    String getLove(String data);

    String getStory(String data);

    String getMood(String data);

    String getFriend(String data);

    String getQuestion(String data);

    String setQuestion(String data);

    String addQuestion(String data);

    String deleteFriend(String data);

    String deleteQuestion(String data);

    String historyQuestionFromStory(String data);

    String historyQuestionOfAnswer(String data);

    String deleteMood(String data);

    String deleteStory(String data);

    String getAnswerCount(String data);
}
