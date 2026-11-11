package com.devspace.console.auth;

import com.devspace.console.security.JwtService;
import com.devspace.console.user.AppUser;
import com.devspace.console.user.AppUserRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AppUserRepository users;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(
            AppUserRepository users,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {
        this.users = users;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        AppUser user = users.findByUsername(request.username()).orElse(null);
        if (user == null || !passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid username or password."));
        }

        return ResponseEntity.ok(new LoginResponse(
                jwtService.issueToken(user.getUsername()),
                "Bearer",
                jwtService.getExpirationSeconds(),
                new UserSummary(user.getUsername())));
    }

    @GetMapping("/me")
    public Map<String, UserSummary> currentUser(Authentication authentication) {
        return Map.of("user", new UserSummary(authentication.getName()));
    }

    public record LoginRequest(
            @NotBlank @Size(max = 80) String username,
            @NotBlank @Size(max = 256) String password) {
    }

    public record LoginResponse(
            String accessToken,
            String tokenType,
            long expiresIn,
            UserSummary user) {
    }

    public record UserSummary(String username) {
    }
}
