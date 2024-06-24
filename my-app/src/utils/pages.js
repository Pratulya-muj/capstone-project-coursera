const pages = new Map()
pages.set('home',{name:'Home', path:'/',anchorable:true});
pages.set('about',{name:'About', path:'/about',anchorable:true});
pages.set('menu',{name: 'Menu',path:'/menu',anchorable: true});
pages.set('bookings',{
    name:'Reservations',
    path: '/bookings',
    anchorable: true
});
pages.set('confirmedBookings',{
    name:'Confirmed Bookings',
    path: '/confirmed-bookings',
    anchorable: true
});
pages.set('orderOnline',{
    name:'Order Online',
    path: '/order-online',
    anchorable: true
});
pages.set('login',{name:'Login',path:'/login',anchorable:true});

export default pages;