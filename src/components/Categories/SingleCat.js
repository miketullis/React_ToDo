import React, {useState} from "react";
import { useAuth } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import CatEdit from "./CatEdit";

library.add(fas);


export default function SingleCat(props) {
  const { currentUser } = useAuth();
  const [showEdit, setShowEdit] = useState(false);

  return (
    <>
      <tr key={props.category.CategoryId}>
            <td>{props.category.Name}</td>
            <td>{props.category.Description}</td>
            {currentUser.email === "miketullis@hotmail.com" && 
            <td>
              <button className="m-1 rounded" id="eidtLink" onClick={() => setShowEdit(true)}>
              <FontAwesomeIcon icon={[ 'fas', 'edit']} />
              </button>
        <button id="deleteLink" onClick={() => {
          if(window.confirm(`Are you sure you want to delete ${props.category.Name}?`)){
               props.deleteCategory(props.category.CategoryId)
          }
        }}>
          <FontAwesomeIcon icon={['fas', 'trash-alt']} />
       </button>
            </td>
            }
      </tr>
      {showEdit &&
      <CatEdit
        category={props.category}
        setShowEdit={setShowEdit}
        showEdit={showEdit}
        getCategories={props.getCategories} />
      }
    </>
  );
}