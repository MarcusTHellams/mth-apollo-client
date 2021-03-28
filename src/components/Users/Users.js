import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { usePaginated } from '@makotot/paginated';
import { useUsersContext } from 'context/usersContext';

const Users = ({
  data: {
    users: {
      meta: { totalCount },
    },
  } = { users: { meta: { totalCount: 1 } } },
  pageChangeHandler,
  page,
  limit,
}) => {

  const { userData: { users, todos } = { users: { todos: {} } } } = useUsersContext();

  const {
    pages,
    currentPage,
    hasPrev,
    hasNext,
    getFirstBoundary,
    getLastBoundary,
    isPrevTruncated,
    isNextTruncated,
  } = usePaginated({
    currentPage: page,
    totalPage: Math.ceil(totalCount / limit),
    siblingSize: 1,
    boundarySize: 1,
  });

  return (
    <>
      <Table hover striped bordered responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Address</th>
            <th>Todos</th>
          </tr>
        </thead>
        <tbody>
          {(Object.keys(users) || []).map(key => {
            const user = users[key];
            const {
              address: { city, street, suite, zipcode },
            } = user;
            return (
              <tr key={user.id}>
                <td>
                  <Link to={`/user/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.website}</td>
                <td>
                  {street}
                  <br />
                  {suite && (
                    <>
                      {suite}
                      <br />
                    </>
                  )}
                  {city}
                  {', '}
                  {zipcode}
                </td>
                <td>
                  {user.todos.map((id, index) => {
                    const todo = todos[id];
                    return (
                      <Fragment key={id}>
                        {todo.title}
                        {index !== (user.todos.length - 1) &&  <br />}
                      </Fragment>
                    )
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Pagination className='mb-5'>
        <PaginationItem disabled={!hasPrev()}>
          <PaginationLink
            onClick={pageChangeHandler.bind(null, 1)}
            first
            tag='button'
          />
        </PaginationItem>
        <PaginationItem disabled={!hasPrev()}>
          <PaginationLink
            onClick={pageChangeHandler.bind(null, currentPage - 1)}
            disabled={!hasPrev()}
            previous
            tag='button'
          />
        </PaginationItem>
        {getFirstBoundary().map(boundary => (
          <PaginationItem active={currentPage === boundary} key={boundary}>
            <PaginationLink
              onClick={pageChangeHandler.bind(null, boundary)}
              tag='button'
            >
              {boundary}
            </PaginationLink>
          </PaginationItem>
        ))}
        {isPrevTruncated && (
          <PaginationItem>
            <PaginationLink tag='span'>...</PaginationLink>
          </PaginationItem>
        )}
        {pages.map(page => {
          return (
            <PaginationItem key={page} active={currentPage === page}>
              <PaginationLink
                onClick={pageChangeHandler.bind(null, page)}
                tag='button'
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {isNextTruncated && (
          <PaginationItem>
            <PaginationLink tag='span'>...</PaginationLink>
          </PaginationItem>
        )}
        {getLastBoundary().map(boundary => (
          <PaginationItem active={currentPage === boundary} key={boundary}>
            <PaginationLink
              onClick={pageChangeHandler.bind(null, boundary)}
              tag='button'
            >
              {boundary}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem disabled={!hasNext()}>
          <PaginationLink
            onClick={pageChangeHandler.bind(null, currentPage + 1)}
            next
            tag='button'
          />
        </PaginationItem>
        <PaginationItem disabled={!hasNext()}>
          <PaginationLink
            onClick={pageChangeHandler.bind(
              null,
              Math.ceil(totalCount / limit)
            )}
            disabled={!hasNext()}
            last
            tag='button'
          />
        </PaginationItem>
      </Pagination>
    </>
  );
};

Users.propTypes = {};
Users.defaultProps = {};

export default Users;
