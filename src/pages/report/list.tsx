import React from 'react'
import { Typography, Spin } from 'antd'

export default function ReportPage() {
  return (
    <>
    
    <Typography.Title level={2}>Report</Typography.Title>
    <div>
      <iframe 
      width="100%" 
      style={{ height: "100vh" }}
      src="https://asuransitotalbersama-my.sharepoint.com/personal/alfa_sean_tob-ins_com/_layouts/15/Doc.aspx?sourcedoc={0b848566-e97d-413d-b102-09a73162ee15}&action=embedview&wdAllowInteractivity=False&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True">
      </iframe>
      {/* <iframe 
      width="100%" 
      style={{ backgroundSize: 'cover', height: '100vh' }}
      src="https://asuransitotalbersama-my.sharepoint.com/personal/jenifer_putri_tob-ins_com/_layouts/15/Doc.aspx?sourcedoc={56918ea7-30ff-4b5b-9c2d-eed2100d8455}&action=embedview&wdAllowInteractivity=False&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True">
      </iframe> */}
    </div>
    </>
  )
}