import React from 'react'
import { connect } from 'react-redux';
import axios from 'axios'
import { Form, FormControl, FormGroup, Button, FormLabel } from 'react-bootstrap';
import { updatePlayerName } from '../../store/actions'
import { PlayerNameControl, RoomCodeControl } from '../Controls'
import { API_HOST, API_PORT } from '../../env'

class CreateRoom extends React.Component{
    constructor(props){
        super(props)
        this.handlePlayerNameChange = this.handlePlayerNameChange.bind(this);
        this.state = {roomCodeObj: {}, roomCode: '', playerName: ''}
    }

    handlePlayerNameChange(playerName){
        this.setState({playerName})
    }


    componentDidMount(){
        // this.getNewRoomCode()
        axios.get(`http://localhost:1984/randomRoomCode`)
            .then(res => {
                this.setState({roomCodeObj: res.data, roomCode: this.constructRoomCode(res.data)})
            })
    }

    constructRoomCode(responseData){
        let res = []
        for(var i = 0; i < responseData.length; i++){
            res.push(responseData[i].cityName)
        }
        return res.join("")
    }

    getNewRoomCode(){
        const { roomId } = this.state;
        if (!roomId){
            this.setState({roomCode: this.generateNewRoomCode()})
        }
        
    }

    generateNewRoomCode(){
        return "LondonZurichCalgaryAbuDhabi"
    }

    handleSubmit = event => {
        event.preventDefault()
        const {roomCode, playerName} =  this.state;

        if(playerName){
            this.props.updatePlayerName(playerName)
            this.props.history.push("/room/" + roomCode)
        }
    }

    render(){
        const playerName = this.state.playerName
        const roomCode = this.state.roomCode

        return (
            <div>
                <h2>Create a new room</h2>
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        <RoomCodeControl value={roomCode} canEdit={false}/>
                        <PlayerNameControl value={playerName} onChange={this.handlePlayerNameChange}/>
                        <Button variant='primary' type="submit">Join</Button>
                    </Form>
                </div>
            </div>
        )
    }
}

// Pass in the actions this class will need
const mapDispatchToProps = {
    updatePlayerName
}

export default connect(null, mapDispatchToProps)(CreateRoom)