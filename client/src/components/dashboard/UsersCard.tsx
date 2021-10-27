import { useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";

const UsersCard = ({
    userid,
    username,
    cardid,
  }: {
    userid: number;
    username: string;
    cardid: number;
  }) => {
  
    const dispatch = useDispatch();
    const testing=()=>{
        console.log(cardid);
    }
  
    return (
        <div>alo</div>
    );
  };
  
  export default UsersCard;