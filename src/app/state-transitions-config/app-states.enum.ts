/**
 * All the view states handled by the application
 * These states follow a naming convention like:
 *  Upper case of (trigger event + process result event like AppEvent.success or AppEvent.error)
 */
export enum AppState {
    UNKNOWN = "UNKNOWN",
    HOMESUCCESS = "HOMESUCCESS",
    PRODUCTSSUCCESS = "PRODUCTSSUCCESS",
    PRODUCTSUCCESS = "PRODUCTSUCCESS"
}