import { AppEvent } from "./app-events.enum";
import { AppState } from "./app-states.enum";
import { AppData } from "./app-data.model";
import { UserRole } from "./user-role.enum";

/**
 * A utility class used by the Smart Component
 */
export class AppEventModel {
    appEvent = AppEvent.unknown;
    appState = AppState.UNKNOWN;
    appData  = new AppData();
    requiredRoles?: UserRole[] = [];
    message?: any;

    constructor() {
    }
}

