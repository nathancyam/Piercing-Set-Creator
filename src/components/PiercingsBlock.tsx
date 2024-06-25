import { useMemo, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Piercing } from "../types";
import Paginate from "./Paginate";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { toggleSelected } from "../features/piercings/piercingsSlice";

export default function PiercingsBlock(): JSX.Element {
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const [pageLength, setPageLength] = useState<number>(54);
  // const [selectedOption, setSelectedOption] = useState<string | number>(pageLength);
  const piercings = useSelector((state: RootState) => state.piercings.data);
  const selectedIds = useSelector((state: RootState) => state.piercings.selectedIds);
  const typeFilter = useSelector((state: RootState) => state.filters.typeFilter);
  const locaFilter = useSelector((state: RootState) => state.filters.locaFilter);
  const modFilters = useSelector((state: RootState) => state.filters.modFilters);
  const dispatch = useDispatch();

  const filteredPiercings: Piercing[] = useMemo(() => {
    return piercings.filter((piercing) => {
      const matchesType = typeFilter ? piercing.type === typeFilter : true;
      const matchesLocation = locaFilter ? piercing.location === locaFilter : true;
      const matchesMods = piercing.type === "mod" ? modFilters.includes(piercing.site_cat) : typeFilter === "Vanilla" ? piercing.type !== "mod" : true;
      return matchesType && matchesLocation && matchesMods;
    });
  }, [piercings, typeFilter, locaFilter, modFilters]);

  const handleToggle = (nodeid: string) => {
    dispatch(toggleSelected(nodeid));
  };
  // function handlePageChange(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  //   const target = e.target as HTMLButtonElement;
  //   const id = parseInt(target.id);
  //   if (id !== currentPage) setCurrentPage(id);
  // }

  // const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const value = event.target.value;
  //   setSelectedOption(value);
  //   if (value === "All") {
  //     setPageLength(filteredPiercings.length);
  //   } else {
  //     setPageLength(Number(value));
  //   }
  // };

  return (
    <>
      {/* <Row className="mt-2 mt-lg-3 title-row">
        <Col>
          <h5 className="prc-block-h">{type === "vanilla" ? "Vanilla Sets" : type === "mod" ? "Mod Piercings" : "All Piercings"}</h5>
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <label htmlFor="page-length">per page: </label>
          <select value={selectedOption} onChange={handleSelectChange} id="page-length">
            <option value="30">30</option>
            <option value="54">54</option>
            <option value="84">84</option>
            <option value="All">All ({filteredPiercings.length})</option>
          </select>
        </Col>
      </Row> */}
      <Row className="mt-2 row-cols-2" sm="4" md="5" lg="6" role="row">
        {filteredPiercings.map((prc) => (
          <Col className="prc-col" key={prc.nodeid}>
            {prc.type === "mod" && <span className="set-name">{prc.set_name}</span>}
            <button
              type="button"
              id={prc.index.toString()}
              className={`prc-container ${selectedIds[prc.nodeid] ? "selected" : ""}`}
              onClick={() => handleToggle(prc.nodeid)}
              disabled={prc.disabled}
              role="button"
            >
              <div className="img-cont">
                <picture>
                  {/* <source
                  srcSet={srcToWebp(prc.imgurl)}
                  className={imgClass(prc.bone, prc.site_cat)}
                /> */}
                  <img
                    src={prc.imgurl}
                    alt={`${prc.name} - ${prc.pt_bone}`}
                    height="150"
                    width="254"
                    role="img"
                    // className={imgClass(prc.bone, prc.site_cat)}
                  />
                </picture>
              </div>
              <ul className={`prc-stats config-cont ${prc.location}`}>
                <li className="prc-name">{prc.name}</li>
                <li className="location">{prc.pt_bone}</li>
              </ul>
            </button>
          </Col>
        ))}
      </Row>
      {/* {filteredPiercings.length > 0 ? (
        <Paginate
          itemsPerPage={pageLength}
          filteredPiercings={filteredPiercings}
          currentPage={currentPage}
          handleBtns={handleBtns}
          handlePageChange={(e) => handlePageChange(e)}
        />
      ) : (
        <Row className="mt-2">
          <Col>
            <p>
              <big> There are no piercings with these filters. {modFilters.length === 0 && "You have no mods selected in Mod Filters."}</big>
            </p>
          </Col>
        </Row>
      )} */}
    </>
  );
}
