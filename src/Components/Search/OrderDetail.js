
import { Modal, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';
import imageLoading from '../../assets/imgs/Preloader.svg'

function OrderDetail({ orderNumber, token }) {

    // SEARCH DETAIL RESULTS GET
    const [dataDetail, setDataDetail] = useState([]); // api response
    const [loading, setLoading] = useState(false);

    const getDataDetail= async () => {
        
      setLoading(true); // remove this?

      try {
        const { data: response } = await axios.get(`${process.env.REACT_APP_URL_SEARCH_DETAIL}/${orderNumber}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDataDetail(response); // update state with api response
        //console.log(response)
      } catch (error) {
        //console.log(error)
      }

      setLoading(false);

    };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    getDataDetail(orderNumber); // run fetch api to get order detail
    setShow(true); // run modal
  }


  const dataDetail2 = () => {
    if (dataDetail == null || dataDetail.length === 0) {
      return <li className="alert-txt">No Details Found!</li>;
    } else {
      return (
        <ul className="order-detail-list">
          {dataDetail.map((details, index) =>
            <li key={index}>{details}</li>
          )}
        </ul>
      )
    }
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Details &gt;
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Order Number: {orderNumber}</Modal.Title>
        </Modal.Header>
        <Modal.Body><b>Order Details:</b> 
          {(loading === true) ? 
            (<img src={imageLoading} alt="Loading..." title="Loading..." />)
          :
            (dataDetail2())
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  
}
  
export default OrderDetail;