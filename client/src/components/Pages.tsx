import React from 'react';
import {Pagination} from "react-bootstrap";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {setPage} from "../store/deviceStateSlice";
import {useAppDispatch} from "../hooks/useAppDispatch";


const Pages:React.FC = () => {
    const device = useTypedSelector((state) => state.devices);
    const dispatch = useAppDispatch();


    const pageCount = Math.ceil(device.totalCount / device.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++ ) {
        pages.push(i + 1)
    }

    return (
        <>
        <Pagination className="mt-5">
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={device.page === page}
                    onClick={() => dispatch(setPage(page))}
                >{page}</Pagination.Item>
            )}
        </Pagination>
        </>
    );
};

export default Pages;
