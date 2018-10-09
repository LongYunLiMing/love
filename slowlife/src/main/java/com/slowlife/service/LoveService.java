package com.slowlife.service;

import com.blade.ioc.annotation.Bean;
import com.slowlife.bean.LoveBean;
import com.slowlife.bean.LoveCommentBean;
import com.slowlife.bean.LovePictureBean;
import com.slowlife.bean.LoveReplyBean;
import com.slowlife.service.interfaces.LoveInterfaces;
import com.slowlife.table.*;
import com.slowlife.utils.Conf;
import com.slowlife.utils.Time;
import io.github.biezhi.anima.Anima;
import io.github.biezhi.anima.page.Page;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.List;

@Bean
public class LoveService implements LoveInterfaces {

      @Override
      public String getLove(String data){
          System.out.println("接收数据"+data);
          JSONObject jsonObject=new JSONObject(data);
          JSONObject result=new JSONObject();
          String id=jsonObject.getString("id");
          if(id==null||id==""){
              LoveBean loveBean=Anima.select().from(LoveBean.class)
                    .where("status=?",Conf.LOVE).one();
              List<LovePictureBean> lovePictureBean=Anima.select("url,content")
                      .from(LovePictureBean.class).where("love_id=?",loveBean.getId())
                      .all();
              loveBean.setPicture(lovePictureBean);
              result.put(Conf.MSG,Conf.SUCCESS);
              result.put(Conf.RESULT,new JSONObject(loveBean));
              System.out.println("返回数据"+result.toString());
              return result.toString();
          }
          LoveBean loveBean=Anima.select().from(LoveBean.class)
                  .where("status=?",Conf.LOVE).one();
          List<LovePictureBean> lovePictureBean=Anima.select("url,content")
                  .from(LovePictureBean.class).where("love_id=?",loveBean.getId())
                  .all();
          loveBean.setPicture(lovePictureBean);
          LovePointTable lovePointTable=Anima.select().from(LovePointTable.class)
                  .where("user_id=?",id)
                  .and("love_id=?",loveBean.getId()).one();
          if(lovePointTable!=null){
              loveBean.setUserStatus("yes");
          }
          result.put(Conf.MSG,Conf.SUCCESS);
          result.put(Conf.RESULT,new JSONObject(loveBean));
          System.out.println("返回数据"+result.toString());
          return result.toString();
      }

