package com.slowlife.service;
import com.blade.ioc.annotation.Bean;
import com.mysql.cj.exceptions.ClosedOnExpiredPasswordException;
import com.slowlife.bean.QuestionAuditBean;
import com.slowlife.bean.StoryBean;
import com.slowlife.bean.StoryOtherBean;
import com.slowlife.service.interfaces.otherPersonInterface;
import com.slowlife.table.*;
import com.slowlife.utils.Conf;
import com.slowlife.utils.Time;
import io.github.biezhi.anima.Anima;
import io.github.biezhi.anima.page.Page;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.List;

@Bean
public class otherPersonService implements otherPersonInterface {

    @Override
    public String isFriend(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("id")||!jsonObject.has("userId")){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        String userId=jsonObject.getString("id");
        String friendId=jsonObject.getString("userId");
        FriendTable friendTable=Anima.select("id").from(FriendTable.class)
                .where("user_id=?",userId).and("friend_id=?",friendId).one();
        if(friendTable==null){
            result.put(Conf.MSG,Conf.SUCCESS);
            result.put(Conf.RESULT,"no");
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        result.put(Conf.MSG,Conf.SUCCESS);
        result.put(Conf.RESULT,"yes");
        System.out.println("返回数据"+result.toString());
        return result.toString();
    }


    @Override
    public String getOtherInfo(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("id")||!jsonObject.has("userId")){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        String userId=jsonObject.getString("id");
        String friendId=jsonObject.getString("userId");
        if(!userId.equals(friendId)){
            FriendTable friendTable=Anima.select("id").from(FriendTable.class)
                    .where("user_id=?",userId).and("friend_id=?",friendId).one();
            if(friendTable==null){
                result.put(Conf.MSG,"你们还不是好友哦！");
                System.out.println("返回数据"+result.toString());
                return result.toString();
            }
        }
        UserTable user=Anima.select("id,name,picture,story,introduce")
                .from(UserTable.class).byId(friendId);
        if(user==null){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        result.put(Conf.MSG,Conf.SUCCESS);
        result.put(Conf.RESULT,new JSONObject(user));
        System.out.println("返回数据"+result.toString());
        return result.toString();
    }


    @Override
    public String getOtherStory(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("id")||!jsonObject.has("userId")){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        String userId=jsonObject.getString("id");
        String friendId=jsonObject.getString("userId");
        int page=jsonObject.getInt("page");
        int first=page*3+1;
        int next=first+20;
        if(!userId.equals(friendId)){
            FriendTable friendTable=Anima.select("id").from(FriendTable.class)
                    .where("user_id=?",userId).and("friend_id=?",friendId).one();
            if(friendTable==null){
                result.put(Conf.MSG,"你们还不是好友哦！");
                System.out.println("返回数据"+result.toString());
                return result.toString();
            }
        }
        Page<StoryOtherBean> storyBeanPage=Anima.select().from(StoryOtherBean.class)
                .where("status=?",Conf.YES).and("user_id=?",friendId)
                .order("id desc").page(first,next);
        List<StoryOtherBean> storyBeans=storyBeanPage.getRows();
        for(StoryOtherBean storyBean:storyBeans){
            UserTable user=Anima.select("name,picture").from(UserTable.class)
                    .byId(storyBean.getUserId());
            storyBean.setUserName(user.getName());
            storyBean.setUserPicture(user.getPicture());
            StoryPointTable point=Anima.select("id").from(StoryPointTable.class)
                    .where("user_id=?",userId).and("story_id=?",storyBean.getId()).one();
            if(point!=null){
                storyBean.setPointStatus("yes");
            }
            StoryCollectTable collectTable=Anima.select("id").from(StoryCollectTable.class)
                    .where("user_id=?",userId).and("story_id=?",storyBean.getId()).one();
            if(collectTable!=null){
                storyBean.setCollectStatus("collectYes");
            }
        }
        if(storyBeans==null){
            result.put(Conf.MSG,Conf.NOTMORE);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        result.put(Conf.MSG,Conf.SUCCESS);
        result.put(Conf.RESULT,new JSONArray(storyBeans));
        System.out.println("返回数据"+result.toString());
        return result.toString();
    }



    @Override
    public String saveAnswer(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("id")||!jsonObject.has("question")||!jsonObject.has("content")){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        String id=jsonObject.getString("id");
        String question=jsonObject.getString("question");
        String content=jsonObject.getString("content");
        QuestionAuditTable auditTable=new QuestionAuditTable();
        auditTable.setUserId(id);
        auditTable.setQuestionId(question);
        auditTable.setStatus(Conf.UNSEE);
        auditTable.setTime(Time.getTime());
        auditTable.setAnswer(content);
        String re=auditTable.save().asString();
        if(re==null||re==""){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        result.put(Conf.MSG,Conf.SUCCESS);
        System.out.println("返回数据"+result.toString());
        return result.toString();
    }


    @Override
    public String getPictureName(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("id")){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        String id=jsonObject.getString("id");
        UserTable user=Anima.select("picture,name").from(UserTable.class).byId(id);
        if(user==null){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        result.put(Conf.MSG,Conf.SUCCESS);
        result.put(Conf.RESULT,new JSONObject(user));
        System.out.println("返回数据"+result.toString());
        return result.toString();
    }

}
