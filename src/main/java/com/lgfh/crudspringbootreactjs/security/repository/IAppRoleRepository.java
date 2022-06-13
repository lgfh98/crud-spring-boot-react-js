package com.lgfh.crudspringbootreactjs.security.repository;

import com.lgfh.crudspringbootreactjs.security.domain.AppRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IAppRoleRepository extends JpaRepository<AppRole, Long> {
    AppRole findByName(String name);
}
