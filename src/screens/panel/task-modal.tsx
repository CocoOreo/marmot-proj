import { Form, Input, Modal } from "antd"
import { useForm } from "antd/lib/form/Form"
import { DirectorSelect } from "components/director-select"
import { TaskTypeSelect } from "components/task-type-select"
import React from "react"
import { useEffect } from "react"
import { useEditTask } from "utils/task"
import { useTasksModal, useTasksQueryKey } from "./util"

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
}

export const TaskModal = () => {
    const [form] = useForm()
    const { editingTaskId, editingTask, close } = useTasksModal()
    const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(useTasksQueryKey())
    const onCancel = () => {
        close()
        form.resetFields()
    }
    const onOk = async () => {
        await editTask({ ...editingTask, ...form.getFieldsValue() })
        close()
    }

    useEffect(() => {
        form.setFieldsValue(editingTask)
    }, [form, editingTask])

    return (
        <Modal
            forceRender={true}
            okText={'Confirm'}
            onCancel={onCancel}
            onOk={onOk}
            cancelText={'cancel'}
            confirmLoading={editLoading}
            title={'Edit Task'}
            visible={!!editingTaskId}>
            <Form initialValues={editingTask}
                form={form}
                {...layout}
            >
                <Form.Item label={'Task Name'} name={'name'} rules={[{ required: true, message: 'Please Input Task Name' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label={'Task Director'} name={'processorId'} >
                    <DirectorSelect defaultOptionName={'Director'} />
                </Form.Item>
                <Form.Item label={'Task Type'} name={'typeId'} >
                    <TaskTypeSelect />
                </Form.Item>
            </Form>
        </Modal>
    )
}