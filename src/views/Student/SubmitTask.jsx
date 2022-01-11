import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { URI } from '../../Helper';
import moment from 'moment'
import { Upload, message, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const SubmitTask = () => {
    const params = useParams();
    const [task, setTask] = useState({});
    const [taskFile, setTaskFile] = useState([]);

    useEffect(() => {
        axios.get(URI + 'getTaskDetails', {
            params: {
                task_id: params.taskId
            }
        }).then(response => {
            setTask(response.data.response.detail[0])
        })
    }, [])

    function submitTask() {
        var photo = {
            uri: taskFile,
            type: 'image/jpg',
            name: 'photo.jpg',
        };

        var formData = new FormData();
        const data = { "task_id": params.taskId, 'files': taskFile };
        formData.append('data', photo);

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "multipart-form-data" },
            body: formData
        };

        return fetch(`${URI}submitTask`, requestOptions);
    }

    const props = {
        name: 'file',
        multiple: false,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                const newFile = taskFile.concat(info.file)
                setTaskFile(newFile)
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };


    return (
        <div>
            <h5>Submit Task</h5>
            <div className="d-flex">
                <p>Task name:</p>
                <p className="ml-3">{task.task_name}</p>
            </div>
            <div className="d-flex">
                <p>Deadline date:</p>
                <p className="ml-3">{moment(task.deadline_date).format('DD/MM/YYYY')}</p>
            </div>
            <div className="d-flex">
                <p>Status:</p>
                <p className="ml-3">{task.status}</p>
            </div>
            <div className="w-50">
                <Dragger {...props} accept=".jpg,.png,.jfif,.txt,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document">
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                </Dragger>
            </div>
            <Button onClick={() => submitTask()}>
                Submit
            </Button>
        </div>
    )
}

export default SubmitTask
