import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  Collapse,
  Row,
  Col,
  Button,
  Input,
  Select,
  Icon
} from 'antd';

const { Panel } = Collapse;
const { Option } = Select;
const JobOrderFilter = ({ filter, setFilter, onResetFilter, onFilter, customers }) => {

  return (
    <Collapse style={{ margin: '10px 0 10px 0' }} defaultActiveKey={[1]}>
      <Panel header="ADVANCE FILTER" key="1">
        <Row gutter={16}>
          <Col lg={{ span: 6 }}>
            Search :
            <Input
              value={filter.search}
              onChange={e => setFilter({ ...filter, search: e.target.value })}
              placeholder="Input Keyword(JO,PO,ID)"
              onPressEnter={onFilter}
            />
          </Col>
          <Col lg={{ span: 6 }}>
            Customer :
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
              <Option value="desc"><Icon type="sort-descending" /> Latest record</Option>
              <Option value="asc"><Icon type="sort-ascending" /> Oldest record</Option>
              <Option value="di-desc"><Icon type="sort-descending" /> Date issued desc</Option>
              <Option value="di-asc"><Icon type="sort-ascending" /> Date issued asc</Option>
              <Option value="jo-desc"><Icon type="sort-descending" /> Job order desc</Option>
              <Option value="jo-asc"><Icon type="sort-ascending" /> Job order asc</Option>
            </Select>
          </Col>
          <Col lg={{ span: 6 }}>
            Status :
            <Select
              style={{ width: '100%' }}
              value={filter.showRecord}
              onChange={showRecord => setFilter({ ...filter, showRecord })}
            >
              <Option value="All">All</Option>
              <Option value="Open">Open job order</Option>
              <Option value="Served">Served job order</Option>
            </Select>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col lg={{ span: 6 }}>
            Year issued :
            <Select
              style={{ width: '100%' }}
              value={filter.year}
              onChange={year => setFilter({ ...filter, year })}
            >
              <Option value={null} key={null}>All</Option>
              {[...Array(15).keys()].map(val => (
                <Option value={val + 2016} key={val}>{val + 2016}</Option>
              ))}
            </Select>
          </Col>
          <Col lg={{ span: 6 }}>
            Month issued :
            <Select
              style={{ width: '100%' }}
              value={filter.month}
              onChange={month => setFilter({ ...filter, month })}
            >
              <Option value={null} key={null}>All</Option>
              {[...Array(12).keys()].map(val => (
                <Option value={val + 1} key={val}>{moment(val + 1, 'MM').format("MMMM")}</Option>
              ))}
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
JobOrderFilter.propTypes = {
  filter: PropTypes.objectOf(PropTypes.any).isRequired,
  setFilter: PropTypes.func.isRequired,
  onResetFilter: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  customers: PropTypes.arrayOf(PropTypes.string).isRequired,
}
export default JobOrderFilter
