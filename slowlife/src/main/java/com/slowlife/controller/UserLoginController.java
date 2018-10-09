package com.slowlife.controller;

import com.blade.ioc.annotation.Inject;
import com.blade.mvc.annotation.GetRoute;
import com.blade.mvc.annotation.JSON;
import com.blade.mvc.annotation.Param;
import com.blade.mvc.annotation.Path;
import com.blade.mvc.http.Response;
import com.slowlife.service.UserLoginService;

import java.awt.image.RescaleOp;

@Path("login")
public class UserLoginController {

    @Inject
    UserLoginService service;

    @GetRoute("isname")
    @JSON
    public void isName(@Param String data, Response response){
        response.json(service.isName(data));
    }

    @GetRoute("login")
    @JSON
    public void userLogin(@Param String data,Response response){
        response.json(service.userLogin(data));
    }
}
