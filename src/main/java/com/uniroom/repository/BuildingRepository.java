package com.uniroom.repository;
import com.uniroom.entity.Building;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
public interface BuildingRepository extends JpaRepository<Building,Long> {
  boolean existsByCodeIgnoreCase(String code);
  boolean existsByCodeIgnoreCaseAndIdNot(String code,Long id);
  Page<Building> findByCodeContainingIgnoreCaseOrNameContainingIgnoreCase(String code,String name,Pageable pageable);
}
