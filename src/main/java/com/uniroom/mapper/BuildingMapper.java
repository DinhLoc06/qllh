package com.uniroom.mapper;
import com.uniroom.dto.request.BuildingRequest; import com.uniroom.dto.response.BuildingResponse; import com.uniroom.entity.Building;
import org.springframework.stereotype.Component;
@Component public class BuildingMapper {
  public void update(Building b,BuildingRequest r){b.setCode(r.code().trim().toUpperCase());b.setName(r.name().trim());b.setAddress(r.address());b.setDescription(r.description());}
  public BuildingResponse response(Building b,long rooms){return new BuildingResponse(b.getId(),b.getCode(),b.getName(),b.getAddress(),b.getDescription(),rooms,b.getCreatedAt(),b.getUpdatedAt());}
}
