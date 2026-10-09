package com.uniroom.service;
import org.junit.jupiter.api.Test;
import java.time.LocalDate;
import static org.junit.jupiter.api.Assertions.*;
class ScheduleServiceTest {
  @Test void detectsAnActualWeekdayInsideRange(){assertTrue(ScheduleService.hasDay(LocalDate.of(2026,10,5),LocalDate.of(2026,10,11),1));}
  @Test void rejectsRangeWithoutSelectedWeekday(){assertFalse(ScheduleService.hasDay(LocalDate.of(2026,10,6),LocalDate.of(2026,10,8),1));}
  @Test void handlesSingleMatchingDay(){assertTrue(ScheduleService.hasDay(LocalDate.of(2026,10,9),LocalDate.of(2026,10,9),5));}
}
