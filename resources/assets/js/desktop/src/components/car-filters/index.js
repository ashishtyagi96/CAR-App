import React from 'react';
import { Input, List, Row, Col, Divider, Tag, Card, Progress } from 'antd';

import {
    PATH
} from "../../constant";
import { numberFormat } from "../../helpers/numberFormatter";
const { CheckableTag } = Tag;
const { Search } = Input;

const { Meta } = Card;

class CarFilters extends React.Component {
    state = {
        data: [],
        loading: false,
        selectedTags: [],
        selectedCompanyTags: [],
        selectedModelTags: [],
        showCompany: false,
        showModel: false,
        searchOn: 'year_of_make',
        search_input: ''
    };

    componentDidMount() {

    }

    handleChange (tag, checked) {
        const selected = checked ? [tag] : [];
        this.setState({ selectedTags: selected });
        let showCompany = true;
        let showModel = true;
        if(selected.length === 0){
            showCompany=false;
            showModel=false;
            this.setState({selectedCompanyTags:[],searchOn:'year_of_make',search_input:''})
        }else{
            showCompany=true;
            showModel=false;
            const { fetchAllCarsCompanies } = this.props;
            let query = {
                year_of_make: tag
            };
            fetchAllCarsCompanies(query);
            this.setState({selectedCompanyTags:[],searchOn:'companies',search_input:''})
        }
        this.setState({showCompany:showCompany,showModel:showModel});
    }

    handleChangeCompany(tag, checked) {
        const selected = checked ? [tag] : [];
        this.setState({ selectedCompanyTags: selected });
        let showModel = true;
        if(selected.length === 0){
            showModel=false;
            this.setState({searchOn:'companies',search_input:''})
        }else{
            showModel=true;
            const { fetchAllCarsModels } = this.props;
            const { selectedTags } = this.state;
            let query = {
                year_of_make: selectedTags[0],
                company: tag
            };
            fetchAllCarsModels(query);
            this.setState({search_input:'',searchOn:'models'})
        }
        this.setState({showModel:showModel});
    }

    handleChangeModel(tag, checked) {
        const selected = checked ? [tag] : [];
        this.setState({ selectedModelTags: selected });
    }

    onSearch = (value) => {
        const { searchOn, selectedTags, selectedCompanyTags } = this.state;
        if(searchOn === 'year_of_make'){
            const { fetchAllCarsYearOfMake } = this.props;
            fetchAllCarsYearOfMake(value);
        }else if(searchOn === 'companies'){
            const { fetchAllCarsCompanies } = this.props;
            fetchAllCarsCompanies({
                year_of_make: selectedTags[0],
                company:value
            });
        }else if(searchOn === 'models'){
            const { fetchAllCarsModels } = this.props;
            fetchAllCarsModels({
                year_of_make: selectedTags[0],
                company:selectedCompanyTags[0],
                model:value
            });
        }
    };
    onChange = (event) => {
        const { searchOn, selectedTags, selectedCompanyTags } = this.state;
        let search = event.target.value;
        this.setState({search_input:search});
        if(searchOn === 'year_of_make'){
            const { fetchAllCarsYearOfMake } = this.props;
            fetchAllCarsYearOfMake(search);
        }else if(searchOn === 'companies'){
            const { fetchAllCarsCompanies } = this.props;
            fetchAllCarsCompanies({
                year_of_make: selectedTags[0],
                company:search
            });
        }else if(searchOn === 'models'){
            const { fetchAllCarsModels } = this.props;
            fetchAllCarsModels({
                year_of_make: selectedTags[0],
                company:selectedCompanyTags[0],
                model:search
            });
        }
    };

    showCar = (car_id) => {
        const { history } = this.props;
        history.push( PATH.CARS + '/' +car_id);
    }

