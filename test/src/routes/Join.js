import React, {Component} from 'react';

export default class Join extends Component{

    constructor(){
      super();
      this.state={
        tel:'',
        pw:''
      }
      this.tryJoin=this.tryJoin.bind(this);
    }
  
    handleChangetel=(e)=>{
      this.setState({
        tel:e.target.value
      })
    }
  
    handleChangepw=(e)=>{
      this.setState({
        pw:e.target.value
      })
    }
  
    tryJoin(){
      console.log(JSON.stringify(this.state));
      var check=false;
      fetch('http://localhost:3001/join',{
        method:'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(this.state)
      }).then(res=>res.json())
        .then(result=>{console.log(result.check);if(result.check==true)window.location.href='/';})
    }
  
    render(){
      return(
        <div className='App'>
          <div className='App-header'>
            <form>
              <input placeholder='ID(TEL)' value={this.state.tel} onChange={this.handleChangetel}/>
            </form>
            <form>
              <input placeholder='PW' value={this.state.pw} onChange={this.handleChangepw}/>
            </form>
            <button onClick={this.tryJoin}>회원가입</button>
          </div>
          
        </div>
      )
    }
  
  }