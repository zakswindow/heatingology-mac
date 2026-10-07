export enum PATHNAMES {
    HOMEPAGE = "/",
    HOOMEPAGE_HOME = "/",
    SERVICE_BOILER = "/service/boiler",
    SERVICE_BOILER_REPAIR = "/service/boilerRepair",
    SERVICE_BOILER_SERVICE = "/service/boilerServicing",
    SERVICE_HEAT_PUMP = "/service/heatPump",
    SERVICE_EV_CHARGER = "/service/evCharger"


}
export function isHomePage (pathname: string) {
    return pathname === PATHNAMES.HOMEPAGE || pathname === PATHNAMES.HOOMEPAGE_HOME;
}

export function isServicePage (pathname: string) {
    switch (pathname) {
        case PATHNAMES.SERVICE_BOILER:
        case PATHNAMES.SERVICE_BOILER_SERVICE:
        case PATHNAMES.SERVICE_BOILER_REPAIR:
        case PATHNAMES.SERVICE_EV_CHARGER:
        case PATHNAMES.SERVICE_HEAT_PUMP:
            return true;
        default:
            return false;
    }
}

export function isElementOutOfView ({ id }: { id: string }) {
    const scrollThreshold = document.getElementById(id)?.clientHeight || 0;
    const currentScrollY = window.scrollY || document.documentElement.scrollTop;
          
    const scrolled = currentScrollY > scrollThreshold;
    return scrolled;

}

export function isElementInView ({ id }: { id: string }) {
    const element = document.getElementById(id);

    if (!element) {
        return false;
    }

    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    const verticalInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    const horizontalInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);
  
    return verticalInView && horizontalInView;
}