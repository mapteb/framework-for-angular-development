import { UserRole } from "../state-transitions-config/user-role.enum";


/**
 * User info
 * 
 */
export class User {
    loginId = '';
    pwd = '';
    name = '';
    role = '';

    constructor(loginId: string, pwd: string, name: string, role: string) {
        this.loginId = loginId;
        this.pwd = pwd;
        this.name = name;
        this.role = role;
    }
}

