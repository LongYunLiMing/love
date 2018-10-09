package com.slowlife.controller;


import com.blade.ioc.annotation.Inject;
import com.blade.mvc.annotation.GetRoute;
import com.blade.mvc.annotation.JSON;
import com.blade.mvc.annotation.Param;
import com.blade.mvc.annotation.Path;
import com.blade.mvc.http.Response;
import com.slowlife.service.ReleaseService;

@Path("release")
public class ReleaseController {

    @Inject
    ReleaseService service;

    @GetRoute("lovereturnid")
    @JSON
    public void ReleaseLoveReturnId(@Param String data, Response response){response.json(service.ReleaseLoveReturnId(data));}

    @GetRoute("saveurlandtext")
    @JSON
    public void ReleaseSaveURLAndText(@Param String data,Response response){response.json(service.ReleaseSaveURLAndText(data));}

    @GetRoute("story")
    @JSON
    public void ReleaseStory(@Param String data,Response response){response.json(service.ReleaseStory(data));}

    @GetRoute("mood")
    @JSON
    public void ReleaseMood(@Param String data,Response response){response.json(service.ReleaseMood(data));}

    @GetRoute("coordinates")
    @JSON
    public void ReleaseCoordinates(@Param String data,Response response){response.json(service.ReleaseCoordinates(data));}

}
