import React from 'react';
import { useSocket } from '../contexts/SocketProvider';



class Test extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            yo: '',
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleCriss = this.handleCriss.bind(this);

    }

    handleClick(){
        console.log('handleClick');
    }

    handleCriss(){
        console.log('handleCriss')
    }

    render(){
        return (
            <div onClick={this.handleClick}>
                <h1 >yo</h1>
                <button onClick={this.handleCriss}>button</button>
            </div>
        )
    }
}

export default Test;