import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Campaign from "../components/campaign";

class Home extends React.Component {
  render() {
    return(
      <Row>
        <Col className="mt-4">
         <Campaign campaign={{
            header: "Your Campaigns",
            title: "Featured Campaign",
            body: "This is a featured campaign",
            button: {
              value: "View details",
              link: "/campaigns/1",
            }
          }} />
        </Col>
        <Col className="mt-4">
          <Campaign campaign={{
              header: "Most funded Campaigns",
              title: "Featured Campaign",
              body: "This is a featured campaign",
              button: {
                value: "View details",
                link: "/campaigns/1",
              }
            }} />
        </Col>
      </Row>
    )
  }
}
export default Home;