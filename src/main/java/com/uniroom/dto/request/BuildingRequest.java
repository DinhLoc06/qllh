package com.uniroom.dto.request;
import jakarta.validation.constraints.*;
public record BuildingRequest(@NotBlank @Size(max=20) String code, @NotBlank @Size(max=100) String name, @Size(max=255) String address, String description) {}
