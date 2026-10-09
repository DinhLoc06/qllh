package com.uniroom.mapper;
import com.uniroom.dto.request.ScheduleRequest; import com.uniroom.dto.response.ScheduleResponse; import com.uniroom.entity.*;
import org.springframework.stereotype.Component;
@Component public class ScheduleMapper {
  public void update(Schedule x,ScheduleRequest r,Room room){x.setRoom(room);x.setClassSectionCode(r.classSectionCode().trim().toUpperCase());x.setSubjectName(r.subjectName().trim());x.setLecturerName(r.lecturerName());x.setDayOfWeek(r.dayOfWeek());x.setStartTime(r.startTime());x.setEndTime(r.endTime());x.setStartDate(r.startDate());x.setEndDate(r.endDate());x.setStudentCount(r.studentCount());x.setNotes(r.notes());}
  public ScheduleResponse response(Schedule s){Room r=s.getRoom();return new ScheduleResponse(s.getId(),r.getId(),r.getCode(),r.getBuilding().getCode(),s.getClassSectionCode(),s.getSubjectName(),s.getLecturerName(),s.getDayOfWeek(),s.getStartTime(),s.getEndTime(),s.getStartDate(),s.getEndDate(),s.getStudentCount(),s.getNotes(),s.getCreatedAt(),s.getUpdatedAt());}
}
