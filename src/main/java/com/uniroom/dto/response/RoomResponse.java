package com.uniroom.dto.response;
import com.uniroom.entity.Room;
import java.time.OffsetDateTime;
public record RoomResponse(Long id,Long buildingId,String buildingCode,String buildingName,String code,String name,Integer capacity,String roomType,Room.Status status,String description,OffsetDateTime createdAt,OffsetDateTime updatedAt) {}
