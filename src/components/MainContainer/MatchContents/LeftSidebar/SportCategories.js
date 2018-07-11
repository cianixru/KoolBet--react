import React from 'react';
// import Collapse from '@material-ui/core/Collapse';
import { connect } from "react-redux";
import { Menu, Icon, Button } from 'antd';

const SubMenu = Menu.SubMenu;

class SportCategories extends React.Component {
    state = {
        collapsed: false,
      }
    
      toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      }
    

/*     render() {
        return (
            <div className="sport-categories">
                <div className="header__sport-menu all-sport-menu" id="all-sport-menu">
                    <div className="sport-menu__title">Sports</div>
                    <div className="sport-menu__collapse-all"></div>
                </div>

                <div className="change-period__container">
                    <button className="select-size-1" data-toggle="changePeriod">All events</button>
                    <ul className="select-size-1__container dropdown-pane bottom" id="changePeriod">
                        <li className="select__item active">All events</li>
                        <li className="select__item">Last minute</li>
                        <li className="select__item">Today</li>
                        <li className="select__item">Tomorrow</li>
                    </ul>
                </div>

                <ul className="sport-menu scroll-watcher">
                    <li>
                        <a className="sport-menu__item" onClick={e => this.handleClick(e, 0)}>
                            <i className="soccer"></i>
                            <span className="title" title="Soccer">Soccer</span>
                            <span className="count">85</span>
                        </a>
                        <Collapse in={this.state.open.includes(0)} timeout="auto" unmountOnExit>
                            <ul className="sport-submenu country__header">

                                <li className="is-submenu-item">
                                    <a className="sport-submenu__item icon" onClick={e => this.handleClick(e, '0-1')}>
                                        <span className="title">Austria</span>
                                        <span className="count">2</span>
                                    </a>
                                    <Collapse in={this.state.open.includes('0-1')} timeout="auto" unmountOnExit>
                                        <ul className="sport-submenu__events-menu">
                                            <li>
                                                <a className="icon active-tournament">
                                                    <span className="title">Brasileiro Serie B</span>
                                                    <span className="count">2</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="icon">
                                                    <span className="title">Brasileiro Serie B</span>
                                                    <span className="count">2</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="icon">
                                                    <span className="title">Brasileiro Serie B</span>
                                                    <span className="count">2</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </Collapse>
                                </li>
                                <li className="is-submenu-item"><a className="sport-submenu__item icon">
                                    <span className="title">Brazil</span>
                                    <span className="count">5</span>
                                </a></li>
                                <li className="is-submenu-item"><a className="sport-submenu__item icon">
                                    <span className="title">Colombia</span>
                                    <span className="count">1</span>
                                </a></li>
                                <li className="is-submenu-item"><a className="sport-submenu__item icon">
                                    <span className="title">Egypt</span>
                                    <span className="count">11</span>
                                </a></li>
                                <li className="is-submenu-item"><a className="sport-submenu__item icon">
                                    <span className="title">England</span>
                                    <span className="count">4</span>
                                </a></li>
                            </ul>
                        </Collapse>
                    </li>
                    <li>
                        <a className="sport-menu__item" onClick={e => this.handleClick(e, 1)}>
                            <i className="american_football"></i>
                            <span className="title">American football</span>
                            <span className="count">72</span>
                        </a>
                        <Collapse in={this.state.open.includes(1)} timeout="auto" unmountOnExit>
                            <ul className="sport-submenu country__header">
                                <li className="is-submenu-item">
                                    <a className="sport-submenu__item icon" onClick={e => this.handleClick(e, '0-2')}>
                                        <span className="title">Austria</span>
                                        <span className="count">2</span>
                                    </a>
                                    <Collapse in={this.state.open.includes('0-2')} timeout="auto" unmountOnExit>
                                        <ul className="sport-submenu__events-menu">
                                            <li>
                                                <a className="icon active-tournament">
                                                    <span className="title">Brasileiro Serie B</span>
                                                    <span className="count">2</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="icon">
                                                    <span className="title">Brasileiro Serie B</span>
                                                    <span className="count">2</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="icon">
                                                    <span className="title">Brasileiro Serie B</span>
                                                    <span className="count">2</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </Collapse>
                                </li>
                                <li className="is-submenu-item">
                                    <a className="sport-submenu__item icon">
                                        <span className="title">Brazil</span>
                                        <span className="count">5</span>
                                    </a></li>
                                <li className="is-submenu-item"><a className="sport-submenu__item icon">
                                    <span className="title">Colombia</span>
                                    <span className="count">1</span>
                                </a></li>
                                <li className="is-submenu-item"><a className="sport-submenu__item icon">
                                    <span className="title">Egypt</span>
                                    <span className="count">11</span>
                                </a></li>
                                <li className="is-submenu-item"><a className="sport-submenu__item icon">
                                    <span className="title">England</span>
                                    <span className="count">4</span>
                                </a>
                                </li>
                            </ul>
                        </Collapse>
                    </li>
                    <li>
                        <a className="sport-menu__item">
                            <i className="baseball"></i>
                            <span className="title">Baseball</span>
                            <span className="count">11</span>
                        </a>
                    </li>
                    <li>
                        <a className="sport-menu__item">
                            <i className="basketball"></i>
                            <span className="title">Basketball</span>
                            <span className="count">2</span>
                        </a>
                    </li>
                    <li>
                        <a className="sport-menu__item">
                            <i className="darts"></i>
                            <span className="title">Darts</span>
                            <span className="count">3</span>
                        </a>
                    </li>
                    <li>
                        <a className="sport-menu__item">
                            <i className="handball"></i>
                            <span className="title">Handball</span>
                            <span className="count">15</span>
                        </a>
                    </li>
                    <li>
                        <a className="sport-menu__item">
                            <i className="ice_hockey"></i>
                            <span className="title">Ice hockey</span>
                            <span className="count">20</span>
                        </a>
                    </li>
                    <li>
                        <a className="sport-menu__item">
                            <i className="rugby"></i>
                            <span className="title">Rugby</span>
                            <span className="count">14</span>
                        </a>
                    </li>
                    <li>
                        <a className="sport-menu__item">
                            <i className="snooker"></i>
                            <span className="title">Snooker</span>
                            <span className="count">7</span>
                        </a>
                    </li>
                    <li>
                        <a className="sport-menu__item">
                            <i className="tennis"></i>
                            <span className="title">Tennis</span>
                            <span className="count">21</span>
                        </a>
                    </li>
                    <li>
                        <a className="sport-menu__item">
                            <i className="volleyball"></i>
                            <span className="title">Volleyball</span>
                            <span className="count">51</span>
                        </a>
                    </li>
                </ul>
            </div>
        );
    } */

    render() {
        return (
          <div>
            <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
              <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
            </Button>
            <Menu
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              theme="dark"
              inlineCollapsed={this.state.collapsed}
            >
              <Menu.Item key="1">
                <Icon type="pie-chart" />
                <span>Option 1</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="desktop" />
                <span>Option 2</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="inbox" />
                <span>Option 3</span>
              </Menu.Item>
              <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                <Menu.Item key="5">Option 5</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <SubMenu key="sub3" title="Submenu">
                  <Menu.Item key="11">Option 11</Menu.Item>
                  <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
              </SubMenu>
            </Menu>
          </div>
        );
      }

}

function mapStateToProps(state) {
    return {
        state: {
            currentPage: state.currentPage,
            matchCategoriesSelected: state.matchCategoriesSelected,
        }
    }
}

export default connect(mapStateToProps)(SportCategories)