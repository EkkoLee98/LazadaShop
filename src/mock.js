import Mock from 'mockjs'
// Mock.mock('/ap/login','post',(data)=>{
//     console.log(data.body);
//     const sj=JSON.parse(data.body);
//     if(sj.username==='lze'){
//         if(sj.password==='lze'){
//             console.log('登陆成功');
//             return {
//                 'status':'OK'
//             }
//         }else{
//             console.log('密码错误');
//             return {
//                 'status':'No'
//             }
//         }
//     }else{
//         console.log('没有此用户');
//     }
// });
Mock.mock('/ap/img','post',(data)=>{
    return{
        data:[{'img':'http://localhost:808/assets/images/icon1_hover[1].png','title':'aa','detail':'a'},
            {'img':'http://localhost:808/assets/images/icon3_hover[1].png','title':'bb','detail':'b'},
            {'img':'http://localhost:808/assets/images/icon6_hover[1].png','title':'cc','detail':'c'},
            {'img':'http://localhost:808/assets/images/icon7_hover[1].png','title':'dd','detail':'d'},
            {'img':'http://localhost:808/assets/images/icon7_hover[1].png','title':'ee','detail':'e'},
            {'img':'http://localhost:808/assets/images/icon7_hover[1].png','title':'ff','detail':'f'},
            {'img':'http://localhost:808/assets/images/icon7_hover[1].png','title':'gg','detail':'g'},
            {'img':'http://localhost:808/assets/images/icon7_hover[1].png','title':'gg','detail':'g'}
            ]
    }
});
Mock.mock('/ap/cart','post',(data)=>{
    return{
        data:[
            { id: 1, name: "Chicken Wing", category: "Food", qty: 3, price: 10 },
            { id: 2, name: "Pizza", category: "Food", qty: 1, price: 50 },
            { id: 3, name: "Hamburger", category: "Food", qty: 1, price: 12 },
            { id: 4, name: "Coca Cola", category: "Drink", qty: 2, price: 5 },
            { id: 5, name: "Orange Juice", category: "Drink", qty: 1, price: 15 },
            { id: 6, name: "Potato Chips", category: "Snack", qty: 1, price: 8 }
        ]
    }
});
