package com.slowlife.service;

import com.blade.ioc.annotation.Bean;
import com.blade.mvc.annotation.JSON;
import com.mysql.cj.exceptions.ClosedOnExpiredPasswordException;
import com.slowlife.bean.MoodBean;
import com.slowlife.service.interfaces.MoodInterfaces;
import com.slowlife.table.UserTable;
import com.slowlife.utils.Conf;
import io.github.biezhi.anima.Anima;
import io.github.biezhi.anima.page.Page;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.List;

@Bean
public class MoodService implements MoodInterfaces {

    @Override
    public String getMood(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("page")){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        int page=jsonObject.getInt("page");
        int first=page*3+1;
        int next=first+2;
        Page<MoodBean> moodBeanPage=Anima.select().from(MoodBean.class)
                .order("id desc").page(first,next);
        List<MoodBean> moodBeans=moodBeanPage.getRows();
        for (MoodBean moodBean:moodBeans){
            UserTable user=Anima.select("name,picture").from(UserTable.class)
                    .byId(moodBean.getUserId());
            moodBean.setUserName(user.getName());
            moodBean.setUserPicture(user.getPicture());
        }
        if(moodBeans==null){
            result.put(Conf.MSG,Conf.NOTMORE);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        result.put(Conf.MSG,Conf.SUCCESS);
        result.put(Conf.RESULT,new JSONArray(moodBeans));
        System.out.println("返回数据"+result.toString());
        return result.toString();
    }

    @Override
    public String returnMoodFromXY(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("x")||!jsonObject.has("y")){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        String x=jsonObject.getString("x");
        String y=jsonObject.getString("y");
        MoodBean moodBean=Anima.select().from(MoodBean.class)
                .where("coordinates_y=?",y).and("coordinates_x=?",x).one();
        if(moodBean==null){
            result.put(Conf.MSG,"无");
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        result.put(Conf.MSG,Conf.SUCCESS);
        result.put(Conf.RESULT,new JSONObject(moodBean));
        System.out.println("返回数据"+result.toString());
        return result.toString();
    }
}
