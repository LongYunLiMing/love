package com.slowlife.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.interfaces.DecodedJWT;

import java.io.UnsupportedEncodingException;
import java.util.Date;

public class TokenUtil {


    private static final long EXPIRE_TIME = 60*60*1000*24*7;//一周过期

    public static String createToken(String account,long ttlMillis,String secret){

        String token="";

        Date date=new Date(ttlMillis+EXPIRE_TIME);

        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            token = JWT.create()
                    .withIssuer(account)
                    .withExpiresAt(date)
                    .withClaim("username",account)
                    .sign(algorithm);
        } catch (UnsupportedEncodingException | JWTCreationException exception){
            //UTF-8 encoding not supported

            return Conf.UNSUPPORTED_TOKEN;

        }

        return token;

    }

    public static String getUsername(String token) {
        try {
            DecodedJWT jwt = JWT.decode(token);
            return jwt.getClaim("username").asString();
        } catch (JWTDecodeException e) {
            return null;
        }
    }

    public static boolean verify(String token, String username,String secret) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withClaim("username", username)
                    .build();
            DecodedJWT jwt = verifier.verify(token);

            return true;
        } catch (Exception exception) {
            return false;
        }
    }


}
