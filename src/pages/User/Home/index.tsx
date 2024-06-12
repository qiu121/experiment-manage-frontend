import {message} from 'antd';
import { useEffect, React } from 'react';

const UserHome: React.FC = () => {
  const [ contextHolder] = message.useMessage();

  useEffect(()=>{
  },[]);

  return (
    <>
      {contextHolder}
      <>根据需求自定义</>
    </>
  );
};

export default UserHome;
