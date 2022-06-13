package com.lgfh.crudspringbootreactjs.security.service;

import com.lgfh.crudspringbootreactjs.security.domain.AppRole;


public interface IAppRoleService {

    AppRole findByName(String rolName);
}
