package com.slowlife.service;

import com.blade.ioc.annotation.Bean;
import com.blade.mvc.annotation.JSON;
import com.mysql.cj.exceptions.ClosedOnExpiredPasswordException;
import com.slowlife.bean.FriendBean;
import com.slowlife.bean.LoveBean;
import com.slowlife.bean.*;
import com.slowlife.service.interfaces.UserPersonInterfaces;
import com.slowlife.table.*;
import com.slowlife.utils.Conf;
import com.sun.codemodel.internal.fmt.JStaticJavaFile;
import io.github.biezhi.anima.Anima;
import io.github.biezhi.anima.page.Page;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.swing.*;
import java.util.List;

@Bean
public class UserPersonService implements UserPersonInterfaces {

    @Override
    public String getInfo(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("id")){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        String id=jsonObject.getString("id");
        if(id==null||id==""){
            result.put(Conf.MSG,Conf.UNLOGGED);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        UserTable userTable=Anima.select("name,introduce,picture,love,story,mood,friend,question,message")
                .from(UserTable.class).byId(id);
        if(userTable==null){
            result.put(Conf.MSG,Conf.UNLOGGED);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        result.put(Conf.MSG,Conf.SUCCESS);
        result.put(Conf.RESULT,new JSONObject(userTable));
        System.out.println("返回数据"+result.toString());
        return result.toString();
    }

    @Override
    public String getLove(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("id")||!jsonObject.has("page")){
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
        int page=jsonObject.getInt("page");
        int first=page*3+1;
        int next=first+2;
        Page<LoveBean> tablePage=Anima.select().from(LoveBean.class).order("time desc").where("user_id=?",id).page(first,next);
        List<LoveBean> tableList=tablePage.getRows();
        System.out.println("返回记录数"+tableList.size());
        if(tableList.size()==0){
            result.put(Conf.MSG,Conf.NOTMORE);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        for(int i=0;i<tableList.size();i++){
            System.out.println("第"+i+"条记录信息"+tableList.get(i).toString());
            UserTable user=Anima.select("name,picture").from(UserTable.class)
                    .byId(tableList.get(i).getUserId());
            tableList.get(i).setUserName(user.getName());
            tableList.get(i).setUserPicture(user.getPicture());
            System.out.println("被表白对象ID"+tableList.get(i).getToUserId());
            if(Integer.valueOf(tableList.get(i).getToUserId())!=0){
                UserTable toUser=Anima.select("name,picture").from(UserTable.class)
                        .byId(tableList.get(i).getToUserId());
                System.out.println("被表白对象基本信息"+toUser.toString());
                tableList.get(i).setToUserName(toUser.getName());
                tableList.get(i).setToUserPicture(toUser.getPicture());
            }
        }
        result.put(Conf.MSG,Conf.SUCCESS);
        result.put(Conf.RESULT,new JSONArray(tableList));
        System.out.println("返回数据"+result.toString());
        return result.toString();

    }

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
        if(jsonObject.getString("id")==null||jsonObject.getString("id")==""){
            result.put(Conf.MSG,Conf.UNLOGGED);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        String id=jsonObject.getString("id");
        int page=jsonObject.getInt("page");
        int first=page*0+1;
        int next=first+20;
        Page<StoryBean> storyTablePage=Anima.select().from(StoryBean.class).where("user_id=?",id).page(first,next);
        List<StoryBean> storyTableList=storyTablePage.getRows();
        if(storyTableList.size()==0){
            result.put(Conf.MSG,Conf.NOTMORE);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        for(int i=0;i<storyTableList.size();i++){
            System.out.println("故事编号："+storyTableList.get(i).getId());
            UserTable user=Anima.select("name,picture").from(UserTable.class)
                    .byId(storyTableList.get(i).getUserId());
            storyTableList.get(i).setUserName(user.getName());
            storyTableList.get(i).setUserPicture(user.getPicture());
            System.out.println(new JSONObject(storyTableList.get(i)).toString());
            System.out.println("故事的问题编号"+storyTableList.get(i).getQuestion());
            QuestionTable question=Anima.select("question")
                    .from(QuestionTable.class).byId(storyTableList.get(i).getQuestion());
            System.out.println("故事问题"+question.getQuestion());
            storyTableList.get(i).setQuestion(question.getQuestion());
        }
        result.put(Conf.MSG,Conf.SUCCESS);
        result.put(Conf.RESULT,new JSONArray(storyTableList));
        System.out.println("返回数据"+result.toString());
        return result.toString();

    }

    @Override
    public String getMood(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("id")||!jsonObject.has("page")){
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
        int page=jsonObject.getInt("page");
        int first=page*3+1;
        int next=first+2;
        Page<MoodBean> moodTablePage=Anima.select().from(MoodBean.class).where("user_id=?",id).page(first,next);
        List<MoodBean> moodTableList=moodTablePage.getRows();
        if(moodTableList.size()==0){
            result.put(Conf.MSG,Conf.NOTMORE);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        for(int i=0;i<moodTableList.size();i++){
            UserTable user=Anima.select("name,picture").from(UserTable.class)
                    .byId(moodTableList.get(i).getUserId());
            moodTableList.get(i).setUserName(user.getName());
            moodTableList.get(i).setUserPicture(user.getPicture());
        }
        result.put(Conf.MSG,Conf.SUCCESS);
        result.put(Conf.RESULT,new JSONArray(moodTableList));
        System.out.println("返回数据"+result.toString());
        return result.toString();
    }

    @Override
    public String getFriend(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("id")){
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
        List<FriendBean> friendBeanList=Anima.select("id,friend_id,name")
                .from(FriendBean.class).where("user_id=?",id).all();
        if(friendBeanList==null){
            result.put(Conf.MSG,"你还没有好友呢！");
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        for(FriendBean friendBean:friendBeanList){
            UserTable userTable=Anima.select("picture,introduce").from(UserTable.class).byId(friendBean.getFriendId());
            friendBean.setFriendPicture(userTable.getPicture());
            friendBean.setIntroduce(userTable.getIntroduce());
        }
        result.put(Conf.MSG,Conf.SUCCESS);
        result.put(Conf.RESULT,new JSONArray(friendBeanList));
        System.out.println("返回数据"+result.toString());
        return result.toString();

    }

    @Override
    public String getQuestion(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("id")){
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
        List<QuestionBean> questionTableList=Anima.select().from(QuestionBean.class)
                .where("user_id=?",id).all();
        if(questionTableList==null){
            result.put(Conf.MSG,"你还没有设置任何问题！");
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        for (QuestionBean questionBean:questionTableList){
            UserTable user=Anima.select("name,picture").from(UserTable.class)
                    .byId(questionBean.getUserId());
            questionBean.setUserName(user.getName());
            questionBean.setUserPicture(user.getPicture());
        }
        result.put(Conf.MSG,Conf.SUCCESS);
        result.put(Conf.RESULT,new JSONArray(questionTableList));
        System.out.println("返回数据"+result.toString());
        return result.toString();

    }

    @Override
    public String setQuestion(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("id")||!jsonObject.has("story")||!jsonObject.has("question")){
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
        String question=jsonObject.getString("question");
        QuestionTable questionTable=new QuestionTable();
        questionTable.setUserId(id);
        questionTable.setFromStory(story);
        questionTable.setQuestion(question);
        String questionId=questionTable.save().asString();
        System.out.println("保存的问题编号"+questionId);
        if(questionId==null||questionId==""){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        int i=Anima.update().from(StoryTable.class).set("questionID",questionId).updateById(story);
        if(i==0){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        result.put(Conf.MSG,Conf.SUCCESS);
        System.out.println("返回数据"+result.toString());
        return result.toString();

    }

    @Override
    public String addQuestion(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("id")||!jsonObject.has("question")){
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
        String question=jsonObject.getString("question");
        QuestionTable questionTable=new QuestionTable();
        questionTable.setUserId(id);
        questionTable.setQuestion(question);
        //questionTable.setFromStory("人生观");
        String questionId=questionTable.save().asString();
        if(questionId==null||questionId==""){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        result.put(Conf.MSG,Conf.SUCCESS);
        System.out.println("返回数据"+result.toString());
        return result.toString();

    }

    @Override
    public String deleteQuestion(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("id")||!jsonObject.has("question")){
            result.put(Conf.MSG,Conf.UNLOGGED);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        if(jsonObject.getString("id")==null||jsonObject.getString("id")==""){
            result.put(Conf.MSG,Conf.UNLOGGED);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        String id=jsonObject.getString("id");
        String question=jsonObject.getString("question");
        QuestionTable questionTable=Anima.select("user_id").from(QuestionTable.class)
                .byId(question);
        if(!questionTable.getUserId().equals(id)){
            result.put(Conf.MSG,"没有权限");
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        int i=Anima.delete().from(QuestionTable.class).deleteById(question);
        if(i==1){
            result.put(Conf.MSG,Conf.SUCCESS);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        result.put(Conf.MSG,Conf.ERROR);
        System.out.println("返回数据"+result.toString());
        return result.toString();

    }

    @Override
    public String deleteFriend(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("id")||!jsonObject.has("friend")){
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
        String friend=jsonObject.getString("friend");
        int i=Anima.delete().from(FriendTable.class).where("user_id=?",id)
                .and("friend_id=?",friend).execute();
        if(i==1){
            result.put(Conf.MSG,Conf.SUCCESS);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        result.put(Conf.MSG,"还不是好友");
        System.out.println("返回数据"+result.toString());
        return result.toString();
    }

    @Override
    public String historyQuestionFromStory(String data){
        System.out.println("接收数据"+data);
        JSONObject result=new JSONObject();
        JSONObject jsonObject=new JSONObject(data);
        if(!jsonObject.has("story")){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        String story=jsonObject.getString("story");
        List<QuestionTable> questionTables=Anima.select("question,id")
                .from(QuestionTable.class).where("from_story=?",story).all();
        result.put(Conf.MSG,Conf.SUCCESS);
        result.put(Conf.RESULT,new JSONArray(questionTables));
        System.out.println("返回数据"+result.toString());
        return result.toString();
    }


    @Override
    public String historyQuestionOfAnswer(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("question")){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        List<QuestionAuditBean> questionAuditBeans=Anima.select("id,user_id,answer,status,time")
                .from(QuestionAuditBean.class).where("question_id=?",jsonObject.getString("question"))
                .all();
        for(QuestionAuditBean questionAuditBean:questionAuditBeans){
            UserTable user=Anima.select("name,picture").from(UserTable.class).byId(questionAuditBean.getUserId());
            questionAuditBean.setUserName(user.getName());
            questionAuditBean.setUserPicture(user.getPicture());
        }
        result.put(Conf.MSG,Conf.SUCCESS);
        result.put(Conf.RESULT,new JSONArray(questionAuditBeans));
        System.out.println("返回数据"+result.toString());
        return result.toString();
    }


    @Override
    public String deleteMood(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("mood")){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        String mood=jsonObject.getString("mood");
        int i=Anima.delete().from(MoodTable.class).deleteById(mood);
        if(i!=1){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        result.put(Conf.MSG,Conf.SUCCESS);
        System.out.println("返回数据"+result.toString());
        return result.toString();
    }


    @Override
    public String deleteStory(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("story")){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        String story=jsonObject.getString("story");
        int i=Anima.delete().from(StoryTable.class).deleteById(story);
        if(i!=1){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        result.put(Conf.MSG,Conf.SUCCESS);
        System.out.println("返回数据"+result.toString());
        return result.toString();
    }


    @Override
    public String getAnswerCount(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("id")){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        String id=jsonObject.getString("id");
        
    }
}
