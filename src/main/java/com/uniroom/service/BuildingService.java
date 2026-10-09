package com.uniroom.service;
import com.uniroom.dto.request.BuildingRequest; import com.uniroom.dto.response.*; import com.uniroom.entity.Building; import com.uniroom.exception.*; import com.uniroom.mapper.*; import com.uniroom.repository.*;
import org.springframework.data.domain.*; import org.springframework.stereotype.Service; import org.springframework.transaction.annotation.Transactional;
import java.util.*;
@Service @Transactional(readOnly=true)
public class BuildingService {
  private final BuildingRepository repo; private final RoomRepository rooms; private final BuildingMapper mapper; private final RoomMapper roomMapper;
  public BuildingService(BuildingRepository r,RoomRepository rooms,BuildingMapper m,RoomMapper rm){repo=r;this.rooms=rooms;mapper=m;roomMapper=rm;}
  public Page<BuildingResponse> list(String q,Pageable p){Page<Building> page=(q==null||q.isBlank())?repo.findAll(p):repo.findByCodeContainingIgnoreCaseOrNameContainingIgnoreCase(q,q,p);return page.map(b->mapper.response(b,rooms.findByBuildingIdOrderByCode(b.getId()).size()));}
  public BuildingResponse get(Long id){Building b=find(id);return mapper.response(b,rooms.findByBuildingIdOrderByCode(id).size());}
  public List<RoomResponse> rooms(Long id){find(id);return rooms.findByBuildingIdOrderByCode(id).stream().map(roomMapper::response).toList();}
  @Transactional public BuildingResponse create(BuildingRequest r){if(repo.existsByCodeIgnoreCase(r.code()))throw new ConflictException("Mã tòa nhà đã tồn tại");Building b=new Building();mapper.update(b,r);return mapper.response(repo.save(b),0);}
  @Transactional public BuildingResponse update(Long id,BuildingRequest r){Building b=find(id);if(repo.existsByCodeIgnoreCaseAndIdNot(r.code(),id))throw new ConflictException("Mã tòa nhà đã tồn tại");mapper.update(b,r);return mapper.response(repo.save(b),rooms.findByBuildingIdOrderByCode(id).size());}
  @Transactional public void delete(Long id){Building b=find(id);if(rooms.existsByBuildingId(id))throw new ConflictException("Không thể xóa tòa nhà đang có phòng");repo.delete(b);}
  public Building find(Long id){return repo.findById(id).orElseThrow(()->new ResourceNotFoundException("Không tìm thấy tòa nhà"));}
}
