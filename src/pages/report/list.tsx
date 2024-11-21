import React from 'react'
import { Typography, Spin } from 'antd'

export default function ReportPage() {
  return (
    <>
    
    {/* <Typography.Title level={2}>Report</Typography.Title> */}
    <div>
    <iframe width="100%" 
    style={{ backgroundSize: "cover", 
    height: "100vh",
    marginRight: "10px",}}
     src="https://asuransitotalbersama-my.sharepoint.com/personal/alfa_sean_tob-ins_com/_layouts/15/Doc.aspx?sourcedoc={189d76f7-b486-410d-8fbc-8d807cda56e3}&action=embedview&wdAllowInteractivity=False&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True">
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