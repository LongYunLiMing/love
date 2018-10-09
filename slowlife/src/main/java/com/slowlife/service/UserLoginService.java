package com.slowlife.service;

import com.blade.ioc.annotation.Bean;
import com.slowlife.service.interfaces.UserLoginInterface;
import com.slowlife.utils.Conf;
import com.slowlife.utils.Md5Util;
import io.github.biezhi.anima.Anima;
import org.json.JSONObject;
import com.slowlife.table.*;

@Bean
public class UserLoginService implements UserLoginInterface {

    @Override
    public String isName(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("name")){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        String name=jsonObject.getString("name");
        UserTable userTable;
        userTable=Anima.select().from(UserTable.class).where("name=?",name)
                .one();
        if(userTable==null){
            result.put(Conf.MSG,"用户名未注册");
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        result.put(Conf.MSG,Conf.SUCCESS);
        System.out.println("返回数据"+result.toString());
        return result.toString();
    }

    @Override
    public String userLogin(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("name")||!jsonObject.has("password")){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        String name=jsonObject.getString("name");
        String password=Md5Util.getMd5(jsonObject.getString("password"));
        System.out.println("输入密码"+password);
        UserTable userTable=Anima.select("password,id").from(UserTable.class)
                .where("name=?",name).one();
        System.out.println("数据库密码"+userTable.getPassword());
        if(password.equals(userTable.getPassword())){
            result.put(Conf.MSG,Conf.SUCCESS);
            result.put(Conf.RESULT,userTable.getId());
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        result.put(Conf.MSG,"账号/密码不正确");
        System.out.println("返回数据"+result.toString());
        return result.toString();
    }
}
