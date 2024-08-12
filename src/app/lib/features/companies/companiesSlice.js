import { createSlice } from '@reduxjs/toolkit';
import Netflix from '@/assets/images/Netflix.svg';
import Slack from '@/assets/images/Slack.svg';
import Airbnb from '@/assets/images/Airbnb.svg';
import Google from '@/assets/images/Google.svg';
import Spotify from '@/assets/images/Spotify.svg';
import Twitch from '@/assets/images/Twitch.svg';
import Pinterest from '@/assets/images/Pinterest.svg';
import Snapchat from '@/assets/images/Snap.svg';
import LinkedIn from '@/assets/images/LinkedIn.svg';
import Discord from '@/assets/images/Discord.svg';
import Tiktok from '@/assets/images/TikTok.svg';
import Tesla from '@/assets/images/Tesla.svg';
import Shopify from '@/assets/images/Shopify.svg';
import Twitter from '@/assets/images/Twitter.svg';
import Microsoft from '@/assets/images/Microsoft.svg';
import Adobe from '@/assets/images/Adobe.svg';
import Telegram from '@/assets/images/Telegram.svg';
import Youtube from '@/assets/images/YouTube.svg';
import Paypal from '@/assets/images/PayPal.svg';
import Instagram from '@/assets/images/Instagram.svg';
import Airtable from '@/assets/images/Airtable.svg';
import Dropbox from '@/assets/images/Dropbox.svg';
import Duolingo from '@/assets/images/Duolingo.svg';
import Facebook from '@/assets/images/Facebook.svg';
import Figma from '@/assets/images/Figma.svg';
import Github from '@/assets/images/GitHub.svg';
import Square from '@/assets/images/Square.svg';
import Terminal from '@/assets/images/Terminal.svg';
import Hatch from '@/assets/images/Hatch.svg';
import Abstract from '@/assets/images/Abstract.svg';

const initialState = {
    companies: [
        { name: 'Netflix', image: Netflix },
        { name: 'Slack', image: Slack },
        { name: 'Airbnb', image: Airbnb },
        { name: 'Google', image: Google },
        { name: 'Spotify', image: Spotify },
        { name: 'Twitch', image: Twitch },
    ],

    otherCompanies: [
        { name: 'Pinterest', image: Pinterest },
        { name: 'Snapchat', image: Snapchat },
        { name: 'LinkedIn', image: LinkedIn },
        { name: 'Discord', image: Discord },
        { name: 'Tiktok', image: Tiktok },
        { name: 'Tesla', image: Tesla },
        { name: 'Shopify', image: Shopify },
        { name: 'Twitter', image: Twitter },
        { name: 'Microsoft', image: Microsoft },
        { name: 'Adobe', image: Adobe },
        { name: 'Telegram', image: Telegram },
        { name: 'Youtube', image: Youtube },
        { name: 'Paypal', image: Paypal },
        { name: 'Instagram', image: Instagram },
        { name: 'Airtable', image: Airtable },
        { name: 'Dropbox', image: Dropbox },
        { name: 'Duolingo', image: Duolingo },
        { name: 'Facebook', image: Facebook },
        { name: 'Figma', image: Figma },
        { name: 'Github', image: Github },
        { name: 'Square', image: Square },
        { name: 'Terminal', image: Terminal },
        { name: 'Hatch', image: Hatch },
        { name: 'Abstract', image: Abstract },
    ],
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
    name: 'bg-companies',
    initialState,
    reducers: {
        // TODO: needed in furure (APIs)
    },
});

export const selectCompanies = (state) => state.companies.companies;
export const selectOtherCompanies = (state) => state.companies.otherCompanies;
export const selectCompanyStyles = (state) => state.companies.companyStyles;
export const selectLogoClassNames = (state) => state.companies.logoClassNames;
export const selectWhiteRoundedImges = (state) =>
    state.companies.whiteRoundedImages;

export default getCompaniesSlice.reducer;
