import React,{useState, useEffect} from 'react';
import { baseURL } from '~utils/request';
import {message, Upload, Button, Space} from 'antd';
import { RcFile, UploadProps } from 'antd/lib/upload';
import {UploadOutlined} from '@ant-design/icons';
import { GET_QINIUTOKEN } from "~reducers/common"
import { dispatchWithPromise, uploadQiniuUrl } from '~utils/util'
import {uid} from 'uid';

interface UploadFileProps extends UploadProps {
    maxSize:number
    maxCount: number
    multiple: boolean
    value?: []
    action?: string
    uploaded?:(file: RcFile, fileList: RcFile[])=>void
    templatePath?: string
    disabled?:boolean
}


const UploadFile = (props:UploadFileProps)=>{
    const { maxCount, maxSize, onChange, value, action, accept } = props;
    const [fileList, setFileList] = useState<any[]>(value || []);
    const [token, setToken] = useState();
    const [key, setKey] = useState<string>();
    const [domain, setDomain] = useState();



    useEffect(()=>{
        setFileList(value || []);
    }, [value])

    const handleChange = (changeProcess: any) => {
        const { file, fileList } = changeProcess;

        if (file.status === "error") {
            const index = getFileIndex(file);
            fileList.splice(index, 1);

            message.error("上传出错");
        }

        if (file.status === "done") {
            const index = getFileIndex(file,fileList);
            index != -1 && (fileList[index].url = domain + file.response.key);
            onChange && onChange(fileList);
        }
        
        setFileList(fileList);

        onChange && onChange(fileList);
    }

    const beforeUpload = (file: RcFile, fileList: RcFile[]): Promise<any>|string => {

        const index = getFileIndex(file, fileList);
           

        if (file.size > maxSize * 1024) {
            message.error(`文件大小不能大于${maxSize}kb`);
            const index = fileList.indexOf(file);
            fileList.splice(index, 1);
            setFileList(fileList);
            
            return Upload.LIST_IGNORE;
        }

        return new Promise(async(resolve, reject) => {
            

            const data:any = await dispatchWithPromise({type:GET_QINIUTOKEN});

            setToken(data.token);
            const ext = file.type.split('/')[1] || '';
            setKey(new Date().getTime()+'_'+uid()+`.${ext}`);
            setDomain(data.qiniuDomain)

            resolve(file)
        })
    }

    const getFileIndex = (file: RcFile, files = fileList) => {
        for (let i = 0; i < files.length; i++) {
            if (files[i].uid === file.uid) {
                return i;
            }
        };

        return -1;
    }

    return <Space>
        <Upload
            accept={accept}
            action={uploadQiniuUrl}
            fileList={fileList}
            maxCount={maxCount}
            name="file"
            data={{
                token: token,
                key
            }}
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            <Button disabled={props.disabled}>
                <UploadOutlined /> 点击上传
            </Button>
        </Upload>

        {
            props.templatePath ? <a download="模板文件" href={props.templatePath}>下载文件模版</a> : null
        }
    </Space>
}

UploadFile.defaultProps = {
    maxCount: 1,
    multiple: true,
    maxSize: 1024 * 5, //单位 kb
    disabled: false
}


export default UploadFile