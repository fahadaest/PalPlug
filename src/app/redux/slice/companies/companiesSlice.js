import { createSlice } from '@reduxjs/toolkit';
import { fetchCompanies } from '../../action';

const initialState2 = {
  // TODO: Intitialstate2 is all styles that will apply on images when images will be mapped from BE side below are hover and without hover image outline background color etc    

    whiteRoundedImages: {
        Hatch: 'logo-white-hover',
        Abstract: 'logo-white-hover',
        Github: 'logo-white-hover',
        Square: 'logo-white-hover',
        Discord: 'logo-white-hover',
        Terminal: 'logo-white-hover',
        Youtube: 'logo-white-hover',
        Tesla: 'logo-white-hover',
        LinkedIn: 'logo-white-hover',
        Snapchat: 'logo-white-hover',
        Twitter: 'logo-white-hover',
        Dropbox: 'logo-white-hover',
    },
    logoClassNames: {
        Airbnb: 'invert-brightness',
        Hatch: 'invert-brightness',
        Abstract: 'invert-brightness',
        Github: 'invert-brightness',
        Square: 'invert-brightness',
        Discord: 'invert-brightness',
        Terminal: 'invert-brightness',
        Youtube: 'invert-brightness',
        Tesla: 'invert-brightness',
        LinkedIn: 'invert-brightness',
        Snapchat: 'invert-brightness',
        Twitter: 'invert-brightness',
        Dropbox: 'invert-brightness',
    },
};


const getCompaniesSlice = createSlice({
    name: 'companies',
    initialState: {
      companyStyles: {
        Netflix: 'hover:bg-companies-netflix-black',
        Google: 'hover:bg-companies-google-blue',
        Slack: 'hover:bg-companies-slack-purple',
        Airbnb: 'hover:bg-companies-airbnb-pink',
        Twitch: 'hover:bg-companies-twitch',
        Spotify: 'hover:bg-companies-spotify',
        Pinterest: 'hover:bg-othercompanies-pinterest',
        Snapchat: 'hover:bg-othercompanies-snapchat',
        LinkedIn: 'hover:bg-othercompanies-linkedin',
        Discord: 'hover:bg-othercompanies-discord',
        Tiktok: 'hover:bg-othercompanies-tiktok',
        Tesla: 'hover:bg-othercompanies-tesla',
        Shopify: 'hover:bg-othercompanies-shopify',
        Twitter: 'hover:bg-othercompanies-twitter',
        Microsoft: 'hover:bg-othercompanies-microsoft',
        Adobe: 'hover:bg-othercompanies-adobe',
        Telegram: 'hover:bg-othercompanies-telegram',
        Youtube: 'hover:bg-othercompanies-youtube',
        Paypal: 'hover:bg-othercompanies-paypal',
        Instagram: 'hover:bg-othercompanies-instagram',
        Airtable: 'hover:bg-othercompanies-airtable',
        Dropbox: 'hover:bg-othercompanies-dropbox',
        Duolingo: 'hover:bg-othercompanies-duolingo',
        Facebook: 'hover:bg-othercompanies-facebook',
        Figma: 'hover:bg-othercompanies-figma',
        Github: 'hover:bg-othercompanies-github',
        Square: 'hover:bg-othercompanies-square',
        Terminal: 'hover:bg-othercompanies-terminal',
        Hatch: 'hover:bg-othercompanies-hatch',
        Abstract: 'hover:bg-othercompanies-abstract',
    },
    jobFunctions: ['Product Design', 'Software Development', 'Systems Engineering'],
    priceRanges: ['$0-$20', '$0-$30', '$0-$40'],
    ratings: ['4.0-5.0', '4.5-5.0', '5.0'],
      companies: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchCompanies.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchCompanies.fulfilled, (state, action) => {
          state.loading = false;
          state.companies = action.payload; 
        })
        .addCase(fetchCompanies.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export default getCompaniesSlice.reducer;

export const selectJobFunctions = (state) => state.companies.jobFunctions;
export const selectPriceRanges = (state) => state.companies.priceRanges;
export const selectRatings = (state) => state.companies.ratings;
export const selectCompanies = (state) => state.companies.companies;
export const selectOtherCompanies = (state) => state.companies.otherCompanies;
export const selectCompanyStyles = (state) => state.companies.companyStyles;
export const selectLogoClassNames = (state) => state.companies.logoClassNames;
export const selectWhiteRoundedImges = (state) =>
    state.companies.whiteRoundedImages;






