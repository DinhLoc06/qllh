package com.uniroom.entity;
import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity @Table(name="buildings")
public class Building {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
  @Column(nullable=false, unique=true, length=20) private String code;
  @Column(nullable=false, length=100) private String name;
  @Column(length=255) private String address;
  @Column(columnDefinition="nvarchar(max)") private String description;
  @Column(name="created_at", nullable=false, updatable=false) private OffsetDateTime createdAt;
  @Column(name="updated_at", nullable=false) private OffsetDateTime updatedAt;
  @PrePersist void create(){ createdAt=updatedAt=OffsetDateTime.now(); }
  @PreUpdate void update(){ updatedAt=OffsetDateTime.now(); }
  public Long getId(){return id;} public void setId(Long v){id=v;}
  public String getCode(){return code;} public void setCode(String v){code=v;}
  public String getName(){return name;} public void setName(String v){name=v;}
  public String getAddress(){return address;} public void setAddress(String v){address=v;}
  public String getDescription(){return description;} public void setDescription(String v){description=v;}
  public OffsetDateTime getCreatedAt(){return createdAt;} public OffsetDateTime getUpdatedAt(){return updatedAt;}
}
