import React from "react";
import "./index.css"


class List extends React.Component{
    state= {count:25,limit:1,sec:60,isStop:false}
    componentWillUnmount(){
        this.clearFunction()
    }
    clearFunction = () =>{
    clearInterval(this.timerId)
    }
    componentDidMount() {
        this.startTimer();
    }
    startTimer = () =>{
        this.timerId = setInterval(this.timer,100)
    }
    timer = () => {
        const {sec,count}=this.state;
        console.log(sec)
        console.log(count)
        const s = sec === 0?60:sec;
        if(s === 60){
        this.setState(({sec:60}))
        this.setState((prev)=>({count:prev.count-1}))
        this.setState((prev)=>({sec:prev.sec-1}))
        }
        if(count === 0 && s === 1){
            this.setState((prev)=>({isStop:!prev.isStop}))
                clearInterval(this.timerId);
        }
        if(s !== 60){
            this.setState((prev)=>({sec:prev.sec-1}))
        }
    }
    pauseFunction = () =>{
        const {isStop,count,sec}=this.state;
        if(isStop){
            this.startTimer();
            this.setState((prev)=>({isStop:!prev.isStop}))
        }
        if(isStop === false){
            
            clearInterval(this.timerId);
            this.setState((prev)=>({isStop:!prev.isStop}))
        }
        if(count === 0 && sec === 0){
            this.setState(({count:25}))
            this.setState({sec:1})
            this.setState({limit:25})
            this.timer();
        }
    }
    resetFunction = () =>{
        const {isStop}=this.state;
        if(isStop){
            this.setState(({count:25}))
            this.setState({sec:0})
            this.setState({limit:25})
        }
    }
    decreaseFunction = () =>{
        const {isStop,limit} = this.state;
        if(isStop  && limit > 0){
        this.setState((prev)=>({count:prev.count - 1}))
        // this.setState((prev)=>({limit:prev.limit-1}))
        this.setState({sec:0})
        }
    }
    increaseFunction = () =>{
        const {isStop} = this.state;
        if(isStop){
        this.setState((prev)=>({count:prev.count + 1}))
        // this.setState((prev)=>({limit:prev.limit+1}))
        this.setState({sec:0})
        }
    }
    render(){
        const {count,isStop,sec}=this.state;
        // const  s = {sec} === 60 ? '00':{sec};
    return(
        <div className="comment-card">
            <div className="m">
            <div className="time-card">
                <div className="time">
            {count<10?<h1>0{count}</h1>:<h1>{count}</h1>}:{sec<10?<h1>0{sec}</h1>:<h1>{sec === 60 ?'00':sec}</h1>}
            </div>
            {isStop?'Pause':'Running'}
            </div>
            <div>
            {isStop ? <button onClick={this.pauseFunction}>Run</button>:<button onClick={this.pauseFunction}>Pause</button>}
            </div>
            <div>
                <button className="s" onClick={this.decreaseFunction}>-</button><button className="s" onClick={this.increaseFunction}>+</button>
            </div>
            <div>
                <button onClick={this.resetFunction}>Reset</button>
            </div>
            </div>
        </div>
    )
    }
}
export default List;