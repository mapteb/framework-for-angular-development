import { AppEvent } from "./app-events.enum";
import { AppState } from "./app-states.enum";
import { AppData } from "./app-data.model";

/**
 * A utility class used by the Smart Component
 */
export class AppEventModel {
    appEvent = AppEvent.unknown;
    appState = AppState.UNKNOWN;
    appData  = new AppData();
    message?: any;

    constructor() {
    }
}

