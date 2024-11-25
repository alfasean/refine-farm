import React, {useState, useEffect} from 'react'
import { Typography, Spin } from 'antd'
import Spreadsheet from 'react-spreadsheet'
import { FullScreenLoading } from '@/components/ui'

export default function ReportPage() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3500)
  }, [])
  return (
    <>
    {/* <Typography.Title level={2}>Report</Typography.Title> */}
    <Spin spinning={loading} tip="Loading..." size="large"
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    }}>
    <iframe width="100%" 
    style={{ backgroundSize: "cover",
    backgroundColor: loading ? "rgba(0,0,0,0.5)" : "transparent", 
    height: "100vh",
    marginRight: "10px",}}
     src="https://asuransitotalbersama-my.sharepoint.com/personal/alfa_sean_tob-ins_com/_layouts/15/Doc.aspx?sourcedoc={189d76f7-b486-410d-8fbc-8d807cda56e3}&action=embedview&wdAllowInteractivity=False&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True">
    </iframe>
      {/* <iframe 
      width="100%" 
      style={{ backgroundSize: 'cover', height: '100vh' }}
      src="https://asuransitotalbersama-my.sharepoint.com/personal/jenifer_putri_tob-ins_com/_layouts/15/Doc.aspx?sourcedoc={56918ea7-30ff-4b5b-9c2d-eed2100d8455}&action=embedview&wdAllowInteractivity=False&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True">
      </iframe> */}
    </Spin>
    </>
  )
}