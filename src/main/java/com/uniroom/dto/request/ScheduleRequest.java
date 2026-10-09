package com.uniroom.dto.request;
import jakarta.validation.constraints.*;
import java.time.*;
public record ScheduleRequest(@NotNull Long roomId, @NotBlank @Size(max=50) String classSectionCode, @NotBlank @Size(max=150) String subjectName, @Size(max=100) String lecturerName, @NotNull @Min(1) @Max(7) Integer dayOfWeek, @NotNull LocalTime startTime, @NotNull LocalTime endTime, @NotNull LocalDate startDate, @NotNull LocalDate endDate, @PositiveOrZero Integer studentCount, String notes) {}
