package com.lgfh.crudspringbootreactjs.security.domain;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import java.util.Objects;

import static javax.persistence.GenerationType.AUTO;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@NoArgsConstructor
@AllArgsConstructor
public class AppRole {
    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;
    private String name;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        AppRole appRole = (AppRole) o;
        return id != null && Objects.equals(id, appRole.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
