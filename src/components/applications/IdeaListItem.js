import React, {useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import { Card, CardBody, Badge,  } from "reactstrap";
import { NavLink } from "react-router-dom";

import { Colxx } from "../common/CustomBootstrap";
import AddNewIdea from "../../containers/applications/AddNewIdea";
import {voteUp, voteDown, deleteIdea} from "../../redux/actions";
const TodoListItem = ({ item, handleCheckChange, isSelected }) => {
  const {  userid } = useSelector(({ authUser }) => authUser);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!modalOpen)
    
  };
  const clickLike = ()=>{
     if(item.likeUsers.includes(userid))
      return;
    else
      dispatch(voteUp({userid:userid, ideaid:item.id}));
      
  }
  const clickDelete = ()=>{
    const isDelete = window.confirm("Are you sure delete this idea?");
    if(isDelete)
      dispatch(deleteIdea(item.id));
     
 }
  const clickDislike = ()=>{
    if(!item.likeUsers)
    return;
    if(!item.likeUsers.includes(userid))
      return;
    else
      dispatch(voteDown({userid:userid, ideaid:item.id}));
   
  }
   return (
    <Colxx xxs="12">
      <Card className="card d-flex mb-3">
        <div className="d-flex flex-grow-1 min-width-zero">
          <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
            <NavLink
              to="#"
              location={{}}
              id={`toggler${item.id}`}
              className="list-item-heading mb-0 truncate w-40 w-xs-100  mb-1 mt-1"
            >
              <i
              alt="cloase"
                className={`${
                  item.status === "COMPLETED"
                    ? "simple-icon-check heading-icon"
                    : item.status ==="PENDING"?"simple-icon-refresh heading-icon":item.status==="DEVELOPMENT"?"simple-icon-drawer heading-icon":"simple-icon-close heading-icon"
                }`}
              />
              <span className="align-middle d-inline-block"><strong>{item.title}</strong></span> 
            </NavLink>

            <p className="mb-1 text-muted text-small w-15 w-xs-100">
              Created by {item.username}
            </p>
            <p className="mb-1 text-muted text-small w-15 w-xs-100">
              Created at {item.createDate}
            </p>
            <div className="w-15 w-xs-100">
              {
                userid===item.userid?
              
              <Badge color="primary" pill  onClick={(e)=>toggleModal()}>
                Edit Idea
              </Badge>:""}
            </div>
          </CardBody>
          
        </div>
        <div className="card-body pt-1">
          <p className="mb-0">{item.detail}</p>
        </div>
        <div className="text-center m-2">
          <img alt="thumbsup" src="/assets/img/thumsup.svg" width="30px" className='thumbsup' onClick = {()=>clickLike()} />
          <img alt="thumbsup" src="/assets/img/thumsdown.svg" width="30px" className='thumbsup' onClick = {()=>clickDislike()}/>
           <span>{item && item.likeUsers &&item.likeUsers.length}</span>
           {
             userid ===item.userid ?<i className="simple-icon-trash heading-icon right-corner" onClick={()=>clickDelete()} />:""
           }
           
        </div>
      </Card>
      <AddNewIdea toggleModal={toggleModal} modalOpen={modalOpen} item={item}/>
    </Colxx>
  );
};

export default React.memo(TodoListItem);
