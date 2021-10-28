import React from "react";
import "../../css/layout/userIcon.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const UserIcon = ({ username }: { username: string }) => {
  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      {username}
    </Tooltip>
  );
  console.log(username);
  return (
    <OverlayTrigger
      placement="bottom"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <div className="user-icon">{username.substring(0, 1).toUpperCase()}</div>
    </OverlayTrigger>
  );
};

export default UserIcon;
