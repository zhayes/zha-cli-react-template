import React,{useState, useEffect} from 'react';
import {Input} from 'antd';
import { connect } from 'react-redux';
import {FETCH_CODEURL} from '~reducers/common';

const VerificationCodeInput = ({onChange, value, img, size, disabled, placeholder, dispatch}:any): React.ReactElement=>{
    const [codeUrl, setCodeUrl] = useState(img);
    const [codeVal, setCodeVal] = useState(value);

    function triggerChange(val:any){
        onChange && onChange(val);
    }

    function changeHandle(e:React.ChangeEvent<HTMLInputElement>){
        let val = e.target.value || "";
        val = val.trim();
        setCodeVal(val);
        triggerChange(val||undefined);
    }

    function refreshCodeHandle(){
        dispatch({type: FETCH_CODEURL});
        setCodeVal(undefined);
        triggerChange(undefined);
    }

    useEffect(()=>{
       setCodeVal(undefined);
       codeUrl && triggerChange(undefined);
       setCodeUrl(img);
    }, [img]);

    useEffect(()=>{
        setCodeVal(value);
     }, [value]);

    useEffect(() => {
        dispatch({type: FETCH_CODEURL});
    }, []);

    return(
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <Input 
                value={codeVal} 
                size={size}
                disabled={disabled}
                placeholder={placeholder} 
                onChange={changeHandle} 
                style={{width: '60%'}} 
            />
            <img src={`data:image/png;base64,${codeUrl}`} onClick={refreshCodeHandle} style={{width: '35%', height:'100%', objectFit:'cover', cursor:'pointer'}}/>
        </div>
    )
}

export default connect((state:any)=>({img: state.common.img, imgKey: state.common.imgKey}))(VerificationCodeInput)