package com.lgfh.crudspringbootreactjs.security.repository;

import com.lgfh.crudspringbootreactjs.security.domain.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IAppUserRepository extends JpaRepository<AppUser, Long> {
    AppUser findByUserName(String username);
}
