package com.syncora.security;



import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.AllArgsConstructor;

@Configuration // to declare config class - equivalent to bean config xml file
@EnableWebSecurity // to enable spring security
@EnableMethodSecurity // later - to enable auth rules at method level
@AllArgsConstructor

public class SecurityConfiguration {
 private final PasswordEncoder passwordEncoder ;  
 private final CustomerUserServiceImpl customUserDetailsServiceImpl;
 private final CustomJWTFilter customJWTFilter;
 
 @Bean
	SecurityFilterChain configureFilterChain(HttpSecurity http) throws Exception {
		// 1. disable CSRF protection
		http.csrf(csrf -> csrf.disable());
		// 2. any request - has to be authenticated
		http.authorizeHttpRequests(

				request -> request
						.requestMatchers(
								"/swagger-ui.html","/swagger-ui/**",
								"/v3/api-docs/**",
								"/employees/register", "/employees/login" ,"/employees/*" ,"/departments/**" )
						.permitAll()
						//only for react apps - permit in flight requests - otherwise CORS error
						.requestMatchers(HttpMethod.OPTIONS).permitAll()
						.requestMatchers(HttpMethod.GET, "/projects").permitAll()
						.requestMatchers(HttpMethod.POST, "/projects").hasRole("MANAGER").anyRequest()
						.authenticated());
		// 3. disable HttpSession tracking - stateless
		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		// 4. To support REST APIs , disable form login
		http.formLogin(form -> form.disable());
		// 5. Disable Basic auth support
		http.httpBasic(basic->basic.disable());
		//add custom jwt filter before usernamepwd auth filter
		http.addFilterBefore(customJWTFilter, 
				UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}
 

	// configure AuthManager as a spring bean
	@Bean
	AuthenticationManager 
	authenticationManager
	(AuthenticationConfiguration config) throws Exception{
		return config.getAuthenticationManager();
	}
}
