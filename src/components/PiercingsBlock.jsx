import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function PiercingsBlock(props) {
  const { piercings, type, location, handleBtns, sessionOver } = props;

  console.log(sessionOver);

  const displayedPiercings =
    type && !location
      ? piercings.filter((prc) => prc.type === type)
      : type && location
      ? piercings.filter(
          (prc) => prc.type === type && prc.location === location
        )
      : location && !type
      ? piercings.filter((prc) => prc.location === location)
      : piercings;

  const configElements = piercings.map((prc) => {
    if (prc.selected) {
      return <p key={prc.nodeid}>{prc.nodeid}</p>;
    }
  });
  const prcElements = displayedPiercings.map((prc) => {
    const contClass =
      prc.site_cat === "vanilla-ab"
        ? "vanilla-ab prc-container"
        : prc.site_cat === "barbarian"
        ? "barbarian prc-container"
        : "mod prc-container";
    const nodeId = prc.nodeid;
    const nodeLoca = prc.bone;

    return (
      <Col key={prc.nodeid} lg={2} className="prc-col">
        {prc.type === "mod" && <span className="set-name">{prc.set_name}</span>}
        <button
          type="button"
          id={prc.index}
          className={`${contClass} ${prc.selected ? "selected" : ""}`}
          onClick={(e) => handleBtns(e, nodeId, nodeLoca)}
          disabled={prc.disabled}
        >
          <div className="img-dummy">
            <img
              src={prc.imgurl}
              className={
                prc.bone === "piercing_lobe_a_l" ||
                prc.bone === "piercing_brow_a_l" ||
                prc.bone === "piercing_lobe_b_l" ||
                prc.bone === "piercing_tragus_a_l" ||
                prc.bone === "beard_upper_lip1_l" ||
                prc.bone === "piercing_brow_b_l"
                  ? "flipped"
                  : undefined
              }
            />
          </div>
          <ul className={`prc-stats config-cont ${prc.location}`}>
            <li className="prc-name">{prc.name}</li>
            <li className="location">{prc.pt_bone}</li>
          </ul>
        </button>
      </Col>
    );
  });

  return (
    <>
      <Row className="mt-4 title-row">
        <Col>
          <h5>
            {type === "vanilla"
              ? "Vanilla Sets"
              : type === "mod"
              ? "Mod Piercings"
              : "All Piercings"}
          </h5>
        </Col>
      </Row>
      <Row className="mt-2">{sessionOver ? configElements : prcElements}</Row>
    </>
  );
}
