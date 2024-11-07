package com.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;

    // DTO class for consistent response structure
    static class ResponseMessage {
        private boolean success;
        private String message;

        public ResponseMessage(boolean success, String message) {
            this.success = success;
            this.message = message;
        }

        // Getters
        public boolean isSuccess() {
            return success;
        }

        public String getMessage() {
            return message;
        }
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseMessage> registerUser(@RequestBody User user) {
        User existingUser = userService.findByEmail(user.getEmail());
        if (existingUser != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ResponseMessage(false, "Email already exists."));
        }
        userService.registerUser(user);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ResponseMessage(true, "User registered successfully."));
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseMessage> loginUser(@RequestBody User user) {
        User existingUser = userService.findByEmail(user.getEmail());
        if (existingUser != null && userService.verifyPassword(user.getPassword(), existingUser.getPassword())) {
            return ResponseEntity.ok(new ResponseMessage(true, "Login successful."));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ResponseMessage(false, "Invalid email or password."));
    }
}
