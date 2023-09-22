import React from "react";
export default function UserDisplay({ userList }) {
  return (
    <div>
      <table id="table">
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>UserName</th>
          <th>Email</th>
          <th>MobileNumber</th>
          <th>Address</th>
        </tr>
        {userList.map((user) => {
          return (
            user.role === "user" && (
              <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.mobileNumber}</td>
                <td>{user.address}</td>
              </tr>
            )
          );
        })}
      </table>
    </div>
  );
}
