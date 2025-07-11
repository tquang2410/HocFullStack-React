import {notification, Table} from "antd";
import {useEffect, useState} from "react";
import {getUserApi} from "../util/api.js";

const UserPage = () => {
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        const fetchUser = async () => {
            const res = await getUserApi();
            if(!res?.message) {
                setDataSource(Array.isArray(res) ? res : []);
            } else {
                notification.error(
                    {
                        message: 'Unauthorized',
                        description: res?.message || 'You are not authorized to view this page.',
                    }
                );
                setDataSource([]); // clear data if unauthorized or error
            }
        }
        fetchUser();
    }, []);
    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
        },

        {
            title: 'Email',
            dataIndex: 'email',

        },
        {
            title: 'Name',
            dataIndex: 'name',

        },
        {
            title: 'Role',
            dataIndex: 'role'
        },

    ];

    return (
        <div style={{padding: 50}}>

            <Table
                bordered
                dataSource={dataSource}
                columns={columns}
                rowKey="_id"
            />
        </div>
    )
}
export default UserPage;