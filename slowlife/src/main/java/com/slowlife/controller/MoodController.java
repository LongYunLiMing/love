package com.slowlife.controller;

import com.blade.ioc.annotation.Inject;
import com.blade.mvc.annotation.GetRoute;
import com.blade.mvc.annotation.JSON;
import com.blade.mvc.annotation.Param;
import com.blade.mvc.annotation.Path;
import com.blade.mvc.http.Response;
import com.slowlife.service.MoodService;

import java.awt.geom.RectangularShape;

@Path("mood")
public class MoodController {

    @Inject
    MoodService service;


    @GetRoute("getmood")
    @JSON
    public void getMood(@Param String data, Response response){response.json(service.getMood(data));}


    @GetRoute("returnmoodfromxy")
    @JSON
    public void returnMoodFromXY(@Param String data,Response response){response.json(service.returnMoodFromXY(data));}

}
