package com.lgfh.crudspringbootreactjs.security.domain;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Objects;

import static javax.persistence.GenerationType.AUTO;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@NoArgsConstructor
@AllArgsConstructor
public class AppUser {
    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;
    private String name;
    @Column(unique = true)
    private String userName;
    private String password;
    // fetch = FetchType.EAGER es para que se obtengan tambien los roles en las peticiones
    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<AppRole> roles = new ArrayList<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        AppUser appUser = (AppUser) o;
        return id != null && Objects.equals(id, appUser.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

