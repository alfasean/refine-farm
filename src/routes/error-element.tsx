import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const ErrorElement: React.FC = () => {
    const naigate = useNavigate();
    return (
        <div
        style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Result
            status="500"
            title="500"
            subTitle="Sorry, something went wrong."
            extra={<Button type="primary" onClick={() => naigate(-1)} >Back Home</Button>}
            />
        </div>
    );
};

export default ErrorElement;