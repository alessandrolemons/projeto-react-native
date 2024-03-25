import { Icon } from '@rneui/base';
import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';


const SignOutBtn = () => {

    const signOut = () => {
        alert("DESLOGAR");
    }

    return (
            <Icon
                name="exit-to-app"
                type="material-community"
                size={28}
                color={"#fff"}
                onPress={signOut}
            />
    );
};

export default SignOutBtn;
