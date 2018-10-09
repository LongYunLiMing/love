package com.slowlife.controller;

import com.blade.ioc.annotation.Inject;
import com.blade.mvc.annotation.GetRoute;
import com.blade.mvc.annotation.JSON;
import com.blade.mvc.annotation.Param;
import com.blade.mvc.annotation.Path;
import com.blade.mvc.http.Response;
import com.slowlife.service.UserRegisterService;

@Path("register")
public class UserRegisterController {

    @Inject
    UserRegisterService service;

    @GetRoute("setname")
    @JSON
    public void setName(@Param String data, Response response){
        response.json(service.setName(data));
    }

    @GetRoute("register")
    @JSON
    public void userRegister(@Param String data,Response response){
        response.json(service.userRegister(data));
    }
}
