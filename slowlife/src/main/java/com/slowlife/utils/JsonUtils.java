package com.slowlife.utils;


import org.json.JSONObject;

/**
 * 处理json类
 */
public class JsonUtils {

    public static JSONObject getJsonObject(String message){

        JSONObject jsonObject=new JSONObject();

        jsonObject.put("msg",message);

        return jsonObject;
    }


    public void test(){

        JSONObject jsonObject=new JSONObject();




    }



}
