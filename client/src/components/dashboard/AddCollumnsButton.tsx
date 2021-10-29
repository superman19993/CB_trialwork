import React from "react";
import "../../css/card/card.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const AddCollumnsButton = () => {
  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      {"Add new column"}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="auto-end"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <div className="addCollumn">+</div>
    </OverlayTrigger>
  );
};

export default AddCollumnsButton;
