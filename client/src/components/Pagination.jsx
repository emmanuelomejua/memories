import React from 'react';
import { Pagination, PaginationItem } from '@mui/lab';
import { Link } from 'react-router-dom';


import useStyles from './styles';

const PaginationComp = ({page}) => {

    const classes = useStyles();


  return (
    <Pagination
        classes={{ ul: classes.ul }}
        count={5}
        page={1}
        variant='outlined'
        color='primary'
        renderItem={(item) + (
            <Pagination {...item} component={Link} to={`/posts?page=${1}`} />
        )}
    />
  )
}

export default PaginationComp;
