module.exports = {
  siteMetadata: {
    // Site URL for when it goes live
    siteUrl: `https://mensurdurakovic.com`,
    // Your Name
    name: 'Mensur Duraković',
    // Main Site Title
    title: `Mensur Duraković | Not Your Average Software Developer`,
    // Description that goes under your name in main bio
    description: `Not your average software developer`,
    // Optional: Twitter account handle
    author: `mensur.durakovic`,
    // Optional: Github account URL
    github: `https://github.com/mensur-durakovic`,
    // Optional: LinkedIn account URL
    linkedin: `https://www.linkedin.com/in/mensur-durakovi%C4%87-5a229a99/`,
    // Content of the About Me section
    about: `My zest for life and inquisitive nature define me. I've been fortunate to have had many life experiences and have never shied away from taking on impossible head-against-the-wall challenges. This gave me a new perspective and inspired me to make a difference and have a positive impact on my environment.

    I've never considered myself particularly gifted. My ridiculous, sickening work ethic is where I shine. I'd describe myself as a man in permanent beta, constantly striving to improve, learn and grow as a person and as a professional.
    
    I live by two rules: 
    1) Don't be a jerk 
    2) Every man I meet is my superior in some way. In that, I learn of him.`,
    // Optional: List your projects, they must have `name` and `description`. `link` is optional.
    projects: [
      {
        name: 'Recmote',
        description:
          'Website for voice over recording, creative sound design & mixing studio based in Barcelona',
        link: 'https://recmote.vercel.app/index.html',
      },
      {
        name: 'Tetris game',
        description: 'Evergreen classic video game made in react',
        link: 'https://react-tetris-mensur-durakovic.vercel.app/',
      },
      {
        name: 'Speed Typing Test',
        description:
          'App for testing typing speed (React, TypeScript, Framer Motion, Tailwind)',
        link: 'https://shortly-git-master-mensur-durakovic.vercel.app/',
      },
      {
        name: 'IP address tracker',
        description: 'Web application for IP address tracking ',
        link: 'https://ip-address-tracker-beta-indol.vercel.app/',
      },
    ],
    // Optional: List your experience, they must have `name` and `description`. `link` is optional.
    experience: [
      {
        name: 'Agilathon',
        description:
          'Lead Developer / Senior Software Developer, November 2021 - Present',
        link: 'https://agilathon.com/',
      },
      {
        name: 'Algebra',
        description: 'Professor, October 2019 - Present',
        link: 'https://www.algebra.hr/',
      },
      {
        name: 'University Department of Professional Studies, Split, Croatia',
        description: 'Assistant professor, February 2016 - Present',
        link: 'https://www.oss.unist.hr/',
      },
      {
        name: 'Pseudocode',
        description:
          'Development Team Lead / Full-Stack Developer, May 2019 - November 2021',
        link: 'https://pseudocode.agency/',
      },
      {
        name: 'Faculty of Science, Split, Croatia',
        description: 'Assistant professor, Feb 2016 - Mar 2020',
        link: 'https://www.pmfst.unist.hr/',
      },
      {
        name: 'Hrvatski Telekom',
        description: 'Backend Developer, November 2018 - May 2019',
        link: 'https://www.hrvatskitelekom.hr/',
      },
      {
        name: 'SedamIT',
        description: 'Backend Developer, September 2018 - May 2019',
        link: 'https://www.sedamit.hr/',
      },
      {
        name: 'Aspira University College',
        description:
          'Professor/Assistant professor, September 2017 - March 2019',
        link: 'https://www.aspira.hr/en/',
      },
      {
        name: 'Hotelstouch',
        description: 'Full-Stack Developer, August 2015 - August 2018',
        link: 'https://hotelstouch.com/eng/',
      },
    ],
    // Optional: List your skills, they must have `name` and `description`.
    skills: [
      {
        name: 'Languages & Frameworks',
        description:
          'JavaScript (ES6+), TypeScript, Node.js, Express.js, GraphQL, React, HTML, CSS / SCSS, Flutter, Java, Python',
      },
      {
        name: 'Databases',
        description: 'MongoDB, PostreSQL, MySQL',
      },
      {
        name: 'Other',
        description: 'Git, Microservices, API design, Agile / Scrum',
      },
    ],
    volunteering: [
      {
        name: 'Mentoring Byte',
        link: 'https://www.mentoringbyte.com/',
        description: 'Mentor, November 2020 - March 2022',
      },
      {
        name: 'Split Tech City',
        link: 'https://split-techcity.com/',
        description: 'Writer, January 2020 - July 2021',
      },
    ],
    languages: [
      {
        name: 'Croatian',
        description: 'Native or bilingual proficiency',
      },
      {
        name: 'English',
        description: 'Full professional proficiency',
      },
      {
        name: 'German',
        description: 'Limited working proficiency',
      },
    ],
  },
  flags: {
    THE_FLAG: false,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-TQZXQNF',
        includeInDevelopment: false,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              wrapperStyle: `margin: 0 0 30px;`,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `ADD YOUR TRACKING ID HERE`, // Optional Google Analytics
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `devfolio`,
        short_name: `devfolio`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`, // This color appears on mobile
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint:
          'https://mensurdurakovic.us8.list-manage.com/subscribe/post?u=8302c4cd7a22ca97d06f9d7c5&amp;id=5a64f617f1&amp;f_id=00ee69e0f0', // string; add your MC list endpoint here; see instructions below
        timeout: 3500,
      },
    },
  ],
};
