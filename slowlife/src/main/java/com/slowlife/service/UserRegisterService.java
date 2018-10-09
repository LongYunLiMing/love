package com.slowlife.service;

import com.blade.ioc.annotation.Bean;
import com.slowlife.service.interfaces.UserRegisterInterface;
import com.slowlife.utils.*;
import com.slowlife.table.*;
import io.github.biezhi.anima.Anima;
import org.json.JSONObject;


@Bean
public class UserRegisterService implements UserRegisterInterface {

    @Override
    public String userRegister(String data) {
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("name")|| !jsonObject.has("password")){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        String name=jsonObject.getString("name");
        String password=jsonObject.getString("password");
        password=Md5Util.getMd5(password);
        UserTable user=new UserTable();
        user.setName(name);
        user.setPassword(password);
        user.setLove(0);
        user.setStory(0);
        user.setFriend(0);
        user.setMood(0);
        user.setQuestion(0);
        user.setTime(Time.getTime());
        String i=user.save().asString();
        if(i==null){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        FriendTable friendTable=new FriendTable();
        friendTable.setUserId(i);
        friendTable.setFriendId("0");
        friendTable.setMessage(0);
        friendTable.setTime(Time.getTime());
        friendTable.setName("官方");
        friendTable.save();
        result.put(Conf.MSG,Conf.SUCCESS);
        result.put(Conf.RESULT,i);
        System.out.println("返回数据"+result.toString());
        return result.toString();
    }

    @Override
    public String setName(String data){
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
        userTable=Anima.select().from(UserTable.class)
                .where("name=?",name).one();
        if(userTable==null){
            result.put(Conf.MSG,Conf.SUCCESS);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        result.put(Conf.MSG,"用户名已存在");
        System.out.println("返回数据"+result.toString());
        return result.toString();
    }
}
