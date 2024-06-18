import { useTranslation } from "react-i18next";
import { Title } from "../components";
import { useEffect, useState } from "react";
import { getMyOrders } from "../api/orders";
import { Order } from "../types";
import { showDate } from "../services/date.service";
import { Link } from "react-router-dom";

export const MyOrders = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const res = await getMyOrders();
        setOrders(res);
      } catch (error) {
        console.error("Error fetching my orders", error);
      }
    };

    fetchMyOrders();
  }, []);

  if (!orders) return <div>Loading...</div>;
  return (
    <div className="text-left py-12 bg-white px-8 shadow rounded-xl mt-8">
      <Title className="mb-16">{t("myOrders.title")}</Title>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              {t("myOrders.name")}
            </th>
            <th scope="col" className="px-6 py-3">
              {t("myOrders.date")}
            </th>
            <th scope="col" className="px-6 py-3">
              {t("myOrders.price")}
            </th>
            <th scope="col" className="px-6 py-3">
              {t("myOrders.actions")}
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr className="bg-white border-b" key={order._id}>
              <td className="p-6">
                <Link to={`/prompt/${order.promptId._id}`}>
                  {order.promptId.title}
                </Link>
              </td>
              <td className="p-6">{showDate(order.createdAt)}</td>
              <td className="p-6">
                {order.amount / 100} {t("general.currency")}
              </td>
              <td className="p-6">{"ACTIONS"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
