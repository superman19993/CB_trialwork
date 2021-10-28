import React from "react";
import { Card } from "react-bootstrap";
import "../../css/layout/profileCard.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const CardProfile = () => {
  const authState = useSelector((state: RootState) => state.user);

  return (
    <Card className="card-side">
      <Card.Header className="card-header-side">Profile User</Card.Header>
      <Card.Body>
        <img
          className="avatar"
          src="../../assets/avatar.png"
          alt="avatar"
          width={120}
          height={120}
        />
        <div className="card-info-side">
          <Card.Text>Username: {authState.user.username}</Card.Text>
          <Card.Text style={{ left: "35%" }}>
            Email: {authState.user.email}
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardProfile;
