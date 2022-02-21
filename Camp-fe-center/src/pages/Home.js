import React,{ useState } from "react";

import { Divider, Typography,} from 'antd';
const { Title } = Typography;

function Home (){
    return (
        <>
         <Divider style={{ marginBottom: 60 }}>
           <Title
             level={3}
             style={{
               marginBottom: 0,
               marginTop: 10,
             }}
           >
             營主首頁
           </Title>
         </Divider>
        </>
     )
     
};

export default Home;

