/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
        },
        extend: {
            colors: {
                primary: '#FFFFFF',
                secondary: '#ebf8fe',
                accent: '#FBBF24',
                grey: '#939393',
                grey40:"#2F2F2F",
                grey30:"#555555",
                dropdowntext:"#4A504B",
                companies:{
                    'netflix-black': '#0B0B0B',
                    'google-blue': '#4285F4',
                    'slack-purple': '#441B49',
                    "airbnb-pink":"#FF5A5F",
                    "spotify":"#0B0B0B",
                    "twitch":"#9146FF",
                },
                othercompanies:{
                    'pinterest': '#EB334F', //calculated
                    'snapchat': '#FFF101',
                    'linkedin': '#3380D9', //calculated
                    'discord': '#5865F2',
                    'tiktok': '#0B0B0B',
                    'tesla': '#ED4D52', //calculated
                    'shopify': '#96bf48',
                    'twitter': '#4AAFF3', //calculated
                    'microsoft': '#0B0B0B',
                    'adobe': '#0B0B0B',
                    'telegram': '#5FBEE7', //calculated
                    'youtube': '#FF3333',
                    'paypal': '#4E5784', //calculated
                    'instagram': '#0B0B0B',
                    'airtable': '#D2EFFF',
                    'dropbox': '#0061FF',
                    'duolingo': '#8ADB4E', //calcilated with 30% no exact code in figma
                    'facebook': '#1977F3',
                    'figma': '#0B0B0B',
                    'github': '#0B0B0B',
                    'square': '#0A0A0A',
                    'terminal': '#7AA6B9',
                    'hatch': '#F9DA3D', //calculated
                    'abstract': '#0B0B0B',
                },
                neutral: {
                    white: '#FFFFFF',
                    lightGray: '#F3F4F6',
                    mediumGray: '#D1D5DB',
                    darkGray: '#6B7280',
                    black: '#000000',
                },
                employecard:{
                    "bg-main-card":"#F0F0F0",
                    "card-grey-text":"#939393",
                    "card-blue-hover":"#005382",
                },
                border: {
                    default: '1px #F0F0F0',
                    focus: '#60A5FA',
                },
                background: {
                    navbar: '#111827',
                    search: '#F3F4F6',
                },
                text: {
                    heading: '#000000',
                    subheading: '#4B5563',
                    body: '#6B7280',
                },
            },
            fontWeight: {
                lightbold: 400,
                mediumbold: 500,
                semibold: 600,
                bold: 700,
            },
            lineHeight: {
                'extra-tight': '1.2', // Approx. 19.2px for 16px font size
                tight: '1.4', // Approx. 22.4px for 16px font size
                normal: '1.6', // Approx. 25.6px for 16px font size
                loose: '1.8', // Approx. 28.8px for 16px font size
                'extra-loose': '2.0', // Approx. 32px for 16px font size
            },
            fontSize: {
                sm: '0.875rem', // 14px
                base: '1rem', // 16px
                lg: '1.125rem', // 18px
                xl: '1.25rem', // 20px
                '2xl': '1.5rem', // 24px
                '3xl': '1.875rem', // 30px
                '4xl': '2.25rem', // 36px
                '5xl': '3rem', // 48px
            },
            letterSpacing: {
                // Default Tailwind values
                'tracking-tight': '-0.015em', // ~-0.45px (~-1.5%)
                'tracking-normal': '0em', // ~0px (0%)
                'tracking-wide': '0.025em', // ~0.75px (~2.5%)
                'tracking-wider': '0.05em', // ~1.5px (~5%)
                'tracking-widest': '0.1em', // ~3px (~10%)

                // Custom values
                'extra-tight': '-0.05em', // ~-1.5px (~-5%)
                tight: '-0.02em', // ~-0.6px (~-2%)
                normal: '0em', // ~0px (0%)
                wide: '0.02em', // ~0.6px (~2%)
                wider: '0.04em', // ~1.2px (~4%)
                widest: '0.06em', // ~1.8px (~6%)
            },
        },
        // container: {
        //     center: true,
        //     padding: {
        //         DEFAULT: '1rem',
        //         sm: '1rem',
        //         md: '1.5rem',
        //         lg: '2rem',
        //         xl: '2.5rem',
        //         '2xl': '3rem',
        //     },
        // },
    },
    plugins: [],
};
