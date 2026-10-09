package com.uniroom.controller;
import com.uniroom.dto.request.RoomRequest; import com.uniroom.dto.response.*; import com.uniroom.entity.Room; import com.uniroom.service.*;
import jakarta.validation.Valid; import org.springframework.data.domain.*; import org.springframework.data.web.PageableDefault; import org.springframework.format.annotation.DateTimeFormat; import org.springframework.http.*; import org.springframework.web.bind.annotation.*; import java.time.*; import java.util.*;
@RestController @RequestMapping("/api/rooms")
public class RoomController {
  private final RoomService service; private final ScheduleService schedules; public RoomController(RoomService s,ScheduleService sc){service=s;schedules=sc;}
  @GetMapping public Page<RoomResponse> list(@RequestParam(required=false) String q,@RequestParam(required=false) Long buildingId,@RequestParam(required=false) String type,@RequestParam(required=false) Room.Status status,@RequestParam(required=false) Integer minCapacity,@PageableDefault(size=20,sort="code") Pageable p){return service.list(q,buildingId,type,status,minCapacity,p);}
  @GetMapping("/{id}") public RoomResponse get(@PathVariable Long id){return service.get(id);}
  @GetMapping("/{id}/schedules") public List<ScheduleResponse> schedules(@PathVariable Long id){return schedules.byRoom(id);}
  @GetMapping("/available") public List<RoomResponse> available(@RequestParam @DateTimeFormat(iso=DateTimeFormat.ISO.DATE) LocalDate date,@RequestParam @DateTimeFormat(iso=DateTimeFormat.ISO.TIME) LocalTime startTime,@RequestParam @DateTimeFormat(iso=DateTimeFormat.ISO.TIME) LocalTime endTime,@RequestParam(required=false) Integer capacity){return service.available(date,startTime,endTime,capacity);}
  @PostMapping public ResponseEntity<RoomResponse> create(@Valid @RequestBody RoomRequest r){return ResponseEntity.status(HttpStatus.CREATED).body(service.create(r));}
  @PutMapping("/{id}") public RoomResponse update(@PathVariable Long id,@Valid @RequestBody RoomRequest r){return service.update(id,r);}
  @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable Long id){service.delete(id);}
}
