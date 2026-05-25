package com.crud.backend.dto.auth;

public class AuthResponse {
    private Long userId;
    private String email;
    private String fullname;
    private String token;

    public AuthResponse(Long userId, String email, String fullname, String token) {
        this.userId = userId;
        this.email = email;
        this.fullname = fullname;
        this.token = token;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
