package com.lms.services;

import com.lms.DTO.ResponseDto;
import com.lms.Utility.Data;
import com.lms.Utility.Utilities;
import com.lms.exception.OtpNotFoundException;
import com.lms.exception.UserNotFoundException;
import com.lms.model.LoginRequest;
import com.lms.model.Otp;
import com.lms.model.User;
import com.lms.repository.OtpRepository;
import com.lms.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private OtpRepository otpRepository;

    public List<User> getAllUsers(){
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }

    public User getUserByID(long id) {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    }

    public User getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public User getUserByPhoneNumber(long number){
        return userRepository.findByPhoneNumber(number);
    }

    public User addUser(User users) {
        return userRepository.save(users);
    }

    public User updateUser(User user){
        return userRepository.save(user);
    }
    public void deleteUser(long id){
        userRepository.deleteById(id);
    }

    public boolean sendotp(String email) throws MessagingException {
        userRepository.findByEmail(email);
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage,true);
        messageHelper.setTo(email);
        messageHelper.setSubject("Your Otp code");
        String genotp= Utilities.genOtp();
        Otp otp=new Otp(email,genotp, LocalDateTime.now());
        otpRepository.save(otp);
        messageHelper.setText(Data.emailotp(genotp),true);
        mailSender.send(mimeMessage);
        return true;
    }

    public void verifyotp(String email, String otp) throws OtpNotFoundException {

        Otp otpEntity=otpRepository.findById(email).orElseThrow(()->new OtpNotFoundException());
        if(!otpEntity.getOtpCode().equals(otp)){
            throw new OtpNotFoundException();
        }



    }

    public ResponseDto changePassword(LoginRequest loginDto) {

        User user=userRepository.findByEmail(loginDto.getEmail());
        user.setPassword(loginDto.getPassword());
        userRepository.save(user);
        return new ResponseDto("password changed successfully");
    }
}

