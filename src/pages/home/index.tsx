import React, {Component, memo} from 'react';
const textStyle:any = {textAlign: 'center', lineHeight: '300px', fontSize: 30}

export default memo(function(){
    return(
        <div style={textStyle}>
            <h2>Welcome use Zha-Cli</h2>
        </div>
    )
})