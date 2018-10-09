package com.slowlife.table;


import io.github.biezhi.anima.Model;
import io.github.biezhi.anima.annotation.Table;

@Table(name = "love_audit_table")
public class LoveAuditTable extends Model {
    private String id;
    private String loveId;
    private String administratorId;
    private String time;

    public void setTime(String time) {
        this.time = time;
    }

    public String getTime() {
        return time;
    }

    public void setAdministratorId(String administratorId) {
        this.administratorId = administratorId;
    }

    public String getAdministratorId() {
        return administratorId;
    }

    public void setLoveId(String loveId) {
        this.loveId = loveId;
    }

    public String getLoveId() {
        return loveId;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }
}
