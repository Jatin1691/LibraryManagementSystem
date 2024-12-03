package com.lms.Utility;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;

@Component
public class Utilities {

    public static String genOtp(){
        StringBuilder otp = new StringBuilder();
        SecureRandom random = new SecureRandom();
        for(int i = 0; i < 6; i++)
            otp.append(random.nextInt(10));

        return otp.toString();
    }
}
