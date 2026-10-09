package com.uniroom.service;
import com.uniroom.dto.request.RoomRequest; import com.uniroom.entity.*; import com.uniroom.exception.ConflictException; import com.uniroom.mapper.RoomMapper; import com.uniroom.repository.*;
import org.junit.jupiter.api.Test; import static org.junit.jupiter.api.Assertions.*; import static org.mockito.Mockito.*;
class RoomServiceTest {
  @Test void duplicateCodeInBuildingIsRejected(){RoomRepository rooms=mock(RoomRepository.class);Building b=new Building();b.setId(1L);BuildingService bs=mock(BuildingService.class);when(bs.find(1L)).thenReturn(b);when(rooms.existsByBuildingIdAndCodeIgnoreCase(1L,"A101")).thenReturn(true);RoomService service=new RoomService(rooms,bs,mock(ScheduleRepository.class),new RoomMapper());assertThrows(ConflictException.class,()->service.create(new RoomRequest(1L,"A101","Room",40,"LECTURE",Room.Status.AVAILABLE,null)));}
}
