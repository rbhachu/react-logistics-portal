import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UseFetchData from './FetchResults';
import TableResults from './TableResults';
import imageLoading from '../../assets/imgs/Preloader.svg'

function Search({ token }) {

    let today = new Date(); // get current date
    const [startDate, setStartDate] = useState(today.setDate(today.getDate() - 7)) // current date -7 days
    const [endDate, setEndDate] = useState(new Date())
    const { status, data, loading } = UseFetchData({ token, startDate, endDate });

    return (

            <Container fluid="sm">            
                <Row>
                    <Col>
                        <h2>Order Search</h2>
                        <p><b>Search for orders selecting Start/End Dates.</b></p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <b>Start Date:</b>{<DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat="dd MMM yyyy"
                        />}
                    </Col>
                    <Col>
                        <b>End Date:</b>{<DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            dateFormat="dd MMM yyyy"
                        />}
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {(loading === true && status === 200) ? 
                            (<img src={imageLoading} alt="Loading..." title="Loading..." />)
                        :
                            (<TableResults data={data} token={token} />)
                        }
                    </Col>
                </Row>     
            </Container>
    );

}

export default Search;
