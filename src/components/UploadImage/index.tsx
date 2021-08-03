import React, { useEffect, useState } from 'react';
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { baseURL } from '~utils/request';
import { RcFile, UploadProps } from 'antd/lib/upload';
import { GET_QINIUTOKEN } from "~reducers/common"
import { dispatchWithPromise, uploadQiniuUrl } from '~utils/util';
import { uid } from 'uid';
import { UploadFile } from 'antd/lib/upload/interface';

const uploadImg = `${baseURL}/mgt/gov/upload/image`;

interface UploadImageProps extends UploadProps {
    maxSize: number,//图片尺寸
    maxQuantity: number,//最多选择多少张图片
    multiple: boolean,
    value?: [],
    action?: string,
    onChange?: (value: any) => void,
    disabled?: boolean
}

const UploadImage = (props: UploadImageProps) => {
    const { maxSize, maxQuantity, onChange, value, action } = props;
    const [fileList, setFileList] = useState<any[]>(value || []);
    const [visible, setVisible] = useState(false);
    const [previewImgUrl, setPreviewImgUrl] = useState();
    const [token, setToken] = useState();
    const [key, setKey] = useState<string>();
    const [domain, setDomain] = useState();


    useEffect(() => {
        setFileList(value || []);
    }, [value])

    const handleChange = (changeProcess: any) => {
        const { file, fileList } = changeProcess;
        if (file.status === "error") {
            const index = getFileIndex(file, fileList);
            fileList.splice(index, 1);
            message.error("上传出错");
        }
        if (file.status === "done") {
            const index = getFileIndex(file, fileList);
            index != -1 && (fileList[index].url = domain + file.response.key);
            onChange && onChange(fileList);
        }
        setFileList(fileList);
    }

    const beforeUpload = (file: any, fileList: any[]): Promise<any>|string => {

        const index = getFileIndex(file, fileList);
        if (index + 1 > maxQuantity) {
            message.destroy();
            message.error(`只能最多显示${maxQuantity}张`);
            return Upload.LIST_IGNORE
        }

        if (file.type.indexOf('image') === -1) {
            message.error(`您应该上传图片文件`);
            return Upload.LIST_IGNORE

        }

        if (file.name.indexOf("jpeg") == -1 && file.name.indexOf("jpg") == -1 && file.name.indexOf("png") == -1 && file.name.indexOf("JPG") == -1 && file.name.indexOf("JPEG") == -1) {
            message.error(`上传图片格式应为为jpg/jpeg/png`);
            return Upload.LIST_IGNORE
        }

        if (file.size > maxSize * 1024 * 1024) {
            message.error(`图片大小不能大于${maxSize}M`);

            const index = fileList.indexOf(file);
            fileList.splice(index, 1);
            setFileList(fileList);
            return Upload.LIST_IGNORE
        }

        return new Promise(async (resolve, reject) => {

            const data: any = await dispatchWithPromise({ type: GET_QINIUTOKEN });

            setToken(data.token);
            const ext = file.type.split('/')[1] || '';
            setKey(new Date().getTime() + '_' + uid() + `.${ext}`);
            setDomain(data.qiniuDomain)

            resolve(file)

        })
    }

    const handelPreview = (file: any) => {
        if (file.url) {
            setPreviewImgUrl(file.url);
        } else {
            setPreviewImgUrl(domain + file.response.key);
        }
        setVisible(true);
    }


    const getFileIndex = (file: UploadFile, files = fileList) => {
        for (let i = 0; i < files.length; i++) {
            console.log(files[i].uid === file.uid, files[i].uid, file.uid, i)
            if (files[i].uid === file.uid) {
                return i;
            }
        };
        return -1;
    }

    const cancelPreview = () => {
        setVisible(false);
    }
    //移除文件
    function onRemove() {
        onChange && onChange(undefined)
        return true
    }
    return (
        <div>
            <Upload
                accept={props.accept}
                listType="picture-card"
                onChange={handleChange}
                beforeUpload={beforeUpload}
                onPreview={handelPreview}
                action={uploadQiniuUrl || uploadImg}
                method="post"
                name="file"
                onRemove={onRemove}
                fileList={fileList}
                disabled={props.disabled}
                data={{
                    token: token,
                    key: key
                }}
            >
                {
                    fileList.length < maxQuantity ? <PlusOutlined /> : null
                }
            </Upload>
            <Modal
                title="预览图片"
                visible={visible}
                width={800}
                onCancel={cancelPreview}
                footer={false}
            >
                <img src={previewImgUrl} style={{ display: 'block', margin: 'auto', width: '100%' }} />
            </Modal>
        </div>
    )
}

UploadImage.defaultProps = {
    maxQuantity: 8,
    multiple: true,
    maxSize: 5, //单位 mb
}


export default UploadImage;