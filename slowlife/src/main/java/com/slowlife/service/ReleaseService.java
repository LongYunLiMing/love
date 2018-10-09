package com.slowlife.service;

import com.blade.ioc.annotation.Bean;
import com.slowlife.bean.LoveTimeBean;
import com.slowlife.service.interfaces.ReleaseInterfaces;
import com.slowlife.table.*;
import com.slowlife.utils.Conf;
import com.slowlife.utils.Time;
import io.github.biezhi.anima.Anima;
//import org.json.JSONArray;
import org.json.JSONObject;
import java.util.List;
import net.sf.ezmorph.*;
import net.sf.json.JSONArray;


@Bean
public class ReleaseService implements ReleaseInterfaces {

    @Override
    public String ReleaseLoveReturnId(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("id")||
                !jsonObject.has("title")||
                !jsonObject.has("content")||
                !jsonObject.has("type")||
                !jsonObject.has("toId")||
                !jsonObject.has("startTime")||
                !jsonObject.has("endTime")){
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
        String title=jsonObject.getString("title");
        String content=jsonObject.getString("content");
        String type=jsonObject.getString("type");
        String toId=jsonObject.getString("toId");
        String startTime=jsonObject.getString("startTime");
        String endTime=jsonObject.getString("endTime");
        LoveTable loveTable=new LoveTable();
        loveTable.setUserId(id);
        loveTable.setToUserId(toId);
        loveTable.setTitle(title);
        loveTable.setContent(content);
        loveTable.setType(type);
        loveTable.setComment(0);
        loveTable.setPoint(0);
        loveTable.setTime(Time.getTime());
        loveTable.setStartTime(startTime);
        loveTable.setEndTime(endTime);
        String love=loveTable.save().asString();
        if(love==null||love==""){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        result.put(Conf.MSG,Conf.SUCCESS);
        result.put(Conf.RESULT,love);
        System.out.println("返回数据"+result.toString());
        return result.toString();
    }


    @Override
    public String ReleaseSaveURLAndText(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("id")||!jsonObject.has("love")||!jsonObject.has("url")||!jsonObject.has("text")){
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
        String love=jsonObject.getString("love");
        String url=jsonObject.getString("url");
        String text=jsonObject.getString("text");
        LoveTable loveTable=Anima.select("user_id").from(LoveTable.class).byId(love);
        if(loveTable.getUserId()!=id){
            result.put(Conf.MSG,"没有权限");
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        LovePictureTable pictureTable=new LovePictureTable();
        pictureTable.setLoveId(love);
        pictureTable.setUrl(url);
        pictureTable.setContent(text);
        String re=pictureTable.save().asString();
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
    public String ReleaseStory(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("id")||!jsonObject.has("type")||
                !jsonObject.has("title")||!jsonObject.has("content")
                ||!jsonObject.has("introduce")){
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
        String type=jsonObject.getString("type");
        String title=jsonObject.getString("title");
        String content=jsonObject.getString("content");
        String introduce=jsonObject.getString("introduce");
        String url=jsonObject.getString("url");
        StoryTable storyTable=new StoryTable();
        storyTable.setUserId(id);
        storyTable.setType(type);
        storyTable.setTitle(title);
        storyTable.setContent(content);
        storyTable.setIntroduce(introduce);
        storyTable.setPoint(0);
        storyTable.setComment(0);
        storyTable.setCollect(0);
        storyTable.setTime(Time.getTime());
        storyTable.setStatus(Conf.WITER);
        String re=storyTable.save().asString();
        if(re==null||re==""){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        if (url!=null||url!=""){
            url=url.replace("\\","");
            JSONArray urlJA= JSONArray.fromObject(url);
            System.out.println("JSONArray"+urlJA.toString());
            for(int i=0;i<urlJA.size();i++){
                JSONObject o=new JSONObject(urlJA.getJSONObject(i));
                System.out.println(o.toString());
                String u=o.getString("url");
                StoryPictureTable storyPictureTable=new StoryPictureTable();
                storyPictureTable.setStoryId(re);
                storyPictureTable.setUrl(u);
                storyPictureTable.save();
            }
        }
        UserTable userTable=Anima.select("story").from(UserTable.class).byId(id);
        int i=Anima.update().from(UserTable.class).set("story",userTable.getStory()+1).updateById(id);
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
    public String ReleaseMood(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("id")||!jsonObject.has("content")||!jsonObject.has("x")||!jsonObject.has("y")){
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
        String content=jsonObject.getString("content");
        String x=jsonObject.getString("x");
        String y=jsonObject.getString("y");
        MoodTable moodTable=new MoodTable();
        moodTable.setUserId(id);
        moodTable.setContent(content);
        moodTable.setCoordinatesX(x);
        moodTable.setCoordinatesY(y);
        moodTable.setTime(Time.getTime());
        String re=moodTable.save().asString();
        if(re==null||re==""){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        UserTable userTable=Anima.select("mood").from(UserTable.class).byId(id);
        int i=Anima.update().from(UserTable.class).set("mood",userTable.getMood()+1).updateById(id);
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
    public String ReleaseLove(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if(!jsonObject.has("id")||!jsonObject.has("love")){
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
        String love=jsonObject.getString("love");
        LoveTable loveTable=Anima.select("user_id").from(LoveTable.class).byId(love);
        if(loveTable.getUserId()!=id){
            result.put(Conf.MSG,"没有权限");
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        int i=Anima.update().from(LoveTable.class).set("status",Conf.WITER).updateById(love);
        if(i!=1){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        UserTable userTable=Anima.select("love").from(UserTable.class).byId(id);
        int o=Anima.update().from(UserTable.class).set("love",userTable.getLove()+1).updateById(id);
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
    public String GetLoveTime(String data){
        JSONObject result=new JSONObject();
        List<LoveTimeBean> loveTimeBeanList;
        loveTimeBeanList=Anima.select("start_time,end_time")
                .from(LoveTimeBean.class).where("status=?",Conf.YES).all();
        result.put(Conf.MSG,Conf.SUCCESS);
        //result.put(Conf.RESULT,new JSONArray(loveTimeBeanList));
        result.put(Conf.RESULT,JSONArray.fromObject(loveTimeBeanList));
        System.out.println("返回数据"+result.toString());
        return result.toString();

    }

    @Override
    public String ReleaseCoordinates(String data){
        System.out.println("接收数据"+data);
        JSONObject jsonObject=new JSONObject(data);
        JSONObject result=new JSONObject();
        if (!jsonObject.has("x")||!jsonObject.has("y")){
            result.put(Conf.MSG,Conf.ERROR);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        String x=jsonObject.getString("x");
        String y=jsonObject.getString("y");
        MoodTable moodTable=Anima.select("id").from(MoodTable.class)
                .where("coordinates_x=?",x).and("coordinates_y=?",y).one();
        if(moodTable==null){
            result.put(Conf.MSG,Conf.SUCCESS);
            System.out.println("返回数据"+result.toString());
            return result.toString();
        }
        result.put(Conf.MSG,Conf.ERROR);
        System.out.println("返回数据"+result.toString());
        return result.toString();
    }
}
