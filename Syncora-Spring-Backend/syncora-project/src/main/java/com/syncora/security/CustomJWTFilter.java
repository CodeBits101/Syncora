package com.syncora.security;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;


@Component
@AllArgsConstructor
public class CustomJWTFilter extends OncePerRequestFilter {
	private final JwtUtils jwtUtils;

	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		//1. check for "Authorization" - request header n get its value
				String headerValue=request.getHeader("Authorization");
				//2. chk for null n starts with Bearer 
				if(headerValue != null && headerValue.startsWith("Bearer ")) {
					//=> JWT exists as Bearer token
					//3. extract JWT
					String jwt=headerValue.substring(7);
					//4. Validate JWT n fill up auth object
					Authentication populatedAuthenticationTokenFromJWT 
					= jwtUtils.populateAuthenticationTokenFromJWT(jwt);
					System.out.println(populatedAuthenticationTokenFromJWT);
					//5. Add authentication object - under spring security context holder
					SecurityContextHolder
					.getContext()
					.setAuthentication(populatedAuthenticationTokenFromJWT);
					
				}
				//last step - continue with remaining filter chain
				filterChain.doFilter(request, response);
				

	}

}
