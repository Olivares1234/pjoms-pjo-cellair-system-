import React from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Row,
  Col,
  Button,
  Input,
  Select,
  Icon,
} from 'antd';

const { Panel } = Collapse;
const { Option } = Select;
const PoItemsFilter = ({ filter, setFilter, onResetFilter, onFilter, customers }) => {
  return (
    <Collapse style={{ margin: '10px 0 10px 0' }} defaultActiveKey={[1]}>
      <Panel header="ADVANCE FILTER" key="1">
        <Row gutter={16}>
          <Col lg={{ span: 6 }}>
            Search :
            <Input
              value={filter.search}
              onChange={e => setFilter({ ...filter, search: e.target.value })}
              placeholder="Input Keyword(PO,Code,ID)"
              onPressEnter={onFilter}
            />
          </Col>
          <Col lg={{ span: 6 }}>
            Customer :
            :
            <Select
              style={{ width: '100%' }}
              value={filter.customer}
              onChange={customer => setFilter({ ...filter, customer })}
            >
              <Option value={null}>All</Option>
              {customers.map(customer => <Option key={customer} value={customer}>{customer}</Option>)}
            </Select>
          </Col>
          <Col lg={{ span: 6 }}>
            Sort by :
            <Select
              style={{ width: '100%' }}
              value={filter.sort}
              onChange={sort => setFilter({ ...filter, sort })}
            >
              <Option value="del_desc"><Icon type="sort-descending" />Delivery date</Option>
              <Option value="del_asc"><Icon type="sort-ascending" />Delivery date</Option>
              <Option value="oldest"><Icon type="sort-ascending" />Oldest</Option>
              <Option value="latest"><Icon type="sort-descending" />Latest</Option>
            </Select>
          </Col>
          <Col lg={{ span: 6 }}>
            Show items :
            <Select
              style={{ width: '100%' }}
              value={filter.showItems}
              onChange={showItems => setFilter({ ...filter, showItems })}
            >
              <Option value="all">All items</Option>
              <Option value="pending">Pending items only</Option>
            </Select>
          </Col>
          <Col lg={{ span: 6 }}>
            <br />
            <Button icon="filter" onClick={onFilter} className="bl-cl" block>Filter</Button>
          </Col>
          <Col lg={{ span: 6 }}>
            <br />
            <Button className="bl-cl" onClick={onResetFilter} icon="undo" block>Reset</Button>
          </Col>
        </Row>
      </Panel>
    </Collapse>
  )
}
PoItemsFilter.propTypes = {
  filter: PropTypes.objectOf(PropTypes.any).isRequired,
  setFilter: PropTypes.func.isRequired,
  onResetFilter: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  customers: PropTypes.arrayOf(PropTypes.string).isRequired,
}
export default PoItemsFilter
