package com.uniroom.controller;
import com.uniroom.dto.request.BuildingRequest; import com.uniroom.dto.response.*; import com.uniroom.service.BuildingService;
import jakarta.validation.Valid; import org.springframework.data.domain.*; import org.springframework.data.web.PageableDefault; import org.springframework.http.*; import org.springframework.web.bind.annotation.*; import java.util.*;
@RestController @RequestMapping("/api/buildings")
public class BuildingController {
  private final BuildingService service; public BuildingController(BuildingService s){service=s;}
  @GetMapping public Page<BuildingResponse> list(@RequestParam(required=false) String q,@PageableDefault(size=20,sort="code") Pageable p){return service.list(q,p);}
  @GetMapping("/{id}") public BuildingResponse get(@PathVariable Long id){return service.get(id);}
  @GetMapping("/{id}/rooms") public List<RoomResponse> rooms(@PathVariable Long id){return service.rooms(id);}
  @PostMapping public ResponseEntity<BuildingResponse> create(@Valid @RequestBody BuildingRequest r){return ResponseEntity.status(HttpStatus.CREATED).body(service.create(r));}
  @PutMapping("/{id}") public BuildingResponse update(@PathVariable Long id,@Valid @RequestBody BuildingRequest r){return service.update(id,r);}
  @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable Long id){service.delete(id);}
}
