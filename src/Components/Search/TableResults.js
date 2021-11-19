import React from 'react';
import { Table, Alert } from 'react-bootstrap';
import OrderDetail from './OrderDetail';
import ImageDelivered from '../../assets/imgs/van.svg'

function TableResults({ data, token }) {

    if (data == null) {
        return (
            <>
            </>
        )
    } else if (data.length === 0) {
        return (
            <Alert variant="danger"><b>No Results Found</b><br />Please select another date range.</Alert>
        )
    } else {
        return (
            <>
                <br /><p><b>{data.length} Results Found</b></p>
                <Table responsive="md">
                    <thead>
                        <tr>
                            <th>order_number</th>
                            <th>order_date</th>
                            <th>status</th>
                            <th>despatch_date</th>
                            <th>courier_service</th>
                            <th>courier_status</th>
                            <th>order_detail</th>
                        </tr>
                    </thead>
                    {data.map((item, index) => (
                        <tbody key={index}> 
                            <tr>
                                <td>{item.order_number}</td>
                                <td>{item.order_date === "0001-01-01T00:00:00Z" ? "---" : new Date(item.order_date).toDateString()}</td>
                                <td>{item.status}</td>
                                <td>{item.despatch_date === "0001-01-01T00:00:00Z" ? "---" : new Date(item.despatch_date).toDateString()}</td>
                                <td>{item.courier_service}</td>
                                <td>{(item.courier_status === "Delivered") ? <img className="image-table" src={ImageDelivered} alt="Delivered" title="Delivered" /> : item.courier_status}</td>
                                <td><OrderDetail orderNumber={item.order_number} token={token} /></td>
                            </tr>
                        </tbody>                  
                    ))}
                </Table>
        </>
        )
    }

}

export default TableResults;