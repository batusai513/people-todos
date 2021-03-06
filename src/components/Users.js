import React, { Component } from "react";
import P from "prop-types";
import { Link } from "react-router-dom";

export default function Users({ users }) {
  return (
    <div className="user-list">
      {users.map(user => (
        <Link key={user} to={`/users/${user}`}>
          {user}
        </Link>
      ))}
    </div>
  );
}

Users.propTypes = {
  users: P.array
};

Users.defaultProps = {
  users: []
};
