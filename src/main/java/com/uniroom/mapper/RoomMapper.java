package com.uniroom.mapper;
import com.uniroom.dto.request.RoomRequest; import com.uniroom.dto.response.RoomResponse; import com.uniroom.entity.*;
import org.springframework.stereotype.Component;
@Component public class RoomMapper {
  public void update(Room x,RoomRequest r,Building b){x.setBuilding(b);x.setCode(r.code().trim().toUpperCase());x.setName(r.name());x.setCapacity(r.capacity());x.setRoomType(r.roomType().trim().toUpperCase());x.setStatus(r.status());x.setDescription(r.description());}
  public RoomResponse response(Room r){Building b=r.getBuilding();return new RoomResponse(r.getId(),b.getId(),b.getCode(),b.getName(),r.getCode(),r.getName(),r.getCapacity(),r.getRoomType(),r.getStatus(),r.getDescription(),r.getCreatedAt(),r.getUpdatedAt());}
}
