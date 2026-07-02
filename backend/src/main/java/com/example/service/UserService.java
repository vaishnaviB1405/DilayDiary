package com.example.service;


import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import com.example.dto.LoginRequest;
import com.example.dto.RegisterRequest;
import com.example.entity.User;
import com.example.repository.UserRepository;
import com.example.security.JwtService;

@Service
public class UserService {

	private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public String register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already exists";
        }

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        return "Registration Successful";
    }
    
    
    public String login(LoginRequest request) {
    	User user = userRepository.findByEmail(request.getEmail()).orElse(null);
        if(user == null) {
        	return "User not found";
        }
        
        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
        	return "Invalid Password";
        }
        
        return jwtService.generateToken(user.getEmail());
        
    }

}