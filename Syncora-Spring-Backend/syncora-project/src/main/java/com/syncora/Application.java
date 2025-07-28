package com.syncora;

import org.modelmapper.Conditions;

import java.util.Properties;

import org.modelmapper.Condition;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;



@SpringBootApplication // includes @Configuration
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	/*
	 * Configure ModelMapper as spring bean - so thar SC will manage it's life cycle
	 * + provide it as the depcy
	 */
	@Bean // method level annotation - to tell SC , following method
	// rets an object - which has to be managed as a spring bean
	// manages - life cycle +
	public ModelMapper modelMapper() {
		System.out.println("in model mapper creation");
		Condition<?, ?> condition = ctx -> {
		    Object sourceValue = ctx.getSource();
		    if (sourceValue == null) return false;
		    if (sourceValue instanceof Number) return ((Number) sourceValue).doubleValue() != 0.0;
		    if (sourceValue instanceof Boolean) return (Boolean) sourceValue;
		    if (sourceValue instanceof Character) return (Character) sourceValue != '\u0000';
		    return true;
		};
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration()
				/*
				 * To tell ModelMapper to map only those props whose names match in src n dest.
				 * objects
				 */
				.setMatchingStrategy(MatchingStrategies.STRICT)
				/*
				 * To tell ModelMapper not to transfer nulls from src -> dest
				 */
				.setPropertyCondition(Conditions.isNotNull()) //use-case in put
				.setPropertyCondition(condition);		
		return mapper;
     
	}
	
	//configure PasswordEncoder as spring bean
		@Bean
		PasswordEncoder passwordEncoder()
		{
			return new BCryptPasswordEncoder();
		}
		
		

}
