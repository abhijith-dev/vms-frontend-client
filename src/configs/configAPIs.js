export const APIS ={
    USERS :{
        CREATE : {url:'/users/create',method:'POST'},
        LOGIN: {url:'/users/login',method:'POST'},
        GETPIN:{url:'/users/password/reset/external',method:'POST'},
        SETPASSWORD:{url:'/users/password/reset/external/verify',method:'POST'},
        GETUSER:{url:'/users/fetch',method:'GET'},
    },
    BOOKING:{
        INITIATE:{url:'/booking/initiate',method:'POST'},
        BOOK:{url:'/booking/selection',method:'POST'}
    },
    PAYMENT:{
        GET_VEHICLE :{url:'/vehicles/client/get',method:'GET'}
    }
}