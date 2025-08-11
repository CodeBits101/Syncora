package com.syncora.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubtasksRespDto {
	    private Long id;
	    private Long taskId;
	    private Long bugId;
	    private String title;
	

}