    render() {
        const {
            years={},
            companies={},
            cars={}
        } = this.props;
        let year_data = [];
        let company_data = [];
        let model_data = [];

        const { selectedTags, showCompany, showModel, selectedCompanyTags, search_input = '' } = this.state;
        Object.keys(years).map(function(key) {
            year_data.push(years[key]);
        });
        Object.keys(companies).map(function(key) {
            company_data.push(companies[key]);
        });
        Object.keys(cars).map(function(key) {
            model_data.push(cars[key]);
        });
       return (
            <>
                <Row>
                    <Col span={5}>
                    <Search
                        placeholder="input search text"
                        allowClear
                        onSearch={this.onSearch}
                        onChange={this.onChange}
                        style={{  margin: '0 10px' }}
                        value={search_input}
                    />
                    <List
                        size="Large"
                        header={<div style={{textAlign:"center",fontWeight:'bold'}}>YEAR OF MAKE</div>}
                        bordered
                        dataSource={year_data}
                        renderItem={
                            item => <List.Item>
                                    <CheckableTag
                                        key={item}
                                        checked={selectedTags.indexOf(item) > -1}
                                        onChange={checked => this.handleChange(item, checked)}
                                    >
                                        <span style={{cursor:'pointer',fontSize:'16px'}}>{item}</span>
                                    </CheckableTag>
                            </List.Item>
                            }
                        style={{  width:'100%',margin: '10px 0 0 10px',overflow: 'auto',height: '80vh',backgroundColor:'#E8EFF1'}}
                    />
                    </Col>
                    <Col span={8}>
                    <List
                        size="Large"
                        header={<div style={{textAlign:"center",fontWeight:'bold'}}>COMPANY</div>}
                        bordered
                        dataSource={company_data}
                        renderItem={
                            item => <List.Item>
                                    <CheckableTag
                                        key={item}
                                        checked={selectedCompanyTags.indexOf(item) > -1}
                                        onChange={checked => this.handleChangeCompany(item, checked)}
                                    >
                                        <span style={{cursor:'pointer',fontSize:'16px'}}>{item}</span>
                                    </CheckableTag>
                            </List.Item>
                            }
                        style={{margin: '42px 0',overflow: 'auto',height: '80vh',backgroundColor:'#E8EFF1'}}
                        hidden={!showCompany}
                    />
                    </Col>
                    <Col span={8}>
                        <List
                            size="Large"
                            header={<div style={{textAlign:"center",fontWeight:'bold'}}>MODEL</div>}
                            bordered
                            dataSource={model_data}
                            renderItem={
                                item => <List.Item>
                                        <Card
                                            onClick={()=>this.showCar(item.id)}
                                            style={{ width: 300, margin: 'auto', cursor: 'pointer',backgroundColor:'#8CB1B7',border:'2px solid #8CB1B7'}}
                                            cover={
                                            <img
                                                alt="example"
                                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                            />
                                            }
                                            actions={[
                                                <>
                                                <div 
                                                    style={{ fontSize: "18px", margin:'auto', color:'black'}}
                                                >
                                                    Amount
                                                </div>
                                                <div 
                                                    style={{ fontSize: "14px", margin:'auto'}}
                                                >
                                                     {numberFormat(item.amount)}
                                                </div>
                                                </>,
                                                item.is_available
                                                    ?
                                                    <Progress 
                                                        type="circle" 
                                                        percent={100} 
                                                        width={40} 
                                                        title='Available'
                                                    /> 
                                                    :
                                                    <Progress 
                                                        type="circle" 
                                                        percent={100} 
                                                        width={40} 
                                                        title='Not available'
                                                        status='exception'
                                                    /> 
                                            ]}
                                        >
                                            <Meta
                                            title={item.company+` `+item.model}
                                            description={`YOM - `+item.year_of_make}
                                            />
                                        </Card>
                                </List.Item>
                            }
                            style={{margin: '42px 0',overflow: 'auto',height: '80vh',backgroundColor:'#E8EFF1'}}
                            hidden={!showModel}
                        />
                    </Col>
                </Row>
                
                
                <Divider orientation="left"></Divider>

                </>
        );
    }
    
}


export default CarFilters;
