import React, { useState, useEffect } from 'react';
import { baseURL } from '~utils/request';
import { message, Upload, Button } from 'antd';
import { RcFile, UploadProps } from 'antd/lib/upload';
import { UploadOutlined } from '@ant-design/icons';
import { GET_QINIUTOKEN } from "~reducers/common"
import { dispatchWithPromise, uploadQiniuUrl } from '~utils/util'

export type MediaType = "video/mp4" | "video/avi" | "audio/mpeg";

interface UploadFileProps extends UploadProps {
    maxSize: number
    maxQuantity: number
    multiple: boolean
    value?: []
    action?: string
    uploaded?: (file: RcFile, fileList: RcFile[]) => void
    fileType?: MediaType[]
}

const UploadFile = (props: UploadFileProps) => {
    const { maxQuantity, maxSize, onChange, value, action, fileType } = props;
    const [fileList, setFileList] = useState<any[]>(value || []);
    const [token, setToken] = useState<any>();
    const [qiniuDomain, setQiniuDomain] = useState<any>();

    const handleChange = (changeProcess: any) => {
        const { file, fileList } = changeProcess;

        if (file.status === "error") {
            const index = getFileIndex(file);
            fileList.splice(index, 1);

            message.error("上传出错");
        }

        if (file.status === "done") {
            const index = getFileIndex(file, fileList);
            if (index != -1) {
                fileList[index].url = qiniuDomain + file.response.key;
                console.log(fileList[index])
            }
        }

        setFileList(fileList);
        onChange && onChange(fileList);
    }

    const beforeUpload = (file: any, fileList: RcFile[]): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            const index = getFileIndex(file, fileList);
            const type = file.type;
            if (type && fileType && !fileType.includes(type as MediaType)) {
                message.error(`文件类型错误，只能上传${fileType}格式的文件`);
                reject();
            }

            if (index + 1 > maxQuantity) {
                message.destroy();
                message.error(`只能最多上传${maxQuantity}份文件`);
                reject();
            }

            if (file.size > maxSize * 1024) {
                message.error(`文件大小不能大于${maxSize}kb`);
                const index = fileList.indexOf(file);
                fileList.splice(index, 1);
                setFileList(fileList);
                reject();
            }

            // const { token, qiniuDomain } = await dispatchWithPromise({ type: GET_QINIUTOKEN });
            const token = await dispatchWithPromise({ type: GET_QINIUTOKEN });
            const qiniuDomain = await dispatchWithPromise({ type: GET_QINIUTOKEN });
            setToken(token);
            setQiniuDomain(qiniuDomain);
            resolve(file);
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

    return <Upload
        action={uploadQiniuUrl}
        fileList={fileList}
        name="file"
        data={{
            token
        }}
        beforeUpload={beforeUpload}
        onChange={handleChange}
    >
        <Button>
            <UploadOutlined /> 点击上传
        </Button>
    </Upload>
}

UploadFile.defaultProps = {
    maxQuantity: 1,
    multiple: true,
    maxSize: 1024 * 5, //单位 kb
}


export default UploadFile