package com.uniroom.dto.request;
import com.uniroom.entity.Room;
import jakarta.validation.constraints.*;
public record RoomRequest(@NotNull Long buildingId, @NotBlank @Size(max=20) String code, @Size(max=100) String name, @NotNull @Positive Integer capacity, @NotBlank @Size(max=30) String roomType, @NotNull Room.Status status, String description) {}
