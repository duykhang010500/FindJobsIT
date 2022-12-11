const jobSeekerMenu = [
  { title: 'Home', to: '/' },
  { title: 'Jobs', to: '/search?keywords=&locationIds=&industryIds=' },
  { title: 'Companies', to: '/companies' },
  { title: 'MyCV', to: '/view-resume' },
];

const employerMenu = [
  { title: 'Home', to: '/employer' },
  { title: 'Services', to: '/employer/services' },
  { title: 'Find candidate', to: '/employer/candidates/search' },
];

export { jobSeekerMenu, employerMenu };
