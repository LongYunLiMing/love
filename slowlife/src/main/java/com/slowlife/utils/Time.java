package com.slowlife.utils;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Time {

    public static String getTime(){
        Date date=new Date();
        SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Timestamp time=new Timestamp(date.getTime());
        return time.toString();
    }
}
