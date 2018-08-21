#### Project setup:

- `$ git clone https://github.com/kamenjan/plp-home-page`
- `$ npm install`

##### Development:
- `$ npm run serve-dev` (localhost:8080, new tab should open automatically)

##### Production:
- `$ npm run build` (creates a production build in dist/ directory)
- `$ npm run serve-prod` (localhost:5000, serves files from dist/)

#### Notes:

##### 1. [desktop layout] Make scroll hijack seem like a legit functionality :)

ISSUE:  because components will be mounted and rendered using router and react transition, we cannot depend on native scroll for letting the user know there is more content. as soon as there is no scroll bar user automatically thinks he is seeing all the content. BIG NO! This functionality also opens the question of SEO optimization and google how google crawls the site - do a research. 

SOLUTION: think about using a fake scroll bar or imitation of movement in the main view (site sections parent gui component) so users know that there is more content. maybe a finite vertical line along the right side of the viewport with top and bottom margin that has nodes that represent sections. current section is highlighted somehow.

##### 2. [desktop layout] Animating transitions between different scenes

ISSUE: I have to find a way to optimize transition between site sections. I was thinking about using react router and transition-groups. Router might be an overkill. But it does make sense to use new lifecycle methods made available by react transitions to handle sections transition animation. Take a deeper dive in react-transition-groups
SOLUTION: 

Sources:
- https://reactcommunity.org/react-transition-group/
- https://github.com/reactjs/react-transition-group
- https://hackernoon.com/animated-page-transitions-with-react-router-4-reacttransitiongroup-and-animated-1ca17bd97a1a
- https://github.com/reactjs/react-transition-group/issues/136
- https://codesandbox.io/s/mQy3mMznn
- https://medium.com/@agm1984/how-to-manage-page-transition-animations-in-react-ba09c66655c6

##### 3. [general] I do not want to hear about loading screen!

ISSUE: Since our assets are really nice they are also a bit heavy. No excuse. "Above the fold" portion of the site should load and render immediately.

SOLUTION: implement lazy(synchronous) loading. prerequisites: larger assets should be extracted using plugins and built as separate files. Since site sections are represented using components, I should find a way to slice them in separate files when creating production build.

Sources:
- https://scotch.io/tutorials/lazy-loading-routes-in-react
- https://codeburst.io/how-i-cut-my-react-javascript-bundle-size-in-half-with-three-lines-of-code-fe7798ecbd3f