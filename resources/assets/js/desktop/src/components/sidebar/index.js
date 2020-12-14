import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Menu } from "antd";
import { PATH } from "../../constant";
import productIcon from "../../assets/images/sidebar/pay.png";

const LOGO = "logo";
const HOME = "home";

class Sidebar extends Component {
    handleItemSelect = ({ selectedKeys }) => {
        const { history } = this.props;
        switch (selectedKeys[0]) {
            default:
                history.push(PATH.HOME);
                break;
        }
    };

    render() {
        const { selectedKeys, auth } = this.props;
        return (
            <Menu
                theme="dark"
                className="side-bar-menu"
                selectedKeys={selectedKeys}
                onSelect={this.handleItemSelect}
                defaultSelectedKeys={[HOME]}
                style={{
                    width: "80px",
                    height: "100%",
                    overflow: "auto"
                }}
            >
                <Menu.Item
                    className="flex direction-column justify-center align-center p0"
                    key={LOGO}
                    title="Payment Services"
                >
                    <img
                        alt=""
                        style={{ width: "32px" }}
                        src={productIcon}
                    />
                </Menu.Item>
            </Menu>
        );
    }
}

export default withRouter(Sidebar);
