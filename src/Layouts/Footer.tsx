import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;

const FooterApp:React.FC = () => {
    return (
        <Layout>
            <Footer style={{ textAlign: "center" }}>
                <div className="grid grid-flow-col">
                    <div>Logo here</div>
                    <div>Main back function</div>
                    <div>Contact function</div>
                </div>
                ©2024 Created by Ryan Coder
            </Footer>
        </Layout>
    )
}
export default FooterApp