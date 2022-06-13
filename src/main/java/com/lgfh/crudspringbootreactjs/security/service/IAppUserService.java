package com.lgfh.crudspringbootreactjs.security.service;

import com.lgfh.crudspringbootreactjs.security.domain.AppRole;
import com.lgfh.crudspringbootreactjs.security.domain.AppUser;

import java.util.List;

public interface IAppUserService {

    AppUser saveAppUser(AppUser appUser);

    AppRole saveAppRole(AppRole appRol);

    void addAppRoleToUser(String username, String rolName);

    AppUser getAppUser(String username);

    /**
     * Este metodo deberia ser paginado, porque no existe un caso de uso optimo para retornar
     * toda la coleccion de usuarios
     */
    List<AppUser> getAppUsers();
}
