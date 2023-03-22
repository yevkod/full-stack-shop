import React, {useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceApi";
import {setTypes, setBrands, setDevices, setTotalCount} from "../store/deviceStateSlice";
import Pages from "../components/Pages";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {RootState} from "../store";
import {useAppDispatch} from "../hooks/useAppDispatch";



const Shop:React.FC = () => {
    const device = useTypedSelector((state:RootState) => state.devices);
    const dispatch = useAppDispatch();

    console.log("SHOOOP", device)

    useEffect(() => {
        fetchTypes().then((data:any) => dispatch(setTypes(data)))
        fetchBrands().then((data:any) => dispatch(setBrands(data)))
        fetchDevices(null, null, 1, 2).then((data:any) => {
            dispatch(setDevices(data?.rows))
            dispatch(setTotalCount(data?.count))
        })
    }, [])

    useEffect(() => {
        fetchDevices(device?.selectedType.id, device?.selectedBrand.id, device?.page, 2).then((data:any) => {
            dispatch(setDevices(data?.rows))
            dispatch(setTotalCount(data?.count))
        })
    }, [device?.page, device?.selectedType, device?.selectedBrand])

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar />
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
};

export default Shop;
