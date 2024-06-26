import { useAppContext } from "../AppContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import SetModal from "./SetModal";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import {
  ViewList,
  Trash,
  XCircle,
  PlusCircle,
  InfoCircle,
} from "react-bootstrap-icons";
import { Animate } from "react-simple-animate";
import InstructionsModal from "./InstructionsModal";

export default function Header(): JSX.Element {
  const [showSet, setShowSet] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const [play, setPlay] = useState<boolean>(false);

  const {
    type,
    location,
    piercings,
    handleFilterChange,
    confirmDelete,
    toggleSessionOver,
    sessionOver,
    handleModFilterChange,
    modFilters,
    handleClearFilters,
  } = useAppContext();

  function handleCloseModal(modal: string): void {
    return modal === "set" ? setShowSet(false) : setShowInstructions(false);
  }

  const empty: boolean = piercings.filter((prc) => prc.selected).length === 0;

  return (
    <>
      <header>
        <Row className="mt-3 mt-md-0 mb-2 mb-sm-0 justify-content-between">
          <Col lg={5} className="align-self-center mb-2 mb-lg-0">
            <Link className="site-logo" to="/">
              Indoct's BG3 Piercing Set Creator
            </Link>
          </Col>
          <Col
            lg={6}
            className="d-flex flex-row justify-content-xl-end align-items-center justify-content-start"
          >
            <Button
              type="button"
              variant="primary"
              onClick={() => setShowSet(true)}
              disabled={empty}
              aria-label="Show Current Set Modal"
            >
              <ViewList />
            </Button>
            <SetModal
              show={showSet}
              onClose={() => handleCloseModal("set")}
              sessionOver={sessionOver}
              generateNodes={toggleSessionOver}
              piercings={piercings}
              togglePlay={() => {
                if (play) setPlay(!play);
              }}
            />
            <Button
              type="button"
              id="instructions-btn"
              variant="secondary"
              onClick={() => setShowInstructions(true)}
              aria-label="Show Instructions Modal"
            >
              <InfoCircle />
            </Button>
            <InstructionsModal
              show={showInstructions}
              onClose={() => handleCloseModal("instructions")}
            />
            <Button
              type="button"
              id="hr-clear-btn"
              variant="secondary"
              onClick={confirmDelete}
              disabled={empty}
              aria-label="Clear Current Set"
            >
              <Trash /> Clear Set
            </Button>
          </Col>
        </Row>
      </header>
      {!sessionOver && (
        <Row className="mt-2 filter-row mb-1">
          <Col xs={12} lg={6} xl={5}>
            <div className="filter-btns mb-1 mb-xl-0">
              <span>Type:</span>
              <button
                type="button"
                onClick={() => {
                  handleFilterChange("type", null);
                }}
                className={`all-piercings ${!type ? "selected" : ""}`}
              >
                Show All
              </button>
              <button
                type="button"
                onClick={() => handleFilterChange("type", "mod")}
                className={`mod-btn ${type === "mod" ? "selected" : ""}`}
              >
                Mod Only
              </button>
              <button
                type="button"
                onClick={() => {
                  handleFilterChange("type", "vanilla");
                  if (filtersOpen) {
                    setFiltersOpen((prevState) => !prevState);
                    setPlay(!play);
                  }
                }}
                className={`vanilla ${type === "vanilla" ? "selected" : ""}`}
                disabled={location === "lips"}
                data-tooltip-id="my-tooltip"
                data-tooltip-content="There are no vanilla piercings in the lip slot, change/clear the location filter to enable this filter"
                data-tooltip-place="top"
              >
                Vanilla
              </button>
              <button
                type="button"
                onClick={() => {
                  setPlay(!play);
                  setFiltersOpen((prevState) => !prevState);
                }}
                className="toggle"
                disabled={type === "vanilla"}
              >
                {filtersOpen ? "Hide" : "Show"} Mod Filters
                {!filtersOpen ? (
                  <PlusCircle size="17" />
                ) : (
                  <XCircle size="17" />
                )}
              </button>
            </div>
          </Col>
          <Col lg={6} xl={5}>
            <div className="filter-btns loca-filters">
              <span>Location:</span>
              <button
                type="button"
                onClick={() => {
                  handleFilterChange("location", "ears");
                }}
                className={`filter ears ${
                  location === "ears" ? "selected" : ""
                }`}
              >
                Ears
              </button>
              <button
                type="button"
                onClick={() => handleFilterChange("location", "nose")}
                className={`filter nose ${
                  location === "nose" ? "selected" : ""
                }`}
              >
                Nose
              </button>
              <button
                type="button"
                onClick={() => {
                  handleFilterChange("location", "brows");
                }}
                className={`filter brows ${
                  location === "brows" ? "selected" : ""
                }`}
              >
                Brows
              </button>
              <button
                onClick={() => {
                  handleFilterChange("location", "lips");
                  if (type === "vanilla") handleFilterChange("type", null);
                }}
                className={`filter lips ${
                  location === "lips" ? "selected" : ""
                }`}
                disabled={type === "vanilla"}
              >
                Lips
              </button>
              {location && (
                <button
                  type="button"
                  onClick={() => {
                    handleFilterChange("location", null);
                  }}
                  className="clear-btn"
                  aria-label="Clear Location Filters"
                >
                  Clear
                </button>
              )}
            </div>
            {location === "lips" && <Tooltip id="my-tooltip" />}
          </Col>
          <Col
            xs={4}
            xl={2}
            className="d-flex align-items-center mt-1 mt-xl-0 justify-content-xl-end"
          >
            <button
              type="button"
              className="clear-btn btn reset"
              onClick={() => {
                handleClearFilters();
                if (filtersOpen) {
                  setFiltersOpen((prevState) => !prevState);
                  setPlay(!play);
                }
              }}
              disabled={type === null && location === null}
            >
              Reset All Filters
            </button>
          </Col>
        </Row>
      )}
      <Animate
        play={play}
        start={{
          transform: "translateY(0px)",
          visibility: "hidden",
          opacity: "0",
          height: "0",
        }}
        end={{
          transform: "translateY(6px)",
          visibility: "visible",
          height: "45px",
        }}
      >
        <Row>
          <Col>
            <div className="mod-filters">
              <button
                type="button"
                onClick={() => {
                  handleModFilterChange("isp_gold");
                }}
                className={`mod ${
                  modFilters.includes("isp_gold") ? "selected" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="isp_gold"
                  checked={modFilters.includes("isp_gold")}
                  readOnly
                />
                Indoct's Subtler Piercings (Gold)
              </button>
              <button
                type="button"
                onClick={() => {
                  handleModFilterChange("isp_silver");
                }}
                className={`mod ${
                  modFilters.includes("isp_silver") ? "selected" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="isp_silver"
                  checked={modFilters.includes("isp_silver")}
                  readOnly
                />
                Indoct's Subtler Piercings (Silver)
              </button>
              <button
                type="button"
                onClick={() => {
                  handleModFilterChange("p4_blooming");
                }}
                disabled={location === "lips"}
                className={`mod ${
                  modFilters.includes("p4_blooming") && location !== "lips"
                    ? "selected"
                    : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="p4_blooming"
                  checked={
                    modFilters.includes("p4_blooming") && location !== "lips"
                  }
                  disabled={location === "lips"}
                  readOnly
                />
                P4 Blooming Circlets & Piercings
              </button>
              <button
                type="button"
                onClick={() => {
                  handleModFilterChange("ghouls_customs");
                }}
                className={`mod ${
                  modFilters.includes("ghouls_customs") ? "selected" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="ghouls_customs"
                  checked={modFilters.includes("ghouls_customs")}
                  readOnly
                />
                Ghouls Custom Piercings
              </button>
              <button
                type="button"
                onClick={() => {
                  handleModFilterChange("LV_E_V1");
                }}
                className={`mod ${
                  modFilters.includes("LV_E_V1") ? "selected" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="LV_E_V1"
                  checked={modFilters.includes("LV_E_V1")}
                  readOnly
                />
                LVDNRs Earrings V1
              </button>
            </div>
          </Col>
        </Row>
      </Animate>
    </>
  );
}
