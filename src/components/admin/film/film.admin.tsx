import React, { useEffect, useRef, useState } from 'react';
import { DeleteFilm, GetFilmById, GetFilms } from '../../../services/film.services';
import { CategoriesOnFilm, Film, propsUpdate } from './film.interface';
import { Button, DatePicker, Form, FormProps, Input, Modal, Radio, Rate, Select, SelectProps, Space, Tag, Upload, UploadFile } from 'antd';
import { EditOutlined, ExclamationCircleFilled, HeartOutlined, MinusCircleOutlined, PlusCircleOutlined, UploadOutlined } from '@ant-design/icons';
import '../../../Assets/Style/film-admin.scss';
import ModalComponents from '../../../common/components/modal';
import Director from '../director/director.interface';
import { GetDirectors } from '../../../services/director.services';
import { GetCategories } from '../../../services/category.services';
import Category from '../categories/categories.interface';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { confirm } = Modal;

const FilmAdmin: React.FC = () => {
    const [uploadSuccess, setUploadSuccess] = useState(false); // State để kiểm soát việc rerender
    const [form] = Form.useForm();
    const fileRef = useRef<UploadFile | null>(null);

    const [films, setFilms] = useState<Film[]>([]);

    const fetchDataFilms = async () => {
        const filmsFetch: any = await GetFilms();
        setFilms(filmsFetch);
    };

    useEffect(() => {
        fetchDataFilms();
    }, []);

    const directors: Director[] = GetDirectors();

    const categories: Category[] = GetCategories();

    let options: SelectProps['options'] = [];

    const navigate = useNavigate();

    options = categories.map((category: Category) => ({
        value: category.id,
        label: category.name
    }));

    const directorsOption = directors.map((director: Director) => ({
        value: director.id,
        label: director.name
    }));

    type FieldType = {
        title: string;
        description: string;
        directorId: number;
        categories: { id: number }[];
        comments?: { title: string; userId: number }[];
        status: 'CONTINUE' | 'FULL';
        rate: number;
        dateReleased?: Date;
        showTime?: Date;
        national?: string;
        imageThumbnail?: string;
        trailer?: string;
    };

    const handleCategories = (value: number) => {
        let categoriesId: number[] = [];
        categoriesId.push(value);

        let categoriesSelected = categoriesId.map((item: number) => ({
            id: item
        }));

        console.log(categoriesSelected);
    };

    const propsImage = {
        name: 'image',
        action: 'http://localhost:4001/api/upload/image',
        headers: {
            authorization: 'authorization-text'
        },
        onChange(info: any) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                fileRef.current = info.file.name;
                toast.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                toast.error(`${info.file.name} file upload failed.`);
            }
        }
    };

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        if (Array.isArray(values.categories) && values.categories.length > 0) {
            const categoriesSelected = values.categories.map((item: any) => ({
                id: Number.parseInt(item)
            }));
            try {
                await axios.post('http://localhost:4001/api/v1/films', {
                    title: values.title,
                    description: values.description,
                    directorId: values.directorId,
                    categories: categoriesSelected,
                    status: values.status,
                    rate: values.rate,
                    dateReleased: values.dateReleased,
                    showTime: values.showTime,
                    national: 'America',
                    imageThumbnail: fileRef.current,
                    trailer: 'abc'
                });
                toast.success('Creating success');
                setUploadSuccess(!uploadSuccess);
                navigate(0);
            } catch (error: any) {
                if (error.response) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error('An error occurred');
                }
            } finally {
                fileRef.current = null;
                form.resetFields();
            }
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('err', errorInfo);
    };

    const BodyModalCreate: React.FC = () => {
        return (
            <>
                <Form name="basic" wrapperCol={{ span: 16 }} initialValues={{ remember: true }} autoComplete="off" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <Form.Item<FieldType> label="Title:" name="title">
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType> label="Description:" name="description">
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType> label="Director:" name="directorId">
                        <Select style={{ zIndex: 1000 }} showSearch placeholder="Select a director" filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())} options={directorsOption} />
                    </Form.Item>

                    <Form.Item<FieldType> label="Categories:" name="categories">
                        <Select mode="tags" placeholder="Tags Mode" onChange={handleCategories} options={options} />
                    </Form.Item>

                    <Form.Item<FieldType> label="Status" name="status">
                        <Radio.Group value="CONTINUE">
                            <Space direction="vertical">
                                <Radio value="CONTINUE">CONTINUE</Radio>
                                <Radio value="FULL">FULL</Radio>
                            </Space>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item<FieldType> label="Rate" name="rate">
                        <Rate count={10} character={<HeartOutlined />} allowHalf />
                    </Form.Item>

                    <Space direction="horizontal">
                        <Form.Item<FieldType> label="Date Released" name="dateReleased">
                            <DatePicker />
                        </Form.Item>
                        <Form.Item<FieldType> label="Show Time" name="showTime">
                            <DatePicker />
                        </Form.Item>
                    </Space>

                    <Form.Item<FieldType> label="Image Thumbnail" name="imageThumbnail">
                        <Upload {...propsImage} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Select Image Thumbnail</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item<FieldType> label="Trailer Audio" name="trailer">
                        <Upload>
                            <Button icon={<UploadOutlined />}>Select Trailer</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </>
        );
    };

    const BodyModalUpdate: React.FC<propsUpdate> = (props: propsUpdate) => {
        props.film.categoriesOnFilm.map((category: CategoriesOnFilm) => {
            return {
                id: category.category.id,
                value: category.category.name
            }
        });
        return (
            <>
                <Form name="basic" wrapperCol={{ span: 400 }} initialValues={{ remember: true }} autoComplete="off" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <Form.Item<FieldType> label="Title:" name="title">
                        <Input value={props.film.title} />
                    </Form.Item>

                    <Form.Item<FieldType> label="Description:" name="description">
                        <Input value={props.film.description} />
                    </Form.Item>

                    <Form.Item<FieldType> label="Director:" name="directorId">
                        <Select defaultValue={props.film.director.name} style={{ zIndex: 1000 }} showSearch placeholder="Select a director" filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())} options={directorsOption} />
                    </Form.Item>

                    <Form.Item<FieldType> label="Categories:" name="categories">
                        <Select mode="tags" placeholder="Tags Mode" onChange={handleCategories} options={options} />
                    </Form.Item>

                    <Form.Item<FieldType> label="Status" name="status">
                        <Radio.Group value="CONTINUE">
                            <Space direction="vertical">
                                <Radio value="CONTINUE">CONTINUE</Radio>
                                <Radio value="FULL">FULL</Radio>
                            </Space>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item<FieldType> label="Rate" name="rate">
                        <Rate count={10} character={<HeartOutlined />} allowHalf />
                    </Form.Item>

                    <Space direction="horizontal">
                        <Form.Item<FieldType> label="Date Released" name="dateReleased">
                            <DatePicker />
                        </Form.Item>
                        <Form.Item<FieldType> label="Show Time" name="showTime">
                            <DatePicker />
                        </Form.Item>
                    </Space>

                    <Form.Item<FieldType> label="Image Thumbnail" name="imageThumbnail">
                        <Upload {...propsImage} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Select Image Thumbnail</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item<FieldType> label="Trailer Audio" name="trailer">
                        <Upload>
                            <Button icon={<UploadOutlined />}>Select Trailer</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </>
        );
    };

    const openModalDelete = async (id: number) => {
        let film: Film = await GetFilmById(id);
        confirm({
            title: 'Are you sure delete this film?',
            icon: <ExclamationCircleFilled />,
            content: film.title,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                const film: any = await DeleteFilm(id);
                if (film) {
                    toast.success('Deleting film success');
                    fetchDataFilms();
                } else {
                    toast.error('Deleting film fail');
                }
            },
            onCancel() {
                console.log('Cancel');
            }
        });
    };

    const openModalUpdate = async (id: number) => {
        let film: Film = await GetFilmById(id);
        confirm({
            title: `Update film ${film.title}`,
            icon: <ExclamationCircleFilled />,
            content: <BodyModalUpdate film={film} />,
            onOk() {
                console.log('ok');
            },
            onCancel() {
                console.log('Cancel');
            }
        });
    };

    return (
        <>
            <ToastContainer />
            <div className="film-header">
                <h1>Film Working</h1>
                <ModalComponents title="Create Film" body={BodyModalCreate} />
            </div>

            <section className="film-container">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Index</th>
                            <th scope="col">Title</th>
                            <th scope="col" colSpan={1}>
                                Description
                            </th>
                            <th scope="col">Director</th>
                            <th scope="col">Categories</th>
                            <th scope="col">Status</th>
                            <th scope="col" colSpan={3}>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {films.map((film: Film) => (
                            <tr key={film.id}>
                                <th scope="row">{film.id}</th>
                                <td>{film.title}</td>
                                <td>{film.description}</td>
                                <td>{film.director.name}</td>
                                <td>
                                    {film.categoriesOnFilm.map((category) => (
                                        <div key={category.category.id}>
                                            <Tag> {category.category.name} </Tag>
                                        </div>
                                    ))}
                                </td>
                                <td>{film.status}</td>
                                <td colSpan={3}>
                                    <Button type="primary" title="Suggest" shape="circle" icon={<PlusCircleOutlined />} />
                                    <Button onClick={() => openModalDelete(film.id)} danger title="Delete" shape="circle" icon={<MinusCircleOutlined />} />
                                    <Button onClick={() => openModalUpdate(film.id)} type="dashed" title="Edit" shape="circle" icon={<EditOutlined />} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    );
};

export default FilmAdmin;
