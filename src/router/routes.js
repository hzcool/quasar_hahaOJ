
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout'),
    children: [
      { path: '',name:'home', component: () => import('pages/Index') },
      { path: '/test',name:'test', component: () => import('pages/test') },
      { path: 'login',name:'login',component: () => import('pages/Login') },
      { path: 'register',name:'register',component: () => import('pages/Register') },
      { path: 'problemset',name:'problemset',component: () => import('pages/problem/problemset') },
      { path: 'submissions',name:'submissions',component: () => import('pages/Submissions') },
      { path: 'problem/:index',name:'problem',component: () => import('pages/problem/problem') },
      { path: 'message',name:'message', component: ()=> import('pages/Message')},
      { path: 'users',name:'users', component: ()=> import('pages/Users')},
      { path: 'userInfo/:username',name:'userinfo', component: ()=> import('pages/Userinfo')},
      { path: 'describe',name:'describe', component: ()=> import('pages/Describe')},
      { path: 'contests',name:'contests', component: ()=> import('pages/contest/contests')},
      { path: 'contest/:id',name:'contest', component: ()=> import('pages/contest/contest')},
    ]
  },
  {
    path:'/personalCenter',
    component: () => import('layouts/PersonalCenterLayout'),
    children: [
      { path: '',name:'personalHome', component: () => import('pages/personal/Home') },
      { path: 'newPost',name:'newPost', component: () => import('pages/personal/NewPost') },
      { path: 'onePost/:post_id',name:'onePost', component: () => import('pages/personal/OnePost') },
      { path: 'myPost',name:'myPost', component: () => import('pages/personal/MyPost') },
    ]
  },
  {
      path:'/',
      name: 'blogCenter',
      component: ()=> import('layouts/PostLayout'),
      children: [
        { path: 'show/blog/:blog_id',name:'blog', component: ()=> import('pages/post/Blog')},
        { path: 'blogs',name:'blogs', component: ()=> import('pages/post/Blogs')},
      ],
  },
  {
    path:'/',
    name: 'discussCenter',
    component: ()=> import('layouts/PostLayout'),
    children: [
      { path: 'discussions',name:'discussions', component: ()=> import('pages/discuss/discussion')},
      { path: 'discussion/problem/:index',name:'discussProblem', component: ()=> import('pages/discuss/discussProblem')},
      { path: 'show/discussion/:puzzle_id',name:'discussion', component: ()=> import('pages/discuss/oneDiscussion')},
      { path: 'discussion/contest/:id/:label',name:'discussContestQuery', component: ()=> import('pages/discuss/ContestQuery')},
      { path: 'show/discuss/contest/:id/:label/:puzzle_id',name:'oneContestQuery', component: ()=> import('pages/discuss/OneContestQuery')},
    ],
  },
  {
    path:'/',
    name: 'solutionCenter',
    component: ()=> import('layouts/PostLayout'),
    children: [
      { path: 'solutions/:index',name:'solutions', component: ()=> import('pages/solution/solutions')},
    ],
  },
  {
    path:'/admin',
    component: () => import('layouts/ManageLayout'),
    children: [
      { path: '',name:'admin', component: () => import('pages/manages/ManageIndex') },
      { path: 'userManage',name:'userManage', component: () => import('pages/manages/userManage/index') },
      { path: 'postManage',name:'postManage', component: () => import('pages/manages/PostManage/index') },
      { path: 'homeworkManage',name:'homeworkManage', component: () => import('pages/manages/PostManage/homework') },
      { path: 'problemManage',name:'problemManage', component: () => import('pages/manages/problemManage/index') },
      { path: 'newProblem',name:'newProblem', component: () => import('pages/manages/problemManage/newProblem') },
      { path: 'problemInfo/:index',name:'problemInfo', component: () => import('pages/manages/problemManage/problemInfo') },
      { path: 'testdata/:index',name:'testdata', component: () => import('pages/manages/problemManage/testdata') },
      { path: 'submissionManage',name:'submissionManage', component: () => import('pages/manages/subManage/index') },
      { path: 'contestManage',name:'contestManage', component: () => import('pages/manages/contestManage/index') },
      { path: 'newContest',name:'newContest', component: () => import('pages/manages/contestManage/newContest') },
      { path: 'contestInfo/:id',name:'contestInfo', component: () => import('pages/manages/contestManage/contestInfo') },
      { path: 'cproblems/:id',name:'cproblems', component: () => import('pages/manages/contestManage/cproblems') },
      { path: 'ranklist/:id/:format',name:'ranklist', component: () => import('pages/manages/contestManage/rankList') },
      { path: 'csubmissions/:id',name:'csubmissions', component: () => import('pages/manages/contestManage/csubmissions') },
      { path: 'clarifications/:id',name:'clarifications', component: () => import('pages/manages/contestManage/clarifications') },
    ]
  },
  {
    path: '/code/:id',
    name: 'code',
    component : () => import('pages/ShowCode')
  },
  {
    path: '/contestCode/:run_id/:contest_id',
    // params: {'run_id':'','contest_id':''},
    name: 'contestCode',
    component : () => import('pages/contest/contestComponent/ShowContestCode')
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
