
const menuData:SiderMenuItemList = [
    {
        title: '侧边栏1',
        selected: '侧边栏1',
        children: [
            {
                title: '子侧边栏',
                path: '/b',
                selected: '子侧边栏11',
                children: [
                    {
                        title: '子侧边栏',
                        path: '/c',
                        selected: '侧边栏111',
                    }
                ]
            }
        ]
    },
    {
        title: '侧边栏2',
        path: '/d',
        selected: '侧边栏2',
    },
    {
        title: '侧边栏3',
        path: '/e/1',
        selected: '侧边栏3',
    },
    {
        title: '侧边栏4',
        path: '/f',
        selected: '侧边栏4',
    }
]

export default menuData;