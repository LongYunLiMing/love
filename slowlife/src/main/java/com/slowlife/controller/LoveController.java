package com.slowlife.controller;

import com.blade.ioc.annotation.Inject;
import com.blade.mvc.annotation.GetRoute;
import com.blade.mvc.annotation.JSON;
import com.blade.mvc.annotation.Param;
import com.blade.mvc.annotation.Path;
import com.blade.mvc.http.Response;
import com.slowlife.service.LoveService;

import java.util.ResourceBundle;

@Path("love")
public class LoveController {

    @Inject
    LoveService service;

    @GetRoute("getlove")
    @JSON
    public void getLove(@Param String data, Response response){response.json(service.getLove(data));}


    @GetRoute("point")
    @JSON
    public void point(@Param String data,Response response){response.json(service.point(data));}


    @GetRoute("comment")
    @JSON
    public void comment(@Param String data,Response response){response.json(service.comment(data));}


    @GetRoute("reply")
    @JSON
    public void reply(@Param String data,Response response){response.json(service.reply(data));}


    @GetRoute("commentpoint")
    @JSON
    public void commentPoint(@Param String data,Response response){response.json(service.commentPoint(data));}


    @GetRoute("returncomment")
    @JSON
    public void returnComment(@Param String data,Response response){response.json(service.returnComment(data));}


    @GetRoute("returnreply")
    @JSON
    public void returnReply(@Param String data,Response response){response.json(service.returnReply(data));}
}
