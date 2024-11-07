package com.user;

public interface UserService {
    User findByEmail(String email);
    void registerUser(User user);
    boolean verifyPassword(String rawPassword, String encodedPassword);
}
