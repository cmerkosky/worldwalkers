import React from 'react'
import { FormLabel, FormControl, FormGroup } from 'react-bootstrap';

export default class RoomCodeControl extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onChange(e.target.value)
    }

    render() {
        const roomCode = this.props.value;
        const canEdit = this.props.canEdit;

        return (
            <FormGroup controlId="formRoomCode">
                <FormLabel>Room Code</FormLabel>
                <FormControl 
                    type="text" 
                    placeholder="Enter the room code here" 
                    readOnly={!canEdit} 
                    plaintext={!canEdit} 
                    value={(roomCode)} 
                    onChange={this.handleChange} 
                    style={{"textAlign":"center"}}
                    />
            </FormGroup>
        )
    }
}

RoomCodeControl.defaultProps = {
    canEdit: true
}