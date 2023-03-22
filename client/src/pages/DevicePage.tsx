import React, {useEffect, useState} from 'react';
import {Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import bigStar from '../assets/bigStar.png'
import Button from "react-bootstrap/Button";
import {useParams} from "react-router";
import {fetchOneDevice} from "../http/deviceApi";


const DevicePage: React.FC = () => {
    const [device, setDevice] = useState<any>({info: []})
    const {id} = useParams()

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])

    console.log("INFOOOOO", device)

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
                </Col>
                <Col md={4}>
                    <Form className="d-flex flex-column align-items-center">
                        <h2>{device.name}</h2>
                        <div className="d-flex align-items-center justify-content-center"
                             style={{
                                 background: `url(${bigStar}) no-repeat center center`,
                                 width: 240,
                                 height: 240,
                                 backgroundSize: 'cover',
                                 fontSize: 64
                             }}
                        >{device.rating}</div>
                    </Form>
                </Col>
                <Col md={4}>
                    <Card className="d-flex flex-column align-items-center justify-content-center"
                          style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>От: {device.price} uah</h3>
                        <Button variant={"outline-dark"}>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {device.info.map((info: any, index: any) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title} : {info.description}
                    </Row>
                )}
            </Row>

        </Container>
    );
};

export default DevicePage;
