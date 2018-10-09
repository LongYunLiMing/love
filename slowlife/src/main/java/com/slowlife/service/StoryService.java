package com.slowlife.service;

import com.blade.ioc.annotation.Bean;
import com.slowlife.service.interfaces.StoryInterFaces;
import com.slowlife.table.*;
import com.slowlife.utils.Conf;
import com.slowlife.bean.*;
import com.slowlife.utils.Time;
import com.sun.codemodel.internal.fmt.JStaticJavaFile;
import io.github.biezhi.anima.Anima;
import io.github.biezhi.anima.page.Page;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.StringReader;
import java.util.List;

@Bean
public class StoryService implements StoryInterFaces {

    @Override
    public String getStory(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("id")||!jsonObject.has("page")){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        String id=jsonObject.getString("id");
        int page=jsonObject.getInt("page");
        int first=page*3+1;
        int next=first+20;
        if(id==null||id==""){
            Page<StoryBean> storyBeanPage=Anima.select().from(StoryBean.class).where("status=?",Conf.YES)
                    .order("id desc").page(first,next);
            List<StoryBean> storyBeans=storyBeanPage.getRows();
            for(StoryBean storyBean:storyBeans){
                UserTable user=Anima.select("name,picture").from(UserTable.class)
                        .byId(storyBean.getUserId());
                storyBean.setUserName(user.getName());
                storyBean.setUserPicture(user.getPicture());
            }
        }
        Page<StoryBean> storyBeanPage=Anima.select().from(StoryBean.class).where("status=?",Conf.YES)
                .order("id desc").page(first,next);
        List<StoryBean> storyBeans=storyBeanPage.getRows();
        for(StoryBean storyBean:storyBeans){
            UserTable user=Anima.select("name,picture").from(UserTable.class)
                    .byId(storyBean.getUserId());
            storyBean.setUserName(user.getName());
            storyBean.setUserPicture(user.getPicture());
            StoryPointTable point=Anima.select("id").from(StoryPointTable.class)
                    .where("user_id=?",id).and("story_id=?",storyBean.getId()).one();
            if(point!=null){
                storyBean.setPointStatus("yes");
            }
            StoryCollectTable collect=Anima.select("id").from(StoryCollectTable.class)
                    .where("user_id=?",id).and("story_id=?",storyBean.getId()).one();
            if(collect!=null){
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
    public String point(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("id")||!jsonObject.has("story")){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        if(jsonObject.getString("id")==null||jsonObject.getString("id")==""){
            result.put(Conf.MSG,Conf.UNLOGGED);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        String id=jsonObject.getString("id");
        String story=jsonObject.getString("story");
        StoryPointTable pointTable=Anima.select().from(StoryPointTable.class)
                .where("user_id=?",id).and("story_id=?",story).one();
        if(pointTable!=null){
            int i=Anima.delete().from(StoryPointTable.class).deleteById(pointTable.getId());
            if(i==1){
                StoryTable storyTable=Anima.select("point").from(StoryTable.class).byId(story);
                int o=Anima.update().from(StoryTable.class).set("point",storyTable.getPoint()-1).updateById(story);
                if(o!=1){
                    result.put(Conf.MSG,Conf.ERROR);
                    System.out.println("返回数据"+result.toString());
                    return result.toString();
                }
                result.put(Conf.MSG,Conf.SUCCESS);
                System.out.println("返回数据"+result.toString());
                return result.toString();
            }else {
                result.put(Conf.MSG,Conf.ERROR);
                System.out.println("返回数据"+result.toString());
                return result.toString();
            }
        }
        StoryPointTable point=new StoryPointTable();
        point.setUserId(id);
        point.setStoryId(story);
        String re=point.save().asString();
        if(re==null||re==""){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        StoryTable storyTable=Anima.select("point").from(StoryTable.class).byId(story);
        int o=Anima.update().from(StoryTable.class).set("point",storyTable.getPoint()+1).updateById(story);
        if(o!=1){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        result.put(Conf.MSG,Conf.SUCCESS);
        System.out.println("返回数据"+result.toString());
        return result.toString();
    }

    @Override
    public String comment(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("id")||!jsonObject.has("story")||!jsonObject.has("content")){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        if(jsonObject.getString("id")==null||jsonObject.getString("id")==""){
            result.put(Conf.MSG,Conf.UNLOGGED);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        String id=jsonObject.getString("id");
        String story=jsonObject.getString("story");
        String content=jsonObject.getString("content");
        StoryCommentTable storyCommentTable=new StoryCommentTable();
        storyCommentTable.setContent(content);
        storyCommentTable.setStoryId(story);
        storyCommentTable.setUserId(id);
        storyCommentTable.setPoint(0);
        storyCommentTable.setReply(0);
        storyCommentTable.setTime(Time.getTime());
        StoryTable storyTable=Anima.select("comment").from(StoryTable.class)
                .byId(story);
        storyCommentTable.setHeight(storyTable.getComment()+1);
        String re=storyCommentTable.save().asString();
        if(re==null||re==""){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        StoryTable storyTable1=Anima.select("comment").from(StoryTable.class).byId(story);
        int i=Anima.update().from(StoryTable.class).set("comment",storyTable1.getComment()+1).updateById(story);
        if(i!=1){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        StoryCommentBean storyCommentBean=Anima.select().from(StoryCommentBean.class)
                .byId(re);
        UserTable user=Anima.select("name,picture").from(UserTable.class)
                .byId(storyCommentBean.getUserId());
        storyCommentBean.setUserName(user.getName());
        storyCommentBean.setUserPicture(user.getPicture());
        result.put(Conf.MSG,Conf.SUCCESS);
        result.put(Conf.RESULT,new JSONObject(storyCommentBean));
        System.out.println("返回数据"+result.toString());
        return result.toString();
    }

    @Override
    public String commentPoint(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("id")||!jsonObject.has("comment")){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        if(jsonObject.getString("id")==null||jsonObject.getString("id")==""){
            result.put(Conf.MSG,Conf.UNLOGGED);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        String id=jsonObject.getString("id");
        String comment=jsonObject.getString("comment");
        StoryCommentPointTable commentPointTable=Anima.select("id").from(StoryCommentPointTable.class)
                .where("user_id=?",id).and("comment_id=?",comment).one();
        if(commentPointTable==null){
            StoryCommentPointTable pointTable=new StoryCommentPointTable();
            pointTable.setCommentId(comment);
            pointTable.setUserId(id);
            String re=pointTable.save().asString();
            System.out.println("故事评论点赞"+re);
            if(re==null||re==""){
                result.put(Conf.MSG,Conf.ERROR);
                System.out.println("返回数据"+result.toString());
                return result.toString();
            }
            StoryCommentTable commentTable=Anima.select("point").from(StoryCommentTable.class).byId(comment);
            int i=Anima.update().from(StoryCommentTable.class).set("point",commentTable.getPoint()+1).updateById(comment);
            if(i!=1){
                result.put(Conf.MSG,Conf.ERROR);
                System.out.println("返回数据"+result.toString());
                return result.toString();
            }
            result.put(Conf.MSG,Conf.SUCCESS);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        int i=Anima.delete().from(StoryCommentPointTable.class).where("user_id=?",id)
                .and("comment_id=?",comment).execute();
        if(i!=1){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        StoryCommentTable commentTable=Anima.select("point").from(StoryCommentTable.class).byId(comment);
        int o=Anima.update().from(StoryCommentTable.class).set("point",commentTable.getPoint()-1).updateById(comment);
        if(o!=1){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        result.put(Conf.MSG,Conf.SUCCESS);
        System.out.println("返回数据"+result.toString());
        return result.toString();
    }

    @Override
    public String reply(String data){
        System.out.println("结束数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("id")||
                !jsonObject.has("comment")||
                !jsonObject.has("content")){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }

        String id=jsonObject.getString("id");
        String comment=jsonObject.getString("comment");
        String content=jsonObject.getString("content");
        StoryReplyTable storyReplyTable=new StoryReplyTable();
        storyReplyTable.setToUserId("0");
        if(jsonObject.has("userId")){
            String userId=jsonObject.getString("userId");
            storyReplyTable.setToUserId(userId);
        }
        storyReplyTable.setUserId(id);
        storyReplyTable.setCommentId(comment);
        storyReplyTable.setContent(content);
        storyReplyTable.setTime(Time.getTime());
        String re=storyReplyTable.save().asString();
        if(re==null||re==""){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        StoryCommentTable commentTable=Anima.select("reply")
                .from(StoryCommentTable.class).byId(comment);
        int reply=commentTable.getReply()+1;
        System.out.println("评论回复数"+reply);
        int i=Anima.update().from(StoryCommentTable.class).set("reply",reply).updateById(comment);
        if(i!=1){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString()+i);
            return result.toString();
        }
        StoryReplyBean replyBean=Anima.select().from(StoryReplyBean.class).byId(re);
        UserTable user=Anima.select("name,picture").from(UserTable.class).byId(replyBean.getUserId());
        replyBean.setUserName(user.getName());
        replyBean.setUserPicture(user.getPicture());
        if(!replyBean.getToUserId().equals("0")){
            UserTable userTable=Anima.select("name").from(UserTable.class).byId(replyBean.getToUserId());
            replyBean.setToUserName(userTable.getName());
        }
        result.put(Conf.RESULT,new JSONObject(replyBean));
        result.put(Conf.MSG,Conf.SUCCESS);
        System.out.println("返回数据"+result.toString());
        return result.toString();
    }

    @Override
    public String returnComment(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("story")||!jsonObject.has("page")){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }

        String story=jsonObject.getString("story");
        int page=jsonObject.getInt("page");
        int first=page*3+1;
        int next=first+20;
        if(!jsonObject.has("id")){
            Page<StoryCommentBean> storyCommentBeanPage=Anima.select().from(StoryCommentBean.class)
                    .where("story_id=?",story).order("id desc").page(first,next);
            List<StoryCommentBean> storyCommentBeans=storyCommentBeanPage.getRows();
            for(StoryCommentBean storyCommentBean:storyCommentBeans){
                UserTable userTable=Anima.select("name,picture").from(UserTable.class)
                        .byId(storyCommentBean.getUserId());
                storyCommentBean.setUserName(userTable.getName());
                storyCommentBean.setUserPicture(userTable.getPicture());
            }
            result.put(Conf.RESULT,new JSONArray(storyCommentBeans));
        }else {
            String id=jsonObject.getString("id");
            Page<StoryCommentBean> storyCommentBeanPage=Anima.select().from(StoryCommentBean.class)
                    .where("story_id=?",story).order("id desc").page(first,next);
            List<StoryCommentBean> storyCommentBeans=storyCommentBeanPage.getRows();
            for(StoryCommentBean storyCommentBean:storyCommentBeans){
                UserTable userTable=Anima.select("name,picture").from(UserTable.class)
                        .byId(storyCommentBean.getUserId());
                storyCommentBean.setUserName(userTable.getName());
                storyCommentBean.setUserPicture(userTable.getPicture());

                StoryCommentPointTable storyCommentPointTable=Anima.select().from(StoryCommentPointTable.class)
                        .where("user_id=?",id).and("comment_id=?",storyCommentBean.getId()).one();
                if(storyCommentPointTable!=null){
                    storyCommentBean.setUserStatus("yes");
                }
            }
            if(storyCommentBeans==null){
                result.put(Conf.MSG,Conf.NOTMORE);
                System.out.println("返回数据"+result.toString());
                return result.toString();
            }
            result.put(Conf.RESULT,new JSONArray(storyCommentBeans));
        }
        result.put(Conf.MSG,Conf.SUCCESS);
        System.out.println("返回数据"+result.toString());
        return result.toString();
    }

    @Override
    public String returnReply(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("comment")||!jsonObject.has("page")){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        String comment=jsonObject.getString("comment");
        int page=jsonObject.getInt("page");
        int first=page*3+1;
        int next=first+20;
        Page<StoryReplyBean> storyReplyBeanPage=Anima.select().from(StoryReplyBean.class)
                .where("comment_id=?",comment).order("id desc").page(first,next);
        List<StoryReplyBean> storyReplyBeans=storyReplyBeanPage.getRows();
        for(StoryReplyBean storyReplyBean:storyReplyBeans){
            UserTable user=Anima.select("name,picture").from(UserTable.class)
                    .byId(storyReplyBean.getUserId());
            storyReplyBean.setUserName(user.getName());
            storyReplyBean.setUserPicture(user.getPicture());
            System.out.println("被回复对象："+storyReplyBean.getToUserId());
            if(!storyReplyBean.getToUserId().equals("0")){
                UserTable toUser=Anima.select("name").from(UserTable.class)
                        .byId(storyReplyBean.getToUserId());
                storyReplyBean.setToUserName(toUser.getName());
            }
        }
        if(storyReplyBeans==null){
            result.put(Conf.MSG,Conf.NOTMORE);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        result.put(Conf.MSG,Conf.SUCCESS);
        result.put(Conf.RESULT,new JSONArray(storyReplyBeans));
        System.out.println("返回数据"+result.toString());
        return result.toString();
    }


    @Override
    public String getStoryOfId(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("story")){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println(result.toString());
            return result.toString();
        }
        String story=jsonObject.getString("story");
        StoryBean storyBean=Anima.select().from(StoryBean.class).byId(story);
        UserTable userTable=Anima.select("name,picture").from(UserTable.class).byId(storyBean.getUserId());
        storyBean.setUserPicture(userTable.getPicture());
        storyBean.setUserName(userTable.getName());
        result.put(Conf.MSG,Conf.SUCCESS);
        result.put(Conf.RESULT,new JSONObject(storyBean));
        System.out.println("返回数据"+result.toString());
        return result.toString();
    }
}
