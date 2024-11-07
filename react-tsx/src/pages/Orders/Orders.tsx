import { NavLink } from "react-router-dom";
import { Order } from "../../data/models/Order";
import useLocalStorage from "../../hooks/useLocalStorage";
import style from "./Orders.module.css";

function Orders() {
  const [localAllOrders, _] = useLocalStorage("allOrders", []);

  localAllOrders.sort((a: Order, b: Order) => {
    if (a.createdDate > b.createdDate) {
      return -1;
    }

    if (a.createdDate < b.createdDate) {
      return 1;
    }

    return 0;
  });

  return (
    <div className={style.container}>
      <h3 className={style.title}>ORDERS</h3>

      <table>
        <thead>
          <th>Order ID</th>
          <th>User ID</th>
          <th>Customer Name</th>
          <th>Phone Number</th>
          <th>Created Date</th>
          <th></th>
        </thead>
        <tbody>
          {
            localAllOrders.map((order: Order, index: number) =>
              <tr key={index}>
                <td>
                  {order.id}
                </td>
                <td>
                  {order.userID}
                </td>
                <td>
                  {order.shippingInformation?.name}
                </td>
                <td>
                  {order.shippingInformation?.phoneNumber}
                </td>
                <td>
                  {order.createdDate}
                </td>
                <td>
                  <NavLink to={`/orders/${order.id}`}>Details</NavLink>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div >
  );
}

export default Orders;
