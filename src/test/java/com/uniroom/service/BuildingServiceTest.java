package com.uniroom.service;
import com.uniroom.dto.request.BuildingRequest; import com.uniroom.exception.ConflictException; import com.uniroom.mapper.*; import com.uniroom.repository.*;
import org.junit.jupiter.api.*; import org.mockito.*;
import static org.junit.jupiter.api.Assertions.*; import static org.mockito.Mockito.*;
class BuildingServiceTest {
  @Test void duplicateCodeIsRejected(){BuildingRepository buildings=mock(BuildingRepository.class);when(buildings.existsByCodeIgnoreCase("A1")).thenReturn(true);BuildingService service=new BuildingService(buildings,mock(RoomRepository.class),new BuildingMapper(),new RoomMapper());assertThrows(ConflictException.class,()->service.create(new BuildingRequest("A1","Nhà A",null,null)));}
}
