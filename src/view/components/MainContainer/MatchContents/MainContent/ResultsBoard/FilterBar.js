import React, {Component} from 'react';
import { Select } from 'antd';

function handleChange(value) {
    console.log(`selected ${value}`);
}
const Option = Select.Option;

export default class FilterBar extends Component {
    render() {
        return (

                <div className="filter__wrapper">
                    <div className="filter__container resuts-filter">
                        <div className="cell">
                            
                            <Select defaultValue="Today" prefixCls="custom-selectbox" onChange={handleChange}>
                                <Option value="1">Today</Option>
                                <Option value="2">2 days</Option>
                                <Option value="3">3 days</Option>
                                <Option value="4">1 week</Option>
                                <Option value="5">1 month</Option>
                            </Select>
                            
                        </div>
                        <div className="cell">

                            <Select defaultValue="Soccer" prefixCls="custom-selectbox" onChange={handleChange}>
                                <Option value="1">Tennis</Option>
                                <Option value="2">Volleyball</Option>
                                <Option value="3">Basketball</Option>
                                <Option value="4">Ice Hockey</Option>
                                <Option value="5">Rugby</Option>
                                <Option value="6">Soccer</Option>
                                <Option value="7">Handball</Option>
                                <Option value="8">Futsal</Option>
                                <Option value="9">Motorsport</Option>
                                <Option value="10">Baseball</Option>
                                <Option value="11">Aussie rules</Option>
                                <Option value="12">American Football</Option>
                                <Option value="13">Table tennis</Option>
                            </Select>
                        </div>
                        <div className="cell">
                            <button className="select-size-1" data-toggle="changeCountry">All countries</button>
                            <ul className="select-size-1__container dropdown-pane bottom" id="changeCountry" data-dropdown data-close-on-click="true" data-v-offset="0">
                                <li className="select__item active">All coutries</li>
                                <li className="select__item">Other country</li>
                                <li className="select__item">Nigeria</li>
                                <li className="select__item">Gibraltar</li>
                                <li className="select__item">Russia</li>
                                <li className="select__item">Czech Republic</li>
                                <li className="select__item">Rwanda</li>
                                <li className="select__item">Romania</li>
                                <li className="select__item">Brazil</li>
                                <li className="select__item">Ecuador</li>
                                <li className="select__item">Spain</li>
                                <li className="select__item">Austria</li>
                                <li className="select__item">Egypt</li>
                                <li className="select__item">Denmark</li>
                                <li className="select__item">Uganda</li>
                                <li className="select__item">Sweden</li>
                                <li className="select__item">Hungary</li>
                                <li className="select__item">China</li>
                                <li className="select__item">Australia</li>
                                <li className="select__item">South Korea</li>
                                <li className="select__item">Indonesia</li>
                                <li className="select__item">Finland</li>
                                <li className="select__item">Lithuania</li>
                                <li className="select__item">Ireland</li>
                                <li className="select__item">Malaysia</li>
                                <li className="select__item">Slovakia</li>
                                <li className="select__item">Tanzania</li>
                                <li className="select__item">Uruguay</li>
                                <li className="select__item">Poland</li>
                                <li className="select__item">Ukraine</li>
                                <li className="select__item">Thailand</li>
                                <li className="select__item">Germany</li>
                                <li className="select__item">Colombia</li>
                                <li className="select__item">Uzbekistan</li>
                                <li className="select__item">Kosovo</li>
                                <li className="select__item">Slovenia</li>
                                <li className="select__item">Serbia</li>
                                <li className="select__item">Portugal</li>
                                <li className="select__item">Bosnia &amp; Herzegovina</li>
                                <li className="select__item">Croatia</li>
                                <li className="select__item">Bulgaria</li>
                                <li className="select__item">Estonia</li>
                                <li className="select__item">Vietnam</li>
                                <li className="select__item">Azerbaijan</li>
                                <li className="select__item">England</li>
                                <li className="select__item">Moldova</li>
                                <li className="select__item">Norway</li>
                                <li className="select__item">Georgia</li>
                                <li className="select__item">Latvia</li>
                                <li className="select__item">Belarus</li>
                                <li className="select__item">Greece</li>
                                <li className="select__item">Singapore</li>
                                <li className="select__item">Macedonia</li>
                                <li className="select__item">Montenegro</li>
                                <li className="select__item">Belgium</li>
                                <li className="select__item">Japan</li>
                                <li className="select__item">Israel</li>
                                <li className="select__item">Chile</li>
                                <li className="select__item">USA</li>
                                <li className="select__item">Italy</li>
                                <li className="select__item">Netherlands</li>
                                <li className="select__item">Armenia</li>
                                <li className="select__item">Switzerland</li>
                                <li className="select__item">Faroe Islands</li>
                                <li className="select__item">Iceland</li>
                                <li className="select__item">Philippines</li>
                                <li className="select__item">Kenya</li>
                                <li className="select__item">Angola</li>
                                <li className="select__item">Ghana</li>
                                <li className="select__item">Albania</li>
                                <li className="select__item">Myanmar</li>
                                <li className="select__item">Paraguay</li>
                                <li className="select__item">Kazakhstan</li>
                                <li className="select__item">Scotland</li>
                                <li className="select__item">Peru</li>
                                <li className="select__item">France</li>
                                <li className="select__item">Ivory Coast</li>
                                <li className="select__item">Zimbabwe</li>
                                <li className="select__item">Canada</li>
                                <li className="select__item">Hong Kong</li>
                                <li className="select__item">Zambia</li>
                                <li className="select__item">Argentina</li>
                                <li className="select__item">Luxembourg</li>
                                <li className="select__item">Wales</li>
                                <li className="select__item">Guatemala</li>
                                <li className="select__item">Costa Rica</li>
                                <li className="select__item">El Salvador</li>
                                <li className="select__item">Mexico</li>
                                <li className="select__item">Turkey</li>
                                <li className="select__item">Bolivia</li>
                                <li className="select__item">South Africa</li>
                                <li className="select__item">Senegal</li>
                                <li className="select__item">Oman</li>
                                <li className="select__item">Morocco</li>
                                <li className="select__item">San Marino</li>
                                <li className="select__item">Cameroon</li>
                                <li className="select__item">Venezuela</li>
                                <li className="select__item">Nicaragua</li>
                                <li className="select__item">Congo</li>
                            </ul>
                        </div>
                        <div className="cell">
                            <button className="select-size-1" data-toggle="changeTournament" disabled>League</button>
                            <ul className="select-size-1__container dropdown-pane bottom" id="changeTournament" data-dropdown data-close-on-click="true"
                                data-v-offset="0">
                                <li className="select__item active">Premier Division</li>
                                <li className="select__item">First Division, Relegation</li>
                            </ul>
                        </div>
                    </div>
                </div>



        )
    }
}