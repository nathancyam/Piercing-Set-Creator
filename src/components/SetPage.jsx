import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useLocation } from "react-router-dom";

export default function SetPage({ state, replace }) {
  const location = useLocation();
  const { prcsConfig } = location.state ?? {};
  // console.log(piercings);
  console.log(location.state);
  // const { name, age } = state;

  // console.log(state);
  // const { show, onClose, piercings } = props;

  // const displayConfig = piercings.map((prc) => {
  //   const setClasses =
  //     prc.type === "mod"
  //       ? "config-mod config-set"
  //       : "config-set config-vanilla";
  //   const setName =
  //     prc.type === "vanilla"
  //       ? `Vanilla : ${prc.set_name}`
  //       : `MOD : ${prc.set_name}`;
  //   if (prc.selected)
  //     return (
  //       <div key={prc.index} className={`config-cont  ${prc.location}`}>
  //         <div className="config-row">
  //           <span className="gen-loca">{prc.location}</span>
  //         </div>
  //         <div className="config-row">
  //           <span className="config-loca">{prc.pt_bone} </span>:
  //           <span className="config-name"> {prc.name}</span>
  //         </div>
  //         <div className="config-row">
  //           <span className={setClasses}>{setName}</span>
  //         </div>
  //       </div>
  //     );
  // });

  return <h1>SetPage h1</h1>;
}