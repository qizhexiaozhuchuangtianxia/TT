import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Card,
  Form,
  Input,
  Button,
  Cascader,
  Row,
  Col,
} from 'antd';
import TSGwTable from '@/components_old/TSGwTable';
import global from '@/global.less';
import styles from './lists.less';
import { sldLlineRtextAddGoodsAddMargin } from '@/utils/utils';
import TSCashManageTable from '@/components_old/TSCashManageTable';

const FormItem = Form.Item;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(state => ({
  systs_achievement: state.systs_achievement,
  global: state.global,

}))

@Form.create()
export default class TableList extends PureComponent {

  state = {
    // modelTitle: '',
    // addInputValue: '',
    modalVisible: false,
    expandForm: false,
    formValues: {},
    modelItem: {},
    type: 'add',//默认是新增会员
    editMember_id: 0,//编辑的会员id
    seleType: '',//筛选的会员类型
    state: false,
  };


  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'systs_achievement/fetch',
    });
    dispatch({
      type: 'systs_achievement/queryTreeList',
    });

  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.systs_achievement.saveresult && !this.state.state) {
      this.setState({
        modalVisible: false,
        state: true,
      });
      this.props.form.resetFields();
    // }
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'systs_achievement/fetch'
    });
    // this.$refs.cascader.sValue = []
  };


  handleSearch = (e) => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    let param = {
      admin_key	 :'',
      vendor_id	  :'',
      branch_id	  :'',
      sales_name	  :'',
      currentPage	  :'',
      pageSize	  : '',
    };
    form.validateFields(['branch_id', 'sales_name'], (err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      this.setState({
        formValues: values,
      });
      console.log(value,'earch-fieldsValue');

      dispatch({
        type: 'systs_achievement/fetch',
        payload: param,
      });
    });
  };

  // 联动选择
  handleCascaderChange(value,a) {
    console.log(value,a);
  };

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    const { getInfoList } = this.props.systs_achievement;
    const { searchlist } = this.props.systs_achievement.data;
    console.log(getInfoList,'__getInfoList');
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col xxl={6} xl={8} lg={8} md={8} sm={12}>
            <FormItem label="部门:">
            {getFieldDecorator('branch_id', { initialValue: searchlist.branch_id })(
                <Cascader  options={getInfoList} onChange={this.handleCascaderChange} placeholder="请选择部门" />
              )}
            </FormItem>
          </Col>

          <Col xxl={4} xl={5} lg={6} md={8} sm={12}>
            <FormItem label="顾问名称:">
              {getFieldDecorator('sales_name', { initialValue: searchlist.sales_name })(
                <Input  placeholder={'请输入顾问名称'}/>,
              )}
            </FormItem>
          </Col>
          <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            </span>
        </Row>
      </Form>
    );
  }

  renderForm() {
    return this.renderSimpleForm();
  }
  handleStandardTableChange= (pagination, filtersArg, sorter) =>{
    // const { dispatch } = this.props;
    // const { formValues } = this.state;
    // const { searchlist } = this.props.systs_cashmanage.data;
    // const filters = Object.keys(filtersArg).reduce((obj, key) => {
    //   const newObj = { ...obj };
    //   newObj[key] = getValue(filtersArg[key]);
    //   return newObj;
    // }, {});
    //
    // const params = {
    //   currentPage: pagination.current,
    //   pageSize: pagination.pageSize,
    //   ...formValues,
    //   ...filters,
    //   ...searchlist,
    // };
    // if (sorter.field) {
    //   params.sorter = `${sorter.field}_${sorter.order}`;
    // }
    // dispatch({
    //   type: 'systs_achievement/fetch',
    //   payload: params,
    // });
  }

  render() {
    const { systs_achievement: { loading: achieveMentLoading, data } } = this.props;
    // const { modalVisible, modelItem, modelTitle } = this.state;
    const { getFieldDecorator } = this.props.form;
    // const formItemLayout = {
    //   labelCol: {
    //     span: 6,
    //   },
    //   wrapperCol: {
    //     span: 14,
    //   },
    // };
    return (
      <div className={global.common_page}>
        {sldLlineRtextAddGoodsAddMargin('#69A2F2', '顾问业绩', 0)}
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
            <TSGwTable loading={achieveMentLoading}
                       onChange={this.handleStandardTableChange}
              data={data} />
          </div>
        </Card>

      </div>
    );
  }
}
