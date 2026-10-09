package com.uniroom.dto.response;
import java.time.*;
public record ScheduleResponse(Long id,Long roomId,String roomCode,String buildingCode,String classSectionCode,String subjectName,String lecturerName,Integer dayOfWeek,LocalTime startTime,LocalTime endTime,LocalDate startDate,LocalDate endDate,Integer studentCount,String notes,OffsetDateTime createdAt,OffsetDateTime updatedAt) {}
