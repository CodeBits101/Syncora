package com.syncora.dtos;

import java.util.List;

import com.syncora.enums.EmployeeType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthResp {
	private String message;
    private String jwt ;
    private String role ; 
}
