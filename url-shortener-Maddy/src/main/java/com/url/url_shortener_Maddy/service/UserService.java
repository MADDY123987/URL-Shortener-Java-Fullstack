package com.url.url_shortener_Maddy.service;

import com.url.url_shortener_Maddy.dtos.LoginRequest;
import com.url.url_shortener_Maddy.models.User;
import com.url.url_shortener_Maddy.repository.UserRepository;
import com.url.url_shortener_Maddy.security.jwt.JwtAuthenticationResponse;
import com.url.url_shortener_Maddy.security.jwt.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public User registerUser(User user) {
        // store bcrypt hash
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public JwtAuthenticationResponse authenticateUser(LoginRequest loginRequest) {
        // small sanity trim on username to avoid hidden spaces
        String username = loginRequest.getUsername() == null ? null : loginRequest.getUsername().trim();

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        // ✅ No cast to UserDetailsImpl; JwtUtils should accept UserDetails
        String token = jwtUtils.generateToken(userDetails);

        return new JwtAuthenticationResponse(token);
    }

    public User findByUsername(String name) {
        return userRepository.findByUsername(name)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with username: " + name));
    }
}
