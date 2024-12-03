package com.lms.model;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.sql.Date;
import java.text.SimpleDateFormat;

@Component
public class JsonDataSerializer extends JsonSerializer<Date> {

    @Override
    public void serialize(java.sql.Date date, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-MM-yyyy");
        String dateString = simpleDateFormat.format(date);
        gen.writeString(dateString);
    }

}
