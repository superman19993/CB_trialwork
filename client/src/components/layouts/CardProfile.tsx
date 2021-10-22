import React from "react";
import { Card } from "react-bootstrap";
import "../../css/layout/profileCard.css";

const CardProfile = () => {
  return (
    <Card className="card-side">
      <Card.Header className="card-header-side">Profile User</Card.Header>
      <Card.Body>
        <img
          className="avatar"
          src="https://bootdey.com/img/Content/avatar/avatar2.png"
          alt="avarta"
          width={120}
          height={120}
        />
        <div className="card-info-side">
          <Card.Text>Truong Thanh Loc</Card.Text>
          <Card.Text style={{ left: "35%" }}>
            Email: thanhloc1506@gmail.com
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardProfile;
