export default {
    login: "/api/login", //登录接口
    loginsms:'/api/login/sms', //短信登录接口
    register:'/api/register', //注册接口
    registersms:'/api/register/sms', //注册短信接口
    productAll:'/api/merchant/productAll', //商家获取所有商品
    getinfo:'/api/merchant/product/getinfo', //商家获取单个商品信息
    getallcouponinfo:'/api/merchant/getallcouponinfo', //商家获取所有优惠券
    getcouponinfo:'/api/merchant/getcouponinfo', //商家获取单个优惠券信息
    couponOperate:'/api/merchant/couponOperate', //商家设置优惠券
    getMerchant:'/api/share/getMerchant', //sharer获取所有商家的信息
    sgetcouponinfo:'/api/share/getcouponinfo', //sharer获取商家所有的优惠券信息
    getallcoupon:'/api/share/getallcoupon', //sharer获取所有的优惠券信息
    generationShareUrl:'/api/share/generationShareUrl', //sharer生成优惠券
    getAllUrl:'/api/share/getAllUrl', //sharer获取所有已经生成的url
    sproductToSelect:'/api/share/productToSelect', //sharer获取优惠券信息
    cproductToSelect:'/api/customer/productToSelect', //消费者获取优惠券信息
    showAllCoupon:'/api/customer/showAllCoupon', //消费者获取已领取的优惠券信息
    cgetcouponinfo:'/api/customer/getcouponinfo', //消费者获取单个优惠券信息
    savecoupon:'/api/customer/savecoupon', //消费者领取优惠券
    saveorderid:'/api/customer/savecoupon/saveorderid', //消费者填写订单
    getuserinfo:'/api/getuserinfo', //用户获取个人信息
    editUserPassword:'/api/editUserPassword', //用户修改密码接口
    editUserPasswordsms:'/api/editUserPassword/sms', //用户修改密码短信接口
    editUserPhone:'/api/editUserPhone', //修改手机接口
    editUserPhonesms:'/api/editUserPhone/checkcode', //修改手机短信接口
    getTop:'/api/gettop'//获取商品热度信息
}
