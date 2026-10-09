package com.uniroom.entity;
import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity @Table(name="rooms", uniqueConstraints=@UniqueConstraint(name="uk_room_building_code", columnNames={"building_id","code"}))
public class Room {
  public enum Status { AVAILABLE, MAINTENANCE, INACTIVE }
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
  @ManyToOne(fetch=FetchType.LAZY, optional=false) @JoinColumn(name="building_id") private Building building;
  @Column(nullable=false,length=20) private String code;
  @Column(length=100) private String name;
  @Column(nullable=false) private Integer capacity;
  @Column(name="room_type",nullable=false,length=30) private String roomType;
  @Enumerated(EnumType.STRING) @Column(nullable=false,length=30) private Status status;
  @Column(columnDefinition="nvarchar(max)") private String description;
  @Column(name="created_at",nullable=false,updatable=false) private OffsetDateTime createdAt;
  @Column(name="updated_at",nullable=false) private OffsetDateTime updatedAt;
  @PrePersist void create(){createdAt=updatedAt=OffsetDateTime.now();} @PreUpdate void update(){updatedAt=OffsetDateTime.now();}
  public Long getId(){return id;} public void setId(Long v){id=v;} public Building getBuilding(){return building;} public void setBuilding(Building v){building=v;}
  public String getCode(){return code;} public void setCode(String v){code=v;} public String getName(){return name;} public void setName(String v){name=v;}
  public Integer getCapacity(){return capacity;} public void setCapacity(Integer v){capacity=v;} public String getRoomType(){return roomType;} public void setRoomType(String v){roomType=v;}
  public Status getStatus(){return status;} public void setStatus(Status v){status=v;} public String getDescription(){return description;} public void setDescription(String v){description=v;}
  public OffsetDateTime getCreatedAt(){return createdAt;} public OffsetDateTime getUpdatedAt(){return updatedAt;}
}
