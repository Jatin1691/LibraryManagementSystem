package com.lms.exception;

public class OtpNotFoundException extends Exception{

    public  OtpNotFoundException(){
        super("Otp not found");
    }
}
