package com.lms.Utility;

public class Data {

    public static String emailotp(String otp){
        return  "<!DOCTYPE html>" +
                "<html lang='en'>" +
                "<head>" +
                "    <meta charset='UTF-8'>" +
                "    <meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
                "    <meta http-equiv='X-UA-Compatible' content='IE=edge'>" +
                "    <title>OTP Verification</title>" +
                "    <style>" +
                "        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }" +
                "        .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }" +
                "        h1 { color: #333; }" +
                "        .otp-box { display: inline-block; background-color: #f1f1f1; padding: 15px; font-size: 24px; letter-spacing: 5px; font-weight: bold; border-radius: 5px; color: #007bff; margin: 20px 0; }" +
                "        .footer { text-align: center; font-size: 12px; color: #777; }" +
                "        a { color: #007bff; text-decoration: none; }" +
                "    </style>" +
                "</head>" +
                "<body>" +
                "    <div class='email-container'>" +
                "        <h1>OTP Verification</h1>" +
                "        <p>Hello,</p>" +
                "        <p>Your one-time password (OTP) for completing the verification process is:</p>" +
                "        <div class='otp-box'>" + otp + "</div>" +
                "        <p>This OTP is valid for 10 minutes. Please do not share it with anyone.</p>" +
                "        <p>If you did not request this OTP, please ignore this email or contact our support team.</p>" +
                "        <p>Thank you!</p>" +
                "        <div class='footer'>" +
                "            <p>&copy; 2024 Your Company. All rights reserved.</p>" +
                "            <p><a href='https://yourcompany.com'>Visit our website</a> | <a href='mailto:support@yourcompany.com'>Contact Support</a></p>" +
                "        </div>" +
                "    </div>" +
                "</body>" +
                "</html>";


    }
}

