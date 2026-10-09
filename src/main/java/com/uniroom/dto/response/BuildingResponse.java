package com.uniroom.dto.response;
import java.time.OffsetDateTime;
public record BuildingResponse(Long id,String code,String name,String address,String description,long roomCount,OffsetDateTime createdAt,OffsetDateTime updatedAt) {}
