//package com.user;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//@Service
//public class CustomUserDetailsService implements UserDetailsService {
//
//    @Autowired
//    private UserRepository userRepository; 
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        User user = userRepository.findByUsername(username); // Implement this method in your repository
//        if (user == null) {
//            throw new UsernameNotFoundException("User not found");
//        }
//        return org.springframework.security.core.userdetails.User.withUsername(user.getUsername())
//                .password(user.getPassword())
//                .roles(user.getRole()) // Ensure you have a way to get roles
//                .build();
//    }
//}
