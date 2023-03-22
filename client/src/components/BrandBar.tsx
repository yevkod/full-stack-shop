import React from 'react';
import {Card, Form} from "react-bootstrap";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {setSelectedBrand} from "../store/deviceStateSlice";
import {useAppDispatch} from "../hooks/useAppDispatch";


const BrandBar:React.FC = () => {
    const device = useTypedSelector((state) => state.devices);
    const dispatch = useAppDispatch();

    console.log("BRANDBAAAR", device)

    return (
        <>
        <Form className='d-flex'>
            {device.brands.map((brand:any) =>
                <Card
                style={{cursor: "pointer"}}
                key={brand.id}
                className="p-3"
                onClick={() => dispatch(setSelectedBrand(brand))}
                border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                >
                    {brand.name}
                </Card>
            )}
        </Form>
        </>
    );
};

export default BrandBar;
