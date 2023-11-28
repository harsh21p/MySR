import routes from "routes";

const Constants = {
  mySettings: [
    {
      title: 'My Account',
      description: 'Here, You can update your account details',
      icon: 'user-o',
      navigate: routes.MyAccount,
      arrow: 'arrow-right',
    },
    {
      title: 'Notifications',
      description: 'Click here to see your all notification',
      icon: 'bell-o',
      navigate: 'Notification',
      arrow: 'arrow-right',
    },
    {
      title: 'Logout',
      description: 'click here to sign out',
      icon: 'logout',
      navigate: 'LogOut',
      arrow: 'arrow-right',
    },
  ],
};
export default Constants;