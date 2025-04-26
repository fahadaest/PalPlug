const ROUTES = {
    companiesList: `companies/companies-list/`,
    industriesList: `companies/industries-list/`,
    countriesList: `countries/`,
    languagesList: `locations/languages-list/`,
    joinWaitlist: `users/join-waitlist/`,
    profileRegister: 'users/profile-register/',
    linkedinRegister: `authentication/linkedin-register/`,
    socialRegister: `authentication/social-register/`,
    userRoles: 'users/user-roles/',
    submitProfile: 'submit-profile/',
    submitAllServices: 'services/submitAllServices/',
    getCompanies:"companies/companies-list/",
    collegesByCountry: 'colleges/',
    yearsList: 'years/',
};

export const getRoute = (routeKey, param = '') => {
    if (routeKey === 'collegesByCountry') {
        return `${ROUTES.collegesByCountry}${param}`;
    }
    if (routeKey === 'yearsList') {
        return ROUTES.yearsList;
    }
    if (routeKey === 'submitProfile') {
    const type = typeof param === 'number' ? param : (param === true ? 1 : 2);
    return `submit-profile/${type}/`;
    }
    return ROUTES[routeKey];
};
      