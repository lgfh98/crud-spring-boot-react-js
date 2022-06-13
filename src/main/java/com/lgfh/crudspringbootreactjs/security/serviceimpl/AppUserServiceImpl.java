package com.lgfh.crudspringbootreactjs.security.serviceimpl;

import com.lgfh.crudspringbootreactjs.security.domain.AppRole;
import com.lgfh.crudspringbootreactjs.security.domain.AppUser;
import com.lgfh.crudspringbootreactjs.security.repository.IAppRoleRepository;
import com.lgfh.crudspringbootreactjs.security.repository.IAppUserRepository;
import com.lgfh.crudspringbootreactjs.security.service.IAppUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AppUserServiceImpl implements IAppUserService {

    /*
    Esto se maneja solo con @RequiredArgsConstructor
     */
    private final IAppUserRepository appUserDao;
    private final IAppRoleRepository appRoleDao;

    @Override
    public AppUser saveAppUser(AppUser appUser) {
        return appUserDao.save(appUser);
    }

    @Override
    public AppRole saveAppRole(AppRole appRol) {
        return null;
    }

    @Override
    public void addAppRoleToUser(String username, String rolName) {
        AppUser appUser = appUserDao.findByUserName(username);
        AppRole appRole = appRoleDao.findByName(rolName);
        // No es necesario llamar al repo por esto: @Transactional
        appUser.getRoles().add(appRole);
    }

    @Override
    public AppUser getAppUser(String username) {
        return null;
    }

    @Override
    public List<AppUser> getAppUsers() {
        return null;
    }
}
