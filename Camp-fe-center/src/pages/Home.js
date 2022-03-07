import React from "react";
import { Divider, Typography, Image} from 'antd';
import Video from '../img/banner.mp4';
import Page from '../img/page.svg';
import "../style/home.less";
import axios from "axios";
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
            marginBottom: 30,
            background:'#E9E3DA',
          }}>
            <h1>營主說明</h1>
          </Divider>
          <div className="campBossPic">
          <Image.PreviewGroup>
              <Image width={100} height={100} src={`http://localhost:3005/images/owner.jpg`}/>
          </Image.PreviewGroup>
          </div>
          <div className="campBoss">
              <div className="campBoss1">
                  <h3>1.營地資料</h3>
                  <p>
                    顯示營地登入相關資訊,<br/>並且可修改更新。
                  </p>
              </div>
              <div className="campBoss1">
                  <h3>2.管理訂單</h3>
                  <p>
                    顯示所有訂單相關資訊,<br/>並可上傳會員點數。
                  </p>
              </div>
              <div className="campBoss1">
                  <h3>3.帳篷管理</h3>
                  <p>
                    管理營地帳篷,<br/>新增、修改、檢視、刪除。
                  </p>
              </div>
              <div className="campBoss1">
                  <h3>4.活動管理</h3>
                  <p>
                  管理營地加購活動,<br/>新增、修改、檢視、刪除。
                  </p>
              </div>
            </div>
        </div>
        </>
     )
     
};

export default Home;

