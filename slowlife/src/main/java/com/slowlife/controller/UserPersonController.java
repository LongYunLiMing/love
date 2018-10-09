package com.slowlife.controller;

import com.blade.ioc.annotation.Inject;
import com.blade.mvc.annotation.GetRoute;
import com.blade.mvc.annotation.JSON;
import com.blade.mvc.annotation.Param;
import com.blade.mvc.annotation.Path;
import com.blade.mvc.http.Response;
import com.slowlife.service.UserPersonService;
import jdk.nashorn.internal.runtime.RecompilableScriptFunctionData;

@Path("person")
public class UserPersonController {

    @Inject
    UserPersonService service;

    @GetRoute("getinfo")
    @JSON
    public void getInfo(@Param String data, Response response){
        response.json(service.getInfo(data));
    }


    @GetRoute("getlove")
    @JSON
    public void getLove(@Param String data,Response response){response.json(service.getLove(data));}


    @GetRoute("getstory")
    @JSON
    public void getStory(@Param String data,Response response){response.json(service.getStory(data));}


    @GetRoute("getmood")
    @JSON
    public void getMood(@Param String data,Response response){response.json(service.getMood(data));}


    @GetRoute("getfriend")
    @JSON
    public void getFriend(@Param String data,Response response){response.json(service.getFriend(data));}


    @GetRoute("getquestion")
    @JSON
    public void getQuestion(@Param String data,Response response){response.json(service.getQuestion(data));}


    @GetRoute("setquestion")
    @JSON
    public void setQuestion(@Param String data,Response response){response.json(service.setQuestion(data));}


    @GetRoute("addquestion")
    @JSON
    public void addQuestion(@Param String data,Response response){response.json(service.addQuestion(data));}


    @GetRoute("deletequestion")
    @JSON
    public void deleteQuestion(@Param String data,Response response){response.json(service.deleteQuestion(data));}


    @GetRoute("deletefriend")
    @JSON
    public void deleteFriend(@Param String data,Response response){response.json(service.deleteFriend(data));}


    @GetRoute("historyquestionfromstory")
    @JSON
    public void historyQuestionFromStory(@Param String data,Response response){response.json(service.historyQuestionFromStory(data));}


    @GetRoute("historyquestionofanswer")
    @JSON
    public void historyQuestionOfAnswer(@Param String data,Response response){response.json(service.historyQuestionOfAnswer(data));}


    @GetRoute("deletemood")
    @JSON
    public void deleteMood(@Param String data,Response response){response.json(service.deleteMood(data));}


    @GetRoute("deletestory")
    @JSON
    public void deleteStory(@Param String data,Response response){response.json(service.deleteStory(data));}
}
