import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from '../parts/navbar';


export default class RecordLogs extends Component {
  constructor(props) {
    super(props);
    this.state={
        docOne:{
          width:'20vw',
          height:'30vh',
          position:'static',
          closeBtnVis:'hidden',
          margin:0
        },
        docTwo:{
          width:'20vw',
          height:'30vh',
          position:'static',
          closeBtnVis:'hidden',
          margin:0
        },
        docThree:{
          width:'20vw',
          height:'30vh',
          position:'static',
          closeBtnVis:'hidden',
          margin:0
        },
        docFour:{
          width:'20vw',
          height:'30vh',
          position:'static',
          closeBtnVis:'hidden',
          margin:0
        },
        hidden:'visible'
    }
    this.Expand = this.Expand.bind(this);
    this.Close = this.Close.bind(this);
}

Expand(event){
  console.log(event.target.name)
  this.setState({
      [event.target.name]:{
        width:'100vw',
        height:'100%',
        position:'absolute',
        closeBtnVis:'visible',
        margin:'auto'
      },
      hidden:'hidden'
  })
}

Close(event){
  console.log(event.target.name)
  this.setState({
    [event.target.name]:{
        width:'20vw',
        height:'30vh',
        position:'static',
        closeBtnVis:'hidden',
        margin:0
      },
      hidden:'visible'
  })
}

  render() {
    return (
      <div className='home-wrapper'>
          <div className='nav-wrapper'style={{zIndex:1,right:0,position:'absolute'}}>
              <NavBar
                  loggedInStatus={this.props.loggedInStatus}
                  username={this.props.username}
                  handleSuccessfulLogout={this.props.handleSuccessfulLogout}
              />
          </div>
          <div id='research-doc-container' >
            <div className='research-doc-wrapper'>
              <div className='research-doc-label' style={{visibility:this.state.hidden}}>
                <h2>Site-09 Research SOP</h2>
              </div>
              <div className='iframe-wrapper'>
                <iframe
                  style={{
                    width:this.state.docOne.width,
                    height:this.state.docOne.height,
                    position:this.state.docOne.position,
                    // marginLeft:this.state.docOne.margin,
                    // marginRight:this.state.docOne.margin
                  }}
                  src={`https://drive.google.com/file/d/1znHo2LNiaTFWXR5A3uIa4ppfJOe7qV6JQoxwmaabctg/preview`}
                  frameBorder="0"
                />
              </div>
              <div className='research-doc-button-open' style={{visibility:this.state.hidden}}>
                <button name="docOne" onClick={this.Expand}>[ Expand ]</button>
              </div>
              <div className='research-doc-button-close' style={{visibility:this.state.docOne.closeBtnVis}}>
                <button name="docOne" onClick={this.Close}>X</button>
              </div>
            </div>
            <div className='research-doc-wrapper'>
              <div className='research-doc-label' style={{visibility:this.state.hidden}}>
                <h2>Site-09 Research Training Document</h2>
              </div>
              <iframe
                style={{
                  width:this.state.docTwo.width,
                  height:this.state.docTwo.height,
                  position:this.state.docTwo.position,
                  top:0
                }}
                src={`https://drive.google.com/file/d/1IIV_-woSrliuaseX_kYdqUCgmmz5-BT-RQfgx1NcPYw/preview`}
                frameBorder="0"
              />
              <div className='research-doc-button-open' style={{visibility:this.state.hidden}}>
                <button name="docTwo" onClick={this.Expand}>[ Expand ]</button>
              </div>
              <div className='research-doc-button-close' style={{visibility:this.state.docTwo.closeBtnVis}}>
                <button name="docTwo" onClick={this.Close}>X</button>
              </div>
            </div>
            <div className='research-doc-wrapper'>
              <div className='research-doc-label' style={{visibility:this.state.hidden}}>
                <h2>Site-09 Constitution (v6)</h2>
              </div>
              <iframe
                style={{
                  width:this.state.docThree.width,
                  height:this.state.docThree.height,
                  position:this.state.docThree.position,
                  top:0,
                }}
                src={`https://drive.google.com/file/d/1DY1-8xHZw-HYtBsynMm35qbCBxPTQHntfM4Srp9-rQU/preview`}
                frameBorder="0"
              />
              <div className='research-doc-button-open' style={{visibility:this.state.hidden}}>
                <button name="docThree" onClick={this.Expand}>[ Expand ]</button>
              </div>
              <div className='research-doc-button-close' style={{visibility:this.state.docThree.closeBtnVis}}>
                <button name="docThree" onClick={this.Close}>X</button>
              </div>
            </div>
            <div className='research-doc-wrapper'>
              <div className='research-doc-label' style={{visibility:this.state.hidden}}>
                <h2>Site-09 Research Log Advice</h2>
              </div>
              <iframe
                style={{
                  width:this.state.docFour.width,
                  height:this.state.docFour.height,
                  position:this.state.docFour.position,
                  top:0
                }}
                src={`https://drive.google.com/file/d/13lmafN_IJjtmrbueoZnHKGxIJHgInXXLMiU36Mnt-DU/preview`}
                frameBorder="0"
              />
              <div className='research-doc-button-open' style={{visibility:this.state.hidden}}>
                <button name="docFour" onClick={this.Expand}>[ Expand ]</button>
              </div>
              <div className='research-doc-button-close' style={{visibility:this.state.docFour.closeBtnVis}}>
                <button name="docFour" onClick={this.Close}>X</button>
              </div>
            </div>
          </div>
         
      </div>
    );
  }
}
