import React, { useEffect, useState, useContext } from "react";
import { Modal, Row, Col, Button } from "antd";
import styled from "styled-components";

import { JoContext } from "../../context/JobOrder/JobOrderContext";
import { Utils } from "../../context/UtilsContext";
import JobOrderForm from "./JobOrderForm";
import DeliveryChart from "./Details/DeliveryChart";
import InventoryTable from "./Details/InventoryTable";
import OrderedItemsTable from "./Details/OrderedItemsTable";
import JobOrderTable from "./Details/JobOrderTable";
import DisplayItemDetails from "./DisplayItemDetails";

const Title = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
`;

const Wrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 25px;
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const JobOrderModal = (props) => {
  const { visible, data, userType, closeModal } = props;
  const { getItemDetails } = useContext(JoContext);
  const { setLoading } = useContext(Utils);
  const [itemDetails, setDetails] = useState({
    orderedItems: [],
    itemDeliveryDetails: [],
    jobOrderDetails: [],
    inventory: [],
    joSeries: "",
  });

  const hasId = Object.prototype.hasOwnProperty.call(data, "id");
  const [showDetails, setShowDetails] = useState(!hasId);

  useEffect(() => {
    if (!hasId) {
      setLoading(true);
      getItemDetails(data.item_id)
        .then((res) => {
          const {
            orderedItems,
            itemDeliveryDetails,
            jobOrderDetails,
            inventory,
            joSeries,
          } = res;
          setDetails({
            orderedItems,
            itemDeliveryDetails,
            jobOrderDetails,
            inventory,
            joSeries,
          });
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const {
    orderedItems,
    itemDeliveryDetails,
    jobOrderDetails,
    inventory,
    joSeries,
  } = itemDetails;

  return (
    <Modal
      visible={visible}
      style={{ top: 10, transition: "width 100ms ease-out" }}
      onCancel={closeModal}
      title="JOB ORDER FORM"
      footer={null}
      width={showDetails ? 1100 : 600}
    >
      <Row gutter={16}>
        {showDetails && !hasId && (
          <Col lg={{ span: 14 }}>
            <Wrapper>
              <Title>Item Details</Title>
              <DisplayItemDetails data={data} />
            </Wrapper>
            {inventory.length > 0 && (
              <Wrapper>
                <Title>Warehouse Inventory</Title>
                <InventoryTable data={inventory} />
              </Wrapper>
            )}

            {itemDeliveryDetails.length > 0 && (
              <Wrapper>
                <Title>Delivery Details</Title>
                <DeliveryChart data={itemDeliveryDetails} />
              </Wrapper>
            )}

            {orderedItems.length > 0 && (
              <Wrapper>
                <Title>Ordered Materials</Title>
                <OrderedItemsTable data={orderedItems} />
              </Wrapper>
            )}

            {jobOrderDetails.length > 0 && (
              <Wrapper>
                <Title>Job Orders</Title>
                <JobOrderTable data={jobOrderDetails} />
              </Wrapper>
            )}
          </Col>
        )}

        <Col lg={{ span: showDetails ? 10 : 24 }}>
          {!Object.prototype.hasOwnProperty.call(data, "id") && (
            <Button
              style={{ margin: "10px 0" }}
              onClick={() => setShowDetails((current) => !current)}
            >
              {showDetails ? `Hide Item Details` : `Show Item Details`}
            </Button>
          )}
          <JobOrderForm
            data={data}
            closeModal={closeModal}
            userType={userType}
            joSeries={joSeries}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default JobOrderModal;
