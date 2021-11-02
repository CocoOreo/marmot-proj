import styled from "@emotion/styled"
import { Button, Drawer, Form, Input, Spin, } from "antd"
import { useForm } from "antd/lib/form/Form"
import { DirectorSelect } from "components/director-select"
import { ErrorBox } from "components/lib"
import React, { useEffect } from "react"
import { useAddProject, useEditProject } from "utils/project"
import { useProjectModal, useProjectsQueryKey } from "./util"

export const ProjectModal = () => {
    const { projectModalOpen, editingProject, isLoading, close } = useProjectModal()
    const title = editingProject ? 'Edit Project' : 'Create Project'

    const useMutateProject = editingProject ? useEditProject : useAddProject
    const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject(useProjectsQueryKey())
    const [form] = useForm()
    const onFinish = (values: any) => {
        mutateAsync({ ...editingProject, ...values }).then(() => {
            form.resetFields()
            close()
        })
    }

    const closeModal = () => {
        form.resetFields()
        close()
    }

    useEffect(() => {
        form.setFieldsValue(editingProject)
    }, [editingProject, form])

    return (
        <div>
            <Drawer
                forceRender={true}
                onClose={() => closeModal()}
                visible={projectModalOpen} width={'100%'}>
                <Container>
                    {
                        isLoading ? <Spin size={'large'} /> : <>
                            <h1>{title}</h1>
                            <ErrorBox error={error} />
                            <Form form={form} layout={"vertical"} style={{ width: '40rem' }} onFinish={onFinish} >
                                <Form.Item label={'Name'} name={'name'} rules={[{ required: true, message: 'Please Input Your Project Name' }]}>
                                    <Input placeholder={'Please Input Project Name'}></Input>
                                </Form.Item>
                                <Form.Item label={'Organization'} name={'organization'} rules={[{ required: true, message: 'Please Input Organization Name' }]}>
                                    <Input placeholder={'Please Input Organization Name'}></Input>
                                </Form.Item>
                                <Form.Item label={'Director'} name={'personId'} >
                                    <DirectorSelect defaultOptionName={'Director'} />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        loading={mutateLoading}
                                        type={'primary'}
                                        htmlType={'submit'} >
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </>
                    }
                </Container>
            </Drawer>
        </div>
    )
}

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`