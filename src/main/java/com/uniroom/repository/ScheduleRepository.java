package com.uniroom.repository;
import com.uniroom.entity.Schedule;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.time.*;
import java.util.*;
public interface ScheduleRepository extends JpaRepository<Schedule,Long> {
  boolean existsByRoomId(Long roomId);
  List<Schedule> findByRoomIdOrderByStartDateAscStartTimeAsc(Long id);
  List<Schedule> findByClassSectionCodeIgnoreCaseOrderByStartDateAscStartTimeAsc(String code);
  @Query("select s from Schedule s where (:q is null or lower(s.classSectionCode) like lower(concat('%',:q,'%')) or lower(s.subjectName) like lower(concat('%',:q,'%')) or lower(coalesce(s.lecturerName,'')) like lower(concat('%',:q,'%'))) and (:roomId is null or s.room.id=:roomId) and (:day is null or s.dayOfWeek=:day) and (:fromDate is null or s.endDate>=:fromDate) and (:toDate is null or s.startDate<=:toDate)")
  Page<Schedule> search(@Param("q") String q,@Param("roomId") Long roomId,@Param("day") Integer day,@Param("fromDate") LocalDate fromDate,@Param("toDate") LocalDate toDate,Pageable pageable);
  @Query("select s from Schedule s where s.id<>:excludeId and s.dayOfWeek=:day and s.startDate<=:endDate and s.endDate>=:startDate and s.startTime<:endTime and s.endTime>:startTime and (s.room.id=:roomId or lower(s.classSectionCode)=lower(:classCode))")
  List<Schedule> conflicts(@Param("excludeId") Long excludeId,@Param("roomId") Long roomId,@Param("classCode") String classCode,@Param("day") Integer day,@Param("startDate") LocalDate startDate,@Param("endDate") LocalDate endDate,@Param("startTime") LocalTime startTime,@Param("endTime") LocalTime endTime);
  @Query("select s from Schedule s where s.dayOfWeek=:day and s.startDate<=:date and s.endDate>=:date and s.startTime<:endTime and s.endTime>:startTime")
  List<Schedule> occupied(@Param("day") Integer day,@Param("date") LocalDate date,@Param("startTime") LocalTime startTime,@Param("endTime") LocalTime endTime);
}
