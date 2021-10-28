import { useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";

const UsersCard = ({
    id,
    email,
    username,
  }: {
    id: number;
    email: string;
    username: string;
  }) => {
  
    const dispatch = useDispatch();
  
    return (
        <div>{username}</div>
    );
  };
  
  export default UsersCard;