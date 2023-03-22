import React from 'react';
import {ListGroup} from "react-bootstrap";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {setSelectedType} from "../store/deviceStateSlice";
import {RootState} from "../store";
import {useAppDispatch} from "../hooks/useAppDispatch";



const TypeBar:React.FC = () => {
    const device = useTypedSelector((state:RootState) => state.devices)
    const dispatch = useAppDispatch();
    console.log("TypeBar", device)


    return (
        <>
        <ListGroup>
            {device?.types.map((type:any) =>
                <ListGroup.Item
                    style={{cursor: "pointer"}}
                    active={type.id === device.selectedType.id}
                    key={type.id}
                    onClick={() => dispatch(setSelectedType(type))}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
        </>
    );
};

export default TypeBar;
