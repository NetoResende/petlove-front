import { ConfigProvider, notification } from "antd";

const AntProvider = ({children}) => {

    return ( 
       <ConfigProvider theme={{ token: { colorPrimary: '#F05247' },components: {Input: {lineHeight: '40px'}} }}>
        {children}
       </ConfigProvider>
     );
}
 
export default AntProvider;

