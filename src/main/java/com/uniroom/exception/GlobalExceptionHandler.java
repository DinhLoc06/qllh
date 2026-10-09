package com.uniroom.exception;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import java.time.OffsetDateTime;
import java.util.*;

@RestControllerAdvice
public class GlobalExceptionHandler {
  record ApiError(OffsetDateTime timestamp,int status,String error,String message,String path,Map<String,String> fields) {}
  private ResponseEntity<ApiError> response(HttpStatus s,String m,String p,Map<String,String> f){return ResponseEntity.status(s).body(new ApiError(OffsetDateTime.now(),s.value(),s.getReasonPhrase(),m,p,f));}
  @ExceptionHandler(ResourceNotFoundException.class) ResponseEntity<ApiError> notFound(RuntimeException e,HttpServletRequest r){return response(HttpStatus.NOT_FOUND,e.getMessage(),r.getRequestURI(),null);}
  @ExceptionHandler(ConflictException.class) ResponseEntity<ApiError> conflict(RuntimeException e,HttpServletRequest r){return response(HttpStatus.CONFLICT,e.getMessage(),r.getRequestURI(),null);}
  @ExceptionHandler({BadRequestException.class,IllegalArgumentException.class}) ResponseEntity<ApiError> bad(RuntimeException e,HttpServletRequest r){return response(HttpStatus.BAD_REQUEST,e.getMessage(),r.getRequestURI(),null);}
  @ExceptionHandler(MethodArgumentNotValidException.class) ResponseEntity<ApiError> validation(MethodArgumentNotValidException e,HttpServletRequest r){Map<String,String> f=new LinkedHashMap<>(); e.getBindingResult().getFieldErrors().forEach(x->f.putIfAbsent(x.getField(),x.getDefaultMessage())); return response(HttpStatus.BAD_REQUEST,"Dữ liệu không hợp lệ",r.getRequestURI(),f);}
  @ExceptionHandler(DataIntegrityViolationException.class) ResponseEntity<ApiError> integrity(DataIntegrityViolationException e,HttpServletRequest r){return response(HttpStatus.CONFLICT,"Dữ liệu xung đột với ràng buộc hệ thống",r.getRequestURI(),null);}
  @ExceptionHandler(Exception.class) ResponseEntity<ApiError> unexpected(Exception e,HttpServletRequest r){return response(HttpStatus.INTERNAL_SERVER_ERROR,"Đã xảy ra lỗi nội bộ",r.getRequestURI(),null);}
}
