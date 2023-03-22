import React from 'react';
import {Row} from "react-bootstrap";
import DeviceItem from "./DeviceItem";
import {useTypedSelector} from "../hooks/useTypedSelector";

const DeviceList:React.FC = () => {
    const device = useTypedSelector((state) => state.devices)

    console.log("DeviceList", device)

    return (
        <>
        <Row className="d-flex">
            {device.devices.map((device:any) =>
                <DeviceItem key={device.id} device={device}/>
            )}
        </Row>
        </>
    );
};

export default DeviceList;
