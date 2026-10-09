package com.uniroom.entity;
import jakarta.persistence.*;
import java.time.*;

@Entity @Table(name="schedules")
public class Schedule {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
  @ManyToOne(fetch=FetchType.LAZY,optional=false) @JoinColumn(name="room_id") private Room room;
  @Column(name="class_section_code",nullable=false,length=50) private String classSectionCode;
  @Column(name="subject_name",nullable=false,length=150) private String subjectName;
  @Column(name="lecturer_name",length=100) private String lecturerName;
  @Column(name="day_of_week",nullable=false) private Integer dayOfWeek;
  @Column(name="start_time",nullable=false) private LocalTime startTime; @Column(name="end_time",nullable=false) private LocalTime endTime;
  @Column(name="start_date",nullable=false) private LocalDate startDate; @Column(name="end_date",nullable=false) private LocalDate endDate;
  @Column(name="student_count") private Integer studentCount; @Column(columnDefinition="nvarchar(max)") private String notes;
  @Column(name="created_at",nullable=false,updatable=false) private OffsetDateTime createdAt; @Column(name="updated_at",nullable=false) private OffsetDateTime updatedAt;
  @PrePersist void create(){createdAt=updatedAt=OffsetDateTime.now();} @PreUpdate void update(){updatedAt=OffsetDateTime.now();}
  public Long getId(){return id;} public void setId(Long v){id=v;} public Room getRoom(){return room;} public void setRoom(Room v){room=v;}
  public String getClassSectionCode(){return classSectionCode;} public void setClassSectionCode(String v){classSectionCode=v;} public String getSubjectName(){return subjectName;} public void setSubjectName(String v){subjectName=v;}
  public String getLecturerName(){return lecturerName;} public void setLecturerName(String v){lecturerName=v;} public Integer getDayOfWeek(){return dayOfWeek;} public void setDayOfWeek(Integer v){dayOfWeek=v;}
  public LocalTime getStartTime(){return startTime;} public void setStartTime(LocalTime v){startTime=v;} public LocalTime getEndTime(){return endTime;} public void setEndTime(LocalTime v){endTime=v;}
  public LocalDate getStartDate(){return startDate;} public void setStartDate(LocalDate v){startDate=v;} public LocalDate getEndDate(){return endDate;} public void setEndDate(LocalDate v){endDate=v;}
  public Integer getStudentCount(){return studentCount;} public void setStudentCount(Integer v){studentCount=v;} public String getNotes(){return notes;} public void setNotes(String v){notes=v;}
  public OffsetDateTime getCreatedAt(){return createdAt;} public OffsetDateTime getUpdatedAt(){return updatedAt;}
}
