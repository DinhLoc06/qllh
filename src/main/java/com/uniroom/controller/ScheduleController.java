package com.uniroom.controller;
import com.uniroom.dto.request.ScheduleRequest; import com.uniroom.dto.response.ScheduleResponse; import com.uniroom.service.ScheduleService;
import jakarta.validation.Valid; import org.springframework.data.domain.*; import org.springframework.data.web.PageableDefault; import org.springframework.format.annotation.DateTimeFormat; import org.springframework.http.*; import org.springframework.web.bind.annotation.*; import java.time.*; import java.util.*;
@RestController @RequestMapping("/api/schedules")
public class ScheduleController {
  private final ScheduleService service; public ScheduleController(ScheduleService s){service=s;}
  @GetMapping public Page<ScheduleResponse> list(@RequestParam(required=false) String q,@RequestParam(required=false) Long roomId,@RequestParam(required=false) Integer dayOfWeek,@RequestParam(required=false) @DateTimeFormat(iso=DateTimeFormat.ISO.DATE) LocalDate fromDate,@RequestParam(required=false) @DateTimeFormat(iso=DateTimeFormat.ISO.DATE) LocalDate toDate,@PageableDefault(size=20,sort={"startDate","startTime"}) Pageable p){return service.list(q,roomId,dayOfWeek,fromDate,toDate,p);}
  @GetMapping("/{id}") public ScheduleResponse get(@PathVariable Long id){return service.get(id);}
  @GetMapping("/weekly") public List<ScheduleResponse> weekly(@RequestParam(required=false) @DateTimeFormat(iso=DateTimeFormat.ISO.DATE) LocalDate date){return service.weekly(date);}
  @GetMapping("/class/{code}") public List<ScheduleResponse> byClass(@PathVariable String code){return service.byClass(code);}
  @PostMapping public ResponseEntity<ScheduleResponse> create(@Valid @RequestBody ScheduleRequest r){return ResponseEntity.status(HttpStatus.CREATED).body(service.create(r));}
  @PutMapping("/{id}") public ScheduleResponse update(@PathVariable Long id,@Valid @RequestBody ScheduleRequest r){return service.update(id,r);}
  @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable Long id){service.delete(id);}
}
