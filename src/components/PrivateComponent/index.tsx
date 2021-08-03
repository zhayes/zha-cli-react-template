import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';
import { FETCH_PERMISSIONS } from '~reducers/common';
import {store} from '~store';


function PrivateComponent(props:any){

    useEffect(() => {
        const {loginInfo, permissions} = props;
        if(!loginInfo) return;

        if (!permissions || !permissions.length) {
            store.dispatch({ type: FETCH_PERMISSIONS });
        }
    })

    return (
        props.loginInfo ? props.children : <Redirect to="/login"/>
    )
  
}

export default connect((state:any)=>{
    const {loginInfo, permissions} = state.common;
    return {
        loginInfo,
        permissions
    }
})(PrivateComponent)