      @Override
      public String point(String data){
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
          LovePointTable lovePointTable=new LovePointTable();
          lovePointTable.setUserId(id);
          lovePointTable.setLoveId(love);
          String i=lovePointTable.save().asString();
          if(i==null||i==""){
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
          if(!jsonObject.has("id")||!jsonObject.has("love")||!jsonObject.has("content")){
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
          String content=jsonObject.getString("content");
          LoveTable loveTable=Anima.select("height").from(LoveTable.class).byId(love);
          LoveCommentTable loveCommentTable=new LoveCommentTable();
          loveCommentTable.setContent(content);
          loveCommentTable.setLoveId(love);
          loveCommentTable.setUserId(id);
          loveCommentTable.setHeight(loveTable.getComment()+1);
          loveCommentTable.setPoint(0);
          loveCommentTable.setReply(0);
          loveCommentTable.setTime(Time.getTime());
          String re=loveCommentTable.save().asString();
          if(re==null||re==""){
              result.put(Conf.MSG,Conf.ERROR);
              System.out.println("返回数据"+result.toString());
              return result.toString();
          }
          result.put(Conf.MSG,Conf.SUCCESS);
          result.put(Conf.RESULT,re);
          System.out.println("返回数据"+result.toString());
          return result.toString();
      }

      @Override
      public String reply(String data){
          System.out.println("接收数据"+data);
          JSONObject jsonObject=new JSONObject(data);
          JSONObject result=new JSONObject();
          if(!jsonObject.has("id")||!jsonObject.has("comment")||!jsonObject.has("content")||!jsonObject.has("userId")){
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
          String content=jsonObject.getString("content");
          String userId=jsonObject.getString("userId");
          LoveReplyTable loveReplyTable=new LoveReplyTable();
          loveReplyTable.setCommentId(comment);
          loveReplyTable.setContent(content);
          loveReplyTable.setUserId(id);
          loveReplyTable.setToUserId(userId);
          loveReplyTable.setTime(Time.getTime());
          String re=loveReplyTable.save().asString();
          if(re==null||re==""){
              result.put(Conf.MSG,Conf.ERROR);
              System.out.println("返回数据"+result.toString());
              return result.toString();
          }
          result.put(Conf.MSG,Conf.SUCCESS);
          result.put(Conf.RESULT,re);
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
          LoveCommentPointTable pointTable=new LoveCommentPointTable();
          pointTable.setUserId(id);
          pointTable.setCommentId(comment);
          String re=pointTable.save().asString();
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
      public String returnComment(String data){
          System.out.println("接收数据"+data);
          JSONObject jsonObject=new JSONObject(data);
          JSONObject result=new JSONObject();
          if(!jsonObject.has("id")||!jsonObject.has("love")||!jsonObject.has("page")){
              result.put(Conf.MSG,Conf.ERROR);
              System.out.println("返回数据"+result.toString());
              return result.toString();
          }
          String id=jsonObject.getString("id");
          String love=jsonObject.getString("love");
          int page=jsonObject.getInt("page");
          int first=page*3+1;
          int next=first+2;
          Page<LoveCommentBean> loveCommentBeanPage=Anima.select().from(LoveCommentBean.class).where("love_id=?",love).page(first,next);
          if(loveCommentBeanPage==null){
              result.put(Conf.MSG,Conf.NOTMORE);
              System.out.println("返回数据"+result.toString());
              return result.toString();
          }
          List<LoveCommentBean> loveCommentBeans=loveCommentBeanPage.getRows();
          for (LoveCommentBean loveCommentBean:loveCommentBeans){
              LoveCommentPointTable loveCommentPointTable=Anima.select()
                      .from(LoveCommentPointTable.class).where("user_id=?",id)
                      .and("comment_id=?",loveCommentBean.getId()).one();
              if(loveCommentPointTable!=null){
                  loveCommentBean.setUserStatus("yes");
              }
              UserTable userTable=Anima.select("name,picture").from(UserTable.class)
                      .byId(loveCommentBean.getUserId());
              loveCommentBean.setUserName(userTable.getName());
              loveCommentBean.setUserPicture(userTable.getPicture());
          }
          result.put(Conf.MSG,Conf.SUCCESS);
          result.put(Conf.RESULT,new JSONArray(loveCommentBeans));
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
          int next=first+2;
          Page<LoveReplyBean> loveReplyBeanPage=Anima.select().from(LoveReplyBean.class).where("comment_id=?",comment).page(first,next);
          if(loveReplyBeanPage==null){
              result.put(Conf.MSG,Conf.NOTMORE);
              System.out.println("返回数据"+result.toString());
              return result.toString();
          }
          List<LoveReplyBean> loveReplyBeans=loveReplyBeanPage.getRows();
          for(LoveReplyBean loveReplyBean:loveReplyBeans){
              UserTable user=Anima.select("name,picture")
                      .from(UserTable.class).byId(loveReplyBean.getUserId());
              loveReplyBean.setUserName(user.getName());
              loveReplyBean.setUserPicture(user.getPicture());
              if(loveReplyBean.getToUserId()!=null||loveReplyBean.getToUserId()==""){
                  UserTable toUser=Anima.select("name").from(UserTable.class)
                          .byId(loveReplyBean.getToUserId());
                  loveReplyBean.setToUserName(toUser.getName());
              }
          }
          result.put(Conf.MSG,Conf.SUCCESS);
          result.put(Conf.RESULT,new JSONArray(loveReplyBeans));
          System.out.println("返回数据"+result.toString());
          return result.toString();
      }
}
