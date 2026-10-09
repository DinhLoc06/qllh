package com.uniroom.repository;
import com.uniroom.entity.Room;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.*;
public interface RoomRepository extends JpaRepository<Room,Long> {
  boolean existsByBuildingId(Long id); boolean existsByBuildingIdAndCodeIgnoreCase(Long buildingId,String code);
  boolean existsByBuildingIdAndCodeIgnoreCaseAndIdNot(Long buildingId,String code,Long id);
  List<Room> findByBuildingIdOrderByCode(Long id);
  @Query("select r from Room r where (:q is null or lower(r.code) like lower(concat('%',:q,'%')) or lower(coalesce(r.name,'')) like lower(concat('%',:q,'%'))) and (:buildingId is null or r.building.id=:buildingId) and (:type is null or lower(r.roomType)=lower(:type)) and (:status is null or r.status=:status) and (:minCapacity is null or r.capacity>=:minCapacity)")
  Page<Room> search(@Param("q") String q,@Param("buildingId") Long buildingId,@Param("type") String type,@Param("status") Room.Status status,@Param("minCapacity") Integer minCapacity,Pageable pageable);
}
