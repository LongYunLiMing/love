package com.slowlife.utils;

import com.blade.mvc.RouteContext;
import com.blade.mvc.hook.Signature;
import com.blade.mvc.hook.WebHook;

public class AllowCrossOriginHook implements WebHook {

    @Override
    public boolean before(RouteContext context) {

        context.header("Access-Control-Allow-Origin", "*");
        context.header("Access-Control-Allow-Credential", "true");
        context.header("Access-Control-Allow-Methods", "GET, OPTIONS, HEAD, PUT, POST, DELETE");
        if ("OPTIONS".equals(context.method())) {
            context.status(202);
        }
        return true;
    }
}
