import React from "react";
import QrReader from "react-qr-scanner";

interface QrScannerParams{
  information: any
}

interface StateParams{
    delay: number;
    result: string
}
  
class QRScan extends React.Component<QrScannerParams,StateParams> {
    constructor(props:QrScannerParams){
        super(props)
        
        this.state = {
            delay: 100,
            result: 'null'
        };
    }
  
    handleScan = (data:any) => {
        if(data && data.text){            
            this.props.information(data.text)
            this.setState({
              result: data.text
            });
        }
    };

    handleError = (err:any) => {
        console.error(err);
    };

  render() {
    return (
        <QrReader
          delay={this.state.delay}
          onError={this.handleError}
          onScan={this.handleScan}
        />
    );
  }
}

export default QRScan;
