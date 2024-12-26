import { Outlet } from "react-router";
import Navbar from './Navbar';
import Footer from './Footer';
import { Layout } from 'antd';

const MainLayout:React.FC = () => {
    return (
        <>
            <Layout>
                <Navbar />
                <Outlet />
                <Footer />
            </Layout>
        </>
    )
}
export default MainLayout