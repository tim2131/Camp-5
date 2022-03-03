import React,{ useState } from "react";
import { Divider, Typography,} from 'antd';
import Video from '../img/banner.mp4';
import Page from '../img/page.svg';
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
        <div 
         style={{ 
            maxWidth: '1920px',
          }}>
         <div 
          style={{ 
            maxWidth: '1920px',
            maxHeight: '1200px',
            margin:'0',
            padding:'0'
          }}>
              <video autoPlay muted loop 
              style={{
                width: '100%',
                height: '100%',
                objectFit:'cover',
                }}>
                 <source src={Video} type="video/mp4" />
              </video>
          </div>
          <Divider 
          style=
          {{ 
            marginBottom: 60,
            background:'#E9E3DA',
          }}>
            <h1>營主說明</h1>
            <h3></h3>
          </Divider>
        </div>
        </>
     )
     
};

export default Home;

