import React,{useEffect, useState} from 'react';
import {connect} from 'react-redux';

const Permission = (props:any):React.ReactElement=>{
    const [authCodes, setAuthcodes] = useState(props.authCodes || []);
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState(props.name)

    useEffect(()=>{
        if(props.authCodes.includes(props.name)){
            setVisible(true)
        }else{
            setVisible(false)
        }
        setName(props.name);
        setAuthcodes(props.authCodes);
    }, [props.authCodes, props.name])

    return (
        <span>
            {
                visible ? props.children : null
            }
        </span>
    )
}

export default connect((state: any)=>{
    return {
        authCodes: state.common.authCodes
    }
})(Permission);