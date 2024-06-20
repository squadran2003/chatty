import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class Campaign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            campaign: props.campaign,
        };
    }
    render() {
        return(
            <div>
                <h5>{this.state.campaign.header}</h5>
                <Card style={{ width: '70%' }}>
                    <Card.Body>
                        <Card.Title>{this.state.campaign.title}</Card.Title>
                        <Card.Text>
                            {this.state.campaign.body}
                        </Card.Text>
                        <Button variant="primary">{this.state.campaign.button.value}</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
export default Campaign;