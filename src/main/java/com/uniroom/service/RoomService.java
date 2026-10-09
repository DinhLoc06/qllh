package com.uniroom.service;
import com.uniroom.dto.request.RoomRequest; import com.uniroom.dto.response.*; import com.uniroom.entity.*; import com.uniroom.exception.*; import com.uniroom.mapper.RoomMapper; import com.uniroom.repository.*;
import org.springframework.data.domain.*; import org.springframework.stereotype.Service; import org.springframework.transaction.annotation.Transactional;
import java.time.*; import java.util.*;
@Service @Transactional(readOnly=true)
public class RoomService {
  private final RoomRepository repo; private final BuildingService buildings; private final ScheduleRepository schedules; private final RoomMapper mapper;
  public RoomService(RoomRepository r,BuildingService b,ScheduleRepository s,RoomMapper m){repo=r;buildings=b;schedules=s;mapper=m;}
  public Page<RoomResponse> list(String q,Long buildingId,String type,Room.Status status,Integer minCapacity,Pageable p){return repo.search(blank(q),buildingId,blank(type),status,minCapacity,p).map(mapper::response);}
  public RoomResponse get(Long id){return mapper.response(find(id));}
  @Transactional public RoomResponse create(RoomRequest r){Building b=buildings.find(r.buildingId());if(repo.existsByBuildingIdAndCodeIgnoreCase(b.getId(),r.code()))throw new ConflictException("Mã phòng đã tồn tại trong tòa nhà");Room x=new Room();mapper.update(x,r,b);return mapper.response(repo.save(x));}
  @Transactional public RoomResponse update(Long id,RoomRequest r){Room x=find(id);Building b=buildings.find(r.buildingId());if(repo.existsByBuildingIdAndCodeIgnoreCaseAndIdNot(b.getId(),r.code(),id))throw new ConflictException("Mã phòng đã tồn tại trong tòa nhà");mapper.update(x,r,b);return mapper.response(repo.save(x));}
  @Transactional public void delete(Long id){Room r=find(id);if(schedules.existsByRoomId(id))throw new ConflictException("Không thể xóa phòng đang có lịch học");repo.delete(r);}
  public List<RoomResponse> available(LocalDate date,LocalTime start,LocalTime end,Integer capacity){if(date==null||start==null||end==null||!start.isBefore(end))throw new BadRequestException("Cần ngày và khoảng giờ hợp lệ");Set<Long> occupied=schedules.occupied(date.getDayOfWeek().getValue(),date,start,end).stream().map(s->s.getRoom().getId()).collect(java.util.stream.Collectors.toSet());return repo.search(null,null,null,Room.Status.AVAILABLE,capacity,Pageable.unpaged()).stream().filter(r->!occupied.contains(r.getId())).map(mapper::response).toList();}
  public Room find(Long id){return repo.findById(id).orElseThrow(()->new ResourceNotFoundException("Không tìm thấy phòng"));}
  private String blank(String s){return s==null||s.isBlank()?null:s;}
}
