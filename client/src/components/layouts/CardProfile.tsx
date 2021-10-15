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
        <Card.Text className="card-info-side">
          <p>Truong Thanh Loc</p>
          <p style={{ left: "35%" }}>Email: thanhloc1506@gmail.com</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardProfile;
