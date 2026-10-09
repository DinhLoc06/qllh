package com.uniroom.service;
import com.uniroom.dto.request.ScheduleRequest; import com.uniroom.dto.response.ScheduleResponse; import com.uniroom.entity.*; import com.uniroom.exception.*; import com.uniroom.mapper.ScheduleMapper; import com.uniroom.repository.ScheduleRepository;
import org.springframework.data.domain.*; import org.springframework.jdbc.core.JdbcTemplate; import org.springframework.stereotype.Service; import org.springframework.transaction.annotation.*;
import java.time.*; import java.time.temporal.TemporalAdjusters; import java.util.*;
@Service @Transactional(readOnly=true)
public class ScheduleService {
  private final ScheduleRepository repo; private final RoomService rooms; private final ScheduleMapper mapper; private final JdbcTemplate jdbc;
  public ScheduleService(ScheduleRepository r,RoomService rs,ScheduleMapper m,JdbcTemplate j){repo=r;rooms=rs;mapper=m;jdbc=j;}
  public Page<ScheduleResponse> list(String q,Long roomId,Integer day,LocalDate from,LocalDate to,Pageable p){return repo.search(blank(q),roomId,day,from,to,p).map(mapper::response);}
  public ScheduleResponse get(Long id){return mapper.response(find(id));}
  public List<ScheduleResponse> byRoom(Long id){rooms.find(id);return repo.findByRoomIdOrderByStartDateAscStartTimeAsc(id).stream().map(mapper::response).toList();}
  public List<ScheduleResponse> byClass(String code){return repo.findByClassSectionCodeIgnoreCaseOrderByStartDateAscStartTimeAsc(code).stream().map(mapper::response).toList();}
  public List<ScheduleResponse> weekly(LocalDate date){LocalDate base=date==null?LocalDate.now():date;LocalDate monday=base.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));return repo.search(null,null,null,monday,monday.plusDays(6),Pageable.unpaged()).stream().map(mapper::response).toList();}
  @Transactional(isolation=Isolation.READ_COMMITTED) public ScheduleResponse create(ScheduleRequest r){lock();Room room=validate(r,-1L);Schedule s=new Schedule();mapper.update(s,r,room);return mapper.response(repo.save(s));}
  @Transactional(isolation=Isolation.READ_COMMITTED) public ScheduleResponse update(Long id,ScheduleRequest r){lock();Schedule s=find(id);Room room=validate(r,id);mapper.update(s,r,room);return mapper.response(repo.save(s));}
  @Transactional public void delete(Long id){repo.delete(find(id));}
  private Room validate(ScheduleRequest r,Long exclude){if(!r.startTime().isBefore(r.endTime()))throw new BadRequestException("Giờ bắt đầu phải trước giờ kết thúc");if(r.startDate().isAfter(r.endDate()))throw new BadRequestException("Ngày bắt đầu phải trước hoặc bằng ngày kết thúc");if(!hasDay(r.startDate(),r.endDate(),r.dayOfWeek()))throw new BadRequestException("Khoảng ngày không chứa thứ đã chọn");Room room=rooms.find(r.roomId());if(room.getStatus()!=Room.Status.AVAILABLE)throw new ConflictException("Phòng không ở trạng thái sẵn sàng");if(r.studentCount()!=null&&r.studentCount()>room.getCapacity())throw new ConflictException("Sĩ số vượt quá sức chứa phòng");List<Schedule> conflicts=repo.conflicts(exclude,room.getId(),r.classSectionCode(),r.dayOfWeek(),r.startDate(),r.endDate(),r.startTime(),r.endTime()).stream().filter(s->hasDay(max(r.startDate(),s.getStartDate()),min(r.endDate(),s.getEndDate()),r.dayOfWeek())).toList();if(!conflicts.isEmpty()){boolean roomConflict=conflicts.stream().anyMatch(s->s.getRoom().getId().equals(room.getId()));throw new ConflictException(roomConflict?"Phòng đã có lịch trong thời gian này":"Lớp học phần đã có lịch trong thời gian này");}return room;}
  private void lock(){
    Integer result=jdbc.execute((org.springframework.jdbc.core.ConnectionCallback<Integer>) connection->{
      try(var call=connection.prepareCall("{? = call sys.sp_getapplock(?, ?, ?, ?)}")){
        call.registerOutParameter(1,java.sql.Types.INTEGER); call.setString(2,"uniroom_schedule_conflict");
        call.setString(3,"Exclusive"); call.setString(4,"Transaction"); call.setInt(5,10000); call.execute(); return call.getInt(1);
      }
    });
    if(result==null||result<0) throw new ConflictException("Không thể khóa kiểm tra lịch; vui lòng thử lại");
  }
  static boolean hasDay(LocalDate start,LocalDate end,int day){int delta=Math.floorMod(day-start.getDayOfWeek().getValue(),7);return !start.plusDays(delta).isAfter(end);}
  private LocalDate max(LocalDate a,LocalDate b){return a.isAfter(b)?a:b;} private LocalDate min(LocalDate a,LocalDate b){return a.isBefore(b)?a:b;}
  private String blank(String s){return s==null||s.isBlank()?null:s;}
  public Schedule find(Long id){return repo.findById(id).orElseThrow(()->new ResourceNotFoundException("Không tìm thấy lịch học"));}
}
