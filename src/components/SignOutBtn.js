import { Icon } from '@rneui/base';
import React, { useContext } from 'react';
import { AuthUserContext } from '../context/AuthUserProvider';

const SignOutBtn = () => {

    const { Logout } = useContext(AuthUserContext);

    const signOut = () => {
        Logout();
    };

    return (
        <Icon
            name="exit-to-app"
            type="material-community"
            size={28}
            color={'#fff'}
            onPress={signOut}
        />
    );
};

export default SignOutBtn;
