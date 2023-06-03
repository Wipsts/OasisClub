import React, {useState} from "react";
import QRScan from "./qrcode";

const Example = () => {
  const informationQr = (e:any) => {
    console.log(e)
  } 

  return (
    <>
      <QRScan information={informationQr}/>
    </>
  );
};

export default Example;
