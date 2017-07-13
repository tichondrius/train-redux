
import { connect } from 'react-redux';
import React from 'react';
import { setFilter } from '../actions';

const Link  = ({active, children, setFilter}) => {
  if (active){
    return <span>{children}</span>
  }
  return (
    <a href='#'
       onClick={e => {
         e.preventDefault();
         setFilter(); 
       }}
       >
       {children}
       </a>
  );
}


const mapStateToFilterProps = (state, ownProps) => ({
  active: ownProps.filter == state.visibilityFilter,   
});
const mapDispatchToFilterProps = (dispatch, ownProps) => ({
  setFilter() { 
    dispatch(setFilter(ownProps.filter)) 
  }
});

const FilterLink = connect(
  mapStateToFilterProps,
  mapDispatchToFilterProps
)(Link)

export default FilterLink;