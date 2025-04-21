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
    submitProfile: 'submit-profile/1/',
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
      return ROUTES[routeKey];
    };
      