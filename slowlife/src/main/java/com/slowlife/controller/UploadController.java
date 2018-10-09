package com.slowlife.controller;


import com.blade.mvc.annotation.*;
import com.blade.mvc.http.Response;
import com.blade.mvc.multipart.FileItem;
import com.slowlife.utils.Conf;
import org.json.JSONObject;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Path
public class
UploadController {

    /**
     * 上传文件
     * 返回json信息
     * 如果成功则返回文件路径
     * 失败则返回error
     * @param fileItem
     * @param response
     */
    @PostRoute("v1/upload")
    public void uploadImage(@MultipartParam FileItem fileItem, Response response){

        JSONObject jsonObject=new JSONObject();
        System.out.println("文件上传中");

        if (null != fileItem) {
            byte[] data = fileItem.getData();
            // Save the temporary file to the specified path
            try {

                String name= "static/" + fileItem.getFileName();

                System.out.println(name);

                Files.write(Paths.get("F:/love/love/slowlife/src/main/resources/static/" + fileItem.getFileName()), data);

                jsonObject.put(Conf.MSG,Conf.SUCCESS);

                jsonObject.put(Conf.RESULT,name);

            } catch (IOException e) {
                e.printStackTrace();
                jsonObject.put(Conf.MSG,Conf.ERROR);

            }
        }

        System.out.println("返回数据"+jsonObject.toString());
        response.json(jsonObject.toString());

    }


}
