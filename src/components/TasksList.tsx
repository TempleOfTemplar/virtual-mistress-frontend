// @flow
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Alert, Breadcrumb, Card, Col, Layout, Menu, Row, Select, Space, Spin} from "antd";
import {tasksAPI} from "../services/TasksService";
import {toysAPI} from "../services/ToysService";
import {categoriesAPI} from "../services/CategoriesService";
const { Header, Content, Footer, Sider } = Layout;


export function TasksList() {
    // const dispatch = useAppDispatch();
    // const {tasks, isLoading, error} = useAppSelector(state => state.tasksReducer);
    //
    // useEffect(() => {
    //     dispatch(fetchTasks())
    // }, []);
    const [categories, setCategories] = useState([]);
    const [toys, setToys] = useState([]);
    const {isLoading: isTasksLoading, error: tasksError, data: tasksData} = tasksAPI.useFetchAllTasksQuery({
        categories,
        toys
    });
    const {isLoading: isToysLoading, error: toysError, data: toysData} = toysAPI.useFetchAllToysQuery(null);
    const {
        isLoading: isCategoriesLoading,
        error: categoriesError,
        data: categoriesData
    } = categoriesAPI.useFetchAllCategoriesQuery(null);
    const toysOptions = toysData && toysData.map(toy => ({label: toy.attributes.title, value: toy.id}));
    const categoriesOptions = categoriesData && categoriesData.map(category => ({
        label: category.attributes.title,
        value: category.id
    }));

    const handleToysChange = (value: any) => {
        setToys(value);
    };

    const handleCategoriesChange = (value: any) => {
        setCategories(value);
    };
    
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                {/*<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />*/}
            </Header>
            <Content
                style={{
                    padding: '0 50px',
                }}
            >
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout
                    className="site-layout-background"
                    style={{
                        padding: '24px 0',
                    }}
                >
                    <Sider className="site-layout-background" width={200}>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{
                                width: '100%',
                            }}
                            placeholder="Выберите категорию..."
                            onChange={handleCategoriesChange}
                            options={categoriesOptions}
                            loading={isCategoriesLoading}
                        >
                        </Select>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{
                                width: '100%',
                            }}
                            placeholder="Выберите инвентарь..."
                            onChange={handleToysChange}
                            options={toysOptions}
                            loading={isToysLoading}
                        >
                        </Select>
                    </Sider>
                    <Content
                        style={{
                            padding: '0 24px',
                            minHeight: 280,
                        }}
                    >
                        <Space size="middle">

                            {isTasksLoading && <Spin size="large"/>}
                            {tasksError && <Alert message="Ошибка загрузки списка заданий" type="error"/>}
                            {tasksData && tasksData.map(task => <Card
                                key={task.id}
                                title={task.attributes.title}
                                extra={<a href="#">More</a>}
                            >
                                <p>{task.attributes.text}</p>
                            </Card>)}
                        </Space>
                    </Content>
                </Layout>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Ant Design ©2018 Created by Ant UED
            </Footer>
        </Layout>
    );
}