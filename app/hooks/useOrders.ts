import { Order } from "@prisma/client";
import queryString from "query-string";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useLoading } from "./useLoading";
import { useEffect } from "react";
import { useSubscription } from "@apollo/client";
import { PAYMENT_SUBSCRIPTION } from "@/lib/graphql";
import * as _ from "lodash";

export const useOrders = (
  merchantId: number | null,
  dateRange: { startDate: Date | null; endDate: Date | null }
) => {
  const [orders, setOrders] = useState<Array<Order>>([]);
  const [total, setTotal] = useState(0);
  const [limit] = useState(20);

  const { loading, setLoading } = useLoading();

  const { data: subscriptionData } = useSubscription(PAYMENT_SUBSCRIPTION, {
    variables: {
      id: merchantId?.toString(),
      type: "merchant_order",
    },
    skip: !merchantId,
  });

  const newOrderSubscriptionHandler = useCallback(() => {
    if (!subscriptionData?.subscription) {
      return;
    }

    const { type, action, payload } = subscriptionData?.subscription;

    if (type !== "merchant_order") {
      return;
    }

    if (action === "create") {
      setOrders((preOrders: Order[]) => {
        const index = preOrders.findIndex(
          (item: Order) => item.id === payload.id
        );

        if (index === -1) {
          setTotal((preTotal: number) => preTotal + 1);
          return _.uniqBy([payload, ...preOrders], "id");
        }

        return preOrders;
      });
    } else if (action === "update") {
      setOrders((preOrders: Order[]) => {
        let index = preOrders.findIndex(
          (item: Order) => item.id === payload.id
        );

        if (index === -1) {
          return preOrders;
        }

        const tempOrders = _.cloneDeep(preOrders);

        tempOrders[index] = payload;

        return tempOrders;
      });
    }
  }, [subscriptionData]);

  useEffect(() => {
    newOrderSubscriptionHandler();
  }, [newOrderSubscriptionHandler]);

  const getOrders = useCallback(
    async (_skip: number = 0) => {
      if (!merchantId) {
        return;
      }
      try {
        setLoading(true);
        if (_skip === 0) {
          setOrders([]);
        }
        const startDateStr = dateRange.startDate?.toISOString();
        const endDateStr = dateRange.endDate?.toISOString();

        const query = queryString.stringify({
          skip: _skip,
          limit,
          startDate: startDateStr,
          endDate: endDateStr,
        });

        const response = await fetch(`/api/order?${query}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();

        if (response.ok) {
          setOrders((_orders: Order[]) =>
            _skip === 0
              ? result.rows
              : _.uniqBy([..._orders, ...result.rows], "id")
          );
          setTotal(result.count);
        } else {
          throw new Error(result.message || result.error);
        }
      } catch (err: any) {
        // TODO: Improve error handling
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    },
    [limit, dateRange, merchantId, setLoading, setTotal]
  );

  return { orders, loading, getOrders, total };
};
