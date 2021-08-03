import React, { useEffect } from 'react';
import {SAVE_BREADCRUMB} from '~reducers/common';
import {dispatchWithPromise} from '~utils/util'

export default ()=>{

    useEffect(()=>{
        dispatchWithPromise({type: SAVE_BREADCRUMB, data: ['首页', '欢迎页']});
    }, [])

    return <div style={{fontSize: 20, textAlign: 'center', lineHeight: 3}}>Welcome!</div>
}