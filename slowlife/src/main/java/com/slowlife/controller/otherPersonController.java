package com.slowlife.controller;


import com.blade.ioc.annotation.Inject;
import com.blade.mvc.annotation.GetRoute;
import com.blade.mvc.annotation.JSON;
import com.blade.mvc.annotation.Param;
import com.blade.mvc.annotation.Path;
import com.blade.mvc.http.Response;
import com.slowlife.service.otherPersonService;

@Path("other")
public class otherPersonController {

    @Inject
    otherPersonService service;

    @GetRoute("isfriend")
    @JSON
    public void isFriend(@Param String data, Response response){response.json(service.isFriend(data));}


    @GetRoute("getotherinfo")
    @JSON
    public void getOtherInfo(@Param String data,Response response){response.json(service.getOtherInfo(data));}


    @GetRoute("getotherstory")
    @JSON
    public void getOtherStory(@Param String data,Response response){response.json(service.getOtherStory(data));}


    @GetRoute("saveanswer")
    @JSON
    public void saveAnswer(@Param String data,Response response){response.json(service.saveAnswer(data));}


    @GetRoute("getpicturename")
    @JSON
    public void getPictureName(@Param String data,Response response){response.json(service.getPictureName(data));}

}
