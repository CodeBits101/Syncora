package com.syncora.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ChangePassDto {
  private String currentPassword; 
  private String newPassword ; 
}
