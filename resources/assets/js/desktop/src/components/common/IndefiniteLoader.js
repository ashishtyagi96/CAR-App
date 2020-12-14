import React from "react";
import { Spin, Icon } from "antd";

export default function IndefiniteLoader({ className, iconClassName }) {
    return (
        <div className="wp100">
            <Spin
                className={`${className} `}
                indicator={
                    <Icon className={`${iconClassName} `} type="loading" spin />
                }
            />
        </div>
    );
}
