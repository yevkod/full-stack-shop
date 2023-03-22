import React, {useState, useEffect} from 'react';
import Modal from "react-bootstrap/Modal";
import {Col, Dropdown, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {createDevice, fetchBrands, fetchTypes} from "../../http/deviceApi";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {setTypes, setBrands, setSelectedType, setSelectedBrand} from '../../store/deviceStateSlice';
import {useAppDispatch} from "../../hooks/useAppDispatch";


interface ICreateDevice {
    show: boolean,
    onHide: any,
}

const CreateDevice:React.FC<ICreateDevice> = ({show, onHide}) => {
    const device = useTypedSelector((state) => state.devices);
    const dispatch = useAppDispatch();

    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [file, setFile] = useState<any>(null)
    const [info, setInfo] = useState<any>([])

    useEffect(() => {
        fetchTypes().then(data => dispatch(setTypes(data)))
        fetchBrands().then(data => dispatch(setBrands(data)))
    }, [])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }

    const removeInfo = (number:any) => {
        setInfo(info.filter((i:any) => i.number !== number))
    }

    const changeInfo = (key:any, value:any, number:any) => {
        setInfo(info.map((i:any) => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = (e:any) => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(data => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{device.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map((type:any) =>
                                <Dropdown.Item onClick={() => dispatch(setSelectedType(type))} key={type.id}>{type.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{device.selectedBrand.name || "Выберите бренд"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map((brand:any) =>
                                <Dropdown.Item onClick={() => dispatch(setSelectedBrand(brand))} key={brand.id}>{brand.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className="mt-3"
                        onChange={e => setName(e.target.value)}
                        value={name}
                        placeholder="Введите название устройства"
                    />
                    <Form.Control
                        className="mt-3"
                        onChange={e => setPrice(Number(e.target.value))}
                        value={price}
                        placeholder="Введите стоимость устройства"
                        type="number"
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr/>
                    <Button variant={"outline-dark"} onClick={addInfo}>Добавить новое свойство</Button>
                    {info.map((i:any) =>
                        <Row className="mt-4" key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e:any) => changeInfo('title', e.target.value, i.number)}
                                    placeholder="Введите название свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e:any) => changeInfo('description', e.target.value, i.number)}
                                    placeholder="Введите описание свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeInfo(i.number)}
                                    variant={"outline-danger"}>
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateDevice;
