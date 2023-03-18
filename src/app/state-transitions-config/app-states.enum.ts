/**
 * All the view states handled by the application
 * These states follow a naming convention like:
 *  Upper case of (trigger event + process result event like AppEvent.success or AppEvent.error)
 */
export enum AppState {
    UNKNOWN = "UNKNOWN",
    LOGINVIEW = "LOGINVIEW",
    LOGINSUCCESS = "LOGINSUCCESS",
    LOGINERROR = "LOGINERROR",
    HOMESUCCESS = "HOMESUCCESS",
    ADMINSUCCESS = "ADMINSUCCESS",
    PRODUCTSSUCCESS = "PRODUCTSSUCCESS",
    PRODUCTSUCCESS = "PRODUCTSUCCESS"
}