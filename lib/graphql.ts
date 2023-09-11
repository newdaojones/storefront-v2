import { gql } from "@apollo/client";

export const PAYMENT_SUBSCRIPTION = gql`
  subscription Subscription($id: String!, $type: String!) {
    subscription(id: $id, type: $type) {
      id
      type
      action
      payload
    }
  }
`;

export const SEND_PAYMENT_SUBSCRIPTION = gql`
  mutation PublishSubscription(
    $id: String!
    $type: String!
    $action: String!
    $payload: JSONObject!
  ) {
    publishSubscription(
      id: $id
      type: $type
      action: $action
      payload: $payload
    )
  }
`;
